import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRightIcon,
  Code2Icon,
  GithubIcon,
  LinkedinIcon,
  SparklesIcon,
  TwitterIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
  XIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import AboutUsPage from "../components/AboutUs";

function HomePage() {
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowDemo(false);
    };
    if (showDemo) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [showDemo]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30 flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-9 rounded-lg bg-blue-600 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <SparklesIcon className="size-5 text-white fill-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">PeerPrep</span>
          </Link>

          <div className="flex items-center gap-6">
            <a href="#about-us" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block">
              About Us
            </a>
            <a href="#contact-us" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block">
              Contact Us
            </a>
            <SignInButton mode="modal">
              <button className="px-5 py-2 text-sm font-medium rounded-full bg-white text-slate-950 hover:bg-blue-50 transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-medium uppercase tracking-wider">
                <ZapIcon className="size-3" />
                Collaborative Practice
              </div>

              <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
                Stay consistent with <br />
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Peer Coding
                </span>
              </h1>

              <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                PeerPrep is a LeetCode-style platform where two people solve the same problem independently while discussing approaches through video, chat, and optional screen sharing.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <SignInButton mode="modal">
                  <button className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all hover:scale-105 flex items-center gap-2">
                    Start Practicing
                    <ArrowRightIcon className="size-4" />
                  </button>
                </SignInButton>

                <button
                  onClick={() => setShowDemo(true)}
                  className="h-12 px-8 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 font-medium transition-all flex items-center gap-2"
                >
                  <VideoIcon className="size-4 text-slate-400" />
                  Watch Demo
                </button>
              </div>

              <div className="pt-8 border-t border-white/5 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="size-10 rounded-full bg-slate-800 border-2 border-slate-950 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover opacity-80" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="block text-white font-bold">Growing Community</span>
                  <span className="text-slate-500">Beginners practicing together</span>
                </div>
              </div>
            </div>

            <div className="relative group perspective-1000">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative rounded-2xl bg-slate-900 border border-white/10 overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2940&auto=format&fit=crop"
                  alt="Interface"
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: UsersIcon,
                title: "Peer Accountability",
                desc: "Solve the same problem alongside another learner to stay motivated and consistent.",
              },
              {
                icon: Code2Icon,
                title: "Independent Coding",
                desc: "Each user writes code locally with no shared editor, keeping learning honest.",
              },
              {
                icon: VideoIcon,
                title: "Discuss When Stuck",
                desc: "Use video, chat, or screen sharing to discuss logic and unblock yourself.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                <div className="size-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                  <feature.icon className="size-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <AboutUsPage />

      <footer className="border-t border-white/5 bg-slate-950 py-16 px-6" id="contact-us">
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} PeerPrep. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="https://x.com/anujguptaaj123" target="_blank" className="text-slate-500 hover:text-white transition-colors"><TwitterIcon className="size-5" /></a>
            <a href="https://github.com/Anuj12Gupta-dev" target="_blank" className="text-slate-500 hover:text-white transition-colors"><GithubIcon className="size-5" /></a>
            <a href="https://www.linkedin.com/in/anuj-gupta-b930a0264/" target="_blank" className="text-slate-500 hover:text-white transition-colors"><LinkedinIcon className="size-5" /></a>
          </div>
        </div>
      </footer>

      {showDemo && (
        <div
          onClick={() => setShowDemo(false)}
          className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl mx-4 scale-100 animate-in fade-in zoom-in duration-200"
          >
            <button
              onClick={() => setShowDemo(false)}
              className="absolute -top-10 right-0 text-white opacity-70 hover:opacity-100"
            >
              <XIcon className="size-5" />
            </button>

            <video
              src="/PeerPrepDemo.mp4"
              controls
              autoPlay
              className="w-full rounded-xl border border-white/10 bg-black"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
