import { FolderGit2, Terminal, Award } from "lucide-react";

const STEPS = [
  {
    n: 1,
    title: "Pick a project",
    desc: "Choose from real-world backend projects across languages and skill levels — each modeled on systems engineers actually build.",
    icon: FolderGit2,
    accent: "bg-[#0B152A] text-white",
  },
  {
    n: 2,
    title: "Build with our playground",
    desc: "Write, run, and test your code in a full in-browser playground. Complete tasks, pass the graders, and ship a working backend.",
    icon: Terminal,
    accent: "bg-[#13AECE] text-white",
  },
  {
    n: 3,
    title: "Create Backend Portfolio",
    desc: "Every completed project becomes a portfolio piece — proof of real engineering skill you can show employers.",
    icon: Award,
    accent: "bg-[#3B82F6] text-white",
  },
];

export function PracticeSteps() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-[1100px]">
        <div className="text-center mb-14">
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-[#0B152A] leading-tight">
            Three simple ways to become a
            <br className="hidden md:block" />{" "}
            <span className="text-[#13AECE]">world-class engineer.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.n}
                className="relative bg-[#F8FAFC] rounded-2xl border border-slate-100 p-8 flex flex-col"
              >
                <div className="flex items-center justify-between mb-12">
                  <span
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step.accent}`}
                  >
                    {step.n}
                  </span>
                  <Icon className="w-6 h-6 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-[#0B152A] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
