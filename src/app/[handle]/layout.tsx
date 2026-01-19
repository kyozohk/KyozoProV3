import { ProLayoutClient } from '@/components/layout/pro-layout-client';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProLayoutClient>{children}</ProLayoutClient>;
}
