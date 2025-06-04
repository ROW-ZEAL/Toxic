import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const BookingPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const venueName = location.state?.venueName || "Unknown Venue";

  const [venueDetails, setVenueDetails] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/filter/${id}/`);
        if (!response.ok) throw new Error("Failed to fetch venue details");
        const data = await response.json();
        setVenueDetails(data);
      } catch (error) {
        console.error("Error fetching venue details:", error);
      }
    };

    fetchVenueDetails();
  }, [id]);

  const handleSlotSelect = (slot) => {
    if (slot.available) {
      setSelectedSlot(slot);
    }
  };

  const handleBooking = () => {
    if (selectedSlot) {
      alert(
        `Booking confirmed for ${venueName} from ${selectedSlot.start_time} to ${selectedSlot.end_time} on ${selectedSlot.schedule_date}`
      );
      // Here you would typically send a booking request to your backend
    }
  };

  if (!venueDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading venue details...</p>
        </div>
      </div>
    );
  }

  // Get the first item to display general venue info (since all have the same details)
  const firstVenue = venueDetails.Venue[0];
  const facilities = JSON.parse(firstVenue.facilities || "[]");
  const sports = JSON.parse(firstVenue.sport_categories || "[]");

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book {venueName}
          </h1>
          <p className="text-lg text-gray-600">{firstVenue.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Venue Details Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={firstVenue.venue_image}
                alt={venueName}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Venue Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Location
                    </h3>
                    <p className="text-gray-800">{firstVenue.location}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Capacity
                    </h3>
                    <p className="text-gray-800">
                      {firstVenue.capacity} people
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Type</h3>
                    <p className="text-gray-800">{firstVenue.type}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Price</h3>
                    <p className="text-gray-800">
                      ₹{firstVenue.price} per hour
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Facilities
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {facilities.map((facility, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Sports
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {sports.map((sport, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                        >
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Available Time Slots
                </h2>
                <p className="text-gray-600 mt-1">Select a time slot to book</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {venueDetails.Venue.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlotSelect(slot)}
                      className={`p-4 rounded-lg border ${
                        slot.available
                          ? selectedSlot?.start_time === slot.start_time
                            ? "border-blue-500 bg-blue-50"
                            : "border-green-300 hover:border-green-500 bg-green-50 hover:bg-green-100"
                          : "border-gray-200 bg-gray-100 cursor-not-allowed"
                      } transition-colors duration-200`}
                      disabled={!slot.available}
                    >
                      <div className="text-center">
                        <p className="font-medium text-gray-800">
                          {slot.start_time} - {slot.end_time}
                        </p>
                        <p
                          className={`text-sm ${
                            slot.available ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          {slot.available ? "Available" : "Booked"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {slot.schedule_date}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedSlot && (
                <div className="p-6 border-t border-gray-200 bg-blue-50">
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="font-medium text-gray-800">
                        Selected Slot
                      </h3>
                      <p className="text-gray-600">
                        {selectedSlot.start_time} - {selectedSlot.end_time} on{" "}
                        {selectedSlot.schedule_date}
                      </p>
                      <p className="text-gray-800 font-medium mt-1">
                        Total: ₹{firstVenue.price}
                      </p>
                    </div>
                    <button
                      onClick={handleBooking}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
