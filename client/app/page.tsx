"use client";

import React, { FC, useState } from "react";
import { LandingPageProps } from "../properties/pages.properties";
import MetaData from "../functions/meta-deta";

import Header from "../components/layouts/header";
import HeroSection from "../components/routes/home/hero-section";

const Page: FC<LandingPageProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const [route, setRoute] = useState("Login");

  return (
    <div>
      <MetaData
        title="ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Learning Management System, LMS"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <HeroSection />
    </div>
  );
};

export default Page;
