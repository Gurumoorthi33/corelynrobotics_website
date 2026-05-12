import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Corelyn Robotics | Robotics-as-a-Service",
  description: "A Robotics Infrastructure Company. Not a Robot Seller.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans text-[18px] leading-[1.7] text-slate-900 bg-white">
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}

