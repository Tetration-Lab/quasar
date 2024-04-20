// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.23;

import {Dilithium, PolynomialVector, Polynomial, K} from "@tetrationlab/dilithium/Dilithium.sol";

interface IDilithiumPublicKey {
    function expandedPublicKey() external pure returns (Dilithium.ExpandedPublicKey memory);
}

contract DilithiumPublicKey is IDilithiumPublicKey {
    using Polynomial for Polynomial.Poly;
    using PolynomialVector for PolynomialVector.PolyVecK;
    using PolynomialVector for PolynomialVector.PolyVecL;

    constructor() {}

    function constructMat0() internal pure returns (PolynomialVector.PolyVecL memory) {
        Polynomial.Poly memory mat00 = Polynomial.Poly({%%mat0.vec[0]%%});
        Polynomial.Poly memory mat01 = Polynomial.Poly({%%mat0.vec[1]%%});
        Polynomial.Poly memory mat02 = Polynomial.Poly({%%mat0.vec[2]%%});
        Polynomial.Poly memory mat03 = Polynomial.Poly({%%mat0.vec[3]%%});
        return PolynomialVector.PolyVecL([mat00, mat01, mat02, mat03]);
    }

    function constructMat1() internal pure returns (PolynomialVector.PolyVecL memory) {
        Polynomial.Poly memory mat10 = Polynomial.Poly({%%mat1.vec[0]%%});
        Polynomial.Poly memory mat11 = Polynomial.Poly({%%mat1.vec[1]%%});
        Polynomial.Poly memory mat12 = Polynomial.Poly({%%mat1.vec[2]%%});
        Polynomial.Poly memory mat13 = Polynomial.Poly({%%mat1.vec[3]%%});
        return PolynomialVector.PolyVecL([mat10, mat11, mat12, mat13]);
    }

    function constructMat2() internal pure returns (PolynomialVector.PolyVecL memory) {
        Polynomial.Poly memory mat20 = Polynomial.Poly({%%mat2.vec[0]%%});
        Polynomial.Poly memory mat21 = Polynomial.Poly({%%mat2.vec[1]%%});
        Polynomial.Poly memory mat22 = Polynomial.Poly({%%mat2.vec[2]%%});
        Polynomial.Poly memory mat23 = Polynomial.Poly({%%mat2.vec[3]%%});
        return PolynomialVector.PolyVecL([mat20, mat21, mat22, mat23]);
    }

    function constructMat3() internal pure returns (PolynomialVector.PolyVecL memory) {
        Polynomial.Poly memory mat30 = Polynomial.Poly({%%mat3.vec[0]%%});
        Polynomial.Poly memory mat31 = Polynomial.Poly({%%mat3.vec[1]%%});
        Polynomial.Poly memory mat32 = Polynomial.Poly({%%mat3.vec[2]%%});
        Polynomial.Poly memory mat33 = Polynomial.Poly({%%mat3.vec[3]%%});
        return PolynomialVector.PolyVecL([mat30, mat31, mat32, mat33]);
    }

    function expandedPublicKey() external pure override returns (Dilithium.ExpandedPublicKey memory epk) {
        bytes32 packed = hex"{%%packed%%}";
        PolynomialVector.PolyVecK memory t1;
        Polynomial.Poly memory t1_0 = Polynomial.Poly({%%t1.vec[0]%%});
        Polynomial.Poly memory t1_1 = Polynomial.Poly({%%t1.vec[1]%%});
        Polynomial.Poly memory t1_2 = Polynomial.Poly({%%t1.vec[2]%%});
        Polynomial.Poly memory t1_3 = Polynomial.Poly({%%t1.vec[3]%%});
        t1 = PolynomialVector.PolyVecK([t1_0, t1_1, t1_2, t1_3]);
        PolynomialVector.PolyVecL[K] memory mat;
        PolynomialVector.PolyVecL memory mat0 = constructMat0();
        PolynomialVector.PolyVecL memory mat1 = constructMat1();
        PolynomialVector.PolyVecL memory mat2 = constructMat2();
        PolynomialVector.PolyVecL memory mat3 = constructMat3();
        mat = [mat0, mat1, mat2, mat3];
        epk.packed = packed;
        epk.mat = mat;
        epk.t1 = t1;
    }
}