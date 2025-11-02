export default function Theory() {
  return (
    <section id="theory" className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">What is de Casteljau’s algorithm?</h2>
      <p className="text-slate-600 leading-relaxed">
        de Casteljau’s algorithm is a geometric, numerically stable way to evaluate a Bézier curve
        at a parameter <code>t</code> (usually in [0,1]). It works by repeatedly interpolating
        between control points. On every level, the number of points decreases by one — until only
        one point remains: that’s the point on the curve.
      </p>
      <p className="text-slate-600 leading-relaxed">
        One of the reasons it’s popular is that it works for <strong>any degree</strong>, not just
        quadratic or cubic. It’s also easy to visualize, which is what we’ll do below.
      </p>
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <p className="text-sm text-slate-500 mb-2">Linear interpolation (LERP):</p>
        <code className="block bg-slate-900 text-slate-50 rounded-lg p-3 text-sm">
{`P(t) = (1 - t) * P0 + t * P1
// works for points in 2D, 3D, ...`}
        </code>
        <p className="text-sm text-slate-500 mt-3">
          de Casteljau just repeats this idea between each consecutive pair.
        </p>
      </div>
    </section>
  );
}
