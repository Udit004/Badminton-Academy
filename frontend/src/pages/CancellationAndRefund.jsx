import React from "react";

const CancellationAndRefund = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Cancellation and Refund Policy</h1>
      <ul className="list-disc list-inside space-y-2">
        <li>Membership fees are non-refundable once paid.</li>
        <li>If a session is cancelled by us, a credit will be given for future use.</li>
        <li>Users may request rescheduling 24 hours in advance, subject to availability.</li>
        <li>No refunds for missed classes or sessions by the user.</li>
        <li>Refunds, if approved, will be processed to the original payment method within 7-10 business days.</li>
      </ul>
      <p className="mt-4">For any issues, contact us at <a href="rajankumart266@gmail.com" className="text-blue-600 underline">rajankumart266@gmail.com</a>.</p>
    </div>
  );
};

export default CancellationAndRefund;
