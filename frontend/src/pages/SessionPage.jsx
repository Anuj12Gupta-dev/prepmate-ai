import { useUser } from "@clerk/clerk-react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";
import Navbar from "../components/Navbar";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Loader2Icon, LogOutIcon, ShareIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";
import toast from "react-hot-toast";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();

  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState(0); // Default to first test case
  const [testCaseResults, setTestCaseResults] = useState({}); // Store results for each test case

  // Data fetching and Mutations
  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);
  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  // Derived Session State
  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  // Stream Client Hooks
  const { call, channel, chatClient, streamClient } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  // Find problem data from static problem list
  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  // Code Editor State
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(problemData?.starterCode?.javascript || "");

  // --- Effects ---

  // Auto-join participant when session data loads
  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (session.status !== "active") return;

    if (!isHost && !isParticipant) {
      joinSessionMutation.mutate(id, { onSuccess: refetch });
    }
  }, [session, user, loadingSession, isHost, isParticipant, id, joinSessionMutation, refetch]);

  // Redirect non-host users when session ends
  useEffect(() => {
    if (!session || loadingSession) return;

    if (session.status === "completed" && !isHost) {
      toast.error("The host has ended the session.");
      navigate("/dashboard");
    }
  }, [session, loadingSession, navigate, isHost]);

  // Update code when problem loads or changes language
  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  // --- Handlers ---

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    const starterCode = problemData?.starterCode?.[newLang] || "";
    setCode(starterCode);
    setOutput(null);
  };

  const handleRunCode = useCallback(async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    // NOTE: Full test case checking logic is excluded here but can be added back if needed.
    if (result.success) {
      toast.success("Code executed successfully.");
    } else {
      toast.error("Code execution failed!");
    }
  }, [selectedLanguage, code]);

  const handleEndSession = useCallback(() => {
    if (confirm("Are you sure you want to end this session? All participants will be notified.")) {
      endSessionMutation.mutate(id, {
        onSuccess: () => {
          // Host is navigated to dashboard by onSuccess callback
          toast.success("Session successfully ended.");
          navigate("/dashboard");
        },
        onError: () => toast.error("Failed to end session.")
      });
    }
  }, [endSessionMutation, id, navigate]);

  const handleShareSession = () => {
    const sessionUrl = `${window.location.origin}/session/${id}`;
    navigator.clipboard.writeText(sessionUrl)
      .then(() => toast.success("Session link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link to clipboard"));
  };

  if (loadingSession || joinSessionMutation.isPending) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <Loader2Icon className="size-10 animate-spin text-blue-500" />
        <p className="ml-3 text-lg text-slate-300">Loading Session...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <h1 className="text-3xl font-bold mb-4">Session Not Found</h1>
        <p className="text-slate-400 mb-6">The session ID "{id}" does not exist or has been deleted.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  // --- Rendering UI ---

  return (
    // Outer container: full screen height, flex column
    <div className="h-screen flex flex-col bg-slate-950 text-white"> 
      <Navbar />
    
      {/* Main Content Area: Offset for fixed navbar */}
      <div className="flex-1 pt-16"> 
        <PanelGroup direction="horizontal">

          {/* LEFT PANEL: Problem Description & Info */}
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">

              {/* TOP: Session Header & Problem Info */}
              <Panel defaultSize={100} minSize={20}>
                {/* Note: The 'h-full' inside this div ensures the overflow works correctly within the panel height */}
                <div className="h-full overflow-y-auto bg-slate-950 border-r border-white/5">
                  {/* HEADER SECTION (Sticky appearance) */}
                  <div className="sticky top-0 z-10 p-6 bg-slate-900 border-b border-white/5 shadow-md">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                      {/* Title & Info */}
                      <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                          {session?.problem || "Untitled Problem"}
                        </h1>
                        <p className="text-slate-400 mt-1 text-sm">{problemData?.category || "Data Structures"}</p>
                        <p className="text-slate-500 mt-2 text-xs">
                          Host: **{session?.host?.name || "Loading..."}** • Participants: {session?.participant ? 2 : 1}/2
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span
                          className={`px-3 py-1 text-sm font-semibold rounded-md flex-shrink-0 capitalize ${getDifficultyBadgeClass(session?.difficulty)}`}
                        >
                          {session?.difficulty}
                        </span>

                        {session?.status === "active" && (
                          <button
                            onClick={handleShareSession}
                            className=" px-3 py-1 text-sm font-medium rounded-lg bg-slate-700 hover:bg-slate-600 text-white flex items-center gap-2 transition-colors"
                            title="Copy Session Link"
                          >
                            <ShareIcon className="size-4" />
                            Share
                          </button>
                        )}

                        {isHost && session?.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            disabled={endSessionMutation.isPending}
                            className="px-3 py-1 text-sm font-medium rounded-lg bg-red-600 hover:bg-red-500 text-white flex items-center gap-2 transition-colors disabled:opacity-50"
                          >
                            {endSessionMutation.isPending ? (
                              <Loader2Icon className="size-4 animate-spin" />
                            ) : (
                              <LogOutIcon className="size-4" />
                            )}
                            End
                          </button>
                        )}

                        {session?.status === "completed" && (
                          <span className="px-3 py-1 text-sm font-medium rounded-lg bg-slate-700 text-slate-400">
                            Ended
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Problem Description Body */}
                  <div className="p-6 space-y-6">
                    {/* problem desc */}
                    {problemData?.description && (
                      <div className="p-5 rounded-xl border border-white/5 bg-slate-900 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-white border-b border-white/5 pb-2">Description</h2>
                        <div className="space-y-4 text-base text-slate-300 leading-relaxed">
                          <p>{problemData.description.text}</p>
                          {problemData.description.notes?.map((note, idx) => (
                            <p key={idx} className="text-slate-400 italic">
                              {note}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* examples section (Simplified for brevity) */}
                    {problemData?.examples && problemData.examples.length > 0 && (
                      <div className="p-5 rounded-xl border border-white/5 bg-slate-900 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-white border-b border-white/5 pb-2">Examples</h2>
                        <div className="space-y-4">
                          {problemData.examples.map((example, idx) => (
                            <div key={idx} className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm space-y-1.5">
                              <div className="flex gap-2">
                                <span className="text-blue-400 font-bold min-w-[70px]">Input:</span>
                                <span className="text-slate-300">{example.input}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-violet-400 font-bold min-w-[70px]">Output:</span>
                                <span className="text-slate-300">{example.output}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Constraints */}
                    {problemData?.constraints && problemData.constraints.length > 0 && (
                      <div className="p-5 rounded-xl border border-white/5 bg-slate-900 shadow-sm">
                        <h2 className="text-xl font-bold mb-4 text-white border-b border-white/5 pb-2">Constraints</h2>
                        <ul className="space-y-2 text-slate-300">
                          {problemData.constraints.map((constraint, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <span className="text-blue-500 text-lg leading-none">•</span>
                              <code className="text-sm bg-slate-800/50 rounded px-1 py-[1px] leading-relaxed block">{constraint}</code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>

          {/* Vertical Resize Handle */}
          <PanelResizeHandle className="w-2 bg-slate-800 hover:bg-blue-600 transition-colors cursor-col-resize border-x border-white/5" />

          {/* RIGHT PANEL: Code Editor & Output */}
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">

              {/* Top Panel - Code editor */}
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>

              {/* Horizontal Resize Handle */}
              <PanelResizeHandle className="h-2 bg-slate-800 hover:bg-blue-600 transition-colors cursor-row-resize border-y border-white/5" />

              {/* Bottom Panel - Output Panel */}
              <Panel defaultSize={30} minSize={15}>
                <OutputPanel 
                  output={output} 
                  testCases={problemData?.examples}
                  selectedTestCase={selectedTestCase}
                  onSelectTestCase={setSelectedTestCase}
                  testCaseResults={testCaseResults}
                />
              </Panel>
            </PanelGroup>
          </Panel>

        </PanelGroup>
      </div>

      {/* Floating Video Call UI */}
      {streamClient && call && (
        <StreamVideo client={streamClient}>
          <StreamCall call={call}>
            {/* Renders the draggable video and chat windows */}
            <VideoCallUI chatClient={chatClient} channel={channel} />
          </StreamCall>
        </StreamVideo>
      )}
    </div>
  );
}

export default SessionPage;