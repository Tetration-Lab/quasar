// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.23;

import {PolynomialVector, Polynomial} from "@tetrationlab/dilithium/Dilithium.sol";

interface IPolyVector {
    function constructMat() external pure returns (PolynomialVector.PolyVecL memory);
}