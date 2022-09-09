import next, { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout<P = {}, IP = P> = NextPage<PageTransitionEvent, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface AppContext {}
