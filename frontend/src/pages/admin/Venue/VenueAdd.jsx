import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const MultiSelectDropdown = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block mb-1 font-semibold text-gray-700">{label}</label>
      <div
        className="border border-gray-300 rounded-md p-2 cursor-pointer bg-white flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1">
          {selectedOptions.length === 0 ? (
            <span className="text-gray-400">Select {label.toLowerCase()}</span>
          ) : (
            selectedOptions.map((option) => (
              <span
                key={option}
                className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-sm"
              >
                {option}
              </span>
            ))
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full max-h-48 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-3 py-2 cursor-pointer hover:bg-blue-100"
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => toggleOption(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const AddVenue = () => {
  const adminInfo = useSelector((state) => state.admin.adminInfo);
  const initialVenueState = {
    name: "",
    location: "",
    capacity: "",
    type: "Indoor",
    status: "active",
    price: "",
    description: "",
    facilities: [],
    sportCategories: [],
    photos: [],
  };
  const [venue, setVenue] = useState(initialVenueState);

  const facilitiesOptions = [
    "Changing Rooms",
    "Parking",
    "Equipment Rental",
    "Showers",
    "Lockers",
    "Water Fountains",
    "Floodlights",
    "Spectator Seating",
    "Cafe",
    "First Aid",
  ];

  const sportCategoriesOptions = [
    "Tennis",
    "Basketball",
    "Futsal",
    "Badminton",
    "Volleyball",
    "Cricket",
    "Table Tennis",
  ];

  const handleChange = (e) => {
    setVenue({ ...venue, [e.target.name]: e.target.value });
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files);
    setVenue((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newFiles],
    }));
  };

  const removePhoto = (index) => {
    setVenue((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", venue.name);
    formData.append("location", venue.location);
    formData.append("capacity", venue.capacity);
    formData.append("type", venue.type);
    formData.append("status", venue.status);
    formData.append("price", venue.price);
    formData.append("description", venue.description);
    formData.append("ownerName", adminInfo.name);
    formData.append("ownerEmail", adminInfo.email);

    venue.facilities.forEach((facility, index) =>
      formData.append(`facilities[${index}]`, facility)
    );
    venue.sportCategories.forEach((category, index) =>
      formData.append(`sportCategories[${index}]`, category)
    );
    venue.photos.forEach((photo, index) => formData.append(`photos`, photo));

    try {
      const response = await fetch("http://127.0.0.1:8000/api/venues/", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Server response:", result);
      alert("Venue submitted!");
      setVenue(initialVenueState);
    } catch (error) {
      console.error("Error submitting venue:", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <h2 className="md:col-span-2 text-2xl font-bold text-center mb-4">
        Add New Venue
      </h2>

      {adminInfo && (
        <>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              value={adminInfo.name}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Owner Email
            </label>
            <input
              type="email"
              name="ownerEmail"
              value={adminInfo.email}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>
        </>
      )}

      <div className="md:col-span-2">
        <label className="block mb-1 font-semibold text-gray-700">
          Venue Photos
        </label>
        <div className="flex flex-col space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
            <svg
              className="w-12 h-12 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-gray-600 text-sm text-center">
              Drag and drop photos here or click to select
            </p>
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
              id="photoInput"
            />
            <label htmlFor="photoInput" className="cursor-pointer mt-2">
              <span className="text-blue-600">Click to select photos</span>
            </label>
          </div>

          {venue.photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {venue.photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Venue"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Venue Name
        </label>
        <input
          type="text"
          name="name"
          value={venue.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={venue.location}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Capacity
        </label>
        <input
          type="number"
          name="capacity"
          value={venue.capacity}
          onChange={handleChange}
          required
          min={0}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">Type</label>
        <select
          name="type"
          value={venue.type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="Indoor">Indoor</option>
          <option value="Outdoor">Outdoor</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">Status</label>
        <select
          name="status"
          value={venue.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">Price</label>
        <input
          type="text"
          name="price"
          value={venue.price}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Rs / hour"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block mb-1 font-semibold text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={venue.description}
          onChange={handleChange}
          rows="3"
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <MultiSelectDropdown
        label="Facilities"
        options={facilitiesOptions}
        selectedOptions={venue.facilities}
        setSelectedOptions={(selected) =>
          setVenue({ ...venue, facilities: selected })
        }
      />

      <MultiSelectDropdown
        label="Sport Categories"
        options={sportCategoriesOptions}
        selectedOptions={venue.sportCategories}
        setSelectedOptions={(selected) =>
          setVenue({ ...venue, sportCategories: selected })
        }
      />

      {/* <div className="md:col-span-2">
        <label className="block mb-1 font-semibold text-gray-700">
          Upload Photos
        </label>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("photoUploadInput").click()}
          className="border-2 border-dashed border-gray-400 rounded-md p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <p className="text-gray-600">
            Drag & drop photos here, or click to select files
          </p>
          <input
            id="photoUploadInput"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
        {venue.photos.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {venue.photos.map((photo, index) => {
              const url = URL.createObjectURL(photo);
              return (
                <div
                  key={index}
                  className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-300"
                >
                  <img
                    src={url}
                    alt={`Upload Preview ${index + 1}`}
                    className="object-cover w-full h-full"
                    onLoad={() => URL.revokeObjectURL(url)}
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div> */}

      <button
        type="submit"
        className="md:col-span-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Venue
      </button>
    </form>
  );
};

export default AddVenue;
