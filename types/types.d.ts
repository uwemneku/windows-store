import next from "next";
import { ReactElement } from "react";

type NextPageWithLayout<p = {}, IP = P> = NextPage<PageTransitionEvent, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
