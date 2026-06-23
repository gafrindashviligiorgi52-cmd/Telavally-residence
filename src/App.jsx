import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/Header/Header";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home/Home";
import Rooms from "./pages/Rooms/Rooms";
import Gallery from "./pages/Gallery/Gallery";
import RoomDetail from "./pages/Roomdetails/RoomDetails";
import Liked from "./pages/liked/Liked";
import "./App.css";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/liked" element={<Liked />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
