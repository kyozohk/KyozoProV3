'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getCommunityByHandle } from '@/lib/community-utils';
import { Community } from '@/types/community';
import { Settings as SettingsIcon, Users, Bell, Shield, Palette } from 'lucide-react';

export default function SettingsPage() {
  const params = useParams();
  const handle = params.handle as string;
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCommunity() {
      if (!handle) return;
      
      try {
        const communityData = await getCommunityByHandle(handle);
        if (communityData) {
          setCommunity(communityData);
        }
      } catch (error) {
        console.error('Error fetching community:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCommunity();
  }, [handle]);

  if (loading || !community) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F1E8]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#D4A574] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#F5F1E8] overflow-y-auto">
      <div className="p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold text-[#3A3630]">Settings</h1>
            <p className="text-[#6B6358]">
              Configure your community settings and preferences
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border-2 border-[#E8DFD0] bg-white p-6 shadow-sm hover:border-[#D4A574] hover:shadow-xl transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8DFD0]">
                  <Users className="h-6 w-6 text-[#8B7355]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#3A3630]">General Settings</h3>
                  <p className="text-sm text-[#6B6358]">Community name, description, and basic information</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-[#E8DFD0] bg-white p-6 shadow-sm hover:border-[#D4A574] hover:shadow-xl transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8DFD0]">
                  <Shield className="h-6 w-6 text-[#8B7355]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#3A3630]">Privacy & Security</h3>
                  <p className="text-sm text-[#6B6358]">Manage member permissions and privacy settings</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-[#E8DFD0] bg-white p-6 shadow-sm hover:border-[#D4A574] hover:shadow-xl transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8DFD0]">
                  <Bell className="h-6 w-6 text-[#8B7355]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#3A3630]">Notifications</h3>
                  <p className="text-sm text-[#6B6358]">Configure notification preferences</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-[#E8DFD0] bg-white p-6 shadow-sm hover:border-[#D4A574] hover:shadow-xl transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8DFD0]">
                  <Palette className="h-6 w-6 text-[#8B7355]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#3A3630]">Appearance</h3>
                  <p className="text-sm text-[#6B6358]">Customize your community's look and feel</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border-2 border-dashed border-[#D8CFC0] bg-white p-12 text-center shadow-sm">
            <div className="mb-4 flex h-20 w-20 mx-auto items-center justify-center rounded-2xl bg-[#E8DFD0]">
              <SettingsIcon className="h-10 w-10 text-[#8B7355]" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-[#3A3630]">Settings functionality coming soon</h3>
            <p className="text-[#6B6358]">
              Detailed settings configuration will be available soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
