export = GulpHash;
/**
 * @typedef {Object} GulpHashOptions
 * @property {Algorithm} [algorithm=sha1]
 * @property {string} [property=digest]
 */
/**
 *
 * @param {Algorithm|GulpHashOptions} [algorithm]
 * @returns {NodeJS.ReadWriteStream}
 */
declare function GulpHash(algorithm?: Algorithm | GulpHashOptions): NodeJS.ReadWriteStream;
declare namespace GulpHash {
    export { Algorithm, GulpHashOptions, File };
}
/**
 * *
 */
type Algorithm = string;
declare namespace Algorithm {
    const MD5: string;
    const SHA1: string;
    const SHA256: string;
    const SHA384: string;
    const SHA512: string;
}
type GulpHashOptions = {
    algorithm?: Algorithm;
    property?: string;
};
type File = import('vinyl').BufferFile;
