import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaCreditCard, FaQrcode } from "react-icons/fa";

const OnlinePayment = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ added navigate
  const bookingDetails = location.state?.bookingDetails;
  const [paymentMethod, setPaymentMethod] = useState("card");

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            No booking details found
          </h1>
          <p className="text-gray-600 mt-2">Please make a booking first</p>
        </div>
      </div>
    );
  }

  let startTime = "Not Provided";
  let endTime = "Not Provided";

  if (bookingDetails.startTime && bookingDetails.endTime) {
    startTime = bookingDetails.startTime;
    endTime = bookingDetails.endTime;
  } else if (bookingDetails.time) {
    const times = bookingDetails.time.split(" - ");
    if (times.length === 2) {
      startTime = times[0];
      endTime = times[1];
    }
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert(
      `Payment processed successfully via ${
        paymentMethod === "card" ? "Card" : "UPI/QR"
      }`
    );
    navigate("/offline-payment", { state: { bookingDetails } });
  };

  const handleIHavePaidClick = async () => {
    if (!bookingDetails.venueName || !startTime || !endTime) {
      alert("Invalid booking details for API call.");
      return;
    }

    const encodedStartTime = encodeURIComponent(startTime);
    const encodedEndTime = encodeURIComponent(endTime);

    const url = `http://127.0.0.1:8000/api/checkslots/${encodeURIComponent(
      bookingDetails.venueName
    )}/${encodedStartTime}/${encodedEndTime}/`;

    try {
      const response = await fetch(url);
      const text = await response.text();

      try {
        const data = JSON.parse(text);
        if (response.ok && data.status === "success") {
          alert(
            `Booking confirmed! Venue: ${data.venue}, Time: ${data.startTime} - ${data.endTime}`
          );
          navigate("/offline-payment", { state: { bookingDetails } });
        } else {
          alert(`API error: ${data.message || "Unknown error"}`);
        }
      } catch (jsonErr) {
        console.error("JSON parse error:", jsonErr, "Response text:", text);
        alert("Invalid response format from server.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to check booking slots. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 -mt-16">
      <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Booking Summary */}
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Booking Summary
          </h2>
          <p className="mb-3">
            <span className="font-semibold">Venue:</span>{" "}
            {bookingDetails.venueName}
          </p>
          <p className="mb-3">
            <span className="font-semibold">Date:</span>{" "}
            {bookingDetails.date || "N/A"}
          </p>
          <p className="mb-3">
            <span className="font-semibold">Time:</span>{" "}
            {bookingDetails.time || "N/A"}
          </p>
          <p className="mb-3">
            <span className="font-semibold">Price:</span> ₹
            {bookingDetails.price}
          </p>
          <p className="mt-6 text-sm text-gray-600">
            You will receive a confirmation once payment is successful.
          </p>
        </div>

        {/* Payment Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Choose Payment Method</h2>

          <div className="flex space-x-6 mb-6">
            <label
              className={`flex items-center cursor-pointer px-4 py-2 rounded-md border ${
                paymentMethod === "card"
                  ? "bg-green-600 text-white border-green-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                className="hidden"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <FaCreditCard className="mr-2" /> Card Payment
            </label>

            <label
              className={`flex items-center cursor-pointer px-4 py-2 rounded-md border ${
                paymentMethod === "qr"
                  ? "bg-green-600 text-white border-green-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="qr"
                className="hidden"
                checked={paymentMethod === "qr"}
                onChange={() => setPaymentMethod("qr")}
              />
              <FaQrcode className="mr-2" /> UPI / QR Code
            </label>
          </div>

          {paymentMethod === "card" && (
            <form onSubmit={handlePaymentSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 font-medium">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">CVV</label>
                  <input
                    type="password"
                    placeholder="123"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
              >
                Pay ₹{bookingDetails.price}
              </button>
            </form>
          )}

          {paymentMethod === "qr" && (
            <div className="text-center">
              <p className="mb-4 text-gray-700">
                Scan this QR code with your UPI app to pay ₹
                {bookingDetails.price}
              </p>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=dummy@upi&pn=MatchMate&am=${bookingDetails.price}`}
                alt="QR Code"
                className="mx-auto mb-6 border rounded-md"
              />
              <p className="text-sm text-gray-600 mb-4">
                UPI ID: <span className="font-mono">dummy@upi</span>
              </p>
              <button
                onClick={handleIHavePaidClick}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
              >
                I Have Paid
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnlinePayment;
