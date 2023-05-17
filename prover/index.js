const snarkjs = require('snarkjs');
const ffjavascript = require('ffjavascript');
const utils = require('./utils');
const binFileUtils = require('@iden3/binfileutils');
const { getGroth16VK } = require('./utils');
const fs = require('fs');
const main = async () => {
    // const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    //     {
    //         a: 5, b: 6
    //     }
    //     , '../outputs/Factor_js/Factor.wasm', '../setup/Factor_0001.zkey');
    // const vk = await snarkjs.zKey.exportVerificationKey('../setup/Factor_0001.zkey');
    // const res = await snarkjs.groth16.verify(vk, publicSignals, proof);
    // console.log(res, publicSignals);
    // convert proof to uncompressed format

    const anydata = await utils.groth16FullProve(
        {
            a: 5, b: 6
        }
        , '../outputs/Factor_js/Factor.wasm', '../setup/Factor_0001.zkey');        // convert key to uncompressed format
    const { fd: fdZKey, sections: sectionsZKey } = await binFileUtils.readBinFile('../setup/Factor_0001.zkey', "zkey", 2, 1 << 25, 1 << 23);
    const zkey = await utils.readHeader(fdZKey, sectionsZKey);
    const vkey = await getGroth16VK(zkey, fdZKey, sectionsZKey);
    fs.writeFileSync('vkey_uncompressed.json', JSON.stringify(vkey));
    fs.writeFileSync('proof_uncompressed.json', JSON.stringify(anydata.uncompressed_proof));
}





main().then(() => {
    process.exit(0);
})