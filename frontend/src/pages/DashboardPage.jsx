import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useActiveSessions, useCreateSession, useMyRecentSessions } from "../hooks/useSessions";

import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";
import PasswordModal from "../components/PasswordModal";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  const createSessionMutation = useCreateSession();

  const { data: activeSessionsData, isLoading: loadingActiveSessions } = useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } = useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    const sessionData = {
      problem: roomConfig.problem,
      difficulty: roomConfig.difficulty.toLowerCase(),
    };
    
    // Add password if it exists
    if (roomConfig.password) {
      sessionData.password = roomConfig.password;
    }

    createSessionMutation.mutate(
      sessionData,
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          setRoomConfig({ problem: "", difficulty: "" });
          navigate(`/session/${data.session._id}`);
        },
      }
    );
  };

  const handleSetPassword = () => {
    setShowCreateModal(false);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = (password) => {
    setRoomConfig(prev => ({ ...prev, password }));
    setShowPasswordModal(false);
    setShowCreateModal(true);
  };

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user?.id) return false;

    return session.host?.clerkId === user.id || session.participant?.clerkId === user.id;
  };

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <Navbar /> 

        <WelcomeSection 
          onCreateSession={() => setShowCreateModal(true)} 
        />

        <div className="max-w-7xl mx-auto px-6 pb-16 pt-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-1">
              <StatsCards
                activeSessionsCount={activeSessions.length}
                recentSessionsCount={recentSessions.length}
              />
            </div>

            <div className="lg:col-span-2">
              <ActiveSessions
                sessions={activeSessions}
                isLoading={loadingActiveSessions}
                isUserInSession={isUserInSession}
              />
            </div>
          </div>

          <div className="mt-8">
            <RecentSessions 
              sessions={recentSessions} 
              isLoading={loadingRecentSessions} 
            />
          </div>

        </div>
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        onSetPassword={handleSetPassword}
        isCreating={createSessionMutation.isPending}
      />
      
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setShowCreateModal(true);
        }}
        onSubmit={handlePasswordSubmit}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
}

export default DashboardPage;