import Link from "next/link";

export function ProjectsCTA() {
  return (
    <section className="py-16 px-4 bg-[#F8FAFC]">
      <div className="container mx-auto max-w-[1100px]">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2563EB] to-[#3B82F6] px-8 py-16 md:px-16 md:py-20 text-center">
          {/* subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.12,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-[2.75rem] font-bold text-white leading-tight mb-4">
              Stop Reading About
              <br className="hidden md:block" /> Backend Engineering.
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-10">
              Pick a project, open the playground, and build something real.
              No fluff, no toy examples.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://app.masteringbackend.com?ref=projects-cta"
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-[#2563EB] font-semibold hover:bg-slate-100 transition-colors"
              >
                Get started
              </Link>
              <Link
                href="https://www.youtube.com/watch?v=I_fveQqYDxY"
                className="w-full sm:w-auto px-8 py-3 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                View demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
