import Image from "next/image";
import React, { useState } from "react";
import tw from "components/tw";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  isVertical?: boolean;
  id: string;
}
function AppCard({ id, isVertical }: Props) {
  const [isActive, setIsActive] = useState(false);
  return (
    <Container
      id={id}
      layout="preserve-aspect"
      className={
        isVertical
          ? "flex-1 md:min-w-[199px] md:max-w-[220px] "
          : "w-full md:flex-1 md:max-w-[350px]"
      }
      layoutId={id}
    >
      <Link href={"/app/" + id}>
        <Card
          className={`${isVertical ? "flex-col gap-10" : "flex-row gap-5"}   `}
        >
          <Figure
            className={
              isVertical
                ? "w-[120px] h-[120px] self-center mt-5"
                : "w-[80px] h-[80px]"
            }
          >
            <Image
              src={"https://picsum.photos/200/300"}
              layout="responsive"
              className="w-full"
              alt=""
              width={500}
              height={500}
              objectFit="cover"
              objectPosition={"center"}
            />
          </Figure>
          <div className="flex-1">
            <p className="font-semibold">WhatsApp</p>
            <p className="text-xs font-thin">Social</p>
          </div>
          <div className="text-xs rounded-sm self-start p-2 py-1 bg-[#363636] grow-0">
            Installed
          </div>
        </Card>
      </Link>
    </Container>
  );
}

const Card = tw(
  `rounded-md transform hover:-translate-y-1 hover:shadow-md hover:drop-shadow-md hover:bg-[#272727] transition duration-500 bg-[#2c2c2c]  p-4 flex`,
  "div"
);

const Container = tw("text-white h-fit", motion.div);
const Figure = tw("bg-no-repeat grow-0 overflow-hidden bg-white rounded-md");
export default AppCard;
