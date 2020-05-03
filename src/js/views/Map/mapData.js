export const GAP_SIZE = 80
export const MARGIN = 10
export const RADIUS = 20
export const TEXT_OFFSET = 4.75

export function getCoords(x, y) {
  return [MARGIN + RADIUS + x * GAP_SIZE, MARGIN + RADIUS + y * GAP_SIZE]
}

// It took me a few iterations to discover a layout this compact, but I am proud
export const stopLocations = {
  A: { x: 0, y: 1 },
  B: { x: 0, y: 0 },
  C: { x: 1, y: 1 },
  D: { x: 1, y: 0 },
  E: { x: 2, y: 1 },
  F: { x: 1, y: 2 },
  G: { x: 2, y: 2 },
  H: { x: 2, y: 3 },
  I: { x: 1, y: 3 },
  J: { x: 0, y: 2 },
  K: { x: 3, y: 3 },
  L: { x: 4, y: 2 },
  M: { x: 3, y: 2 },
  N: { x: 3, y: 1 },
  O: { x: 4, y: 1 },
  P: { x: 4, y: 0 },
  Q: { x: 3, y: 0 },
  R: { x: 2, y: 0 },
}

const horizontalGaps = Math.max(
  ...Object.values(stopLocations).map((point) => point.x)
)
const verticalGaps = Math.max(
  ...Object.values(stopLocations).map((point) => point.y)
)

const width = MARGIN * 2 + RADIUS * 2 + horizontalGaps * GAP_SIZE
const height = MARGIN * 2 + RADIUS * 2 + verticalGaps * GAP_SIZE

export const viewBox = `0 0 ${width} ${height}`
