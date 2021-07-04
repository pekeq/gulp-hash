'use strict';

const through = require('through2');
const PluginError = require('plugin-error');
const File = require('vinyl'); // eslint-disable-line no-unused-vars
const objectPath = require('object-path');
const { Crypto } = require('@peculiar/webcrypto');

const PLUGIN_NAME = 'gulp-hash';
const crypto = new Crypto();

/**
 * @enum {string}
 * */
const Algorithm = {
	SHA1: 'SHA-1',
	SHA256: 'SHA-256',
	SHA384: 'SHA-384',
	SHA512: 'SHA-512',
};

/**
 *
 * @param {Algorithm} [algorithm=SHA-1]
 * @returns
 */
function GulpHash(algorithm) {
	if (typeof algorithm === 'undefined') {
		algorithm = 'SHA-1';
	}

	/**
	 * @param {File} file
	 * @param {BufferEncoding} enc
	 * @param {through.TransformCallback} callback
	 * @returns
	 */
	async function digestFile(file, enc, callback) {
		if (file.isNull()) {
			callback(null, file);
			return;
		}

		if (file.isStream()) {
			callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
			return;
		}

		if (!file.isBuffer()) {
			callback(new PluginError(PLUGIN_NAME, 'Only Buffer is supported'));
			return;
		}

		// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
		const hashBuffer = await crypto.subtle.digest(algorithm, file.contents);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
		objectPath.set(file, 'hash', hash);

		callback(null, file);
	}

	return through.obj(digestFile);
}

module.exports.Algorithm = Algorithm;
module.exports = GulpHash;
