import React, { useEffect, useContext, useState } from "react";
import Navbar from "./NavBar";
import {
    Container,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@material-ui/core";
import AuthContext from "../context/authContext";
import { Link } from "react-router-dom";

export default function PurchaseHistory() {
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    const [rows, setRows] = useState([]);
    useEffect(() => {
        fetch("/payment/purchase-history/" + user._id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(res => {
                return res.json();
            })
            .then(paymentJSON => {
                paymentJSON.map(purchase => {
                    let purchaseDate = purchase.date.split("T")[0];
                    setRows(rows => [
                        ...rows,
                        {
                            name: purchase.productTitle,
                            id: purchase.productId,
                            date: purchaseDate,
                            price: purchase.price
                        }
                    ]);
                });
                console.log(paymentJSON);
            });
    }, [user._id]);

    return (
        <div>
            <Navbar />
            <Container>
                <h1>Purchases</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">
                                        <Link to={"/product/" + row.id}>
                                            {row.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{"$" + row.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}
