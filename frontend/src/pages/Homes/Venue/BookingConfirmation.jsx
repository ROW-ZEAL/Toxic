// BookingConfirmation.js
import React from "react";
import { useLocation, Link } from "react-router-dom";

const BookingConfirmation = () => {
  const location = useLocation();
  const bookingDetails = location.state;

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            No booking details found
          </h1>
          <p className="text-gray-700 mt-2">Please make a booking first.</p>
          <Link
            to="/"
            className="mt-4 inline-block text-blue-500 underline hover:text-blue-700"
          >
            Go back to Home
          </Link>
        </div>
      </div>
    );
  }

  const {
    venueImage = "https://via.placeholder.com/300x200",
    venueName = "Unknown Venue",
    location: venueLocation = "Unknown Location",
    date = "Not Specified",
    time = "Not Specified",
    price = "N/A",
  } = bookingDetails;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Your booking details are below
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={venueImage}
                  alt={venueName}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {venueName}
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Location
                    </h3>
                    <p className="text-gray-800">{venueLocation}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Date</h3>
                    <p className="text-gray-800">{date}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Time Slot
                    </h3>
                    <p className="text-gray-800">{time}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Amount to Pay
                    </h3>
                    <p className="text-gray-800 font-bold">₹{price}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Choose your payment method
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/online-payment"
                  state={{ bookingDetails }}
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm text-center transition duration-200"
                >
                  Pay Online
                </Link>
                <Link
                  to="/offline-payment"
                  state={{ bookingDetails }}
                  className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg shadow-sm text-center transition duration-200"
                >
                  Pay at Venue
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Note: Your booking will be finalized after payment is received.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
