export default function Hero() {
  return (
    <header className="bg-gradient-to-b from-white to-slate-100 mb-12 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1 space-y-5">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
            MATH-583 Bézier Learning Lab - Project1
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Learn de Casteljau’s Algorithm <span className="text-brand-600">interactively.</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
            Move control points, change the parameter interval, and watch the recursive subdivision
            happen in real time. Perfect for students, teachers, and curious math people.
          </p>
          <div className="flex gap-3">
            <a
              href="#theory"
              className="bg-brand-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-brand-500 transition"
            >
              Start with theory
            </a>
            <a
              href="#playground-1"
              className="border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg font-medium hover:bg-white transition"
            >
              Jump to playgrounds
            </a>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
            <p className="text-sm mb-3 text-slate-500">What you’ll see:</p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Control polygon</li>
              <li>• Interpolated points at t</li>
              <li>• Final point on the Bézier curve</li>
              <li>• Animation of t from 0 → 1</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
