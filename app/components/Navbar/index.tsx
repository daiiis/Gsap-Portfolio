import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar fixed top-0 flex w-screen items-center justify-between border-b border-white/10 px-12 py-4 font-fira">
        <span className="absolute bottom-0 h-0.5 w-16 animate-animate bg-gradient-to-r from-transparent to-white" />
        <div className="logo font-w cursor-pointer text-3xl text-white">
          DAIIIS
        </div>
        <ul className="menu flex gap-20 text-xl font-light uppercase">
          <li>
            <Link href="#about" className="text-white hover:opacity-80">
              about
            </Link>
          </li>
          <li>
            <Link href="#works" className="text-white hover:opacity-80">
              works
            </Link>
          </li>
          <li>
            <Link href="#casting" className="text-white hover:opacity-80">
              casting
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-white hover:opacity-80">
              contact
            </Link>
          </li>
        </ul>
        <div className="btn cursor-pointer font-medium uppercase text-white hover:opacity-80">
          Github
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
