export = GulpHash;
/**
 * @typedef {Object} GulpHashOptions
 * @property {Algorithm} [algorithm=SHA-1]
 * @property {string} [property=digest]
 */
/**
 *
 * @param {Algorithm|GulpHashOptions} [algorithm]
 * @returns {NodeJS.ReadWriteStream}
 */
declare function GulpHash(algorithm?: Algorithm | GulpHashOptions): NodeJS.ReadWriteStream;
declare namespace GulpHash {
    export { Algorithm, GulpHashOptions };
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
type GulpHashOptions = {
    algorithm?: Algorithm;
    property?: string;
};
