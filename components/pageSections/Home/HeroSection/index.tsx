import HeroCards from "components/HeroCards";
import {
  useMotionValue,
  useScroll,
  useTransform,
  motion,
  transform,
} from "framer-motion";
import Image from "next/image";
import React, { useEffect, useCallback, RefObject, useRef } from "react";
import { heroData } from "./data";
import Hero from "./Hero";
import style from "./style.module.css";

interface Props {
  containerRef: RefObject<HTMLDivElement>;
}
function HeroSection({ containerRef }: Props) {
  const currentIndex = useMotionValue(-1);
  const { scrollY } = useScroll({ container: containerRef });
  const ref = useRef<HTMLDivElement>(null);
  const marginTop = useTransform(scrollY, (i) => {
    return transform(i, [0, 200], [-8, -12], { clamp: true }) + "%";
  });
  useEffect(() => {
    currentIndex.get() < 0 && currentIndex.set(0);
  }, [currentIndex]);

  const onTransitionEnd = useCallback(() => {
    const isLastCard = currentIndex.get() + 1 === heroData.length;
    currentIndex.set(isLastCard ? 0 : currentIndex.get() + 1);
  }, [currentIndex]);

  return (
    <div>
      <Hero currentIndex={currentIndex} />
      <motion.div
        style={{ marginTop }}
        ref={ref}
        className={`flex overflow-auto gap-5 mb-5 p-10  relative z-40 bg-gradient-to-b from-transparent via-background-100 to-background-100 ${style.hello}`}
      >
        {heroData.map((_, i) => (
          <HeroCards
            containerRef={ref}
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

export default HeroSection;
