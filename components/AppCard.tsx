import Image from "next/image";
import React, { useState } from "react";
import tw from "components/tw";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  variant?: "horizontal" | "vertical";
  id: string;
}
function AppCard({ id }: Props) {
  const [isActive, setIsActive] = useState(false);
  return (
    <motion.div layout="preserve-aspect" layoutId={id}>
      <Link href={"/app/" + id}>
        <Container
          style={{
            backgroundColor: ["green", "red", "blue"][
              Math.floor(parseFloat(id) * 3)
            ],
          }}
        >
          <figure className="w-[200px] h-[200px] bg-no-repeat grow-0 overflow-hidden bg-white">
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
            <div></div>
          </figure>
        </Container>
      </Link>
    </motion.div>
  );
}

const Container = tw(
  `rounded-md transform hover:-translate-y-1 hover:shadow-md hover:drop-shadow-md transition duration-150 bg-black w-[400px] h-[400px]`,
  "div"
);
export default AppCard;
