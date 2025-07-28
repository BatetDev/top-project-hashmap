// script.js

// Testing the Hash Map

import { HashMap } from "./hashmap.js";

const map = new HashMap(); // capacity 0/16 | loadFactor: 0.75

// Populate hash map using the set(key, value) method
map.set("apple", "red");
map.set("banana", "yellow");
map.set("carrot", "orange");
map.set("dog", "brown");
map.set("elephant", "gray");
map.set("frog", "green");
map.set("grape", "purple");
map.set("hat", "black");
map.set("ice cream", "white");
map.set("jacket", "blue");
map.set("kite", "pink");
map.set("lion", "golden");
// capacity: 12/16

// Overwrite a few nodes using set(key, value)
map.set("apple", "green");
map.set("banana", "brown");
map.set("lion", "white");
// capacity: 12/16 (no changes in size)

// Add one more key to trigger resize
map.set("moon", "silver");
// capacity: 13/32 (resize triggered)

// Overwrite a few nodes after resize
map.set("moon", "gold");
map.set("apple", "crimson");
map.set("dog", "black");
// capacity: 13/32 (no changes in size)

// Test the other methods

// get(key)
console.log('get("apple"):', map.get("apple")); // → 'crimson'
console.log('get("moon"):', map.get("moon")); // → 'gold'
console.log('get("missing"):', map.get("missing")); // → null

// Test has(key)
console.log('has("banana"):', map.has("banana")); // → true
console.log('has("missing"):', map.has("missing")); // → false

// Test remove(key)
console.log("size before remove:", map.size); // → 13
console.log('remove("frog"):', map.remove("frog")); // → true
console.log('remove("frog"):', map.remove("frog")); // → false (already removed)
console.log("size after remove:", map.size); // → 12

// Test length()
console.log("length():", map.length()); // → 12

// Test keys(), values(), entries()
console.log("keys():", map.keys());
console.log("values():", map.values());
console.log("entries():", map.entries());

// Test clear()
map.clear();
console.log("size after clear():", map.size); // → 0
console.log("buckets length after clear():", map.buckets.length); // → 16 (reset to initial)
console.log("capacity after clear():", map.capacity); // → 16
