const LIKED_ROOMS_STORAGE_KEY = "telavalley-liked-rooms";

function normalizeLikedRoom(room) {
  if (!room) return null;

  if (typeof room === "string") {
    return { id: room };
  }

  if (typeof room !== "object" || !room.id) {
    return null;
  }

  return {
    id: room.id,
    titleKey: room.titleKey,
    descriptionKey: room.descriptionKey,
    price: room.price,
    image: room.image,
    featureKeys: Array.isArray(room.featureKeys) ? room.featureKeys : [],
  };
}

function getStorage() {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

function uniqueRooms(rooms) {
  const seen = new Set();

  return rooms.reduce((items, room) => {
    const normalizedRoom = normalizeLikedRoom(room);

    if (!normalizedRoom || seen.has(normalizedRoom.id)) {
      return items;
    }

    seen.add(normalizedRoom.id);
    return [...items, normalizedRoom];
  }, []);
}

export function getLikedRooms() {
  const storage = getStorage();
  if (!storage) return [];

  try {
    const savedRooms = JSON.parse(storage.getItem(LIKED_ROOMS_STORAGE_KEY) || "[]");
    return Array.isArray(savedRooms) ? uniqueRooms(savedRooms) : [];
  } catch {
    return [];
  }
}

export function saveLikedRooms(rooms) {
  const storage = getStorage();
  const likedRooms = uniqueRooms(Array.isArray(rooms) ? rooms : []);

  if (storage) {
    storage.setItem(LIKED_ROOMS_STORAGE_KEY, JSON.stringify(likedRooms));
  }

  return likedRooms;
}

export function isRoomLiked(roomId) {
  return getLikedRooms().some((room) => room.id === roomId);
}

export function toggleLikedRoom(room) {
  const likedRooms = getLikedRooms();

  if (!room?.id) {
    return likedRooms;
  }

  const nextLikedRooms = isRoomLiked(room.id)
    ? likedRooms.filter((likedRoom) => likedRoom.id !== room.id)
    : [...likedRooms, room];

  return saveLikedRooms(nextLikedRooms);
}
