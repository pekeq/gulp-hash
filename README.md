# gulp-hash

Generate a digest of contents and add to file object property.

## Installation

```
  $ npm install --save-dev pekeq/gulp-hash
```

## Usage

```js
const { src } = require('gulp');
const hash = require('gulp-hash');

exports.default = function() {
  return src('src/images/**')
    .pipe(hash()) // default: sha1
    .pipe(...)
}
```

## API

### hash(algorithm)

#### Parameters

- `algorithm`: Hash algorithm
  Supported values are:
  - `md5`
  - `sha1` (default)
  - `sha256`
  - `sha384`
  - `sha512`

### hash({algorithm, property})

#### Parameters

- `algorithm`: Hash algorithm (default: `sha1`)
- `property`: Custom property name (default: `digest`)

## License

MIT

(c) Hideo Matsumoto
