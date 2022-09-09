import React from "react";
import { useReducer } from "react";

const Context = React.createContext({});
// Context.
interface Props {
  children: JSX.Element;
}
export default function AppContext({ children }: Props) {
  // const [] = useReducer();
  return <Context.Provider value={{}}>{children}</Context.Provider>;
}
