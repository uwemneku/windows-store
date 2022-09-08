import React from "react";
import { motion, AnimatePresence } from "framer-motion";
interface Props {
  isActive: boolean;
  icon: JSX.Element;
  label: string;
}
function NavItem({ icon, isActive, label }: Props) {
  return (
    <motion.button
      layout
      className={`w-20 h-16 text-gray-400 dark:text-[#c3c3c3] overflow-hidden ${
        isActive ? "bg-[#454545]" : ""
      } rounded-md relative transition duration-200 flex flex-col gap-1 items-center justify-center`}
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="bg-primary-blue w-[4px] rounded-md absolute h-1/2 left-0 self-end"
            initial={{ y: 100, height: "200%" }}
            animate={{ y: 0, height: "50%" }}
            exit={{ y: 100, height: "200%" }}
            transition={{ bounce: false }}
          />
        )}
      </AnimatePresence>
      <motion.div
        layout
        className={` ${isActive ? "text-primary-blue text-3xl" : "text-2xl"}`}
      >
        {icon}
      </motion.div>
      {!isActive && <p className="text-xs">{label}</p>}
    </motion.button>
  );
}

export default NavItem;
