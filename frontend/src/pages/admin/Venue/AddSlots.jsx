import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { addDays, isAfter, startOfDay } from "date-fns";

const AddSlots = () => {
  const adminInfo = useSelector((state) => state.admin.adminInfo);
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchVenues = async () => {
      if (!adminInfo || !adminInfo.name) return;

      const encodedName = encodeURIComponent(adminInfo.name);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/owner/${encodedName}/`
        );
        setVenues(response.data.Venue);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
      }
    };

    fetchVenues();
  }, [adminInfo]);

  const handleVenueSelect = (venue) => {
    setSelectedVenue(venue);
    setSaved(false); // Reset saved status on venue change

    const format12Hour = (hour) => {
      const period = hour >= 12 ? "PM" : "AM";
      const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${adjustedHour}:00 ${period}`;
    };

    const slots = [];
    for (let hour = 6; hour < 22; hour++) {
      const start = format12Hour(hour);
      const end = format12Hour(hour + 1);
      slots.push({ start, end, available: false });
    }

    setTimeSlots(slots);
  };

  const selectSlot = (index) => {
    setTimeSlots((prevSlots) =>
      prevSlots.map((slot, i) =>
        i === index ? { ...slot, available: !slot.available } : slot
      )
    );
  };

  const isDateSelectable = (date) => {
    const today = startOfDay(new Date());
    return isAfter(date, today) || date.getTime() === today.getTime();
  };

  const handleSaveSlots = () => {
    if (!selectedVenue) {
      console.warn("No venue selected.");
      return;
    }

    let photos = [];
    try {
      photos = JSON.parse(selectedVenue.photos);
    } catch (e) {
      console.warn("Invalid photo JSON for venue", selectedVenue.id);
    }

    const venueImage = photos.length
      ? `http://127.0.0.1:8000/media/${photos[0]}`
      : "https://via.placeholder.com/150";

    const dataToSave = {
      venueName: selectedVenue.name,
      venueImage,
      selectedDate: selectedDate.toDateString(),
      slots: timeSlots.map((slot) => ({
        start: slot.start,
        end: slot.end,
        available: slot.available,
        color: slot.available ? "green" : "gray",
      })),
    };

    console.log("📝 Data to Save:", dataToSave);

    setSaved(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Slots</h2>

      {/* Date picker and title aligned */}
      {selectedVenue && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Slots for {selectedVenue.name} on {selectedDate.toDateString()}
          </h3>
          <div>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              maxDate={addDays(new Date(), 7)}
              filterDate={isDateSelectable}
              dateFormat="MMMM d, yyyy"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Venue title */}
      <h4 className="text-lg font-semibold mb-3 text-gray-600">Select Venue</h4>

      {/* Venues grid */}
      <div className="flex flex-wrap gap-6 mb-10">
        {venues.map((venue) => {
          let photos = [];
          try {
            photos = JSON.parse(venue.photos);
          } catch (e) {
            console.warn("Invalid photo JSON for venue", venue.id);
          }

          const imageUrl = photos.length
            ? `http://127.0.0.1:8000/media/${photos[0]}`
            : "https://via.placeholder.com/150";

          return (
            <div
              key={venue.id}
              onClick={() => handleVenueSelect(venue)}
              className={`cursor-pointer rounded-lg p-3 border ${
                selectedVenue?.id === venue.id
                  ? "border-green-600 shadow-lg"
                  : "border-gray-300 hover:shadow-md"
              } transition-shadow duration-300 max-w-[200px]`}
            >
              <img
                src={imageUrl}
                alt={venue.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h5 className="font-semibold text-gray-800">{venue.name}</h5>
              <p className="text-gray-500 text-sm">{venue.location}</p>
            </div>
          );
        })}
      </div>

      {/* Time slots grid */}
      {selectedVenue && (
        <div>
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            }}
          >
            {timeSlots.map((slot, index) => {
              const bgColor = slot.available
                ? "bg-green-600"
                : saved
                ? "bg-red-600"
                : "bg-gray-400";

              const boxShadow = slot.available ? "shadow-lg" : "shadow-none";

              const title = slot.available
                ? "Selected (click to deselect)"
                : "Click to select slot";

              return (
                <div
                  key={index}
                  onClick={() => selectSlot(index)}
                  title={title}
                  className={`cursor-pointer rounded-lg p-3 text-white font-semibold text-center select-none transition-all duration-300 ${bgColor} ${boxShadow}`}
                >
                  {slot.start} - {slot.end}
                </div>
              );
            })}
          </div>

          {/* Save button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleSaveSlots}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Save Slots
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSlots;
