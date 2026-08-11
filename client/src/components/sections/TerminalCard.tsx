const Line = ({ children }: { children: React.ReactNode }) => (
  <div className="whitespace-pre">{children}</div>
);

export default function TerminalCard() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-violet-600/25 via-transparent to-teal-400/20 blur-2xl" />
      <div className="float-animation relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117]/90 shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 font-mono text-xs text-[#6E7681]">william.ts — ~/profile</span>
        </div>
        <div className="p-5 font-mono text-[13px] leading-7 sm:text-sm">
          <Line>
            <span className="text-[#C586C0]">const</span>{" "}
            <span className="text-[#E6EDF3]">william</span>{" "}
            <span className="text-[#7D8590]">=</span>{" "}
            <span className="text-[#7D8590]">{"{"}</span>
          </Line>
          <Line>
            <span className="text-[#9CDCFE]">  role</span>
            <span className="text-[#7D8590]">:</span>{" "}
            <span className="text-[#3ECF8E]">"Full-Stack Engineer"</span>
            <span className="text-[#7D8590]">,</span>
          </Line>
          <Line>
            <span className="text-[#9CDCFE]">  focus</span>
            <span className="text-[#7D8590]">:</span>{" "}
            <span className="text-[#3ECF8E]">[</span>
            <span className="text-[#3ECF8E]">"AI Agents"</span>
            <span className="text-[#7D8590]">,</span>{" "}
            <span className="text-[#3ECF8E]">"SaaS"</span>
            <span className="text-[#7D8590]">,</span>{" "}
            <span className="text-[#3ECF8E]">"Web"</span>
            <span className="text-[#3ECF8E]">]</span>
            <span className="text-[#7D8590]">,</span>
          </Line>
          <Line>
            <span className="text-[#9CDCFE]">  company</span>
            <span className="text-[#7D8590]">:</span>{" "}
            <span className="text-[#3ECF8E]">"Best IT Consulting"</span>
            <span className="text-[#7D8590]">,</span>
          </Line>
          <Line>
            <span className="text-[#9CDCFE]">  base</span>
            <span className="text-[#7D8590]">:</span>{" "}
            <span className="text-[#3ECF8E]">"Surrey, BC 🇨🇦"</span>
            <span className="text-[#7D8590]">,</span>
          </Line>
          <Line>
            <span className="text-[#9CDCFE]">  hireable</span>
            <span className="text-[#7D8590]">:</span>{" "}
            <span className="text-[#D97757]">true</span>
            <span className="text-[#7D8590]">,</span>
          </Line>
          <Line>
            <span className="text-[#7D8590]">{"};"}</span>
            <span className="blink-cursor ml-1 inline-block h-[15px] w-[8px] translate-y-[2px] rounded-[2px] bg-[#3ECF8E]" />
          </Line>
        </div>
      </div>
    </div>
  );
}
