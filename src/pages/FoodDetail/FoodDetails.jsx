import { CircularProgress, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import ToastNotifier from "../../utils/ToastNotifier";
import {
  FavoriteBorder,
  FavoriteBorderOutlined,
  FavoriteRounded,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToCart,
  addToFavourite,
  deleteFromFavourite,
  getFavourite,
  getProductDetails,
} from "../../api";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";
import { useDispatch } from "react-redux";
import { formatVND, calculateDiscount } from "../../utils/format"
import {
  Container, Wrapper, Image, ImagesWrapper,
  ButtonWrapper, Desc, Details,
  Ingridents, Items, Item, Title, Span,
  Price, Percent
} from "./style"


const FoodDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();

  const getProduct = async () => {
    setLoading(true);
    await getProductDetails(id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  };

  const removeFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("food-app-token");
    await deleteFromFavourite(token, { productId: id })
      .then((res) => {
        setFavorite(false);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

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

  const checkFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("food-app-token");
    await getFavourite(token, { productId: id })
      .then((res) => {
        const isFavorite = res.data?.some((favorite) => favorite._id === id);

        setFavorite(isFavorite);

        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  useEffect(() => {
    getProduct();
    checkFavorite();
  }, []);

  const orderNow = async (id) => {
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
  return (
    <Container>
      <ToastNotifier />
      {loading ? (
        <CircularProgress />
      ) : (
        <Wrapper>
          <ImagesWrapper>
            <Image src={product?.img} />
          </ImagesWrapper>
          <Details>
            <div>
              <Title>{product?.name}</Title>
            </div>
            <Rating value={3.5} />
            <Price>
              {formatVND(product?.price?.org)} <Span>{formatVND(product?.price?.mrp)}</Span>{" "}
              <Percent> ({discount.toFixed(2)}% Off) </Percent>
            </Price>
            <Desc>{product?.desc}</Desc>
            <Ingridents>
              Ingridents
              <Items>
                {product?.ingredients.map((ingredient) => (
                  <Item>{ingredient}</Item>
                ))}
              </Items>
            </Ingridents>
            <ButtonWrapper>
              <Button text="Order Now" full
                isLoading={cartLoading}
                onClick={() => orderNow(product?._id)}
              />
              <Button
                leftIcon={
                  favorite ? (
                    <FavoriteRounded sx={{ fontSize: "22px", color: "red" }} />
                  ) : (
                    <FavoriteBorderOutlined sx={{ fontSize: "22px" }} />
                  )
                }
                full
                outlined
                isLoading={favoriteLoading}
                onClick={() => (favorite ? removeFavourite() : addFavourite())}
              />
            </ButtonWrapper>
          </Details>
        </Wrapper>
      )}
    </Container>
  );
};

export default FoodDetails;
