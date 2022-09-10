import React, { FC, useEffect, useState } from "react";
import NavItem from "./NavItem";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Header from "./Header";
import AppContext from "context/index";
import { AnimatePresence, motion } from "framer-motion";

const AppLayout: FC<{ children: JSX.Element }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className=" bg-[#202020] h-screen overflow-clip">
      {isLoading ? (
        <div className="w-full h-full flex flex-col justify-center gap-5 items-center">
          <Icon icon="logos:microsoft-icon" className="text-8xl " />
          <Icon icon="line-md:loading-loop" className="text-6xl text-white" />
        </div>
      ) : (
        <>
          <div className="p-5">
            <div className="flex items-center gap-5">
              <Icon icon="logos:microsoft-icon" className="text-2xl " />
              <p className="dark:text-white font-medium text-lg">
                Microsoft Store
              </p>
            </div>
          </div>
          <div className="flex-col-reverse sm:flex-row flex h-[calc(100vh-50px)]">
            <Header />
            <AppContext>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ bounce: false }}
                className="flex-1 bg-[#222222] rounded-tl-md overflow-clip h-full"
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
