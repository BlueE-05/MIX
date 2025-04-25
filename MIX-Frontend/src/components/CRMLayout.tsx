"use client";

import Sidebar from '@/components/Sidebar/Sidebar';
import { useState } from 'react';
import { ReactNode } from 'react';
import Image from 'next/image';
import { useProfile } from '@/hooks/useProfile';
import { useSession } from '@/hooks/useSession';
import UnauthorizedAccess from '@/components/Cards/Authorizations/UnauthorizedAccess';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useEmailVerificationStatus } from "@/hooks/useEmailVerification";

interface CRMLayoutProps {
  children: ReactNode;
}

export default function CRMLayout({ children }: CRMLayoutProps) {
  const [locallyVerified, setLocallyVerified] = useState(false);
  const { isAuthenticated, loading: loadingSession } = useSession();
  const { profile, loading: loadingProfile } = useProfile();
  const {
    emailVerified,
    secondsLeft,
    loading: resendLoading,
    error,
    checkStatus,
    resend,
    isChecking,
    redirecting,
  } = useEmailVerificationStatus();

  // Loading
  if (loadingSession || loadingProfile || isChecking) {
    return <LoadingSpinner />;
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <UnauthorizedAccess reason="unauthenticated" />;
  }

  // No profile
  if (!profile) {
    return <UnauthorizedAccess reason="forbidden" />;
  }

  // Not verified
  if (!emailVerified && !locallyVerified && !isChecking) {
    return (
      <UnauthorizedAccess
        reason="not-verified"
        onRetry={async () => {
          const verified = await checkStatus();
          if (verified) {
            setLocallyVerified(true); // oculta el modal sin redireccionar
          }
        }}
        onResend={resend}
        loading={resendLoading}
        error={error}
        emailVerified={!!emailVerified}
        secondsLeft={secondsLeft}
        redirecting={redirecting}
      />
    );
  }  

  // Authenticated & verified
  return (
    <div className="min-h-screen flex">
      <aside className="flex-shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </aside>
      <main className="flex-grow overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-end p-4 pr-5 bg-gray-800 text-white shadow-md">
          {profile.profilePic && (
            <Image
              src={profile.profilePic}
              alt="Profile picture"
              width={32}
              height={32}
              className="rounded-full mr-2"
            />
          )}
          <span className="font-bold text-xl mr-4">
            {`${profile.name} ${profile.lastName}`}
          </span>
        </div>
        <div className="pt-10">{children}</div>
      </main>
    </div>
  );
}