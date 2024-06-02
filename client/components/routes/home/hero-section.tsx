import React, { FC } from "react";
import { HomeHeroSectionProps } from "@/properties/components.routes.properties";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import HeroImage from "@/public/background-images/hero-image.png";
import ClientImage1 from "@/public/images/client-1.jpg";
import ClientImage2 from "@/public/images/client-2.jpg";
import ClientImage3 from "@/public/images/client-3.jpg";

const HeroSection: FC<HomeHeroSectionProps> = (props) => {
  return (
    <div className="w-full 1000px:flex items-center">
      <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[50vh] w-[50vh] hero-animation rounded-full left-[3.75rem]" />
      <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
        <Image
          src={HeroImage}
          alt="Hero Image"
          className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-auto z-[10]"
        />
      </div>
      <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-0 text-center 1000px:text-left mt-[150px]">
        <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%]">
          Improve Your Online Learning Experience Better Instantly
        </h2>
        <br />
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
          We have 40k+ Online courses & 500k+ Online registered student. Find
          your desired Courses from them.
        </p>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
          <input
            type="search"
            placeholder="Search Courses..."
            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] round-[5px] p-2 w-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
          />
          <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] top-0 right-0 bg-[#39c1f3] rounded-r-[5px]">
            <BiSearch className="text-white" size={30} />
          </div>
        </div>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
          <Image src={ClientImage3} alt="Clients" className="rounded-full" />
          <Image
            src={ClientImage1}
            alt="Clients"
            className="rounded-full ml-[-20px]"
          />
          <Image
            src={ClientImage2}
            alt="Clients"
            className="rounded-full ml-[-20px]"
          />
          <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
            500k+ People already trusted us.{" "}
            <Link
              href={"/courses"}
              className="dark:text-[#46e256] text-[crimson]"
            >
              View Courses
            </Link>
          </p>
        </div>
        <br />
      </div>
    </div>
  );
};

export default HeroSection;
