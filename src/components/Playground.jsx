import { useEffect, useRef, useState } from "react";
import {
  deCasteljauPoint,
  deCasteljauLayers,
  normalizeT,
} from "../lib/bezier";

export default function Playground({ title, subtitle, config }) {
  const {
    id,
    initialPoints,
    initialA,
    initialB,
    initialT,
    locks = {},
    features = {},
  } = config;

  const canvasRef = useRef(null);
  const [points, setPoints] = useState(initialPoints);
  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);
  const [t, setT] = useState(initialT);
  const [animating, setAnimating] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);

  // ===== DRAW =====
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // control polygon
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    // control points
    points.forEach((p, idx) => {
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "10px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(idx, p.x, p.y + 3);
    });

    const t01 = normalizeT(t, a, b);

    // curve
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const samples = 200;
    for (let i = 0; i <= samples; i++) {
      const ts = i / samples;
      const p = deCasteljauPoint(points, ts);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();

    // subdivision lines
    if (features.showSubdivision || features.showLevels) {
      const layers = deCasteljauLayers(points, t01);
      layers.forEach((layer, layerIdx) => {
        ctx.strokeStyle = `rgba(250, 204, 21, ${0.5 + 0.1 * layerIdx})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < layer.length; i++) {
          const p = layer[i];
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
        layer.forEach((p) => {
          ctx.fillStyle = "#f97316";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
          ctx.fill();
        });
      });
    }

    // current point on curve
    const cur = deCasteljauPoint(points, t01);
    ctx.fillStyle = "#e11d48";
    ctx.beginPath();
    ctx.arc(cur.x, cur.y, 6, 0, Math.PI * 2);
    ctx.fill();
  }, [points, a, b, t, features.showSubdivision, features.showLevels]);

  // ===== ANIMATION =====
  useEffect(() => {
    if (!features.animate) return;
    if (!animating) return;
    let frame;
    const loop = () => {
      setT((prev) => {
        let next = prev + (b - a) * 0.005;
        if (next > b) next = a;
        return next;
      });
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [animating, a, b, features.animate]);

  // ===== POINTER HELPERS (with SCALE) =====
  const getCanvasPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // the REAL drawing size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    const pos = getCanvasPos(e);

    // DRAG
    if (features.dragPoints) {
      const hit = points.findIndex(
        (p) => Math.hypot(p.x - pos.x, p.y - pos.y) < 10
      );
      if (hit !== -1) {
        setDragIndex(hit);
        // capture pointer so even if we leave canvas, we still get move
        canvas.setPointerCapture(e.pointerId);
        return;
      }
    }

    // ADD (Alt+click)
    if (features.addRemovePoints && e.altKey) {
      setPoints((prev) => [...prev, { x: pos.x, y: pos.y }]);
    }
  };

  const handlePointerMove = (e) => {
    if (dragIndex === null) return;
    const pos = getCanvasPos(e);
    setPoints((prev) =>
      prev.map((p, idx) => (idx === dragIndex ? { x: pos.x, y: pos.y } : p))
    );
  };

  const handlePointerUp = (e) => {
    if (dragIndex !== null) {
      const canvas = canvasRef.current;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }
    setDragIndex(null);
  };

  // ===== UI handlers =====
  const handleRemoveLast = () => {
    if (!features.addRemovePoints) return;
    if (points.length <= 2) return;
    setPoints((prev) => prev.slice(0, -1));
  };

  const handleReset = () => {
    setPoints(initialPoints);
    setA(initialA);
    setB(initialB);
    setT(initialT);
    setAnimating(false);
    setDragIndex(null);
  };

  const handleExport = () => {
    const json = JSON.stringify(points, null, 2);
    alert("Control points:\n" + json);
  };

  return (
    <section id={id} className="space-y-4 scroll-mt-20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <p className="text-slate-500 text-sm max-w-3xl">{subtitle}</p>
        </div>
        <button
          onClick={handleReset}
          className="text-sm px-3 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-6">
        <div className="canvas-wrapper">
          {/* IMPORTANT: remove w-full/h-full from canvas itself */}
          <canvas
            ref={canvasRef}
            width={700}
            height={400}
            className="rounded-xl block cursor-crosshair touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />
          {features.addRemovePoints && (
            <p className="text-xs text-slate-400 px-3 py-2">
              Tip: <kbd className="border px-1 rounded">Alt</kbd> + click to add a point
            </p>
          )}
        </div>

        <div className="space-y-4">
          {/* t controls */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Parameter t ({a} → {b})
            </label>
            <input
              type="range"
              min={a}
              max={b}
              step={(b - a) / 200 || 0.01}
              value={t}
              onChange={(e) => !locks.t && setT(parseFloat(e.target.value))}
              className="w-full"
              disabled={locks.t}
            />
            <p className="text-xs text-slate-500">
              t = {t.toFixed(3)} | normalized t = {normalizeT(t, a, b).toFixed(3)}
            </p>
          </div>

          {/* interval controls */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2">
            <p className="text-sm font-medium text-slate-700">Interval [a, b]</p>
            <div className="flex gap-2">
              <input
                type="number"
                value={a}
                onChange={(e) => !locks.interval && setA(parseFloat(e.target.value))}
                className="border rounded-md px-2 py-1 w-20 text-sm"
                disabled={locks.interval}
              />
              <input
                type="number"
                value={b}
                onChange={(e) => !locks.interval && setB(parseFloat(e.target.value))}
                className="border rounded-md px-2 py-1 w-20 text-sm"
                disabled={locks.interval}
              />
            </div>
            <p className="text-xs text-slate-500">
              We always normalize with (t - a) / (b - a).
            </p>
          </div>

          {/* options */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2">
            <p className="text-sm font-medium text-slate-700">Options</p>
            <ul className="space-y-1 text-xs text-slate-500">
              <li>• Drag points: {features.dragPoints ? "Yes" : "No"}</li>
              <li>• Add/remove points: {features.addRemovePoints ? "Yes" : "No"}</li>
              <li>
                • Show subdivision: {features.showSubdivision || features.showLevels ? "Yes" : "No"}
              </li>
              <li>• Animate: {features.animate ? "Yes" : "No"}</li>
            </ul>
            {features.animate && (
              <button
                onClick={() => setAnimating((p) => !p)}
                className={`mt-2 text-xs px-3 py-1 rounded-md ${
                  animating ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"
                }`}
              >
                {animating ? "Stop animation" : "Start animation"}
              </button>
            )}
            {features.addRemovePoints && (
              <button
                onClick={handleRemoveLast}
                className="mt-2 text-xs px-3 py-1 rounded-md bg-slate-100 text-slate-700"
              >
                Remove last point
              </button>
            )}
            {features.export && (
              <button
                onClick={handleExport}
                className="mt-2 text-xs px-3 py-1 rounded-md bg-slate-100 text-slate-700"
              >
                Export control points
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
