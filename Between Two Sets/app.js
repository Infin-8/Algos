const compose =
  (...fns) =>
  (initial) =>
    fns.reduce((result, next) => next(result), initial);

const createPayload = ({ a, b }) => ({
  a,
  b,
  max: Math.max(...[...a, ...b]),
  combine: [...a, ...b],
  result: [],
});

const allFactors = (arr, i) =>
  arr
    .map((v) => (v > i ? v % i === 0 : i % v === 0 && i % v === 0))
    .every((v) => !!v);

const findFactors = ({ a, b, max, result, combine }) => {
  for (let i = 2; i <= max; i++) {
    if (allFactors(a, i) && allFactors(b, i) && i !== Math.min(...combine))
      result.push(i);
  }

  return { result, combine };
};

const result = ({ result, combine }) => {

    console.log(result)
    console.log(combine)

    for(let i = 0; i < result.length; i++) {

        for(let j = 0; j < combine.length; j++) {

            // if(result[i])
        }
    }
};

const getTotalX = (a, b) =>
  compose(createPayload, findFactors, result, console.log)({ a, b });

getTotalX([2, 4], [16, 32, 96]);
