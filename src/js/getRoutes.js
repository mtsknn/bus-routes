import data from './data.js'

const roads = data.roads
  .flatMap((road) =>
    getBusesBetween(road.from, road.to).map((bus) => ({ ...road, bus }))
  )
  .flatMap((road) => [
    { ...road, backwards: false },
    { ...road, backwards: true, from: road.to, to: road.from },
  ])

function getBusesBetween(a, b) {
  return Object.entries(data.busLines)
    .filter(([, stops]) => stops.includes(a) && stops.includes(b))
    .map(([color]) => color)
}

export default function getRoutes(from, to) {
  const route = {
    buses: [],
    busLines: 0,
    duration: 0,
    roads: [],
    stops: [from],
  }

  return continueRoute(route, to)
}

function continueRoute(route, destination) {
  if (route.stops.includes(destination)) return route

  const previousBus = route.buses[route.buses.length - 1]
  const previousStop = route.stops[route.stops.length - 1]

  return (
    roads
      .filter((road) => road.from === previousStop)

      // Prevent circular routes
      .filter((road) => !route.stops.includes(road.to))

      .map((road) => ({
        buses: route.buses.concat(road.bus),
        busLines: route.busLines + (previousBus !== road.bus ? 1 : 0),
        duration: route.duration + road.duration,
        roads: route.roads.concat(road),
        stops: route.stops.concat(road.to),
      }))
      .flatMap((newRoute) => continueRoute(newRoute, destination))
  )
}
