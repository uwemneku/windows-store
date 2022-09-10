import Image from "next/image";
import React, { useEffect, useCallback } from "react";
import {
  motion,
  MotionValue,
  useSpring,
  useAnimation,
  useTransform,
  transform,
} from "framer-motion";
import tw from "./tw";

interface Props {
  currentIndex: MotionValue<number>;
  index: number;
  onTransitionEnd: () => void;
  onClick: (index: number) => void;
}

function HeroCards({ currentIndex, index, onTransitionEnd, onClick }: Props) {
  const isActive = useSpring(0, { duration: 3000 });
  const imageStyles = useAnimation();
  const textStyles = useAnimation();
  const containerStyles = useAnimation();

  const processStyles = useTransform(isActive, (i) => {
    const u = transform(i, [0, 1], [0, 100]);
    return `linear-gradient(to right, transparent, transparent 0%, #eee 0%, #eee ${u}%, transparent ${u}%, transparent)`;
  });

  const start = useCallback(async () => {
    imageStyles.set({
      scale: 1,
      transitionDuration: "1.5s",
    });
    textStyles.set({
      x: 0,
      opacity: 1,
      transitionDuration: "0.5s",
    });
    containerStyles.set({ borderWidth: 4 });
  }, [containerStyles, imageStyles, textStyles]);
  const stop = useCallback(async () => {
    await imageStyles.stop();
    imageStyles.set({
      scale: 1.1,
      transitionDuration: "1s",
    });
    textStyles.set({
      x: -40,
      opacity: 0,
      transitionDuration: "0.5s",
      transition: { duration: 4000 },
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
        isActive.set(0);
      } else if (i === 0) {
        stop();
        currentIndex.get() === index && onTransitionEnd();
        // stop();
      }
    });
    return () => {
      unSub();
    };
  }, [currentIndex, index, isActive, onTransitionEnd, start, stop]);

  return (
    <Container
      onHoverStart={() => {
        start();
      }}
      onHoverEnd={() => {
        currentIndex.get() !== index && stop();
      }}
      onClick={handleClick}
      animate={containerStyles}
    >
      <Figure layout animate={imageStyles}>
        <Image
          src={"https://picsum.photos/200/300"}
          layout="responsive"
          alt=""
          width={300}
          height={200}
          objectFit="cover"
          objectPosition={"center"}
        />
      </Figure>
      <TextContainer animate={textStyles}>
        <motion.p className={`text-white font-bold text-lg`}>
          The Almighty Thor
        </motion.p>
      </TextContainer>
      <motion.div
        transition={{ duration: 10 }}
        layout
        style={{ background: processStyles }}
        className="bg-white flex-0 h-2 absolute w-full bottom-0 z-20"
        onTransitionEnd={onTransitionEnd}
      />
    </Container>
  );
}

const Container = tw(
  "w-[200px] h-[120px] shrink-0 rounded-md bg-white group overflow-hidden border-0  border-blue-400 relative flex flex-col z-20",
  motion.div
);
const TextContainer = tw(
  "absolute w-full h-full flex-1 flex items-center z-10 opacity-0 -translate-x-20 p-5 bg-gradient-to-r from-[rgba(0,0,0,0.7)] to-transparent",
  motion.div
);
const Figure = tw(
  `overflow-hidden scale-110 transition duration-500 w-full h-full z-0`,
  motion.figure
);
export default HeroCards;
