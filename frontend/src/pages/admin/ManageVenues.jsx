import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

const ManageVenues = () => {
  const navigate = useNavigate();
  const adminInfo = useSelector((state) => state.admin.adminInfo);
  const [venues, setVenues] = useState([]);
  useEffect(() => {
    const fetchVenues = async () => {
      if (!adminInfo || !adminInfo.name) return;

      const encodedName = encodeURIComponent(adminInfo.name); // important for names with spaces
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

  const handleEdit = (id) => {
    console.log("Edit venue with id:", id);
    // navigate(`/admin/venues/edit/${id}`); // enable if route exists
  };

  const handleDelete = (id) => {
    console.log("Delete venue with id:", id);
    // Add your delete logic here
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Venues</h1>
          {adminInfo && (
            <div className="mt-2">
              <p>
                <strong>Admin:</strong> {adminInfo.name}
              </p>
              <p>
                <strong>Email:</strong> {adminInfo.email}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/admin/venues/add")}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <FaPlus /> Add Venue
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 w-28">Image</th>
              <th className="py-3 px-4 w-48 text-left">Name</th>
              <th className="py-3 px-4 w-40 text-left">Location</th>
              <th className="py-3 px-4 w-32 text-left">Capacity</th>
              <th className="py-3 px-4 w-32 text-left">Type</th>
              <th className="py-3 px-4 w-32 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {venues.length > 0 ? (
              venues.map((venue, idx) => (
                <tr
                  key={venue.id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-green-50 transition-colors duration-300`}
                >
                  <td className="py-3 px-4 border-t border-gray-200">
                    {JSON.parse(venue.photos).length > 0 ? (
                      <img
                        src={`http://127.0.0.1:8000/media/${
                          JSON.parse(venue.photos)[0]
                        }`}
                        alt={venue.name}
                        className="h-16 w-20 object-cover rounded"
                      />
                    ) : (
                      <div className="text-gray-400 italic text-sm">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200 font-medium text-gray-700 truncate">
                    {venue.name}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200 text-gray-600 truncate">
                    {venue.location}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200 text-gray-600">
                    {venue.capacity}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200 text-gray-600">
                    {venue.type}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200">
                    <div className="flex gap-4 text-lg">
                      <button
                        onClick={() => handleEdit(venue.id)}
                        className="text-green-600 hover:text-green-800"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(venue.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No venues found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageVenues;
