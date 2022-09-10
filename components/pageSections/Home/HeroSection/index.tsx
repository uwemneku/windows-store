import HeroCards from "components/HeroCards";
import { useMotionValue, useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useCallback, RefObject } from "react";
import { heroData } from "./data";
import Hero from "./Hero";

interface Props {
  containerRef: RefObject<HTMLDivElement>;
}
function HeroSection({ containerRef }: Props) {
  const currentIndex = useMotionValue(-1);
  const { scrollY } = useScroll({ container: containerRef });
  const marginTop = useTransform(scrollY, [0, 200], [-112, -180]);
  useEffect(() => {
    currentIndex.get() < 0 && currentIndex.set(0);
    console.log("ddd");
  }, [currentIndex]);
  useEffect(() => {
    scrollY.onChange(console.log);
  }, [scrollY]);

  const onTransitionEnd = useCallback(() => {
    const isLastCard = currentIndex.get() + 1 === data.length;
    currentIndex.set(isLastCard ? 0 : currentIndex.get() + 1);
  }, [currentIndex]);

  return (
    <div>
      <Hero currentIndex={currentIndex} />
      <motion.div
        style={{ marginTop }}
        className="flex  gap-5 mb-5 overflow-auto p-10  relative z-40 bg-gradient-to-b from-transparent via-background-100 to-background-100"
      >
        {heroData.map((_, i) => (
          <HeroCards
            onClick={(i) => {
              currentIndex.set(i);
            }}
            onTransitionEnd={onTransitionEnd}
            currentIndex={currentIndex}
            index={i}
            key={i}
            data={_}
          />
        ))}
      </motion.div>
    </div>
  );
}
const data = new Array(5).fill(1).map((i) => Math.random().toString());

export default HeroSection;
