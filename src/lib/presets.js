export const presets = {
  pg1: {
    id: "playground-1",
    initialPoints: [
      { x: 100, y: 300 },
      { x: 300, y: 100 },
      { x: 500, y: 300 },
    ],
    initialA: 0,
    initialB: 1,
    initialT: 0.5,
    locks: {
      // in your idea: 3 points are setup, t=1/2, but you can change interval
      points: true,   // we won’t enforce here, canvas won’t allow drag anyway
      t: false,
      interval: false,
    },
    features: {
      dragPoints: false,
      addRemovePoints: false,
      showSubdivision: true,
      animate: false,
    },
  },
  pg2: {
    id: "playground-2",
    initialPoints: [
      { x: 100, y: 300 },
      { x: 200, y: 150 },
      { x: 400, y: 150 },
      { x: 550, y: 300 },
    ],
    initialA: 0,
    initialB: 1,
    initialT: 0.25,
    locks: {
      interval: true, // keep [0,1]
    },
    features: {
      dragPoints: true,
      addRemovePoints: true,
      showSubdivision: false,
      animate: false,
    },
  },
  pg3: {
    id: "playground-3",
    initialPoints: [
      { x: 80, y: 320 },
      { x: 200, y: 80 },
      { x: 380, y: 140 },
      { x: 560, y: 320 },
    ],
    initialA: 0,
    initialB: 2,
    initialT: 0.8,
    locks: {},
    features: {
      dragPoints: true,
      addRemovePoints: true,
      showSubdivision: false,
      animate: true,
      export: true,
    },
  },
  pg4: {
    id: "playground-4",
    initialPoints: [
      { x: 90, y: 300 },
      { x: 200, y: 120 },
      { x: 360, y: 80 },
      { x: 520, y: 280 },
    ],
    initialA: 0,
    initialB: 1,
    initialT: 0.33,
    locks: {},
    features: {
      dragPoints: true,
      addRemovePoints: true,
      showSubdivision: true,
      showLevels: true,
      animate: true,
    },
  },
};
