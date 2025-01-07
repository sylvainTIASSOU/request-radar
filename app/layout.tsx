import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "@/components/ui/toaster";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Roboto_Slab } from 'next/font/google';

const roboto = Roboto_Slab({
  subsets: ['latin'], // Spécifiez les caractères nécessaires (latin, cyrillic, etc.)
  weight: ['100', "200", "300", "400", "500", "600", "700", "800", "900"], // Poids des polices (normal, bold, etc.)
});



export const metadata: Metadata = {
  title: "Request Radar",
  description: "App for watching requests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className}`}
      >
        <ReduxProvider>
        <AntdRegistry>{children}</AntdRegistry>
           <Toaster/>
        </ReduxProvider>
       
      </body>
    </html>
  );
}
