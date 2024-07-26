const compose = (...fns) => initial => fns
    .reduce((result, next) => next(result), initial)

const getRange = n => [...Array.from({ length: n }, (_, i) => i + 1)]
    .filter((_, i, arr) => arr.length > 1_000_000
        ? i > arr.length / 1.20
        : arr.length > 100_000
            ? i > arr.length / 1.5
            : i > arr.length / 2
    )

const collatzSequence = n => {

    if (n === 1) return [n]

    else {

        let result = collatzSequence(n % 2 === 0 ? n / 2 : (3 * n) + 1)
        result.unshift(n)
        return result
    }
}

const getSequence = arr => arr
    .map(num => ({
        num,
        sequence: collatzSequence(num)
    }))

const getLength = arr => arr
    .map(({ num, sequence }) => ({
        num,
        sequence,
        length: sequence.length
    }))

const getLongest = arr => arr
    .sort((a, b) => b.length - a.length)
    .shift()
    .num

const longestCollatzSequence = n =>
    compose(
        getRange,
        getSequence,
        getLength,
        getLongest,
        console.log
    )(n)



longestCollatzSequence(14) // should return 9.
longestCollatzSequence(5847) // should return 3711.
longestCollatzSequence(46500) // should return 35655.
longestCollatzSequence(54512) // should return 52527.
longestCollatzSequence(100000) // should return 77031.
longestCollatzSequence(1000000) // should return 837799.