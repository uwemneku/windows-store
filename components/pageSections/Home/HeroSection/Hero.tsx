import {
  MotionValue,
  motion,
  AnimatePresence,
  createMotionComponent,
} from "framer-motion";
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
    <div>
      <div className="h-[50vw] lg:h-[50vw] max-h-[690px] bg-background-100 overflow-hidden bg-no-repeat relative">
        <AnimatePresence>
          <motion.figure
            key={heroData[index].image}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.6 }}
            transition={{ bounce: false, duration: 0.5 }}
          >
            <Image
              src={heroData[index].image}
              layout="fill"
              className="w-full overflow-hidden bg-center object-center relative z-0"
              alt=""
              objectFit="cover"
              objectPosition={"center"}
            />
          </motion.figure>
        </AnimatePresence>
        <div className="absolute w-full h-full flex items-center bg-gradient-to-r via-transparent p-5 sm:p-10  from-background-100 to-transparent">
          <AnimatePresence mode="wait" exitBeforeEnter>
            <motion.div
              key={heroData[index].title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ bounce: false, duration: 0.5 }}
              className="text-white flex-col gap-4"
            >
              <h1
                className="text-2xl font-semibold"
                style={{ textShadow: "1px 1px 2px black" }}
              >
                {heroData[index].title}
              </h1>
              <button className="shadow-xl drop-shadow-xl p-1 px-6 rounded-sm delay-150 bg-[rgba(0,0,0,0.2)] mt-1 sm:mt-4">
                See details
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Hero;
