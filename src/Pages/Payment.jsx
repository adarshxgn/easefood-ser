import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Add useNavigate
import { getCheckoutAPI, getPaymentDetailsAPI, verifyPaymentAPI } from "../Service/AllAPI";
import { toast } from "react-toastify";
import { emptyCartAPI } from "../Service/AllAPI";
const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Add this line
  const { table_number, totalprice, checkoutResult } = location.state || {};
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const tableID = Number(sessionStorage.getItem("tableId"));
console.log("checkoutResult",checkoutResult);

  const handleEmptyCart = async () => {
      try {
        const response = await emptyCartAPI(tableID);
        if (response.status === 204) {
        }
      } catch (error) {
        console.error("Error emptying cart:", error);
      }
    };

  const getPaymentDetails = async () => {
    try {
      const response = await getCheckoutAPI(checkoutResult);
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

  const verifyPayment = async (paymentResponse) => {
    try {
      const reqBody = {
        checkout_id: checkoutResult, // Send the whole checkout result
        order_id: paymentResponse.razorpay_order_id,
        payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature
      };

      console.log("Verify payment request body:", reqBody); // Debug log
      console.log(paymentResponse);
      
      
      const response = await verifyPaymentAPI(reqBody, { 
        "Content-Type": "application/json" 
      });
      
      if (response.status === 200) {
        console.log("Payment verification successful:", response.data);
        toast.success(response.data.message || "Payment successful, order placed!");
        await handleEmptyCart();
        // Add redirect after successful payment
        setTimeout(() => {
          navigate('/history');
        }, 2000); // Wait for 2 seconds to show success message
      } else {
        throw new Error(response.data.error || "Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error:", {
        error: error.response?.data,
        status: error.response?.status,
        message: error.message
      });
      toast.error(error.response?.data?.error || "Payment verification failed");
    }
  };

  const getorderdetails = async () => {
    try {
      const reqBody = {     
        checkout_id: checkoutResult // Send the whole checkout result
      };
      
      console.log("Checkout data being used:", checkoutResult); // Debug log
      console.log("Sending order creation request:", reqBody);
      
      const response = await getPaymentDetailsAPI(reqBody);
      console.log("Order creation response:", response.data);

      if (response.status === 200) {
        const options = {
          key: "rzp_test_v5JbppqXvm3HVl",
          amount: response.data.amount,
          currency: response.data.currency,
          order_id: response.data.order_id,
          name: "E Mart",
          description: "Payment for your order",
          handler: function (paymentResponse) {
            console.log("Payment response from Razorpay:", paymentResponse); // Debug log
            verifyPayment(paymentResponse);
          },
          // ...rest of your options
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        throw new Error(response.data.error || "Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", {
        message: error.message,
        response: error.response?.data
      });
      toast.error(error.message || "Failed to initialize payment!");
    }
  };

  useEffect(() => {
    getPaymentDetails();
  }, []);

  console.log("Payment details:", paymentDetails);

  const handlePayment = () => {
    if (!checkoutResult) {
      toast.error("Checkout details are missing!");
      return;
    }
    
    try {
      getorderdetails();
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast.error("Failed to initialize payment");
    }
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