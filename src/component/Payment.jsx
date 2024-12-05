import React from "react";
import { db } from "../firebaseConfig"; // Firestore instance
import Renewal from './Renewal';

const Payment = () => {
  const handlePayment = async () => {
    try {
      // Create order in Firestore
      const orderResponse = await createOrderInFirestore(1000); // ₹10 in paise

      // Razorpay options
      const options = {
        key: "your_razorpay_key_id", // Replace with your Razorpay Key ID
        amount: orderResponse.amount,
        currency: "INR",
        order_id: orderResponse.id, // Firestore document ID
        name: "Your App Name",
        description: "Test Transaction",
        handler: async (response) => {
          console.log("Payment successful:", response);
          await updatePaymentStatus(response, "successful");
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error in payment process:", error);
    }
  };

  const createOrderInFirestore = async (amount) => {
    try {
      const orderRef = db.collection("orders").doc();
      const orderData = { amount, currency: "INR", status: "created", timestamp: new Date() };
      await orderRef.set(orderData);
      return { id: orderRef.id, amount };
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  const updatePaymentStatus = async (paymentResponse, status) => {
    try {
      const paymentData = {
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        status,
        timestamp: new Date(),
      };

      await db.collection("orders").doc(paymentResponse.razorpay_order_id).update(paymentData);
      console.log("Payment status updated successfully");
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return <button onClick={handlePayment}>
    <Renewal />
  </button>;
};

export default Payment;