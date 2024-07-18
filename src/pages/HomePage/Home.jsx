import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { category } from "../../utils/data";
import ImageSlider from "../../components/Slider/sliderComponent";
import ProductCategoryCard from "../../components/cards/ProductCategoryCard";
import ProductsCard from "../../components/cards/ProductsCard";
import { getAllProducts } from "../../api";
import { CircularProgress } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import { Container, Section, Img, Title, CardWrapper, ViewMoreButton, ButtonWrapper } from "./style";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const getProducts = useCallback(async () => {
    setLoading(true);
    await getAllProducts().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleCardClick = () => {
    navigate('/dishes');
  };

  const handleViewMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 4);
      setIsLoadingMore(false);
    }, 1000);
  };

  return (
    <Container>
      <ImageSlider />
      <Section>
        <Title>Food Categories</Title>
        <CardWrapper>
          {category.map((categoryItem) => (
            <div key={categoryItem.id} onClick={handleCardClick}>
              <ProductCategoryCard category={categoryItem} />
            </div>
          ))}
        </CardWrapper>
      </Section>

      <Section>
        <Title>Most Popular</Title>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <CardWrapper>
              {products.slice(0, visibleCount).map((product) => (
                <ProductsCard key={product.id} product={product} />
              ))}
            </CardWrapper>
            {visibleCount < products.length && (
              <ButtonWrapper>
                <ViewMoreButton onClick={handleViewMore} disabled={isLoadingMore}>
                  {isLoadingMore ? <CircularProgress size={24} /> : 'View More'}
                </ViewMoreButton>
              </ButtonWrapper>
            )}
          </>
        )}
      </Section>

      <Footer />
    </Container>
  );
};

export default Home;
