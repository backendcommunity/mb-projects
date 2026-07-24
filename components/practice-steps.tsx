import { FolderGit2, Terminal, Award } from "lucide-react";

const STEPS = [
  {
    n: 1,
    title: "Pick a project",
    desc: "Choose from real-world backend projects across languages and skill levels, each modeled on systems engineers actually build.",
    icon: FolderGit2,
  },
  {
    n: 2,
    title: "Build with our playground",
    desc: "Write, run, and test your code in a full in-browser playground. Complete tasks, pass the graders, and ship a working backend.",
    icon: Terminal,
  },
  {
    n: 3,
    title: "Create backend portfolio",
    desc: "Every completed project becomes a portfolio piece, proof of real engineering skill you can show employers.",
    icon: Award,
  },
];

export function PracticeSteps() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-[1100px]">
        <div className="text-center mb-14">
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-[#0B152A] leading-tight">
            Three simple ways to become a
            <br className="hidden md:block" />{" "}
            <span className="text-[#13AECE]">production-ready engineer.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.n}
                className={`pt-6 sm:pt-0 ${
                  i === 0
                    ? "border-t sm:border-t-0 border-slate-100"
                    : "border-t sm:border-t-0 sm:border-l border-slate-100 sm:pl-8"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B152A] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {step.n}
                  </span>
                  <Icon className="w-5 h-5 text-[#13AECE]" />
                </div>
                <h3 className="text-lg font-bold text-[#0B152A] mb-1.5">
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
