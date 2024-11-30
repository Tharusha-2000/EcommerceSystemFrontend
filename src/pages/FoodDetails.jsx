import { CircularProgress, IconButton, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import {
  Add,
  FavoriteBorder,
  FavoriteBorderOutlined,
  FavoriteRounded,
  Remove,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToCart,
  addToCart2,
  addToFavourite,
  deleteFromCart,
  deleteFromFavourite,
  getFavourite,
  getProductDetails,
  updateItemOnCart,
  getProductFeedbacks,
} from "../api";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCartRed, updateCartRed } from "../redux/reducers/cartSlice";
import ReviewList from "../components/FeedbackSection/ReviewList";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
  background: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  max-width: 1400px;
  display: flex;
  gap: 40px;
  justify-content: center;
  @media only screen and (max-width: 700px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const ImagesWrapper = styled.div`
  flex: 0.7;
  display: flex;
  justify-content: center;
`;
const Image = styled.img`
  max-width: 500px;
  width: 100%;
  max-height: 500px;
  border-radius: 12px;
  object-fit: cover;
  @media (max-width: 768px) {
    max-width: 400px;
    height: 400px;
  }
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  gap: 18px;
  flex-direction: column;
  padding: 4px 10px;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 60};
  text-decoration: line-through;
  text-decoration-color: ${({ theme }) => theme.text_secondary + 50};
`;

const Percent = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: green;
`;

const Categories = styled.div`
  font-size: 16px;
  font-weight: 500;
  diaplay: flex;
  flex-direction: column;
  gap: 24px;
`;
const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
  align-items: center;
`;
const Item = styled.div`
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  padding: 4px 12px;
  display: flex;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 32px 0px;
  @media only screen and (max-width: 700px) {
    gap: 12px;
    padding: 12px 0px;
  }
`;

const Div = styled.div`
  font-size: 16px;
  font-weight: 500;
  diaplay: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;

const FoodDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQty, setSelectedQty] = useState(1);
  const { cart } = useSelector((state) => state.cart);
  const [averageRating, setAverageRating] = useState(null);

  const getProduct = async () => {
    setLoading(true);
    await getProductDetails(id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  };

  const removeFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
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
    const token = localStorage.getItem("krist-app-token");
    await addToFavourite(token, { productId: id })
      .then((res) => {
        setFavorite(true);
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

  const checkFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
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

  const addCart = async () => {
    setCartLoading(true);

    if (selectedSize === "") {
      setCartLoading(false);
      dispatch(
        openSnackbar({
          message: "Please select a size",
          severity: "error",
        })
      );
      return;
    }

    var cartItem = {
      userId: "2",
      productId: id,
      productImg: product?.imageUrl,
      productName: product?.name,
      unitPrice: product?.sizes.find(
        (sizeItem) => sizeItem.size === selectedSize
      ).price,
      pizzaSize: selectedSize,
      count: selectedQty,
    };

    const existingItem = cart.find((item) => {
      return (
        item.productId == cartItem.productId &&
        item.userId == cartItem.userId &&
        item.pizzaSize == cartItem.pizzaSize
      );
    });

    const token = localStorage.getItem("krist-app-token");

    if (existingItem) {
      cartItem.count += existingItem.count;
      console.log(existingItem);
      if (cartItem.count > 10) {
        cartItem.count = 10;
      }
      cartItem = { ...cartItem, cartId: existingItem.cartId };
      await updateItemOnCart(token, cartItem)
        .then((res) => {
          dispatch(updateCartRed(cartItem));
          setCartLoading(false);
          navigate("/cart");
        })
        .catch((err) => {
          setCartLoading(false);
          dispatch(
            openSnackbar({
              message: err.message,
              severity: "error",
            })
          );
        });
    } else {
      await addToCart2(token, cartItem)
        .then((res) => {
          dispatch(addToCartRed(res.data));
          setCartLoading(false);
          navigate("/cart");
        })
        .catch((err) => {
          setCartLoading(false);
          dispatch(
            openSnackbar({
              message: err.message,
              severity: "error",
            })
          );
        });
    }
  };

  const handleIncreaseQty = () => {
    if (selectedQty < 10) {
      setSelectedQty(selectedQty + 1);
    }
  };

  const handleDecreaseQty = () => {
    if (selectedQty > 1) {
      setSelectedQty(selectedQty - 1);
    }
  };

  useEffect(() => {
    const getProductReviews = async () => {
      const response = await getProductFeedbacks(id);
      // Calculate average rating
      const totalRating = response.reduce(
        (acc, review) => acc + review.rate,
        0
      );
      const averageRating = totalRating / response.length;
      setAverageRating(averageRating);
    };
    getProductReviews();
  }, [id]);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <Wrapper>
          <ImagesWrapper>
            <Image src={product?.imageUrl} />
          </ImagesWrapper>
          <Details>
            <div>
              <Title>{product?.name}</Title>
            </div>
            <Rating value={averageRating} />
            <Price>
              LKR
              {selectedSize
                ? product?.sizes.find((size) => size.size === selectedSize)
                    .price
                : product?.sizes[0].price}
            </Price>

            <Desc>{product?.description}</Desc>

            <Categories>
              Categories
              <Items>
                {product?.categories.map((category, index) => (
                  <Item key={index}>{category}</Item>
                ))}
              </Items>
            </Categories>

            <Div>
              Select Size
              <Items>
                {product?.sizes.map((size, index) => (
                  <Button
                    key={index}
                    outlined={selectedSize !== size.size}
                    small
                    text={size.size.toUpperCase()}
                    onClick={() => {
                      setSelectedSize(size.size);
                    }}
                  />
                ))}
              </Items>
            </Div>

            <Div>
              Select Quntity
              <Items>
                <IconButton color="error" onClick={handleDecreaseQty}>
                  <Remove />
                </IconButton>
                <Div style={{ minWidth: "10px" }}>{selectedQty}</Div>
                <IconButton color="error" onClick={handleIncreaseQty}>
                  <Add />
                </IconButton>
              </Items>
            </Div>

            <ButtonWrapper>
              <Button
                text="Add to Cart"
                full
                outlined
                isLoading={cartLoading}
                onClick={() => addCart()}
              />
              <Button text="Order Now" full />
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
      <ReviewList productId={id} />
    </Container>
  );
};

export default FoodDetails;
