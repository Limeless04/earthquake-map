import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { BottomSidebar } from "@/components/layout/BottomSidebar";
import { StateProvider } from "@/providers/StateProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Earthquake Map",
  description: "Interactive Earthquake Map",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class" // This should match your CSS
          defaultTheme="system"
          enableSystem
          themes={["light", "dark", "tokyonight"]}
        >
          <StateProvider>

            <Navbar />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
              <LeftSidebar />
              <main className="flex items-center justify-center md:col-span-12 col-span-1">
                {children}
              </main>
              <RightSidebar />

              <div className="md:col-span-12">
                <BottomSidebar />
              </div>
            </div>

            <Footer />

          </StateProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}
