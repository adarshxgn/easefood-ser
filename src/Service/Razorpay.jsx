import React, { useState, useEffect } from "react";
import { getCheckoutAPI } from "../Service/AllAPI";
import { toast } from "react-toastify";

const RazorpayPayment = ({ tableID }) => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const handlePayment = () => {
    if (!paymentDetails) {
      toast.error("Payment details are missing. Please try again.");
      return;
    }

    const options = {
      key: "rzp_test_v5JbppqXvm3HVl",
      amount: paymentDetails.total_price * 100, // Amount in paise
      currency: "INR",
      order_id: paymentDetails.table_number, // Replace with the actual order ID
      name: "E Mart",
      description: "Your description",
      image: "", // Add your logo URL here
      prefill: {
        name: "abc", // Replace dynamically if available
        email: "abc@gmail.com", // Replace dynamically if available
      },
      theme: { color: "#4badeb" },
      handler: function (response) {
        console.log("Payment successful", response);
        toast.success("Payment successful!");
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
    <div>
      {loading ? (
        <p>Loading payment details...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <button onClick={handlePayment}>Proceed to Payment</button>
      )}
    </div>
  );
};

export default RazorpayPayment;