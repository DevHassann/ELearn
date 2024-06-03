"use client";

import React, { FC, useState } from "react";
import { HeaderProps } from "../../properties/components.layouts.properties";
import Link from "next/link";
import NavigationPages from "../../components/includes/navigation-pages";
import { ThemeSwitcher } from "../../functions/theme-switcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import CustomModal from "../../functions/custom-modal";
import Login from "../authentication/login-component";
import SignUp from "../authentication/sign-up-component";
import Verification from "../authentication/verification-component";
import Logo from "../../public/logos/logo.png";
import Image from "next/image";
import { IoPerson } from "react-icons/io5";

const Header: FC<HeaderProps> = ({
  activeItem,
  setOpen,
  route,
  open,
  setRoute,
}) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  // STICKY HEADER FUNCTION
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  // SIDEBAR HANDLE CLOSE FUNCTION
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] h-full m-auto py-2">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <Image
                src={Logo}
                alt="ELearn Logo"
                className="800:w-[40px] w-[35px]"
              />
              <Link
                href={"/"}
                className="text-[25px] font-Poppins font-[500] text-black dark:text-white translate-y-[2px]"
              >
                ELearn
              </Link>
            </div>
            <div className="flex items-center">
              <NavigationPages activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />

              {/* ONLY FOR SMALL SCREENS */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>

              <IoPerson
                size={20}
                className="cursor-pointer dark:text-white text-black hidden 800px:block"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* MOBILE SIDEBAR */}
        <AnimatePresence>
          {openSidebar && (
            <div
              className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024] 800px:hidden"
              id="screen"
              onClick={handleClose}
            >
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-[70%] fixed z-[999999] h-screen dark:bg-slate-900 dark:bg-opacity-90 bg-white top-0 right-0 flex items-center justify-center flex-col"
              >
                <NavigationPages activeItem={activeItem} isMobile={true} />

                <div className="w-[80%] dark:bg-white bg-[crimson] h-[1px] my-6" />

                <div className="flex items-center justify-between flex-col h-[calc(100vh-550px)]">
                  <h1
                    className="cursor-pointer my-2 text-[18px] dark:text-white text-black"
                    onClick={() => {
                      setOpen(true);
                      setOpenSidebar(false);
                    }}
                  >
                    Login / Sign Up
                  </h1>

                  <p className="text-[16px] px-2 pl-5 dark:text-white text-black">
                    Copyright © 2024 ELearning.
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {route === "Login" && (
        <>
          <AnimatePresence>
            {open && (
              <>
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={Login}
                />
              </>
            )}
          </AnimatePresence>
        </>
      )}

      {route === "Sign-Up" && (
        <>
          <AnimatePresence>
            {open && (
              <>
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={SignUp}
                />
              </>
            )}
          </AnimatePresence>
        </>
      )}

      {route === "Verification" && (
        <>
          <AnimatePresence>
            {open && (
              <>
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={Verification}
                />
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default Header;
