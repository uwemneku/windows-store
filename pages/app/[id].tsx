import AppCard from "components/AppCard";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log(params);

  return {
    props: { id: params?.id },
  };
};
const App: NextPage<{ id?: string }> = ({ id }) => {
  useEffect(() => {
    console.log(id);
  }, [id]);
  return (
    <div>
      <AppCard id={id || Math.random().toString()} variant="horizontal" />
    </div>
  );
};

export default App;
