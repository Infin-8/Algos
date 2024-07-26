const compose =
  (...fns) =>
  (initial) =>
    fns.reduce((result, next) => next(result), initial);

const createPayload = (arr) => ({
  grades: [...arr],
  scale: [...Array.from({ length: 101 }, (_, i) => i)],
});

const mapRange = ({ grades, scale }) => ({
  grades,
  scale,
  mapped: [...grades].map((grade) => ({
    grade,
    range: scale
      .filter((s) => (s <= grade && s % 5 == 0) || (s >= grade && s % 5 == 0))
      .filter(
        (_, i, copy) =>
          copy.indexOf(copy.find((x) => x > grade)) - 1 == i ||
          copy.indexOf(copy.find((x) => x > grade)) == i
      ),
  })),
});

const roundGrade = ({ mapped }) => ({
  rounded: mapped.map(({ grade, range }) =>
    grade < 38 ? grade : range[1] - grade < 3 ? range[1] : grade
  ),
});

const result = ({ rounded }) => rounded;

const gradingStudents = arr =>
    compose(
        createPayload,
        mapRange,
        roundGrade,
        result,
        console.log
    )(arr)

gradingStudents([75, 67, 40, 33])

// return compose(createPayload, mapRange, roundGrade, result)(grades);
