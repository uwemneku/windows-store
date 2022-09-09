import Image from "next/image";
import React, { useEffect, useRef, useCallback } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  transform,
  useAnimationControls,
  useAnimation,
} from "framer-motion";

interface Props {
  currentIndex: MotionValue<number>;
  index: number;
  onTransitionEnd: () => void;
  onClick: (index: number) => void;
}

function HeroCards({ currentIndex, index, onTransitionEnd, onClick }: Props) {
  const isActive = useSpring(0, { duration: 2500 });
  const imageStyles = useAnimation();
  const textStyles = useAnimation();
  const containerStyles = useAnimation();

  const start = useCallback(async () => {
    imageStyles.set({
      scale: 1,
      transition: { duration: 1500 },
    });
    textStyles.set({
      x: 0,
      opacity: 1,
      transition: { duration: 1500 },
    });
    containerStyles.set({ borderWidth: 4 });
  }, [containerStyles, imageStyles, textStyles]);
  const stop = useCallback(async () => {
    await imageStyles.stop();
    imageStyles.set({
      scale: 1.1,
      transition: { duration: 1500 },
    });
    textStyles.set({
      x: -40,
      opacity: 0,
    });
    containerStyles.set({ borderWidth: 0 });
  }, [containerStyles, imageStyles, textStyles]);

  const handleClick = () => {
    isActive.set(1);
    onClick(index);
  };
  useEffect(() => {
    const unSub = currentIndex.onChange((i) => {
      if (i === index) {
        start();
        isActive.set(1);
      }
    });
    return () => {
      unSub();
    };
  }, [currentIndex, index, isActive, start]);
  useEffect(() => {
    const unSub = isActive.onChange((i) => {
      if (i === 1) {
        stop();
        isActive.set(0);
        currentIndex.get() === index && onTransitionEnd();
      } else {
        // stop();
      }
    });
    return () => {
      unSub();
    };
  }, [currentIndex, index, isActive, onTransitionEnd, start, stop]);

  return (
    <motion.div
      onHoverStart={() => {
        start();
      }}
      onHoverEnd={() => {
        currentIndex.get() !== index && stop();
      }}
      onClick={handleClick}
      animate={containerStyles}
      className="w-[250px] h-[150px] shrink-0 rounded-md bg-white group overflow-hidden border-0  border-blue-400 relative flex flex-col z-20"
    >
      <motion.figure
        layout
        animate={imageStyles}
        className="overflow-hidden scale-110 transition duration-500 absolute w-full h-full z-0"
      >
        <Image
          src={"https://picsum.photos/200/300"}
          layout="responsive"
          alt=""
          width={300}
          height={200}
          objectFit="cover"
          objectPosition={"center"}
        />
      </motion.figure>
      <motion.div
        animate={textStyles}
        className="flex-1 flex items-center z-20 opacity-0 -translate-x-20 p-5 transition"
      >
        <p className={`text-white font-bold text-lg `}>The Almighty Thor</p>
      </motion.div>
      <motion.div
        transition={{ duration: 10 }}
        layout
        className="bg-white flex-0 h-2 z-10 "
        onTransitionEnd={onTransitionEnd}
      />
    </motion.div>
  );
}

export default HeroCards;
