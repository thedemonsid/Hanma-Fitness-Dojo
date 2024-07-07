"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Nav() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSignInClick = () => {
    signIn(null, { callbackUrl: "/OnBoardForm" });
  };
  const handleSignOutClick = () => {
    router.push("/api/auth/signout");
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // State for profile menu

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <nav className="text-white bg-gray-800 border-b-2 border-yellow-200 dark:bg-gray-950/90 font-oswald text-xl">
      <div className="w-full px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-14">
          <Link className="flex items-center" href="/">
            <h1 className="text-xl sm:text-3xl">Hanma-Fitness Dojo</h1>
          </Link>
          <nav className="flex-col hidden gap-4 text-white md:flex md:flex-row sm:flex-row">
            <Link
              className="flex items-center font-medium transition-colors text-md hover:underline"
              href="/"
            >
              Home
            </Link>
            <Link
              className="flex items-center font-medium transition-colors text-md hover:underline"
              href="/Dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="flex items-center font-medium transition-colors text-md hover:underline"
              href="/Gym/workoutinfo"
            >
              Gym-Planner
            </Link>
            <Link
              className="flex items-center font-medium transition-colors text-md hover:underline"
              href={`/Diet/your-meal`}
            >
              Diet Planner
            </Link>
          </nav>
          <div className="flex items-center gap-4 ">
            {/* Profile Dropdown */}
            {session ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center justify-center w-8 h-8 text-white bg-gray-800 rounded-full focus:outline-none"
                  aria-label="User menu"
                >
                  <div className="scale-[1.5]">
                    {" "}
                    <Image
                      src={session.user.image}
                      width={350}
                      height={350}
                      alt="user-PFP"
                      className="rounded-full"
                    ></Image>{" "}
                  </div>
                </button>
                {/* Profile Dropdown Menu */}
                {profileMenuOpen && (
                  <div className="absolute bottom-0 z-10 flex flex-col items-center justify-center w-48 py-2 mt-3 ease-in-out -translate-x-1/2 translate-y-full bg-gray-900 border-2 border-yellow-300 rounded-md shadow-lg left-1/2">
                    <p className="font-light text-white text-start ">
                      {session.user.name}
                    </p>
                    <button
                      onClick={handleSignOutClick}
                      className="block w-full px-4 py-2 text-sm text-white text-start hover:bg-gray-700"
                    >
                      Sign Out
                      {/* A sign out icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="currentColor"
                          d="M118 216a6 6 0 0 1-6 6H48a6 6 0 0 1-6-6V40a6 6 0 0 1 6-6h64a6 6 0 0 1 0 12H54v164h58a6 6 0 0 1 6 6m110.24-92.24l-40-40a6 6 0 0 0-8.48 8.48L209.51 122H112a6 6 0 0 0 0 12h97.51l-29.75 29.76a6 6 0 1 0 8.48 8.48l40-40a6 6 0 0 0 0-8.48"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={handleSignOutClick}
                      className="block w-full px-4 py-2 text-sm text-white text-start hover:bg-gray-700"
                    >
                      Profile
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" stroke="currentColor" stroke-width="1.5">
                          <path d="M11.607 2.342a.6.6 0 0 1 .787 0l1.948 1.692a.6.6 0 0 0 .445.145l2.572-.224a.6.6 0 0 1 .636.463l.582 2.514a.6.6 0 0 0 .275.38l2.212 1.33a.6.6 0 0 1 .243.748l-1.008 2.376a.6.6 0 0 0 0 .468l1.008 2.376a.6.6 0 0 1-.243.749l-2.212 1.33a.6.6 0 0 0-.275.379l-.582 2.514a.6.6 0 0 1-.636.463l-2.572-.224a.6.6 0 0 0-.445.144l-1.949 1.693a.6.6 0 0 1-.787 0l-1.948-1.693a.6.6 0 0 0-.445-.144l-2.572.224a.6.6 0 0 1-.636-.463l-.582-2.514a.6.6 0 0 0-.275-.38l-2.212-1.33a.6.6 0 0 1-.243-.748l1.008-2.376a.6.6 0 0 0 0-.468L2.693 9.39a.6.6 0 0 1 .243-.749l2.212-1.33a.6.6 0 0 0 .275-.379l.582-2.514a.6.6 0 0 1 .636-.463l2.572.224a.6.6 0 0 0 .445-.145z" />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m9 13l2 2l5-5"
                          />
                        </g>
                      </svg>
                    </button>
                    <button
                      onClick={handleSignOutClick}
                      className="block w-full px-4 py-2 text-sm text-white text-start hover:bg-gray-700"
                    >
                      Bookmarks
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="currentColor"
                          d="M160 58H64a14 14 0 0 0-14 14v152a6 6 0 0 0 9.49 4.88L112 191.37l52.52 37.51A6 6 0 0 0 174 224V72a14 14 0 0 0-14-14m2 154.34l-46.52-33.22a6 6 0 0 0-7 0L62 212.34V72a2 2 0 0 1 2-2h96a2 2 0 0 1 2 2ZM206 40v152a6 6 0 0 1-12 0V40a2 2 0 0 0-2-2H88a6 6 0 0 1 0-12h104a14 14 0 0 1 14 14"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button size="sm" onClick={handleSignInClick}>
                Sign In
              </Button>
            )}
          </div>
          {/* Mobile menu */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 -ml-10 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
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
              className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              href="/Gym/workoutinfo"
              className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Gym-Planner
            </Link>
            <Link
              href={`/Diet/your-meal`}
              className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Meal Planner
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
