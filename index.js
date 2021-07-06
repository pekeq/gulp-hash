'use strict';

const crypto = require('crypto');
const through = require('through2');
const objectPath = require('object-path');

/**
 * @typedef {import('vinyl').BufferFile} File
 */
/**
 * @enum {string}
 * */
const Algorithm = {
	MD5: 'md5',
	SHA1: 'sha1',
	SHA256: 'sha256',
	SHA384: 'sha384',
	SHA512: 'sha512',
};
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
function GulpHash(algorithm = 'sha1') {
	let property = 'digest';
	if (typeof algorithm === 'object') {
		({ algorithm, property } = {
			algorithm: 'sha1',
			property,
			...algorithm,
		});
	}

	/**
	 * @param {File} file
	 * @param {BufferEncoding} enc
	 * @param {through.TransformCallback} callback
	 */
	async function digestFile(file, enc, callback) {
		if (file.isNull()) {
			callback(null, file);
			return;
		}

		const hash = crypto.createHash(algorithm);

		if (file.isStream()) {
			file.contents.on('data', (chunk) => {
				if (chunk.length > 0) {
					hash.update(chunk);
				}
			});
			file.contents.on('end', () => {
				objectPath.set(file, property, hash.digest('hex'));
				callback(null, file);
			});
		} else {
			// Is Buffer
			hash.update(file.contents);
			objectPath.set(file, property, hash.digest('hex'));
			callback(null, file);
		}
	}

	return through.obj(digestFile);
}

GulpHash.Algorithm = Algorithm;
module.exports = GulpHash;
