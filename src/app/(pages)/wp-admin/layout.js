"use client"; 
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/component/wp-admin/Header";
import Aside from "@/component/wp-admin/Aside";

// Load custom fonts
const geistNunitoSans = localFont({
  src: "../../fonts/NunitoSans-VariableFont.ttf",
  variable: "--font-geist-nunito",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata for the document
// export const metadata = {
//   title: "AR Blogs",
//   description: "Ar blogs app || next app",
// };

// Root layout component
export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={`${geistNunitoSans.variable} ${geistMono.variable} antialiased admin-content`}>
         <Header />
          <Aside /> 
          <main>
            {children}
          </main>
        </body>
      </html>
  );
}
