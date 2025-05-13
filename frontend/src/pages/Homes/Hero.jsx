import React from "react";
import { assets } from "../../assets/assets";
import r1 from "../../assets/r1.png"; // ✅ Correctly importing r1 directly

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-5 md:mx-10">
      {/* --------- Header Left --------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> With Trusted Venue
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img
            className="w-28"
            src={assets.group_profiles}
            alt="Group Profiles"
          />
          <p>
            Simply browse through our extensive list of trusted venue,{" "}
            <br className="hidden sm:block" /> schedule your appointment
            hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book appointment{" "}
          <img className="w-3" src={assets.arrow_icon} alt="Arrow" />
        </a>
      </div>

      {/* --------- Header Right --------- */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={r1} // ✅ Directly using the imported image
          alt="Doctor Appointment"
        />
      </div>
    </div>
  );
};

export default Header;
