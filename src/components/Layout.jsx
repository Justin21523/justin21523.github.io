import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
      <Navbar />
      <main className="flex-1 w-full relative">
         {/* Subtle background grid or gradient effects can go here */}
         <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] opacity-5 pointer-events-none"></div>
        {children}
      </main>
      <Footer />
    </div>
  );
}
