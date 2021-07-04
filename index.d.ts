export = GulpHash;
/**
 *
 * @param {Algorithm} [algorithm=SHA-1]
 * @returns
 */
declare function GulpHash(algorithm?: Algorithm): any;
declare namespace GulpHash {
    export { Algorithm };
}
/**
 * *
 */
type Algorithm = string;
declare namespace Algorithm {
    const SHA1: string;
    const SHA256: string;
    const SHA384: string;
    const SHA512: string;
}
