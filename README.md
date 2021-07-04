# gulp-hash

Generate a digest of contents and add to file object property.

## Installation

```
  $ npm install --save-dev pekeq/gulp-hash
```

## Usage

```
const { src } = require('gulp');
const hash = require('gulp-hash');

exports.default = function() {
  return src('src/images/**')
    .pipe(hash()) // default=SHA-1
    .pipe(...)
}
```

## API

### hash(algorithm)

#### Parameters

- algorithm
  Supported values are:
  - `SHA-1` (default)
  - `SHA-256`
  - `SHA-384`
  - `SHA-512`

## TODO

- choice property name (like gulp-front-matter)

## License

MIT

(c) Hideo Matsumoto
