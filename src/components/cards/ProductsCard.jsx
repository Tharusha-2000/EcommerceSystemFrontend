import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Rating } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import {
  AddShoppingCartOutlined,
  FavoriteBorder,
  FavoriteRounded,
  ShoppingBagOutlined,
  ShoppingCart,
  Spa,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { addToCart, updateItemOnCart } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";
import { addToCartRed, updateCartRed } from "../../redux/reducers/cartSlice";

const Card = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease-out;
  cursor: pointer;
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
`;
const Menu = styled.div`
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  top: 14px;
  right: 14px;
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
    background-color: ${({ theme }) => theme.black};
  }

  &:hover ${Image} {
    opacity: 0.9;
  }
  &:hover ${Menu} {
    display: flex;
    padding: 8px;
    background: white;
    border-radius: 50%;
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
const Percent = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: green;
`;
const Span = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 60};
  text-decoration-color: ${({ theme }) => theme.text_secondary + 50};
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [cartLoading, setCartLoading] = useState(false);

  const addCart = async () => {
    var cartItem = {
      userId: currentUser.id,
      productId: product.productId,
      productImg: product?.imageUrl,
      productName: product?.name,
      unitPrice: product?.sizes.find((sizeItem) => sizeItem.size === "S").price,
      pizzaSize: "S",
      count: 1,
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
      return dispatch(
        openSnackbar({
          message: "Item already in cart",
          severity: "error",
        })
      );
    } else {
      await addToCart(token, cartItem)
        .then((res) => {
          dispatch(addToCartRed(res.data));
          dispatch(
            openSnackbar({
              message: "Added to cart",
              severity: "success",
            })
          );
          setCartLoading(false);
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

  return (
    <Card>
      <Top>
        <Image src={product?.imageUrl} />
        <Menu>
          <MenuItem onClick={() => addCart(product?.productId)}>
            <ShoppingBagOutlined sx={{ fontSize: "28px" }} />
          </MenuItem>
        </Menu>
        <Rate>
          <Rating readOnly value={3.5} sx={{ fontSize: "14px" }} />
        </Rate>
      </Top>
      <Details onClick={() => navigate(`/dishes/${product.productId}`)}>
        <Title>{product?.name}</Title>
        <Flex>
          {product?.categories &&
            product?.categories.map((category) => (
              <Span key={category}>{category}</Span>
            ))}
        </Flex>
        <Desc>{product?.description}</Desc>
        <Price>LKR {product?.sizes[0]?.price}</Price>
      </Details>
    </Card>
  );
};

export default ProductsCard;
