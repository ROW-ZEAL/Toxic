import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

const ManageVenues = () => {
  const navigate = useNavigate();

  const adminInfo = useSelector((state) => state.admin.adminInfo);
  // Select user data from Redux store (adjust path according to your state)
  const user = useSelector((state) => state.auth.user);

  const venues = [
    {
      id: 1,
      name: "Futsal Arena",
      location: "Kuantan",
      capacity: 50,
      type: "Indoor",
    },
    {
      id: 2,
      name: "Sports Complex",
      location: "Pahang",
      capacity: 100,
      type: "Outdoor",
    },
  ];

  const handleEdit = (id) => {
    console.log("Edit venue with id:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete venue with id:", id);
  };

  return (
    <div className="p-6">
      {/* Admin Info and Page Title */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Venues</h1>
          {adminInfo && (
            <div className="mb-4">
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

      {/* Venues Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left uppercase tracking-wider font-semibold">
                Name
              </th>
              <th className="py-3 px-6 text-left uppercase tracking-wider font-semibold">
                Location
              </th>
              <th className="py-3 px-6 text-left uppercase tracking-wider font-semibold">
                Capacity
              </th>
              <th className="py-3 px-6 text-left uppercase tracking-wider font-semibold">
                Type
              </th>
              <th className="py-3 px-6 text-left uppercase tracking-wider font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {venues.map((venue, idx) => (
              <tr
                key={venue.id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-green-50 transition-colors duration-300`}
              >
                <td className="py-4 px-6 border-t border-gray-200 font-medium text-gray-700">
                  {venue.name}
                </td>
                <td className="py-4 px-6 border-t border-gray-200 text-gray-600">
                  {venue.location}
                </td>
                <td className="py-4 px-6 border-t border-gray-200 text-gray-600">
                  {venue.capacity}
                </td>
                <td className="py-4 px-6 border-t border-gray-200 text-gray-600">
                  {venue.type}
                </td>
                <td className="py-4 px-6 border-t border-gray-200 flex gap-5 text-lg">
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
                </td>
              </tr>
            ))}
            {venues.length === 0 && (
              <tr>
                <td
                  colSpan="5"
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
