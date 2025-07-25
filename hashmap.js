// hashmap.js

export class HashMap {
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

  /* 
  set(key, value) takes two arguments: the first is a key, and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten, and we can say that we update the key’s value (e.g. Carlos is our key but it is called twice: once with value I am the old value., and once with value I am the new value.. Following this logic, Carlos should contain only the latter value).
  */

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        this.buckets[index][i][1] = value;
        return;
      }
    }

    this.buckets[index].push([key, value]);
    this.size++;

    if (this.size / this.capacity >= this.loadFactor) {
      this.capacity *= 2;
      console.log("Capacity resized to:", this.capacity);

      const oldBuckets = this.buckets;

      this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }
  }
}

/* throw an error if we try to access an out-of-bounds index:
if (index < 0 || index >= buckets.length) {
  throw new Error("Trying to access index out of bounds");
}
*/
