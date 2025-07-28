# HashMap Implementation

A from-scratch implementation of a hash map in JavaScript, built as part of The Odin Project curriculum.

This `HashMap` class supports:

- Key-value storage with string keys
- Collision handling via chaining
- Dynamic resizing when load factor (0.75) is reached
- Full CRUD operations and data retrieval methods

## Methods

- `set(key, value)`
- `get(key)`
- `has(key)`
- `remove(key)`
- `length()`
- `clear()`
- `keys()`, `values()`, `entries()`

## Usage Example

```js
const map = new HashMap();
map.set("apple", "red");
map.set("banana", "yellow");
console.log(map.get("apple")); // 'red'
console.log(map.keys()); // ['apple', 'banana']
```

Built following [The Odin Project - Project: HashMap](https://www.theodinproject.com/lessons/javascript-hashmap).
