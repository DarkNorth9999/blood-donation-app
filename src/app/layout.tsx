import { Inter } from "next/font/google";
import MainHeader from '../components/main-header/main-header';
import "./globals.css";
import AuthProvider from "./context/AuthProvider"
import { useSession } from "next-auth/react";
import type { Metadata, Viewport } from "next";

const APP_NAME = "Blood Donation App";
const APP_DEFAULT_TITLE = "Blood Donation App";
const APP_TITLE_TEMPLATE = "%s - Blood Donation App";
const APP_DESCRIPTION = "Your donation can save lives";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};


const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   manifest: '/public/manifest.json',
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body>
          <MainHeader/>
        {children}
        </body>
    </html>
  );
}
