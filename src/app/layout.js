import { Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const orbitron = Orbitron({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-orbitron',
});

export const metadata = {
  title: "Game Studio",
  description: "A modern game studio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={`${orbitron.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
