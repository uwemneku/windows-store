import React, { FC } from "react";
import tw from "tailwind-styled-components";
import NavItem from "./NavItem";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Header from "./Header";

const AppLayout: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <div className="flex flex-col bg-[#202020] h-screen min-h-[500px]">
      <div className="p-5">
        <div className="flex items-center gap-5">
          <Icon icon="logos:microsoft-icon" className="text-2xl " />
          <p className="dark:text-white font-medium text-lg">Microsoft Store</p>
        </div>
      </div>
      <div className="flex-1 flex">
        <Header />
        <main className="flex-1 bg-[#24292c] rounded-tl-md">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
