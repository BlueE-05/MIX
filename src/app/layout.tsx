import Sidebar from '@/components/Sidebar';

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MIX",
  description: "CRM by RAYDEV",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen w-full flex">
          <aside className="flex-shrink-0 sticky top-0 h-screen">
            <Sidebar />
          </aside>
          <main className="flex-grow overflow-y-auto">
              
              {/* Línea superior con foto y nombre */}
              <div className="sticky top-0 z-10 flex items-center justify-end p-4 pr-5 bg-gray-800 text-white shadow-md">
                  <img src="/profile.jpg" alt="Profile picture" className="w-8 h-8 rounded-full mr-2"/>
                  <span className="font-bold text-xl">Mary Sue</span>
              </div>

              <div className="pt-10">
                {children}
              </div>

          </main>
        </div>
      </body>
    </html>
  );
} 