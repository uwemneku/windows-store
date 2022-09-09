import React from "react";
import NavItem from "./NavItem";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRef } from "react";
function Header() {
  const { asPath } = useRouter();
  const currenNavIndex = useRef(1);
  const isLinkActive = (e: string) => {
    return asPath.split("/")[1] === e;
  };
  return (
    <header>
      <nav className="px-1 flex sm:flex-col  justify-between h-full py-5">
        <Link href={"/"}>
          <a>
            <NavItem
              icon={<Icon icon={"fluent:home-16-filled"} />}
              isActive={isLinkActive("")}
              label="Home"
            />
          </a>
        </Link>
        <div className="flex sm:flex-col">
          <Link href={"library"}>
            <a>
              <NavItem
                icon={<Icon icon={"icomoon-free:books"} />}
                isActive={isLinkActive("library")}
                label="Library"
              />
            </a>
          </Link>
          <NavItem
            icon={<Icon icon={"carbon:help"} />}
            isActive={false}
            label="Help"
          />
        </div>
      </nav>
    </header>
  );
}

export default Header;
