import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lightTheme } from "./utils/Themes";
import Navbar from "./components/NavBar/Navbar";
import Home from "./pages/HomePage/Home";
import { useState } from "react";
import Authentication from "./pages/Authentication/Authentication";
import Favourites from "./pages/Favourites/Favourites";
import Cart from "./pages/Cart/Cart";
import FoodDetails from "./pages/FoodDetail/FoodDetails";
import FoodListing from "./pages/FoodListing/FoodListing";
import Orders from "./pages/Orders/Orders";
import Contact from "./pages/Contact/Contact";
import ProfilePage from "./pages/Profile/Profile";
import { useSelector } from "react-redux";
import SearchPage from "./pages/SearchPage/search";
const Container = styled.div``;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const { open, message, severity } = useSelector((state) => state.snackbar);
  const [openAuth, setOpenAuth] = useState(false);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar
            setOpenAuth={setOpenAuth}
            openAuth={openAuth}
            currentUser={currentUser}
          />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/favorite" exact element={<Favourites />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/dishes/:id" exact element={<FoodDetails />} />
            <Route path="/dishes" exact element={<FoodListing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
          {openAuth && (
            <Authentication setOpenAuth={setOpenAuth} openAuth={openAuth} />
          )}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
