import React from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Header from "../components/Sections/Header";
import Services from "../components/Sections/Services";
import Footer from "../components/Sections/Footer"
import "../landing.css"
import Cover from "../assets/landing.png"

export default function LandingPage() {
  return (
    <>

      <TopNavbar />
        <img src={Cover} className="cover-image brightness-50 w-screen h-auto z-50"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-[100px] font-bold text-white">Medical<span className="text-sky-400">Assistance</span></h1>
          <h6 className="text-[20px] font-bold text-white">Get your Health Checkup done!!</h6>
        </div>
      <Header />
      <Services />
      <Footer />
    </>
  );
}


