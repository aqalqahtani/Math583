import { useState } from "react";

export default function InsightCard() {
  const [open, setOpen] = useState(true);
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Mathematical Insight — How de Casteljau works
        </h2>
        <button
          onClick={() => setOpen((p) => !p)}
          className="text-sm text-slate-500 hover:text-slate-700"
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>
      {open && (
        <div className="mt-4 space-y-4 text-sm text-slate-700">
          <p>
            Given control points <code>P₀, P₁, …, Pₙ</code> and a parameter{" "}
            <code>t ∈ [0,1]</code>, de Casteljau constructs new points between consecutive points:
          </p>
          <pre className="bg-slate-900 text-slate-50 rounded-lg p-4 overflow-auto text-xs leading-relaxed">
{`function deCasteljau(points, t):
    while length(points) > 1:
        next = []
        for i from 0 to length(points)-2:
            Q = (1 - t) * points[i] + t * points[i+1]
            next.push(Q)
        points = next
    return points[0]`}
          </pre>
          <p>
            Each “level” corresponds to one step of interpolation. The final single point we get is
            exactly the Bézier curve evaluated at <code>t</code>.
          </p>

        </div>
      )}
    </section>
  );
}
