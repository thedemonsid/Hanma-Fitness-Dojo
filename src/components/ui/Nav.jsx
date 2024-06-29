"use client";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="border-b-2 text-secondary bg-primary border-secondary">
      <div className="w-full px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-14">
          <Link className="flex items-center" href="/">
            <h1 className="text-xl sm:text-3xl text-secondary">Hanma-Fitness Dojo</h1>
          </Link>
          <nav className="hidden gap-4 md:flex md:flex-row">
            <Link
              className="flex items-center font-medium transition-colors text-md hover:underline text-secondary"
              href="/">
              Home
            </Link>
            <Link
              className="flex items-center font-medium transition-colors text-md hover:underline text-secondary"
              href="/dashboard">
              DashBoard
            </Link>
            <Link
              className="flex items-center font-medium transition-colors text-md hover:underline text-secondary"
              href="/discussions">
              Gym-planner
            </Link>
            <Link
              className="flex items-center font-medium transition-colors text-md hover:underline text-secondary"
              href="/localnews">
              Diet-Planner
            </Link>
          </nav>
          <button
            type="button"
            className="hidden px-3 py-2 text-base font-medium rounded-md md:block text-primary bg-secondary hover:bg-secondary hover:text-primary">
            Sign In
          </button>
          {/* Mobile menu */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md bg-secondary hover:text-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}>
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-2">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-medium underline text-secondary hover:bg-secodary">
              Home
            </Link>
            <Link
              href="/issuelist"
              className="block px-3 py-2 text-base font-medium underline text-secondary hover:bg-secodary hover:text-primary">
              Issue List
            </Link>
            <Link
              href="/discussions"
              className="block px-3 py-2 text-base font-medium underline text-secondary hover:bg-secodary hover:text-primary">
              Discussions
            </Link>
            <Link
              href="/localnews"
              className="block px-3 py-2 text-base font-medium underline text-secondary hover:bg-secodary hover:text-primary">
              Local News
            </Link>
            <button
              type="button"
              className="block w-full px-3 py-2 text-base font-medium rounded-md text-primary bg-secondary hover:bg-popover hover:text-primary">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
