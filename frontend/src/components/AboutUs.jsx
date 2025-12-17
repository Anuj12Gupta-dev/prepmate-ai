import { Link } from "react-router";
import {
  ArrowRightIcon,
  Code2Icon,
  TargetIcon,
  UsersIcon,
  HeartHandshakeIcon,
} from "lucide-react";

function AboutUsPage() {
  const teamMembers = [
    { name: "Alex Chen", role: "Co-Founder / Engineering", img: "https://i.pravatar.cc/100?img=47" },
    { name: "Sarah Lee", role: "Co-Founder / Product", img: "https://i.pravatar.cc/100?img=52" },
    { name: "Mike Johnson", role: "Lead Developer", img: "https://i.pravatar.cc/100?img=65" },
    { name: "Emily Davis", role: "Design & UX", img: "https://i.pravatar.cc/100?img=17" },
  ];

  const coreValues = [
    {
      icon: Code2Icon,
      title: "Learning Over Performance",
      desc: "We prioritize understanding and consistency over speed or comparison.",
    },
    {
      icon: UsersIcon,
      title: "Peer Support",
      desc: "Learning is easier when you are not solving problems alone.",
    },
    {
      icon: HeartHandshakeIcon,
      title: "Judgment-Free Practice",
      desc: "A safe space where beginners can ask questions and grow together.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col" id="about-us">
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          <section className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-medium uppercase tracking-wider">
              <TargetIcon className="size-3" />
              Our Mission
            </div>

            <h1 className="text-5xl lg:text-6xl font-semibold leading-tight">
              Making coding practice <br />
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                consistent and collaborative
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              PeerPrep was built to help beginners stay consistent by practicing together,
              discussing approaches, and learning through peer interaction.
            </p>

            <Link to="/dashboard">
              <button className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 transition flex items-center gap-2 mx-auto">
                Explore Platform
                <ArrowRightIcon className="size-4" />
              </button>
            </Link>
          </section>

          <section className="space-y-12">
            <h2 className="text-4xl font-semibold text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {coreValues.map((value, idx) => (
                <div key={idx} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition">
                  <div className="size-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6">
                    <value.icon className="size-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-slate-400 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-12">
            <h2 className="text-4xl font-semibold text-center">Meet the Team</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-white/5 bg-white/[0.02] text-center">
                  <div className="size-20 mx-auto rounded-full overflow-hidden border border-blue-500/50">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="mt-3 font-semibold">{member.name}</h3>
                  <p className="text-xs text-slate-500">{member.role}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-20 px-10 rounded-3xl bg-slate-900 border border-white/10 text-center space-y-6">
            <h2 className="text-4xl font-bold">Practice better, together</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Join PeerPrep and turn solo problem-solving into a collaborative habit.
            </p>
            <Link to="/signup">
              <button className="h-14 px-10 rounded-full bg-blue-600 hover:bg-blue-500 transition flex items-center gap-2 mx-auto">
                Get Started
                <ArrowRightIcon className="size-5" />
              </button>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AboutUsPage;
