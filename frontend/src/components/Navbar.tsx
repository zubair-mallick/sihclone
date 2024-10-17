"use client";

import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolling ? "bg-black shadow-lg" : "bg-transparent"
      } text-white border-b border-gray-800`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">IMPOWERHUB</h1>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Updated Links */}
            <Link
              href="/education"
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-700"
            >
              Education
            </Link>
            <Link
              href="/counseling"
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-700"
            >
              Counseling
            </Link>
            <Link
              href="/chatbot"
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-700"
            >
              AI Chatbot
            </Link>
          </div>

          <div className="flex -mr-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 transform scale-95"
        enterTo="opacity-100 transform scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 transform scale-100"
        leaveTo="opacity-0 transform scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            {/* @ts-expect-error  because of some random type mismatch */}
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 bg-gray-800">
              {/* Updated Links for Mobile */}
              <Link
                href="/education"
                className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-700"
              >
                Education
              </Link>
              <Link
                href="/counseling"
                className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-700"
              >
                Counseling
              </Link>
              <Link
                href="/chatbot"
                className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-700"
              >
                AI Chatbot
              </Link>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};

export default Navbar;
