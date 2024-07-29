class Multiple {
    constructor(multiplicand, multiplier) {

        this.multiplicand = multiplicand
        this.multiplier = multiplier
        this.product = multiplicand * multiplier

    }

    toString() {
        return String(this.product)
    }
}

class Conditions {
    constructor(upperbound, lowerbound, n) {
        this.upperbound = upperbound
        this.lowerbound = lowerbound
        this.n = n
    }
}

const compose = (...fns) => initial => fns
    .reduce((result, next) => next(result), initial)

const getConditions = n => {
    switch (n) {
        case 8:
            return new Conditions(3, 1, n)
        case 9:
            return new Conditions(4, 3, n)
        default:
            return new Conditions(0, 0, n)
    }
}

const getRange = ({ n, upperbound, lowerbound }) => ({
    upperbound,
    lowerbound,
    n,
    range: [...Array.from({ length: n }, (_, i) => String(i + 1))]
})

const accumlateMultiples = ({ n, range, upperbound, lowerbound }) => {

    const multiples = []

    for (let i = Number("1" + "0".repeat(lowerbound)); i <= "9".repeat(upperbound); i++) {

        let sample = ""

        for (let j = 1; ; j++) {

            let multiple = new Multiple(i, j)

            sample += multiple.toString()

            if (sample.length === n) {
                multiples.push(sample)
                break
            }

            if (sample.length > n) break
        }
    }

    return { multiples, range }
}

const isNotDuplicate = arr => arr
    .map((item, i, arr) => arr.indexOf(item) === i)

const mapPandigital = ({ multiples, range }) => multiples
    .filter(p => p
        .split('')
        .every(v => range.includes(v))
        &&
        isNotDuplicate(p.split('')).every(v => !!v)
    )

const result = arr => Number(arr[arr.length - 1])

const pandigitalMultiples = n =>
    compose(
        getConditions,
        getRange,
        accumlateMultiples,
        mapPandigital,
        result,
        console.log
    )(n)

pandigitalMultiples(8) // should return 78156234.
pandigitalMultiples(9) // should return 932718654.