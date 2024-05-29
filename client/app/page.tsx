"use client";

import React, { FC, useState } from "react";
import { LandingPageProps } from "@/interfaces/pages.interfaces";
import MetaData from "@/utils/meta-data";

import Header from "@/layouts/header";

const Page: FC<LandingPageProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div>
      <MetaData
        title="ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Learning Management System, LMS"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
    </div>
  );
};

export default Page;
