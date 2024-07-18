import React from "react";
import styled from "styled-components";
import { formatVND } from "../../utils/format";
const OrderCardContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  margin: 20px 10px;
  background-color: ${({ theme }) => theme.card_bg};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const OrderTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const OrderStatus = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
`;

const OrderAddress = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text_secondary};
`;

const OrderTotal = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.text_primary};
`;

const ProductsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 15px;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const ProductItem = styled.li`
  font-size: 1rem;
  color: ${({ theme }) => theme.text_primary};
  margin: 10px 0;
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.span`
  font-weight: 600;
`;

const ProductQuantity = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text_secondary};
`;

const OrderCard = ({ order }) => {
  return (
    <OrderCardContainer>
      <OrderInfo>
        <OrderTitle>Mã Đơn: {order._id}</OrderTitle>
        <OrderStatus>{order.status}</OrderStatus>
      </OrderInfo>
      <OrderAddress>Địa Chỉ: {order.address}</OrderAddress>
      <OrderTotal>Tổng Tiền: {formatVND(order.total_amount)}</OrderTotal>
      <h4>Sản Phẩm:</h4>
      <ProductsList>
        {order.products.map((item) => (
          <ProductItem key={item.product._id}>
            <ProductImage src={item.product.img} alt={item.product.name} />
            <ProductDetails>
              <ProductName>{item.product.name}</ProductName>
              <ProductQuantity>Số Lượng: {item.quantity}</ProductQuantity>
            </ProductDetails>
          </ProductItem>
        ))}
      </ProductsList>
    </OrderCardContainer>
  );
};

export default OrderCard;
