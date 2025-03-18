import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCheckoutAPI } from "../Service/AllAPI";
import { toast } from "react-toastify";
import { emptyCartAPI } from "../Service/AllAPI";
const Payment = () => {
  const location = useLocation();
  const { table_number, totalprice } = location.state || { table_number: null, totalprice: 0 };
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleEmptyCart = async () => {
      try {
        const response = await emptyCartAPI(tableID);
        if (response.status === 204) {
        }
      } catch (error) {
        console.error("Error emptying cart:", error);
      }
    };

  const tableID = Number(sessionStorage.getItem("tableId"));

  const getPaymentDetails = async () => {
    try {
      const response = await getCheckoutAPI(tableID);
      console.log("Payment details response:", response);

      if (response.status === 200) {
        setPaymentDetails(response.data);
      } else {
        throw new Error("Failed to fetch payment details");
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
      setError("Error fetching payment details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPaymentDetails();
  }, []);

  console.log("Payment details:", paymentDetails);

  const handlePayment = () => {
    if (!paymentDetails) {
      toast.error("Payment details are missing. Please try again.");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Razorpay SDK is not loaded. Please try again.");
      return;
    }

    const options = {
      key: "rzp_test_v5JbppqXvm3HVl",
      amount: totalprice * 100, // Amount in paise
      currency: "INR",
      name: "E Mart",
      description: "Payment for your order",
      image: "your-logo-url", // Add your logo URL here
      prefill: {
        name: "Customer Name", // Replace dynamically if available
        email: "customer@example.com", // Replace dynamically if available
      },
      theme: { color: "#4badeb" },
      handler: function (response) {
        console.log("Payment successful", response);
        toast.success("Payment successful!");
        handleEmptyCart();
      },
      modal: {  
        ondismiss: function () {
          console.log("Payment dismissed");
          toast.error("Payment was cancelled.");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="container" style={{ textAlign: "center", marginTop: "30vh" }}>
        <img 
            src="https://media.tenor.com/0AVbKGY_MxMAAAAM/check-mark-verified.gif" 
            alt="Success Tick"
            style={{ width: "100px", height: "100px", marginBottom: "20px" }}
        />
      <h1>Order Successful</h1>
      {loading ? (
        <p>Loading payment details...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <button className="btn btn-success mt-2" onClick={handlePayment}>
          Proceed to Payment
        </button>
      )}
    </div>
  );
};

export default Payment; 