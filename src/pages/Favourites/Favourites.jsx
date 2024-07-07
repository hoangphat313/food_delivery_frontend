import React, { useEffect, useState } from "react";
import ProductsCard from "../../components/cards/ProductsCard";
import { getFavourite } from "../../api";
import { CircularProgress } from "@mui/material";
import animationData from "../../utils/Lotties/no_order.json";
import Lottie from "lottie-react";
import { Container, CardWrapper, Section, NoOrderAnimationContainer } from "./style"


const Favourites = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("food-app-token");
    try {
      const res = await getFavourite(token);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>

      {loading ? (
        <CircularProgress />
      ) : products.length === 0 ? (
        <NoOrderAnimationContainer>
          <Lottie
            animationData={animationData}
            autoplay
            loop
          />
        </NoOrderAnimationContainer>
      ) : (
        <Section>
          <CardWrapper>
            {products.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </CardWrapper>
        </Section>
      )}

    </Container>
  );
};

export default Favourites;
