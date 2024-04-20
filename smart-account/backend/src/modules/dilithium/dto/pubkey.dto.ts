export class ExpandedPublicKeyDto {
  packed: number[]
  mat: PolyVec[]
  t1: PolyVec
}

export class Poly {
  coeffs: number[]
}

export class PolyVec {
  vec: Poly[]
}