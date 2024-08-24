import { Inter,Kanit,Pacifico } from "next/font/google";

import "./globals.css";

import Header from "./_components/Header";
const inter = Inter({ subsets: ["latin"] });
const pacifico=Pacifico({subsets:['latin'], weight:['400']})
export const metadata = {
  title: "Captedddd",
  description: "Caption & Translate Your Videos Flawlessly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`grid ${inter.className}`}>
      <Header font={pacifico} />
        {children}
        </body>
    </html>
  );
}
