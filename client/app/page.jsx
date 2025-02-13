import React from 'react';
import Image from "next/image";
import Link from "next/link";
import ThemeButton from "@/components/shared/ThemeButton";
import { MessageCircle, LogIn, UserPlus } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-transparent to-gray-50 dark:from-transparent dark:to-gray-900/50">
      <div className="mx-auto  px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex items-center justify-between pt-6">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold tracking-tight">Chat.io</h1>
          </div>
          <ThemeButton />
        </div>

        {/* Section */}
        <div className="mt-16 text-center">
          <h2 className="text-6xl font-bold tracking-tight sm:text-7xl">
            Connect in real-time
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
           Chat with your friends and family in real time without any delay or network disturbances.
          </p>
          
          <div className="relative mt-32 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 -top-20 -z-10 transform-gpu overflow-hidden blur-2xl">
                <div className="relative h-[26.125rem] w-full lg:w-[66.125rem] bg-gradient-to-tr from-blue-500 to-green-600 opacity-70" />
              </div>
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/chats.svg"
                alt="Chat Logo"
                width={260}
                height={60}
                priority
              />
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-36 grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <Link
            href="/login"
            className="group relative flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-800/50"
          >
            <LogIn className="h-8 w-8 text-blue-500" />
            <h3 className="mt-4 text-xl font-semibold">Login</h3>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Welcome back! Sign in.
            </p>
            <span className="mt-4 text-blue-500 transition-transform group-hover:translate-x-1">
              Get started →
            </span>
          </Link>

          <Link
            href="/register"
            className="group relative flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-800/50"
          >
            <UserPlus className="h-8 w-8 text-green-500" />
            <h3 className="mt-4 text-xl font-semibold">Register</h3>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              New here? Get Started by creating an account.
            </p>
            <span className="mt-4 text-green-500 transition-transform group-hover:translate-x-1">
              Sign up →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}