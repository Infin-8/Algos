// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

const compose = (...fns) => initial => fns
    .reduce((result, next) => next(result), initial)

const workableNumber = n => {

    if (n < 10_000_000) return { workable: n, n }

    return { workable: n / 1000, n }

}

const isPrime = n => {

    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false
    }

    return true
}

const getDivisors = ({ workable, n }) => {

    let divisors = []

    for (let p = 2, d = n / p; p <= Math.sqrt(workable); p++, d = n / p) {

        if (Number.isInteger(d)) divisors.push(d, p)
    }

    return { divisors: !divisors.length ? [n] : divisors, n }
}

const getPrimes = ({ divisors }) => divisors.filter(isPrime)

const sievePrimes = n => {

    let sieve = [...Array.from({ length: n - 1 }, (_, i) => i + 1)]
        .filter(num => num % 2 === 1 || num === 2)

    for (let i = 2; i < Math.sqrt(n); i++) {
        sieve = sieve.filter((num, index) => num % i !== 0 || index <= i)
    }

    sieve.shift()
    return sieve
}

const getSum = arr => arr.reduce((a, b) => a + b)

const primeSummation = n =>
    compose(
        sievePrimes,
        getSum,
        workableNumber,
        getDivisors,
        getPrimes,
        console.log
    )(n)

// primeSummation(17) //should return 41.
// primeSummation(2001) //should return 277050.
// primeSummation(140759) //should return 873608362.
// primeSummation(2000000) //should return 142913828922.