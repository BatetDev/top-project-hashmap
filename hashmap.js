// hashmap.js

export class HashMap {
  constructor(loadFactor = 0.75, initialCapacity = 16) {
    // Initialize buckets: each is a unique array to avoid shared reference issues
    this.buckets = new Array(initialCapacity).fill(null).map(() => []);
    this.loadFactor = loadFactor;
    this.initialCapacity = initialCapacity;
    this.capacity = initialCapacity;
    this.size = 0;
  }

  // Takes a key and produces a hash code with it
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
    this._checkBounds(index);

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
    // Preserve the current bucket array before resizing
    const oldBuckets = this.buckets;

    // Double the capacity to reduce load factor and minimize future collisions
    this.capacity *= 2;

    // Reinitialize buckets with new capacity
    this.buckets = new Array(this.capacity).fill(null).map(() => []);

    // Reset size counter before reinserting all entries
    this.size = 0;

    // Reinsert all key-value pairs from the old buckets into resized structure
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  // Throws error if index is out of bounds
  _checkBounds(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  // Takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null
  get(key) {
    // Calculate which bucket the key belongs in
    const index = this.hash(key);

    // Check if that index is valid
    this._checkBounds(index);

    const bucket = this.buckets[index];

    // Look inside that bucket for the key
    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return null;
  }

  // Takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
  has(key) {
    // Calculate which bucket the key belongs in
    const index = this.hash(key);

    // Check if that index is valid
    this._checkBounds(index);

    const bucket = this.buckets[index];

    for (const [k, _] of bucket) {
      if (k === key) return true;
    }
    return false;
  }

  // takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
  remove(key) {
    // Calculate which bucket the key belongs in
    const index = this.hash(key);

    // Check if that index is valid
    this._checkBounds(index);

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      // If the entry's key matches the input key:
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  // Returns the number of stored keys in the hash map.
  length() {
    return this.size;
  }

  // Removes all entries in the hash map
  clear() {
    // Reset buckets to fresh array of original size
    this.buckets = new Array(this.initialCapacity).fill(null).map(() => []);
    // Reset capacity to original value
    this.capacity = this.initialCapacity;
    // Reset size to 0 - no keys left
    this.size = 0;
  }

  // Returns an array containing all the keys inside the hash map.
  keys() {
    const keys = [];
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        keys.push(key);
      }
    }
    return keys;
  }

  // Returns an array containing all the values.
  values() {
    const values = [];
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        values.push(value);
      }
    }
    return values;
  }

  // Returns an array that contains each key, value pair.
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
