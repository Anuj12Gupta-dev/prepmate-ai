import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import {
  Loader2Icon,
  MessageSquareIcon,
  UsersIcon,
  MoveIcon,
  Minimize2,
  Expand,
  XIcon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";

function VideoCallUI({ chatClient, channel }) {
  const navigate = useNavigate();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();

  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 24, y: 24 });

  const [chatPos, setChatPos] = useState({
    x: window.innerWidth / 2 - 160,
    y: window.innerHeight * 0.25,
  });


  const [dragChat, setDragChat] = useState(false);

  const dragOffset = useRef({ x: 0, y: 0 });
  const chatOffset = useRef({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    if (!e.target.closest(".drag-handle")) return;
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const onChatDown = (e) => {
    if (!e.target.closest(".chat-drag-handle")) return;
    setDragChat(true);
    chatOffset.current = {
      x: e.clientX - chatPos.x,
      y: e.clientY - chatPos.y,
    };
  };

  useEffect(() => {
    const move = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
      }
      if (dragChat) {
        setChatPos({
          x: e.clientX - chatOffset.current.x,
          y: e.clientY - chatOffset.current.y,
        });
      }
    };

    const up = () => {
      setIsDragging(false);
      setDragChat(false);
    };

    if (isDragging || dragChat) {
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    }

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [isDragging, dragChat]);

  if (callingState === CallingState.JOINING) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <Loader2Icon className="w-10 h-10 animate-spin text-white" />
      </div>
    );
  }

  return (
    <>
      {/* VIDEO CALL */}
      <div
        className={`fixed z-50 str-video bg-base-100 rounded-lg shadow-xl border border-gray-700 ${isMinimized ? "w-64" : "w-96"}`}
        style={{ left: position.x, top: position.y }}
        onMouseDown={onMouseDown}
      >

        <div className="drag-handle flex items-center justify-between bg-gray-800 px-3 py-2 rounded-t-lg cursor-move">
          <div className="flex items-center gap-2">
            <MoveIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Video Call</span>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="btn btn-xs btn-ghost"
          >
            {isMinimized ? <Expand /> : <Minimize2 />}
          </button>
        </div>

        {!isMinimized && (
          <>
            <div className="flex items-center justify-between px-3 py-2 bg-gray-800">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">
                  {participantCount} participant
                </span>
              </div>

              {chatClient && channel && (
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="btn btn-xs btn-outline text-white"
                >
                  <MessageSquareIcon className="w-4 h-4" />
                  Chat
                </button>
              )}
            </div>

            <div className="h-56 bg-gray-800 overflow-hidden">
              <SpeakerLayout />
            </div>

            <div className="bg-gray-800 rounded-b-lg">
              <CallControls onLeave={() => navigate("/dashboard")} />
            </div>

          </>
        )}
      </div>

      {/* DRAGGABLE CHAT */}
      {chatClient && channel && isChatOpen && (
        <div
          className="fixed z-50 w-80 h-[70vh] bg-base-100 border border-gray-700 rounded-lg shadow-xl overflow-hidden"
          style={{ left: chatPos.x, top: chatPos.y }}
          onMouseDown={onChatDown}
        >
          {/* CHAT HEADER */}
          <div className="chat-drag-handle flex items-center justify-between bg-gray-800 px-3 py-2 cursor-move">
            <div className="flex items-center gap-2">
              <MoveIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Session Chat</span>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="btn btn-xs btn-ghost"
            >
              ✕
            </button>
          </div>

          {/* CHAT BODY — IMPORTANT */}
          <div className="h-[calc(70vh-40px)]">
            <Chat client={chatClient} theme="str-chat__theme-dark">
              <Channel channel={channel}>
                <Window className="h-full flex flex-col">
                  <MessageList />
                  <MessageInput />
                </Window>
                <Thread />
              </Channel>
            </Chat>
          </div>
        </div>
      )}

    </>
  );
}

export default VideoCallUI;
