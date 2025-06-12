import React from "react";
import { useNavigate } from "react-router-dom";
import r2 from "../../assets/r2.png";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../features/userSlice";

const Banner = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);

  return (
    <div className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
      {/* ------- Left Side ------- */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 text-white">
        {userInfo && userInfo.name && (
          <div className="mb-4">
            <p className="text-xl font-semibold">Welcome, {userInfo.name}</p>
            <p>{userInfo.email}</p>
          </div>
        )}
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold">
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Venues</p>
        </div>
        {(!userInfo || !userInfo.name) && (
          <button
            onClick={() => {
              navigate("/login");
              scrollTo(0, 0);
            }}
            className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
          >
            Create account
          </button>
        )}
      </div>

      {/* ------- Right Side ------- */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={r2}
          alt="Banner"
        />
      </div>
    </div>
  );
};

export default Banner;
