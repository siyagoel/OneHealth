const stringSimilarity = (str1, str2, substringLength = 1) => {
  if (str1.length < substringLength || str2.length < substringLength) {
    return 0
  }

  const map = new Map()
  for (let i = 0; i < str1.length - (substringLength - 1); i += 1) {
    const substr1 = str1.slice(i, i + substringLength)
    map.set(substr1, map.has(substr1) ? map.get(substr1) + 1 : 1)
  }

  let match = 0
  for (let j = 0; j < str2.length - (substringLength - 1); j += 1) {
    const substr2 = str2.slice(j, j + substringLength)
    const count = map.has(substr2) ? map.get(substr2) : 0
    if (count > 0) {
      map.set(substr2, count - 1)
      match += 1
    }
  }

  return (match * 2) / (str1.length + str2.length - ((substringLength - 1) * 2))
}

export default stringSimilarity
