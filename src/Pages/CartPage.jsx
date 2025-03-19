import React, { useContext, useEffect, useState } from "react";
import EmptyCartImage from "../assets/cart-image.gif";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { getCartAPI, incrementCartItemAPI, emptyCartAPI, addCheckoutAPI } from "../Service/AllAPI";
import { SERVER_URL } from "../Service/ServerUrl";
import { cartCountContext } from "../Context API/ContextShare";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";

function CartPage() {
  const tableID = Number(sessionStorage.getItem("tableId"));
  const table_number = Number(sessionStorage.getItem("tableNumber"));
  const [allCartFoods, setAllCartFoods] = useState([]);
  const { cartCount, setCartCount } = useContext(cartCountContext);
  const [totalprice, setTotalPrice] = useState(0);
  const [descriptions, setDescriptions] = useState("");

  useEffect(() => {
    handleGetCart();
  }, []);

  useEffect(() => {
    const total = allCartFoods.reduce((acc, item) => acc + item.quantity * item.food_price, 0);
    setTotalPrice(total);
  }, [allCartFoods]);

  const handleGetCart = async () => {
    const cartResult = await getCartAPI(tableID);
    if (cartResult.status === 200) {
      setAllCartFoods([...cartResult.data]);
      setCartCount(cartResult.data.length);
    }
  };

  const handleIncreQty = async (id, action) => {
    const result = await incrementCartItemAPI(id, action);
    if (result.status === 200) {
      handleGetCart(); // Refresh cart after increment/decrement
    }
  };

  const handleEmptyCart = async () => {
    try {
      const response = await emptyCartAPI(tableID);
      if (response.status === 204) {
        setAllCartFoods([]); // Clear frontend cart
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error emptying cart:", error);
    }
  };

  const navigate = useNavigate();
  const handleCheckout = async () => {
    if (!tableID) {
      toast.error("Table number is missing!");
      return;
    }
    try {
      const reqHeader = { "Content-Type": "application/json" };
      const reqBody = {
        table_number: table_number, 
        total_price: totalprice,
        descriptions: descriptions // Add descriptions to request body
      };
      const result = await addCheckoutAPI(reqBody, reqHeader);
      
      if (result.status === 201) {
        sessionStorage.setItem('checkoutData', JSON.stringify(result.data));
        toast.success("Checkout successful");
        setCartCount(0);
        navigate("/payment", {
          state: {
            table_number,
            totalprice,
            checkoutResult: result.data.id,
            descriptions // Pass descriptions to payment page
          }
        });
      }
    } catch (error) {
      console.error("Error during checkout:", error.response?.data || error.message);
      toast.error(`Failed to checkout! ${error.message}`);
    }
  };
  return (
    <div className="container mt-5">
      {allCartFoods.length > 0 ? (
        <div className="row d-flex">
          <div className="col-lg-8 col-md-12">
            <Table className="shadow">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Items</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {allCartFoods.map((cartItem, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="d-flex align-items-center">
                      <img
                        className="img-fluid"
                        width={"80px"}
                        src={`${SERVER_URL + cartItem.image}`}
                        alt="food"
                      />
                      <p className="ms-3 mb-0">{cartItem.food}</p>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button className="quantity-btn me-2" onClick={() => handleIncreQty(cartItem.id, "-")}>
                          -
                        </button>
                        {cartItem.quantity}
                        <button className="quantity-btn ms-2" onClick={() => handleIncreQty(cartItem.id, "+")}>
                          +
                        </button>
                      </div>
                    </td>
                    <td>₹{cartItem.food_price}</td>
                    <td>₹{cartItem.quantity * cartItem.food_price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end mt-4 mb-3">
              <Button onClick={handleEmptyCart} className="empty-cart-Btn me-2">
                Empty Cart
              </Button>
              <Link to={"/home-page"}>
                <Button className="view-more-Btn">View More</Button>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <Card className="shadow" style={{ border: "none" }}>
              <Card.Body>
                <Card.Title className="fw-bold">Price Details</Card.Title>
                <div className="d-flex justify-content-between mb-3">
                  <p>Price ({allCartFoods.length}) items</p>
                  <p>₹{totalprice}</p>
                </div>
                {/* Add textarea here */}
                <div className="mb-3">
                  <Form.Group>
                    <Form.Label>Special Instructions</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Add any special notes for your order..."
                      value={descriptions}
                      onChange={(e) => setDescriptions(e.target.value)}
                      className="mb-3"
                    />
                  </Form.Group>
                </div>  
                <Button onClick={handleCheckout} className="checkout-Btn">Checkout</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      ) : (
        <div className="container-fluid cart-container">
          <div className="text-center">
            <img className="img-fluid" src={EmptyCartImage} alt="Empty Cart" style={{ maxWidth: "100%", height: "250px" }} />
            <h3 className="cart-Heading fw-bold mt-1">Your cart is empty</h3>
            <p className="cart-Paragraph mb-4">You can go to home page to view more menu.</p>
            <Link to={"/home-page"}>
              <Button className="explore-Btn">Explore Dishes</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;