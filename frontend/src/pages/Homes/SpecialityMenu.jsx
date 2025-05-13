import React from "react";
import { specialityData } from "../../assets/assets"; // Keeping the original import
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
    >
      <h1 className="text-3xl font-medium">Find by Sport</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of sports venues, book your
        space and enjoy your game.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => (
          <Link
            to={`/venues/${item.speciality}`} // Assuming the path for each venue will be based on the speciality
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img
              className="w-16 sm:w-24 mb-2"
              src={item.image}
              alt={item.speciality}
            />
            <p>{item.speciality}</p>{" "}
            {/* Here we display the sport/venue name */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
