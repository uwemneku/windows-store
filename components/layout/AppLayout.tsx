import React, { FC } from "react";
import NavItem from "./NavItem";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Header from "./Header";
import AppContext from "context/index";
import { AnimatePresence } from "framer-motion";

const AppLayout: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <div className=" bg-[#202020] h-screen min-h-[500px] overflow-clip">
      <div className="p-5">
        <div className="flex items-center gap-5">
          <Icon icon="logos:microsoft-icon" className="text-2xl " />
          <p className="dark:text-white font-medium text-lg">Microsoft Store</p>
        </div>
      </div>
      <div className="flex-col-reverse sm:flex-row flex h-[calc(100vh-50px)]">
        <Header />
        <AppContext>
          <main className="flex-1 bg-[#222222] rounded-tl-md overflow-clip h-full">
            <AnimatePresence mode="wait" initial={false}>
              {children}
            </AnimatePresence>
          </main>
        </AppContext>
      </div>
    </div>
  );
};

export default AppLayout;
