import React from 'react';

const RazorpayButton = () => {
  const loadRazorpay = () => {
    const options = {
      key: "rzp_test_BfjUjYWFzQaMNf", // Replace with your Razorpay Test Key
      amount: 50000, // Amount in paise = ₹500.00
      currency: "INR",
      name: "Badminton Academy",
      description: "Membership or Play Session",
      image: "https://yourdomain.com/logo.png", // Optional
      handler: function (response) {
        alert("Payment successful!");
        console.log(response);
        // Save response to backend or Firestore if needed
      },
      prefill: {
        name: "Udit Kumar",
        email: "udit@example.com",
        contact: "9999999999"
      },
      notes: {
        address: "Badminton Court - Delhi"
      },
      theme: {
        color: "#38BDF8"
      }
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="flex justify-center my-6">
      <button
        onClick={loadRazorpay}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Pay ₹500
      </button>
    </div>
  );
};

export default RazorpayButton;
