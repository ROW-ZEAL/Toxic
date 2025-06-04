// OfflinePayment.js
import { useLocation } from "react-router-dom";

const OfflinePayment = () => {
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails;

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            No booking details found
          </h1>
          <p className="text-gray-600 mt-2">Please make a booking first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-600 mb-2">
            Pay at Venue
          </h1>
          <p className="text-lg text-gray-600">
            Complete your payment when you arrive
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {bookingDetails.venueName}
            </h2>
            <p className="text-gray-600">
              Amount to Pay: ₹{bookingDetails.price}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Payment Instructions:
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>
                  Please arrive at least 15 minutes before your booking time
                </li>
                <li>Bring this confirmation with you</li>
                <li>Payment accepted in cash or card at the venue</li>
                <li>Your booking will be confirmed upon payment</li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Venue Address:
              </h3>
              <p className="text-gray-600">{bookingDetails.location}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Contact Information:
              </h3>
              <p className="text-gray-600">
                Phone: +91 9876543210
                <br />
                Email: info@venue.com
              </p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
          >
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfflinePayment;
