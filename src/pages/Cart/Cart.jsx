import React, { useEffect, useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import { addToCart, deleteFromCart, getCart, placeOrder, getDetailUser } from "../../api";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";
import { DeleteOutline } from "@mui/icons-material";
import animationData from "../../utils/Lotties/no_order.json";
import Lottie from "lottie-react";
import { formatVND } from "../../utils/format";
import { toast } from "react-toastify";
import ToastNotifier from "../../utils/ToastNotifier";
import {
  Container, Section, Subtotal, Right, Delivery, Counter, Product,
  Img, Details, ProDesc, Protitle, NoOrderAnimation, Wrapper,
  Left, Table, TableItem, WarningMessage,
} from "./style";

const Cart = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    completeAddress: "",
  });
  const [isFormFilled, setIsFormFilled] = useState(false); // State để kiểm tra xem form đã điền đầy đủ hay chưa

  // Function to check if all delivery details are filled
  const checkFormFilled = () => {
    const { firstName, lastName, emailAddress, phoneNumber, completeAddress } = deliveryDetails;
    return firstName && lastName && emailAddress && phoneNumber && completeAddress;
  };

  useEffect(() => {
    setIsFormFilled(checkFormFilled()); // Cập nhật trạng thái isFormFilled khi có thay đổi trong deliveryDetails
  }, [deliveryDetails]);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("food-app-token");
      const userData = await getDetailUser(token);
      if (userData) {
        const fullName = userData.name || "";
        const splitName = fullName.split(" ");

        let firstName = "";
        let lastName = "";

        if (splitName.length > 0) {
          firstName = splitName[0];
          lastName = splitName.slice(1).join(" ");
        }
        setDeliveryDetails({
          firstName: firstName || "",
          lastName: lastName || "",
          emailAddress: userData.email || "",
          phoneNumber: deliveryDetails.phoneNumber || "",
          completeAddress: deliveryDetails.completeAddress || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("food-app-token");
    try {
      const response = await getCart(token);
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () => {
    return products.reduce(
      (total, item) => total + item.quantity * item?.product?.price?.org,
      0
    );
  };

  const convertAddressToString = (addressObj) => {
    return `${addressObj.firstName} ${addressObj.lastName}, ${addressObj.completeAddress}, ${addressObj.phoneNumber}, ${addressObj.emailAddress}`;
  };

  const PlaceOrder = async () => {
    if (!isFormFilled) {
      dispatch(
        openSnackbar({
          message: "Please fill in all required delivery details.",
          severity: "error",
        })
      );
      return;
    }

    setButtonLoad(true);
    try {
      const token = localStorage.getItem("food-app-token");
      const totalAmount = calculateSubtotal().toFixed(2);
      const orderDetails = {
        products,
        address: convertAddressToString(deliveryDetails),
        totalAmount,
      };

      await placeOrder(token, orderDetails);
      toast.success("Order placed successfully")
      dispatch(
        openSnackbar({
          message: "Order placed successfully",
          severity: "success",
        })
      );
      setButtonLoad(false);
      setReload(!reload);
    } catch (err) {
      dispatch(
        openSnackbar({
          message: "Failed to place order. Please try again.",
          severity: "error",
        })
      );
      setButtonLoad(false);
    }
  };

  const addCart = async (id) => {
    const token = localStorage.getItem("food-app-token");
    try {
      await addToCart(token, { productId: id, quantity: 1 });
      setReload(!reload);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const removeCart = async (id, quantity, type) => {
    const token = localStorage.getItem("food-app-token");
    let qnt = quantity > 0 ? 1 : null;
    if (type === "full") qnt = null;
    try {
      await deleteFromCart(token, { productId: id, quantity: qnt });
      setReload(!reload);
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  useEffect(() => {
    getProducts();
    fetchUserData();
  }, [reload]);

  return (
    <Container>
      <ToastNotifier />
      <Section>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {products.length === 0 ? (
              <NoOrderAnimation>
                <Lottie animationData={animationData} autoPlay loop />
              </NoOrderAnimation>
            ) : (
              <Wrapper>
                <Left>
                  <Table>
                    <TableItem bold flex>
                      Product
                    </TableItem>
                    <TableItem bold>Price</TableItem>
                    <TableItem bold>Quantity</TableItem>
                    <TableItem bold>Subtotal</TableItem>
                    <TableItem></TableItem>
                  </Table>
                  {products.map((item) => (
                    <Table key={item._id}>
                      <TableItem flex>
                        <Product>
                          <Img src={item?.product?.img} alt={item?.product?.name} />
                          <Details>
                            <Protitle>{item?.product?.name}</Protitle>
                            <ProDesc>{item?.product?.desc}</ProDesc>
                          </Details>
                        </Product>
                      </TableItem>
                      <TableItem>{formatVND(item?.product?.price?.org)}</TableItem>
                      <TableItem>
                        <Counter>
                          <div
                            style={{
                              cursor: "pointer",
                              flex: 1,
                            }}
                            onClick={() =>
                              removeCart(item?.product?._id, item?.quantity - 1)
                            }
                          >
                            -
                          </div>
                          {item?.quantity}{" "}
                          <div
                            style={{
                              cursor: "pointer",
                              flex: 1,
                            }}
                            onClick={() => addCart(item?.product?._id)}
                          >
                            +
                          </div>
                        </Counter>
                      </TableItem>
                      <TableItem>
                        {" "}
                        {formatVND(item.quantity * item?.product?.price?.org)}
                      </TableItem>
                      <TableItem>
                        <DeleteOutline
                          sx={{ color: "red", cursor: "pointer" }}
                          onClick={() =>
                            removeCart(
                              item?.product?._id,
                              item?.quantity - 1,
                              "full"
                            )
                          }
                        />
                      </TableItem>
                    </Table>
                  ))}
                </Left>
                <Right>
                  <Subtotal>
                    Subtotal: {formatVND(calculateSubtotal())}
                  </Subtotal>
                  <Delivery>
                    Delivery Details:
                    <div>
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                        }}
                      >
                        <TextInput
                          small
                          placeholder="First Name"
                          value={deliveryDetails.firstName}
                          handleChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              firstName: e.target.value,
                            })
                          }
                        />
                        {deliveryDetails.firstName === "" && (
                          <WarningMessage>Please enter First Name</WarningMessage>
                        )}
                        <TextInput
                          small
                          placeholder="Last Name"
                          value={deliveryDetails.lastName}
                          handleChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              lastName: e.target.value,
                            })
                          }
                        />
                        {deliveryDetails.lastName === "" && (
                          <WarningMessage>Please enter Last Name</WarningMessage>
                        )}
                      </div>
                      <TextInput
                        small
                        placeholder="Email Address"
                        value={deliveryDetails.emailAddress}
                        handleChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            emailAddress: e.target.value,
                          })
                        }
                      />
                      {deliveryDetails.emailAddress === "" && (
                        <WarningMessage>Please enter Email Address</WarningMessage>
                      )}
                      <TextInput
                        small
                        placeholder="Phone no. +84 XXXXX XXXXX"
                        value={deliveryDetails.phoneNumber}
                        handleChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                      {deliveryDetails.phoneNumber === "" && (
                        <WarningMessage>Please enter Phone Number</WarningMessage>
                      )}
                      <TextInput
                        small
                        textArea
                        rows="5"
                        placeholder="Complete Address (Address, State, Country, Pincode)"
                        value={deliveryDetails.completeAddress}
                        handleChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            completeAddress: e.target.value,
                          })
                        }
                      />
                      {deliveryDetails.completeAddress === "" && (
                        <WarningMessage>Please enter Complete Address</WarningMessage>
                      )}
                    </div>
                  </Delivery>
                  <Button
                    text={"Place Order"}
                    disabled={!isFormFilled}
                    loading={buttonLoad}
                    onClick={PlaceOrder}
                  >

                  </Button>
                </Right>
              </Wrapper>
            )}
          </>
        )}
      </Section>
    </Container>
  );
};

export default Cart;
