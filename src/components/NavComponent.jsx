"use client";
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu, X, User, LogOut, Bookmark, Home, BarChart2, Dumbbell, Apple } from 'lucide-react';

export default function NavComponent() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleSignInClick = () => signIn(null, { callbackUrl: "/OnBoardForm" });
  const handleSignOutClick = () => signOut({ callbackUrl: "/" });
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  return (
    <nav className="bg-background text-foreground shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src="/final.png" alt="Hanma Fitness Logo" width={45} height={45} className="mr-2 rounded-full bg-transparent" />
              <span className="ml-2 text-xl font-bold">Hanma Fitness</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink href="/" icon={<Home size={18} />}>Home</NavLink>
            <NavLink href="/Dashboard" icon={<BarChart2 size={18} />}>Dashboard</NavLink>
            <NavLink href="/Gym/your-workout" icon={<Dumbbell size={18} />}>Gym Planner</NavLink>
            <NavLink href="/Diet/your-meal" icon={<Apple size={18} />}>Diet Planner</NavLink>
            {session ? (
              <div className="relative ml-4">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  aria-label="User menu"
                >
                  <Image
                    src={session.user.image}
                    width={40}
                    height={40}
                    alt="User"
                    className="rounded-full"
                  />
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg py-1 z-10">
                    <ProfileMenuItem onClick={toggleProfileMenu} icon={<User size={18} />}>
                      Profile
                    </ProfileMenuItem>
                    <ProfileMenuItem onClick={toggleProfileMenu} icon={<Bookmark size={18} />}>
                      Bookmarks
                    </ProfileMenuItem>
                    <ProfileMenuItem onClick={handleSignOutClick} icon={<LogOut size={18} />}>
                      Sign Out
                    </ProfileMenuItem>
                  </div>
                )}
              </div>
            ) : (
              <Button onClick={handleSignInClick} size="sm" className="bg-primary text-primary-foreground ml-4">
                Sign In
              </Button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            {session && (
              <div className="mr-2">
                <Image
                  src={session.user.image}
                  width={32}
                  height={32}
                  alt="User"
                  className="rounded-full"
                />
              </div>
            )}
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Main menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/" icon={<Home size={18} />}>Home</MobileNavLink>
            <MobileNavLink href="/Dashboard" icon={<BarChart2 size={18} />}>Dashboard</MobileNavLink>
            <MobileNavLink href="/Gym/your-workout" icon={<Dumbbell size={18} />}>Gym Planner</MobileNavLink>
            <MobileNavLink href="/Diet/your-meal" icon={<Apple size={18} />}>Diet Planner</MobileNavLink>
            {!session && (
              <Button onClick={handleSignInClick} size="sm" className="bg-primary text-primary-foreground w-full mt-2">
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

const NavLink = ({ href, children, icon }) => (
  <Link href={href} className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
    {icon}
    <span className="ml-2">{children}</span>
  </Link>
);

const MobileNavLink = ({ href, children, icon }) => (
  <Link href={href} className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
    {icon}
    <span className="ml-2">{children}</span>
  </Link>
);

const ProfileMenuItem = ({ onClick, children, icon }) => (
  <button
    onClick={onClick}
    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-primary hover:text-primary-foreground transition-colors"
  >
    {icon}
    <span className="ml-2">{children}</span>
  </button>
);