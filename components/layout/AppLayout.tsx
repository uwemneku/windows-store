import React, { FC, useEffect, useState } from "react";
import NavItem from "./NavItem";
import { Icon } from "@iconify/react";
import Link from "next/link";
import NavSection from "./NavSection";
import AppContext from "context/index";
import { AnimatePresence, motion } from "framer-motion";

const AppLayout: FC<{ children: JSX.Element }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    alert;
    const timeOut = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className=" bg-[#202020] h-full overflow-clip main">
      {isLoading ? (
        <div className="w-full h-screen flex flex-col justify-center gap-5 items-center">
          <Icon icon="logos:microsoft-icon" className="text-8xl " />
          <Icon icon="line-md:loading-loop" className="text-6xl text-white" />
        </div>
      ) : (
        <>
          <div className="p-5 h-[68px]">
            <div className="flex items-center gap-5">
              <Icon icon="logos:microsoft-icon" className="text-2xl " />
              <p className="dark:text-white font-medium text-lg">
                Microsoft Store
              </p>
            </div>
          </div>
          <div className="flex-row flex h-[calc(100vh-68px)]">
            <header className="fixed bottom-0 w-full bg-[#202020] sm:w-auto z-50 sm:relative">
              <NavSection />
            </header>
            <AppContext>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ bounce: false }}
                className="bg-[#222222] rounded-tl-md overflow-auto flex-1 pb-0"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {children}
                </AnimatePresence>
              </motion.div>
            </AppContext>
          </div>
        </>
      )}
    </div>
  );
};

export default AppLayout;
