# dopar

> It runs many promises in parallel.

## Installation

```console
yarn install dopar
```

## Usage

```javascript
import dopar from 'dopar'

const lazyPromises = [
  () => oneSecondDelay(),
  () => oneSecondDelay(),
  () => oneSecondDelay(),
]

dopar(3, lazyPromises) // resolves after +-1 second instead of 3 seconds
dopar.forEach(3, lazyPromises) // resolves after +-1 second instead of 3 seconds
```

The difference between `dopar` and `dopar.forEach` is that the latter does not store any result in memory.
