# Seeded Random Number Generator

This tool produces deterministic random results from one or more initial seeds.

```typescript
const rng = new RNG("seed");
const num1 = rng.getNextUInt32(); // 84807901
const num2 = rng.getNextUInt32(); // 1175613866
const num3 = rng.getNextUInt32(); // 1576582570
```

```typescript
const rng = new RNG("seed", "seed2", "seed3");
const num1 = rng.getNextUInt32(); // 2040237385
const num2 = rng.getNextUInt32(); // 1169532604
const num3 = rng.getNextUInt32(); // 774327889
```

You can also get positive integers with this tool:

```typescript
const rng = new RNG("seed1", "seed2", "seed3");
const num1 = rng.getNextUInt32(); // 1932350595
const num2 = rng.getNextUInt32({ max: 100 }); // 19
const num3 = rng.getNextUInt32({ min: 0, max: 100 }); // 20
const num4 = rng.getNextUInt32({ min: 90, max: 100 }); // 94
```

## Methods

| method                                    | description                                                                                                |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| rng.getNext()                             | Returns a 256 Buffer value - that is the SHA256 hash of the previous selected value                        |
| rng.getNextUInt32()                       | Returns a 32 bit unsigned integer using the result of rng.getNext()                                        |
| rng.getNextUInt32({ max : 100 })          | Returns an integer between 0 (including) and 100 (non-including), using the result of rng.getNextUInt32()  |
| rng.getNextUInt32({ min: 10, max : 100 }) | Returns an integer between 10 (including) and 100 (non-including), using the result of rng.getNextUInt32() |
