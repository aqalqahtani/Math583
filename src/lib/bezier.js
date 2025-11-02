// point: {x, y}
export function deCasteljauPoint(points, t01) {
  let layer = points.slice();
  while (layer.length > 1) {
    const next = [];
    for (let i = 0; i < layer.length - 1; i++) {
      next.push({
        x: (1 - t01) * layer[i].x + t01 * layer[i + 1].x,
        y: (1 - t01) * layer[i].y + t01 * layer[i + 1].y,
      });
    }
    layer = next;
  }
  return layer[0];
}

export function deCasteljauLayers(points, t01) {
  const layers = [points.slice()];
  let layer = points.slice();
  while (layer.length > 1) {
    const next = [];
    for (let i = 0; i < layer.length - 1; i++) {
      next.push({
        x: (1 - t01) * layer[i].x + t01 * layer[i + 1].x,
        y: (1 - t01) * layer[i].y + t01 * layer[i + 1].y,
      });
    }
    layers.push(next);
    layer = next;
  }
  return layers;
}

export function normalizeT(t, a, b) {
  return (t - a) / (b - a);
}
