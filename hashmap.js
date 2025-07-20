// hashmap.js

class HashMap {
  constructor(loadFactor = 0.75, initialCapacity = 16) {
    // Initialize buckets: each is a unique array to avoid shared reference issues
    this.buckets = new Array(initialCapacity).fill(null).map(() => []);
    this.loadFactor = loadFactor;
    this.capacity = initialCapacity;
    this.size = 0;
  }

  hash(key) {
    const primeNumber = 31;
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }

  // Hash the key to find the bucket index
  // Go to that bucket
  // Track the number of keys
  // Check if resize is needed
  set(key, value) {}
}

/* throw an error if we try to access an out-of-bounds index:
if (index < 0 || index >= buckets.length) {
  throw new Error("Trying to access index out of bounds");
}
*/
