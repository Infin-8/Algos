class Triplet {
    constructor(a, b) {
        this.a = a
        this.b = b
        this.a2 = a ** 2
        this.b2 = b ** 2
        this.c2 = this.a2 + this.b2
        this.c = Math.sqrt(this.c2)
        this.sum = this.a + this.b + this.c

    }
}

const compose = (...fns) => initial => fns
    .reduce((result, next) => next(result), initial)

const accumlateTriplets = n => {

    const triplets = []

    for (let i = 1; i <= n; i++) {

        for (let j = i + 1; ; j++) {
            const triplet = new Triplet(i, j)
            const { sum } = triplet

            if (sum > n) break
            triplets.push(triplet)
        }
    }

    return { triplets, n }
}

const filterTriplets = ({ triplets, n }) => triplets
    .filter(({ sum }) => Number.isInteger(sum))
    .filter(({ sum }) => sum === n)

const mapNaturals = arr => arr.map(({ a, b, c }) => [a, b, c])

const product = arr => arr.map(n => n.reduce((a, b) => a * b))

const specialPythagoreanTriplet = n =>
    compose(
        accumlateTriplets,
        filterTriplets,
        mapNaturals,
        product,
        console.log
    )(n)


// 06/28/24
specialPythagoreanTriplet(24) //should return 480.
specialPythagoreanTriplet(120) //should return 49920, 55080 or 60000.
specialPythagoreanTriplet(1000) //should return 31875000.
specialPythagoreanTriplet(3500) 




// A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
// a2 + b2 = c2

// For example, 32 + 42 = 9 + 16 = 25 = 52.

// There exists exactly one Pythagorean triplet for which a + b + c = 1000. Find the product abc such that a + b + c = n.
