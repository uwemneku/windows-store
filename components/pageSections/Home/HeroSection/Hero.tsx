import { MotionValue, motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { heroData } from "./data";
interface Props {
  currentIndex: MotionValue<number>;
}
function Hero({ currentIndex }: Props) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const unSub = currentIndex.onChange((i) => {
      if (i >= 0) {
        setIndex(i);
      }
    });
    return () => unSub();
  }, [currentIndex]);
  return (
    <AnimatePresence mode="wait">
      <motion.div layoutId={heroData[index].image}>
        <div className="h-[50vw] max-h-[690px] bg-white z-0 overflow-hidden bg-no-repeat relative">
          <Image
            src={heroData[index].image}
            layout="fill"
            className="w-full overflow-hidden bg-center object-center relative z-0"
            alt=""
            width={"100%"}
            height={"100%"}
            objectFit="cover"
            objectPosition={"center"}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Hero;
