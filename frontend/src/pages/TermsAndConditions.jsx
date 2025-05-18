import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-4">
        Welcome to our Badminton Academy website. By accessing this site and using our services, you agree to the following terms:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Memberships and court bookings are subject to availability.</li>
        <li>Payments are non-transferable unless approved by management.</li>
        <li>Misuse of our facilities may result in cancellation of services without refund.</li>
        <li>Users are responsible for providing accurate personal and contact details.</li>
        <li>We reserve the right to update our terms at any time.</li>
      </ul>
      <p className="mt-4">If you disagree with any of our terms, please do not use our services.</p>
    </div>
  );
};

export default TermsAndConditions;
