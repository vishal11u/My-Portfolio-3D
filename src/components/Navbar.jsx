import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            Vishal
          </p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-6">
          <ul className="list-none flex flex-row gap-6">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>

          {/* Hire Me & Download Resume Buttons */}
          {/* <div className="flex gap-4">
            <a
              href="mailto:shitolevishal29@gmail.com"
              className="bg-indigo-600 text-white px-6 py-2 rounded-l hover:bg-blue-700 transition"
            >
              Hire Me
            </a>
            <a
              href="/VishalShitoleResume.pdf"
              download="VishalShitoleResume.pdf"
              className="bg-white text-indigo-600 px-6 py-2 rounded-l hover:bg-green-700 transition"
            >
              Download Resume
            </a>
          </div> */}
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
        </div>
      </div>

      {/* Mobile Sidebar (Sliding from Top) */}
      <div
        className={`fixed top-0 left-0 w-full h-[60%] bg-black bg-opacity-90 flex flex-col items-center pt-20 transition-transform duration-500 ease-in-out ${
          toggle ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-6 text-white text-2xl"
          onClick={() => setToggle(false)}
        >
          ✖
        </button>

        <ul className="list-none flex flex-col gap-6 text-center">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className="text-white text-lg font-medium cursor-pointer hover:text-gray-300"
              onClick={() => {
                setToggle(false);
                setActive(nav.title);
              }}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Buttons Inside Mobile Sidebar */}
        {/* <div className="flex flex-col gap-4 mt-8">
          <a
            href="mailto:shitolevishal29@gmail.com"
            className="bg-indigo-600 text-white px-6 py-3 text-center rounded-l hover:bg-blue-700 transition"
          >
            Hire Me
          </a>
          <a
            href="/VishalShitoleResume.pdf"
            download="VishalShitoleResume.pdf"
            className="bg-white text-indigo-600 px-6 py-3 text-center rounded-l hover:bg-green-700 transition"
          >
            Download Resume
          </a>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
