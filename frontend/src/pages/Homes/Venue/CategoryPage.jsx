import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/${decodedCategory}/`
        );
        const data = await response.json();
        setVenues(data.Venue || []);
      } catch (error) {
        console.error("Failed to load venue details:", error);
        setError("Failed to fetch venues.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenueDetails();
  }, [decodedCategory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg text-gray-600">Loading venues...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  if (venues.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg text-gray-600">
          No venues found for this category.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Venues for "{decodedCategory}"
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {venues.map((venue) => {
          const facilities = JSON.parse(venue.facilities || "[]");
          const categories = JSON.parse(venue.sport_categories || "[]");
          const photo = venue.photos ? JSON.parse(venue.photos)[0] : null;

          return (
            <div
              key={venue.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105"
            >
              {photo && (
                <img
                  src={`http://127.0.0.1:8000/media/${photo}`}
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold text-blue-700">
                  {venue.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {venue.description}
                </p>

                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <strong>📍 Location:</strong> {venue.location}
                  </p>
                  <p>
                    <strong>👥 Capacity:</strong> {venue.capacity} players
                  </p>
                  <p>
                    <strong>🏷 Type:</strong> {venue.type}
                  </p>
                  <p>
                    <strong>💰 Price:</strong> NPR {venue.price}
                  </p>
                  <p>
                    <strong>⚙️ Status:</strong>
                    <span
                      className={`ml-2 px-2 py-0.5 text-xs rounded-full text-white ${
                        venue.status === "active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {venue.status.toUpperCase()}
                    </span>
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-sm mb-1">🛠 Facilities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {facilities.map((f, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-200 px-2 py-0.5 rounded-full text-gray-800"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-2">
                  <h4 className="font-semibold text-sm mb-1">🏅 Categories:</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition duration-300"
                  onClick={() =>
                    navigate(`/book/${venue.id}`, {
                      state: { venueName: venue.name },
                    })
                  }
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;
