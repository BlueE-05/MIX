import CRMLayout from '@/components/CRMLayout';

export const metadata = {
  title: "MIX CRM",
  description: "CRM by RAYDEV",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CRMLayout>{children}</CRMLayout>;
}