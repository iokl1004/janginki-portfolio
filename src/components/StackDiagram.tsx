import { profile } from '../data/profile'

export default function StackDiagram() {
  return (
    <figure className="rounded-2xl border border-gray-200 bg-white/90 shadow-xl shadow-black/5 backdrop-blur dark:bg-slate-900/80">
      <div className="flex items-center gap-1.5 border-b border-gray-200 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
        <span className="ml-3 font-mono text-xs text-gray-500">request → response</span>
      </div>

      <ol className="relative mx-5 my-3">
        <div aria-hidden className="absolute bottom-10 left-[18px] top-10 w-px bg-gray-200">
          <span className="packet-down absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-blue-500" />
          <span className="packet-up absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-blue-500" />
        </div>

        {profile.layers.map((l) => (
          <li key={l.name} className="flex gap-4 py-3">
            <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white font-mono text-[11px] font-semibold text-blue-600 dark:bg-slate-900">
              {l.badge}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold">
                {l.name} <span className="ml-1 font-normal text-gray-500">{l.caption}</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {l.work.map((s) => (
                  <span key={s} className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-950">
                    {s}
                  </span>
                ))}
                {l.study.map((s) => (
                  <span key={s} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <figcaption className="flex gap-4 border-t border-gray-200 px-5 py-3 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-blue-500" /> 실무
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-gray-300" /> 학습
        </span>
      </figcaption>
    </figure>
  )
}
