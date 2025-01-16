---
"motidata": major
---

Repository methods read json-data themselves and return it as part of the `SimpleResponseDTO` return value.
Remove calls to `Response.json` and instead handle the new return Type `SimpleResponseDTO`.
