## Introduction

A demo implementation of groth16 using [SnarkJs (by Iden3)](
https://github.com/iden3/snarkjs) for generating proof and [Bellman (by zkcrypto)](https://github.com/zkcrypto/bellman/) for verification. Our goal was to have rust based implementation for verification so that it can be deployed on blockchains which uses rust based smart contracts like Cosomwasam, Solana etc. 


## Steps to Run
1. Clone the repository
2. Run the following commands
```
cd prover
npm i
cd ..
sh run.sh
cd prover
npm start
```
You will get PublicSignals on console screen. Copy them for later use.

Now
```
cd verifier
cd src
```

Modify main.rs file 
```rust
    let public_input: Vec<Scalar> = vec![Scalar::from(30)];
```
TO
```rust
    let public_input: Vec<Scalar> = vec![Scalar::from(30), Scalar::from(${PublicSignals `Copied Earlier`})];
```

Now
```
cargo run 
```
