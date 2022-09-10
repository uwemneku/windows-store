import HeroCards from "components/HeroCards";
import { useMotionValue } from "framer-motion";
import Image from "next/image";
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
      <div className="h-[50vw] max-h-[690px] bg-white overflow-hidden bg-no-repeat relative">
        <Image
          src={"/two.jpg"}
          layout="fill"
          className="w-full overflow-hidden bg-center object-center"
          alt=""
          width={"100%"}
          height={"100%"}
          objectFit="cover"
          objectPosition={"center"}
        />
      </div>
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
