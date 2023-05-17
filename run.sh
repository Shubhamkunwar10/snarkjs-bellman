#!/bin/bash

rm -rf ./outputs
rm -rf ./setup
rm -rf ./witness.wtns
mkdir ./outputs
mkdir ./setup
# Compile the circuit

circom ./circuits/Factor.circom --r1cs --wasm --sym --c --output ./outputs -l ./prover/node_modules/circomlib/circuits -p bls12381

# Setup phase 1
snarkjs powersoftau new bls12381 12 ./setup/pot12_0000.ptau -v


snarkjs powersoftau contribute ./setup/pot12_0000.ptau ./setup/pot12_0001.ptau --name="First contribution from shell" -v


# Setup phase 2

snarkjs powersoftau prepare phase2 ./setup/pot12_0001.ptau ./setup/pot12_final.ptau -v


snarkjs groth16 setup ./outputs/Factor.r1cs ./setup/pot12_final.ptau ./setup/Factor_0000.zkey

snarkjs zkey contribute ./setup/Factor_0000.zkey ./setup/Factor_0001.zkey --name="Shell User" -v

snarkjs zkey export verificationkey ./setup/Factor_0001.zkey ./setup/verification_key.json


