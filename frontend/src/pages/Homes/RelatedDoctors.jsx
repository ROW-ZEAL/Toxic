import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/catrogry");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVenues(data.Category || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading venues...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 px-4">
      <h1 className="text-3xl font-medium">Sports Venues</h1>
      <p className="w-full md:w-2/3 text-center text-sm">
        Browse through our available sports venues.
      </p>

      {/* 3-column, 2-row grid container */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {venues.slice(0, 6).map(
          (
            venue // Show only first 6 venues
          ) => (
            <div
              key={venue.id}
              onClick={() => {
                navigate(`/appointment/${venue.id}`);
                window.scrollTo(0, 0);
              }}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-5px] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div className="relative h-48 bg-blue-50">
                <img
                  className="w-full h-full object-cover"
                  src={venue.icon}
                  alt={venue.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Sports+Venue";
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Available</span>
                </div>
                <p className="text-gray-900 text-lg font-medium mt-1">
                  {venue.name}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RelatedDoctors;
