import React from 'react';
import aboutimg from '../assets/ab2.jpeg';
import aboutImg1 from '../assets/ab11.jpeg';
import { IoFastFood } from "react-icons/io5";
import { MdFastfood, MdEmojiFoodBeverage } from "react-icons/md";
import { PiBowlFoodFill } from "react-icons/pi";
import { BiSolidDrink } from "react-icons/bi";

function AboutPage() {
  return (
    <div className="container mt-5">
      {/* About Us Section */}
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <h2 className="fw-bold Logo text-center text-md-start">About Us</h2>
          <p className="about text-center text-md-start">
            Lorem ipsum dolor sit amet consectetur elit adipisicing elit. Cupiditate exercitationem veritatis ipsum nihil, eaque quisquam
            maxime rem delectus velit fugiat corporis obcaecati maiores blanditiis nostrum suscipit qui accusantium ea harum!       
            Lorem ipsum dolor sit amet consectetur elit adipisicing elit. Cupiditate exercitationem veritatis ipsum nihil, eaque quisquam 
            maxime rem delectus velit fugiat corporis obcaecati maiores blanditiis nostrum suscipit qui accusantium ea harum!
          </p>
        </div>
        <div className="col-12 col-md-6 text-center">
          <img className="img-fluid about-img" width={500} src={aboutimg} alt="About Us" />
        </div>
      </div>

      {/* Why Us Section */}
      <div className="row d-flex justify-content-center align-items-center mt-5">
        <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
          <img className="img-fluid about-img" width={500}  src={aboutImg1} alt="Why Us" />
        </div>
        <div className="col-12 col-md-6">
          <h2 className="fw-bold Logo text-center text-md-start">Why Us</h2>
          <p className="about text-center text-md-start">
          Lorem ipsum dolor sit amet consectetur elit adipisicing elit. Cupiditate exercitationem veritatis ipsum nihil, eaque quisquam
            maxime rem delectus velit fugiat corporis obcaecati maiores blanditiis nostrum suscipit qui accusantium ea harum!       
            Lorem ipsum dolor sit amet consectetur elit adipisicing elit. Cupiditate exercitationem veritatis ipsum nihil, eaque quisquam 
            maxime rem delectus velit fugiat corporis obcaecati maiores blanditiis nostrum suscipit qui accusantium ea harum!          </p>
        </div>
      </div>

      {/* Icons Section */}
      <div className="about-icons row d-flex justify-content-center align-items-center m-3 m-md-5 p-3">
        <div className="col-6 col-sm-4 col-md-2 mb-3 text-center Logo">
          <IoFastFood size={44} />
          <p className="mt-2 mb-0 fw-bold">Eat well, Live well</p>
        </div>
        <div className="col-6 col-sm-4 col-md-2 mb-3 text-center Logo">
          <BiSolidDrink size={44} />
          <p className="mt-2 mb-0 fw-bold">Drink fresh, feel fresh</p>
        </div>
        <div className="col-6 col-sm-4 col-md-2 mb-3 text-center Logo">
          <MdEmojiFoodBeverage size={44} />
          <p className="mt-2 mb-0 fw-bold">Savor Every Sip</p>
        </div>
        <div className="col-6 col-sm-4 col-md-2 mb-3 text-center Logo">
          <PiBowlFoodFill size={44} />
          <p className="mt-2 mb-0 fw-bold">Eat fresh, Live fresh</p>
        </div>
        <div className="col-6 col-sm-4 col-md-2 mb-3 text-center Logo">
          <MdFastfood size={44} />
          <p className="mt-2 mb-0 fw-bold">Hydrate to Elevate</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;



