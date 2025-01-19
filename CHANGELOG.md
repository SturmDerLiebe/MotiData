# motidata

## 2.0.0

### Major Changes

- 36de82b: Repository methods read json-data themselves and return it as part of the `SimpleResponseDTO` return value.
  Remove calls to `Response.json` and instead handle the new return Type `SimpleResponseDTO`.

### Minor Changes

- 24f910e: Ported over GroupRepository

## 1.0.2

### Patch Changes

- d8ef177: Extend UserRepository Tests

## 1.0.1

### Patch Changes

- bdf7729: Initial Release
