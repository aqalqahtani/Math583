import Hero from "./components/Hero";
import Theory from "./components/Theory";
import Playground from "./components/Playground";
import InsightCard from "./components/InsightCard";
import { presets } from "./lib/presets";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <main className="max-w-6xl w-full mx-auto px-4 pb-20 space-y-16">
        <Theory />

        {/* PLAYGROUND 1 */}
        <Playground
          title="Playground 1 — Fixed 3 points, t = 1/2, change interval"
          subtitle="This is the 'hello world' of de Casteljau. Points are fixed, we evaluate at t = 0.5, but you can change the interval to see normalization."
          config={presets.pg1}
        />

        {/* PLAYGROUND 2 */}
        <Playground
          title="Playground 2 — Drag/add/delete points, t = 1/4"
          subtitle="Now you can interact with the control polygon. Drag or add/remove points to see how the curve responds. Interval stays [0,1] by default."
          config={presets.pg2}
        />

        {/* PLAYGROUND 3 */}
        <Playground
          title="Playground 3 — Full experience"
          subtitle="Everything is open. Change interval, t, points, animate the curve, and export control points."
          config={presets.pg3}
        />

        {/* PLAYGROUND 4 */}
        <Playground
          title="Playground 4 — Recursive subdivision visualized"
          subtitle="This is the heart of de Casteljau. See every intermediate layer for a chosen t, and animate step-by-step."
          config={presets.pg4}
        />

        <InsightCard />
      </main>
      <footer className="py-8 text-center text-sm text-slate-500">
        
      </footer>
    </div>
  );
}
