mod parser;
mod types;
use bellman::groth16::prepare_verifying_key;
use bellman::groth16::verify_proof;
use bellman::groth16::{ Proof, VerifyingKey };
use bls12_381::{ Bls12, Scalar };

use parser::parse_proof;
use parser::parse_v_key;

fn main() {
    let pof: Proof<Bls12> = parse_proof();
    let vk: VerifyingKey<Bls12> = parse_v_key();
    let pvkv = prepare_verifying_key(&vk);
    let public_input: Vec<Scalar> = vec![Scalar::from(30)];
    let result = verify_proof(&pvkv, &pof, &public_input);
    print!("{:?}\n", public_input);
    print!("result is {:?}", result);
}


   