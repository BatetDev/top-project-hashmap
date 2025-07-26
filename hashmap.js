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
  set(key, value) takes two arguments: the first is a key, and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten, and we can say that we update the key’s value.
  */

  set(key, value) {
    // Calculate which bucket the key belongs in
    const index = this.hash(key);

    // Check if that index is valid
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    // Look inside that bucket for the key
    // For each entry in the bucket:
    for (let i = 0; i < this.buckets[index].length; i++) {
      // If the entry's key matches the input key:
      if (this.buckets[index][i][0] === key) {
        // Update the entry's value to the new value
        this.buckets[index][i][1] = value;
        return;
      }
    }

    // If new key, check if we need to grow buckets
    if (this.size / this.capacity >= this.loadFactor) {
      this._resize();
    }

    // Add new key / value pair
    this.buckets[this.hash(key)].push([key, value]);
    this.size++;
  }

  _resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
}
