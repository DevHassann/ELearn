import React, { FC } from "react";
import { NavigationPagesProps } from "../../properties/components.includes.properties";
import { NavigationPagesData } from "../../static/navigation-pages-data";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logos/logo.png";

const NavigationPages: FC<NavigationPagesProps> = ({
  activeItem,
  isMobile,
}) => {
  return (
    <>
      {/* FOR LARGE SCREENS */}
      <div className="hidden 800px:flex">
        {NavigationPagesData &&
          NavigationPagesData.map((item, index) => (
            <Link href={`${item.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-Poppins font-[400]`}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>

      {/* FOR SMALL SCREENS */}
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6 flex items-center gap-2 -translate-x-[23px]">
            <Image
              src={Logo}
              alt="ELearn Logo"
              className="w-[35px]"
            />
            <Link href={"/"} passHref>
              <span className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
                ELearn
              </span>
            </Link>
          </div>
          {NavigationPagesData &&
            NavigationPagesData.map((item, index) => (
              <Link href={`${item.url}`} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                  } block py-5 text-[18px] px-6 font-Poppins font-[400] text-center`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavigationPages;
