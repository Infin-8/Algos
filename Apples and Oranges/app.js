const compose =
  (...fns) =>
  (initial) =>
    fns.reduce((result, next) => next(result), initial);

const createPayload = ({ s, t, a, b, apples, oranges }) => ({
  start: s,
  end: t,
  appleTree: a,
  orangeTree: b,
  apples,
  oranges,
});

const mapPositions = ({ start, end, appleTree, orangeTree, apples, oranges,}) => ({
  start,
  end,
  apples: [...apples].map((apple) => apple + appleTree),
  oranges: [...oranges].map((orange) => orange + orangeTree),
});

const isOnProperty = (start, end, arr) =>
  arr.filter((item) => item >= start && item <= end);

const filterArea = ({ start, end, apples, oranges }) => ({
  apples: isOnProperty(start, end, apples),
  oranges: isOnProperty(start, end, oranges),
});

const result = ({ apples, oranges }) => {
  console.log(apples.length);
  console.log(oranges.length);
};

const countApplesAndOranges = (s, t, a, b, apples, oranges) =>
  compose(
    createPayload,
    mapPositions,
    filterArea
  )({ s, t, a, b, apples, oranges });

countApplesAndOranges(7, 11, 5, 15, [-2, 2, 1], [5, -6]);
