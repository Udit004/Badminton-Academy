import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        We value your privacy. This policy explains how we collect, use, and protect your personal information:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>We collect personal info (name, email, phone) to register users and communicate updates.</li>
        <li>All payment processing is done securely through Razorpay; we do not store your card or UPI details.</li>
        <li>We never sell or share your data with third parties unless required by law.</li>
        <li>Cookies may be used to improve site experience.</li>
      </ul>
      <p className="mt-4">
        If you have any privacy concerns, contact us at <a href="rajankumart266@gmail.com" className="text-blue-600 underline">rajankumart266@gmail.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
