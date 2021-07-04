export = GulpHash;
/**
 * @typedef {Object} Options
 * @property {Algorithm} [algorithm=SHA-1]
 * @property {string} [property=digest]
 */
/**
 *
 * @param {Algorithm|Options} [algorithm]
 * @returns
 */
declare function GulpHash(algorithm?: Algorithm | Options): any;
declare namespace GulpHash {
    export { Algorithm, Options };
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
type Options = {
    algorithm?: Algorithm;
    property?: string;
};
