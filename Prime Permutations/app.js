const compose = (...fns) => initial => fns
    .reduce((result, next) => next(result), initial)

const sievePrimes = n => {

    let sieve = [...Array.from({ length: n }, (_, i) => i + 1)]
        .filter(num => num % 2 === 1 || num === 2)

    for (let i = 2; i < Math.sqrt(n); i++) {
        sieve = sieve.filter((num, index) => index <= i || num % i !== 0)
    }

    sieve.shift()
    return sieve
}

const mapPrimes = arr => arr.map(n => String(n))

const filterPrimes = arr => arr.filter(s => s.length === 4)

const getPerms = str => {

    let length = str.length
    let result = []


    if (!length) {
        result.push("")
        return result
    }


    for (let i = 0; i < length; i++) {

        let start = str.substring(0, i),
            end = str.substring(i + 1, length)

        let partials = getPerms(start + end)

        for (let c of partials) {
            result.push(str[i] + c)
        }
    }

    return result
}

const mapPerms = primes => ({
    primes,
    permutations: primes.map(n => ({
        perms: getPerms(n).filter((item, i, arr) => arr.indexOf(item) === i)
    }))
})

const isPrime = n => {

    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false
    }

    return true

}

const mapAllPrime = ({ permutations }) => permutations
    .map(o => ({
        ...o,
        allPrime: o.perms.filter(v => isPrime(Number(v))).map(v => Number(v)).filter((v, i, arr) => arr.includes(v + 330))
    }))




const primePermutations = () =>
    compose(
        sievePrimes,
        mapPrimes,
        filterPrimes,
        mapPerms,
        mapAllPrime,
        console.log
    )(9999)

primePermutations()