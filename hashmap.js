// hashmap.js

export class HashMap {
  constructor(loadFactor = 0.75, initialCapacity = 16) {
    // Create an array of buckets, each an independent empty array
    // Prevents shared reference issues when pushing to buckets
    this.buckets = new Array(initialCapacity).fill(null).map(() => []);
    this.loadFactor = loadFactor;
    this.initialCapacity = initialCapacity;
    this.capacity = initialCapacity;
    this.size = 0;
  }

  // Hashes a string key into a bucket index using a prime-based rolling hash
  // Applies modulo at each step to prevent overflow and ensure valid index
  hash(key) {
    const primeNumber = 31;
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }

  // Sets a key-value pair. Updates if key exists, inserts if new.
  // Triggers resize if load factor is exceeded after insertion.
  set(key, value) {
    const index = this.hash(key);
    this._checkBounds(index);

    // Check for existing key
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    // If new key, check for resize
    if (this.size / this.capacity >= this.loadFactor) {
      this._resize();
    }

    // Use fresh hash and bucket access after possible resize
    this.buckets[this.hash(key)].push([key, value]);
    this.size++;
  }

  _resize() {
    // Save reference to existing buckets to preserve all key-value pairs during resize
    const oldBuckets = this.buckets;

    // Double the capacity to reduce load factor and minimize future collisions
    this.capacity *= 2;

    // Create new bucket array with doubled capacity, each bucket initialized as empty array
    this.buckets = new Array(this.capacity).fill(null).map(() => []);

    // Reset size to 0 so reinsertion via set() correctly rebuilds the count
    this.size = 0;

    // Reinsert all entries using set() to ensure correct bucket placement with new hash
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  // Ensures index is valid for current bucket array; throws if out of bounds
  _checkBounds(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  // Returns the value for the given key, or null if not found
  get(key) {
    const index = this.hash(key);
    this._checkBounds(index);

    const bucket = this.buckets[index];

    // Look inside that bucket for the key
    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return null;
  }

  // Returns true if the key exists, false otherwise
  has(key) {
    const index = this.hash(key);
    this._checkBounds(index);

    const bucket = this.buckets[index];

    for (const [k, _] of bucket) {
      if (k === key) return true;
    }
    return false;
  }

  // Removes the key if found and returns true; otherwise returns false
  remove(key) {
    const index = this.hash(key);
    this._checkBounds(index);

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  // Returns the number of stored keys
  length() {
    return this.size;
  }

  // Resets the hash map to initial state: empty buckets, original capacity, size 0
  clear() {
    this.buckets = new Array(this.initialCapacity).fill(null).map(() => []);
    this.capacity = this.initialCapacity;
    this.size = 0;
  }

  // Returns an array of all keys
  keys() {
    const keys = [];
    for (const bucket of this.buckets) {
      for (const [key, _] of bucket) {
        keys.push(key);
      }
    }
    return keys;
  }

  // Returns an array of all values
  values() {
    const values = [];
    for (const bucket of this.buckets) {
      for (const [_, value] of bucket) {
        values.push(value);
      }
    }
    return values;
  }

  // Returns an array of all key-value pairs
  entries() {
    const entries = [];
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        entries.push([key, value]);
      }
    }
    return entries;
  }
}
