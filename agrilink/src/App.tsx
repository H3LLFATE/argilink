import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MobileShell } from './components/layout/MobileShell';
import { DemoGuideBar } from './components/demo/DemoGuideBar';
import { HomeDashboard } from './components/dashboard/HomeDashboard';
import { CropsView } from './components/crops/CropsView';
import { AiScanView } from './components/scan/AiScanView';
import { StudyView } from './components/study/StudyView';
import { CommunityView } from './components/community/CommunityView';
import { MarketView } from './components/market/MarketView';

// Modals
import { CropDetailModal } from './components/crops/CropDetailModal';
import { AddCropModal } from './components/crops/AddCropModal';
import { FarmMapView } from './components/crops/FarmMapView';
import { MentorChatModal } from './components/mentors/MentorChatModal';
import { RemindersModal } from './components/reminders/RemindersModal';
import { NotificationsModal } from './components/notifications/NotificationsModal';
import { ProfileModal } from './components/profile/ProfileModal';
import { OutboxModal } from './components/outbox/OutboxModal';
import { OnboardingModal } from './components/auth/OnboardingModal';

import { ErrorBoundary } from './components/common/ErrorBoundary';

const AppContent: React.FC = () => {
  const { activeTab, isOnboardingOpen, setIsOnboardingOpen } = useApp();

  return (
    <div className="min-h-screen bg-stone-100 sm:bg-stone-200/60 flex flex-col items-center justify-start text-stone-900 selection:bg-emerald-200">
      {/* Top Demo Bar for Hackathon Judges */}
      <DemoGuideBar />

      {/* Primary Mobile-First Shell */}
      <div className="w-full flex-1 flex justify-center sm:py-6 sm:px-4">
        <MobileShell>
          <ErrorBoundary fallbackTitle="Application View Notice">
            {activeTab === 'home' && <HomeDashboard />}
            {activeTab === 'crops' && <CropsView />}
            {activeTab === 'scan' && <AiScanView />}
            {activeTab === 'study' && <StudyView />}
            {activeTab === 'community' && <CommunityView />}
            {activeTab === 'market' && <MarketView />}
          </ErrorBoundary>
        </MobileShell>
      </div>

      {/* Global Modals & Drawers */}
      <CropDetailModal />
      <AddCropModal />
      <FarmMapView />
      <MentorChatModal />
      <RemindersModal />
      <NotificationsModal />
      <ProfileModal />
      <OutboxModal />
      <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
