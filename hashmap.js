// hashmap.js

class HashMap {
  constructor(loadFactor = 0.75, initialCapacity = 16) {
    this.loadFactor = loadFactor;
    this.initialCapacity = initialCapacity;
  }
}

/* throw an error if we try to access an out-of-bounds index:
if (index < 0 || index >= buckets.length) {
  throw new Error("Trying to access index out of bounds");
}
*/
