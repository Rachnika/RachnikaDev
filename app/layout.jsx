// this is a app layout.

import GlobalProvider from "@/components/Application/GlobalProvider";
import "./globals.css";
import {Assistant} from 'next/font/google' // set font name 
import { ToastContainer } from "react-toastify";


// font setup 
const assistantFont=Assistant({
  weight :['400','500','600','700','800'],
  subsets:["latin"],
  display:'swap'
})


export const metadata = {
  title: "Rachnika",
  description: "This is a craft related e-commerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${assistantFont.className} antialiased`}
      >

      <GlobalProvider>
      
        <ToastContainer/>
          {children}
      </GlobalProvider>
        
      </body>
    </html>
  );
}
