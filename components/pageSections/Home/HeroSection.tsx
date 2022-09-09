import HeroCards from "components/HeroCards";
import { useMotionValue } from "framer-motion";
import React, { useEffect, useCallback } from "react";

function HeroSection() {
  const currentIndex = useMotionValue(-1);
  useEffect(() => {
    currentIndex.get() < 0 && currentIndex.set(0);
    console.log("ddd");
  }, [currentIndex]);

  const onTransitionEnd = useCallback(() => {
    const isLastCard = currentIndex.get() + 1 === data.length;
    currentIndex.set(isLastCard ? 0 : currentIndex.get() + 1);
  }, [currentIndex]);

  return (
    <div>
      <div className="h-[50vh] bg-white"></div>
      <div className="flex  gap-5 mb-5 overflow-auto p-10 -mt-28">
        {data.map((_, i) => (
          <HeroCards
            onClick={(i) => {
              currentIndex.set(i);
            }}
            onTransitionEnd={onTransitionEnd}
            currentIndex={currentIndex}
            index={i}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
const data = new Array(5).fill(1).map((i) => Math.random().toString());

export default HeroSection;
