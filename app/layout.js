import { Geist, Geist_Mono } from "next/font/google"; // Re-added import
import localFont from "next/font/local";
import "./globals.css";

const keiner = localFont({
  src: [
    {
      path: "../public/font/Keiner_1024FPU/TTF/Keiner-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/font/Keiner_1024FPU/TTF/Keiner-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/font/Keiner_1024FPU/TTF/Keiner-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/Keiner_1024FPU/TTF/Keiner-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/Keiner_1024FPU/TTF/Keiner-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/Keiner_1024FPU/TTF/Keiner-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/font/Keiner_1024FPU/TTF/Keiner-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-keiner",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MAD Graphix",
  description: "Design and Development",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="PTZDRGmQAsl75nljt0vaOtv3ZcTexP8xNLKZToic32I" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${keiner.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
