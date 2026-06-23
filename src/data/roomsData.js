import firstphoto from "../assets/houses/firstHouse/second.jpeg";
import secondphoto from "../assets/houses/secondHouse/fourth.jpeg";
import thirdphoto from "../assets/houses/third/second.jpeg";

const roomsData = [
  {
    id: "standard-double",
    titleKey: "rooms.standardDouble.title",
    descriptionKey: "roomDetails.rooms.standard-double.description",
    price: "₾250",
    image: firstphoto,
    featureKeys: [
      "rooms.features.guests2",
      "rooms.features.oneBed",
      "rooms.features.wifi",
      "rooms.features.balcony",
    ],
  },
  {
    id: "deluxe-king-suite",
    titleKey: "rooms.deluxeKing.title",
    descriptionKey: "roomDetails.rooms.deluxe-king-suite.description",
    price: "₾250",
    image: secondphoto,
    featureKeys: [
      "rooms.features.guests2",
      "rooms.features.oneBed",
      "rooms.features.wifi",
      "rooms.features.balcony",
    ],
  },
  {
    id: "family-apartment",
    titleKey: "rooms.familyApartment.title",
    descriptionKey: "roomDetails.rooms.family-apartment.description",
    price: "₾250",
    image: thirdphoto,
    featureKeys: [
      "rooms.features.guests2",
      "rooms.features.oneBed",
      "rooms.features.wifi",
      "rooms.features.balcony",
    ],
  },
];

export default roomsData;
