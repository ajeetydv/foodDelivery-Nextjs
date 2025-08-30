'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";

import "./globals.css";
import Boostrap from "./boostrap/Boostrap";
import  RestaurantHeader  from "./_components/RestaurantHeader";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Boostrap/>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        
        {children}
        <ToastContainer autoClose={700}/>
      </body>
    </html>
  );
}
