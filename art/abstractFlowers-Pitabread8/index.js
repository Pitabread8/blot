/*
@title: abstractFlowers
@author: Pitabread8
@snapshot: 0.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const a = bt.randIntInRange(50, 60);

drawLines([
  [
    [62.5 - a, 62.5 - a],
    [62.5 - a, a + 62.5]
  ],
  [
    [62.5 - a, 62.5 - a],
    [a + 62.5, 62.5 - a]
  ],
  [
    [a + 62.5, 62.5 - a],
    [a + 62.5, a + 62.5]
  ],
  [
    [a + 62.5, a + 62.5],
    [62.5 - a, a + 62.5]
  ]
], { width: 3 });

const createRing = (num, size) => {
  const petalLength = 0.5;
  const centerLength = petalLength * bt.randInRange(1.5, 1.75);
  const curve = bt.randInRange(0.1, 3.0);
  const petals = [];
  
  for (let i = 1; i <= num; i++) {
    const petal = [];

    const firstHalf = [
      bt.nurbs([
        [0, 0],
        [petalLength * curve, centerLength],
        [petalLength, bt.randInRange(0.1, 1.0)]
      ])
    ];

    const secondHalf = bt.copy(firstHalf);
    bt.scale(secondHalf, [1, -1], [0, 0]);
    bt.join(petal, firstHalf, secondHalf);

    bt.scale(petal, width / bt.bounds(petal).width * size);
    bt.translate(petal, [width / 2, height / 2], bt.bounds(petal).cc);
    bt.rotate(petal, 360 / num * i);

    petal.forEach((e) => petals.push(e));
  }
  
  drawLines(petals, { width: 6 });
}

const fibonacci = (count, n = 1, prev = 0) => {
  if (count === 0) return [];
  const next = n + prev;
  return [next].concat(fibonacci(count - 1, next, n));
}

const ringSizes = fibonacci(bt.randIntInRange(1, 2), bt.randIntInRange(1, 3), bt.randIntInRange(1, 3));
for (let i of ringSizes) createRing(i, 1 / Math.sqrt(i) * 0.3);