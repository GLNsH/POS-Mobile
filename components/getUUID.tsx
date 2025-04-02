import * as Crypto from 'expo-crypto';

export default function getUUID () {
    let randUUID = Crypto.randomUUID();
    return randUUID
}

export async function handleText (text: string) {
    const result = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,text);
    return result === 'bdc622faab9446a8defdf27be1fb208c480598dc53eeec60e1ba0d3cee801d86'
}