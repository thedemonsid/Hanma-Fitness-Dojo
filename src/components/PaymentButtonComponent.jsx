"use client";
import React, { useEffect } from "react";

function PaymentButtonComponent() {
  useEffect(() => {
    const rzpPaymentForm = document.getElementById("rzp_payment_form");

    if (!rzpPaymentForm.hasChildNodes()) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.async = true;
      script.dataset.payment_button_id = "pl_OVJJrALbPSJesz";
      rzpPaymentForm.appendChild(script);
    }
  });
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <form id="rzp_payment_form"></form>
      <h2>This line comes below the payment button</h2>
    </div>
  );
}

export default PaymentButtonComponent;
