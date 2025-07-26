import { HashMap } from "./hashmap.js";

const map = new HashMap();

// ——————————————————————————————
// Initial State
// ——————————————————————————————
console.log("🔹 STARTING TEST: Hyborian Hash Map");
console.log("Initial capacity:", map.capacity);
console.log("Initial size:", map.size);
console.log("Buckets length:", map.buckets.length);
console.log("");

// ——————————————————————————————
// Test 1: Add a new key
// ——————————————————————————————
console.log("1️⃣ SET: 'conan' → 'cimmerian'");
map.set("conan", "cimmerian");
console.log(
  " → bucket[",
  map.hash("conan"),
  "] =",
  map.buckets[map.hash("conan")]
);
console.log(" → size =", map.size);
console.log("");

// ——————————————————————————————
// Test 2: Update existing key
// ——————————————————————————————
console.log("2️⃣ UPDATE: 'conan' → 'king-of-aquilonia'");
map.set("conan", "king-of-aquilonia");
console.log(
  " → bucket[",
  map.hash("conan"),
  "] =",
  map.buckets[map.hash("conan")]
);
console.log(" → size =", map.size); // Should still be 1
console.log("");

// ——————————————————————————————
// Test 3: Add a second key
// ——————————————————————————————
console.log("3️⃣ SET: 'belit' → 'queen-of-the-black-coast'");
map.set("belit", "queen-of-the-black-coast");
console.log(
  " → bucket[",
  map.hash("belit"),
  "] =",
  map.buckets[map.hash("belit")]
);
console.log(" → size =", map.size);
console.log("");

// ——————————————————————————————
// Test 4: Add more Hyborian lore
// ——————————————————————————————
console.log("4️⃣ ADDING HYBORIAN EMPIRES, TRIBES, AND ARTIFACTS...");
const hyborianEntries = [
  ["kull", "king-of-valusia"],
  ["thulsa-doom", "leader-of-the-serpent-men"],
  ["xenobia", "queen-of-stygia"],
  ["jhebbal-sag", "god-of-the-jungle"],
  ["sacred-sword-of-akivasha", "legendary-weapon"],
  ["dark-hold", "fortress-of-evil"],
  ["black-river", "domain-of-conan"],
  ["pictish-wilds", "land-of-the-picts"],
  ["serpent-ring", "artifact-of-dhalla"],
  ["tower-of-the-elephant", "lair-of-thieves"],
  ["kezankian-desert", "wasteland-of-the-east"],
];

for (const [key, value] of hyborianEntries) {
  const index = map.hash(key);
  console.log(`   → SET: '${key}' → '${value}' → bucket[${index}]`);
  map.set(key, value);
}

console.log("");

// ——————————————————————————————
// Final State: Show non-empty buckets
// ——————————————————————————————
console.log("🏺 FINAL HYBORIAN REALMS (non-empty buckets):");
map.buckets.forEach((bucket, i) => {
  if (bucket.length > 0) {
    console.log(`   🪣 bucket[${i}] =`, bucket);
  }
});
console.log("");

// ——————————————————————————————
// Load Factor Check
// ——————————————————————————————
console.log("📊 FINAL METRICS");
console.log("Total entries (size):", map.size);
console.log("Current capacity:", map.capacity);
console.log("Buckets array length:", map.buckets.length);
const load = map.size / map.capacity;
console.log(`Load factor: ${map.size}/${map.capacity} = ${load.toFixed(2)}`);

if (load >= 0.75) {
  console.log("🔥 Load >= 0.75 — resize should have triggered!");
} else {
  console.log("🟢 Load under threshold — no resize needed yet");
}

console.log(map.get("conan"));
console.log(map.get("Ragnarssonovich"));
console.log(map.has("conan"));
console.log(map.has("Ragnarssonovich"));
console.log(map.has("belit"));
