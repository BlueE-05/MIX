"use client";

import Sidebar from '@/components/Sidebar/Sidebar';
import { ReactNode } from 'react';
import Image from 'next/image';
import { useProfile } from '@/hooks/useProfile';
import { useSession } from '@/hooks/useSession';

interface CRMLayoutProps {
  children: ReactNode;
}

export default function CRMLayout({ children }: CRMLayoutProps) {
  const { isAuthenticated, loading } = useSession();
  const { profile } = useProfile();

  if (loading) return <div className="p-8 text-center">Cargando sesión...</div>;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex">
      <aside className="flex-shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </aside>
      <main className="flex-grow overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-end p-4 pr-5 bg-gray-800 text-white shadow-md">
          {profile?.profilePic && (
            <Image
              src={profile.profilePic}
              alt="Profile picture"
              width={32}
              height={32}
              className="rounded-full mr-2"
            />
          )}
          <span className="font-bold text-xl mr-4">
            {profile ? `${profile.name} ${profile.lastName}` : "Cargando..."}
          </span>
        </div>
        <div className="pt-10">
          {children}
        </div>
      </main>
    </div>
  );
}
