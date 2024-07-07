import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import OrdersCard from "../../components/cards/OrdersCard";
import { getOrders } from "../../api";
import animationData from "../../utils/Lotties/no_order.json"
import Lottie from "lottie-react"
import { Container, Section, CardWrapper, NoOrderAnimation } from "./style"

const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        setLoading(true);
        const token = localStorage.getItem("food-app-token");
        try {
            const res = await getOrders(token);
            setOrders(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setOrders([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <Container>
            <Section>
                <CardWrapper>
                    {loading ? (
                        <CircularProgress />
                    ) : orders.length === 0 ? (
                        <NoOrderAnimation>
                            <Lottie animationData={animationData} autoPlay loop></Lottie>
                        </NoOrderAnimation>
                    )
                        : (
                            <>
                                {orders.map((order) => (
                                    <OrdersCard key={order._id} order={order} />
                                ))}
                            </>
                        )}
                </CardWrapper>
            </Section>

        </Container>
    );
};

export default Orders;
