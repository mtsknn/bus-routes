// Original data from https://koodihaaste.solidabis.com/
const original = {
  pysakit: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
  ],
  tiet: [
    {
      mista: 'A',
      mihin: 'B',
      kesto: 3,
    },
    {
      mista: 'B',
      mihin: 'D',
      kesto: 2,
    },
    {
      mista: 'D',
      mihin: 'A',
      kesto: 1,
    },
    {
      mista: 'A',
      mihin: 'C',
      kesto: 1,
    },
    {
      mista: 'C',
      mihin: 'D',
      kesto: 5,
    },
    {
      mista: 'C',
      mihin: 'E',
      kesto: 2,
    },
    {
      mista: 'E',
      mihin: 'D',
      kesto: 3,
    },
    {
      mista: 'E',
      mihin: 'F',
      kesto: 1,
    },
    {
      mista: 'F',
      mihin: 'G',
      kesto: 1,
    },
    {
      mista: 'G',
      mihin: 'H',
      kesto: 2,
    },
    {
      mista: 'H',
      mihin: 'I',
      kesto: 2,
    },
    {
      mista: 'I',
      mihin: 'J',
      kesto: 1,
    },
    {
      mista: 'I',
      mihin: 'G',
      kesto: 1,
    },
    {
      mista: 'G',
      mihin: 'K',
      kesto: 8,
    },
    {
      mista: 'K',
      mihin: 'L',
      kesto: 1,
    },
    {
      mista: 'L',
      mihin: 'M',
      kesto: 1,
    },
    {
      mista: 'E',
      mihin: 'M',
      kesto: 10,
    },
    {
      mista: 'M',
      mihin: 'N',
      kesto: 2,
    },
    {
      mista: 'N',
      mihin: 'O',
      kesto: 2,
    },
    {
      mista: 'O',
      mihin: 'P',
      kesto: 2,
    },
    {
      mista: 'O',
      mihin: 'Q',
      kesto: 1,
    },
    {
      mista: 'P',
      mihin: 'Q',
      kesto: 2,
    },
    {
      mista: 'N',
      mihin: 'Q',
      kesto: 1,
    },
    {
      mista: 'Q',
      mihin: 'R',
      kesto: 5,
    },
    {
      mista: 'R',
      mihin: 'N',
      kesto: 3,
    },
    {
      mista: 'D',
      mihin: 'R',
      kesto: 6,
    },
  ],
  linjastot: {
    keltainen: ['E', 'F', 'G', 'K', 'L', 'M', 'N'],
    punainen: ['C', 'D', 'R', 'Q', 'N', 'O', 'P'],
    vihreä: ['D', 'B', 'A', 'C', 'E', 'F', 'G', 'H', 'I', 'J'],
    sininen: ['D', 'E', 'M', 'N', 'O'],
  },
}

// The same data localized to English
export default {
  busLines: {
    blue: original.linjastot.sininen,
    green: original.linjastot.vihreä,
    red: original.linjastot.punainen,
    yellow: original.linjastot.keltainen,
  },
  roads: original.tiet.map((road) => ({
    duration: road.kesto,
    from: road.mista,
    to: road.mihin,
  })),
  stops: original.pysakit,
}
