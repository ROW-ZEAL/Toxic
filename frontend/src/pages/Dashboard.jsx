import React from "react";
import Hero from "./Homes/Hero";
import Banner from "./Homes/Banner";
import SpecialityMenu from "./Homes/SpecialityMenu";
import RelatedDoctors from "./Homes/RelatedDoctors";

const Dashboard = () => {
  return (
    <div>
      <Hero />
      <SpecialityMenu />
      <RelatedDoctors />
      <Banner />
    </div>
  );
};

export default Dashboard;
