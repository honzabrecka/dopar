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
  () => delay(1000),
  () => delay(1000),
]

dopar(3, lazyPromises) // resolves after +-1 second instead of 2 seconds
```
