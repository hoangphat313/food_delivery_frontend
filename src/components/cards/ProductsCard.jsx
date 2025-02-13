import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgress, Rating } from "@mui/material";
import {
  AddShoppingCartOutlined,
  FavoriteBorder,
  FavoriteRounded,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import {
  addToFavourite,
  deleteFromFavourite,
  getFavourite,
  addToCart,
} from "../../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatVND, calculateDiscount } from "../../utils/format";

const Card = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease-out;
  cursor: pointer;
  position: relative; 
  @media (max-width: 600px) {
    width: 180px;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 6px;
  object-fit: cover;
  transition: all 0.3s ease-out;
  @media (max-width: 600px) {
    height: 180px;
  }
  &:hover {
    opacity: 0.9;
  }
`;
const Menu = styled.div`
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  display: none;
  flex-direction: column;
  gap: 12px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 6px;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: ${({ theme }) => theme.shadow};
    ${Menu} {
      display: flex;
    }
  }
`;

const DiscountLabel = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 500;
  @media (max-width: 600px) {
    font-size: 12px;
    padding: 3px 7px;
  }
`;

const MenuItem = styled.div`
  border-radius: 50%;
  width: 18px;
  height: 18px;
  background: white;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;
const Rate = styled.div`
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  bottom: 8px;
  left: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  background: white;
  display: flex;
  align-items: center;
  opacity: 0.9;
`;
const Details = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  padding: 4px 10px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  white-space: normal;
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 60};
  text-decoration: line-through;
  text-decoration-color: ${({ theme }) => theme.text_secondary + 50};
`;

const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const addFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("food-app-token");
    if (!token) {
      toast.error("You must be logged in to add items to favourites.");
      setFavoriteLoading(false);
      return;
    }
    await addToFavourite(token, { productId: product?._id })
      .then((res) => {
        setFavorite(true);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        toast.error(err.response?.data?.message || "An error occurred.");
      });
  };

  const removeFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("food-app-token");
    await deleteFromFavourite(token, { productId: product?._id })
      .then((res) => {
        setFavorite(false);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.response.data.message,
            severity: "error",
          })
        );
      });
  };

  const checkFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("food-app-token");
    await getFavourite(token, { productId: product?._id })
      .then((res) => {
        const isFavorite = res.data?.some(
          (favorite) => favorite._id === product?._id
        );

        setFavorite(isFavorite);

        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.response.data.message,
            severity: "error",
          })
        );
      });
  };

  const addCart = async (id) => {
    const token = localStorage.getItem("food-app-token");
    if (!token) {
      toast.error("You must be logged in to add items to the cart.");
      return;
    }
    await addToCart(token, { productId: id, quantity: 1 })
      .then((res) => {
        toast.success("Item added to cart successfully!");
        navigate("/cart");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "An error occurred.");
      });
  };

  const discount = calculateDiscount(product?.price?.org, product?.price?.mrp);
  useEffect(() => {
    checkFavorite();
  }, [favorite]);
  return (
    <Card>
      <ToastContainer />
      <Top>
        <Image src={product?.img} onClick={() => navigate(`/dishes/${product._id}`)} />
        <DiscountLabel>{discount.toFixed(2)}% Off</DiscountLabel>
        <Menu>
          <MenuItem
            onClick={() => (favorite ? removeFavourite() : addFavourite())}
          >
            {favoriteLoading ? (
              <>
                <CircularProgress sx={{ fontSize: "20px" }} />
              </>
            ) : (
              <>
                {favorite ? (
                  <FavoriteRounded sx={{ fontSize: "20px", color: "red" }} />
                ) : (
                  <FavoriteBorder sx={{ fontSize: "20px" }} />
                )}
              </>
            )}
          </MenuItem>
          <MenuItem onClick={() => addCart(product?._id)}>
            <ShoppingBagOutlined sx={{ fontSize: "20px" }} />
          </MenuItem>
        </Menu>
        <Rate>
          <Rating value={3.5} sx={{ fontSize: "14px" }} />
        </Rate>
      </Top>
      <Details onClick={() => navigate(`/dishes/${product._id}`)}>
        <Title>{product?.name}</Title>
        <Desc>{product?.desc}</Desc>
        <Price>
          {formatVND(product?.price?.org)} <Span>{formatVND(product?.price?.mrp)}</Span>
        </Price>
      </Details>
    </Card>
  );
};

export default ProductsCard;
