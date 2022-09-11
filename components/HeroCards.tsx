import Image from "next/image";
import React, { useEffect, useCallback, RefObject, useRef } from "react";
import {
  motion,
  MotionValue,
  useSpring,
  useAnimation,
  useTransform,
  transform,
} from "framer-motion";
import tw from "./tw";
import { scrollItemIntoContainer } from "constant/utils";

interface Props {
  currentIndex: MotionValue<number>;
  containerRef: RefObject<HTMLDivElement>;
  index: number;
  onTransitionEnd: () => void;
  onClick: (index: number) => void;
  data: { image: string; title: string };
}

function HeroCards({
  currentIndex,
  index,
  onTransitionEnd,
  onClick,
  data,
  containerRef,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationTriggerValue = useSpring(0, { duration: 3000 });
  const imageStyles = useAnimation();
  const textStyles = useAnimation();
  const containerStyles = useAnimation();
  const isCurrentlyActive = useTransform(currentIndex, (i) => i === index); // indicates if card is animating
  const progressStyles = useTransform(animationTriggerValue, (i) => {
    const u = transform(i, [0, 1], [0, 100]);
    return `linear-gradient(to right, transparent, transparent 0%, #eee 0%, #eee ${u}%, transparent ${u}%, transparent)`;
  });

  const startAnimation = useCallback(() => {
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
  }, []);
  const stopAnimation = useCallback(async () => {
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
  }, []);

  function handleClick() {
    onClick(index);
  }

  function handleHoverEnd() {
    if (!isCurrentlyActive.get()) stopAnimation();
  }
  useEffect(() => {
    const unSubscribe = isCurrentlyActive.onChange((iActive) => {
      if (iActive) {
        startAnimation();
        animationTriggerValue.set(1);
        scrollItemIntoContainer(cardRef.current, containerRef.current);
      }
    });
    const _unSubscribe = animationTriggerValue.onChange((i) => {
      if (i === 1) {
        animationTriggerValue.set(0);
      } else if (i === 0) {
        stopAnimation();
        isCurrentlyActive.get() && onTransitionEnd();
      }
    });
    return () => {
      unSubscribe();
      _unSubscribe();
    };
  }, [containerRef, index, onTransitionEnd, startAnimation, stopAnimation]);

  return (
    <Container
      ref={cardRef}
      onHoverStart={startAnimation}
      onHoverEnd={handleHoverEnd}
      onClick={handleClick}
      animate={containerStyles}
    >
      <Figure layout animate={imageStyles}>
        <Image
          src={data.image}
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
          {data.title}
        </motion.p>
      </TextContainer>
      <motion.div
        transition={{ duration: 10 }}
        layout
        style={{ background: progressStyles }}
        className="bg-slate-200 flex-0 h-1 absolute w-full bottom-0 z-20"
        onTransitionEnd={onTransitionEnd}
      />
    </Container>
  );
}

const Container = tw(
  "w-[220px] h-[120px] shrink-0 rounded-md bg-white group overflow-hidden border-0  border-blue-400 relative flex flex-col z-20",
  motion.div
);
const TextContainer = tw(
  "absolute w-full h-full flex-1 flex items-center z-10 opacity-0 -translate-x-20 p-2 bg-gradient-to-r from-[rgba(0,0,0,0.7)] to-transparent",
  motion.div
);
const Figure = tw(
  `overflow-hidden scale-110 transition duration-500 w-full h-full z-0`,
  motion.figure
);
export default HeroCards;
