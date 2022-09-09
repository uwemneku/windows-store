import AppCard from "components/AppCard";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import tw from "components/tw";
import usePreviousRoute from "hooks/usePrevoiusRoute";
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log(params);

  return {
    props: { id: params?.id },
  };
};
const App: NextPage<{ id?: string }> = ({ id }) => {
  const prev = usePreviousRoute();
  console.log(prev);

  useEffect(() => {
    console.log(prev);
  }, [prev]);
  return (
    <div className="flex flex-col lg:flex-row h-full">
      <motion.div
        layout
        layoutId={id}
        className="bg-purple-700 p-20 w-full lg:w-[20%]"
      ></motion.div>
      <div className="flex flex-col p-10 gap-10 flex-1 bg-blue-500 h-full">
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  );
};

const Card = tw("rounded-md p-3 bg-black flex-1", motion.div);
export default App;
