const test = require('ava');
const File = require('vinyl');
const hash = require('..');

const testString = 'abufferwiththiscontent';
const testSha1 = '8184b61afcaf05dbc2a4c3e7bd618d7e36b9c3ca';
const testSha512 =
	'6cf602fa4792c159bf1e06828dfa6a38e152453f39628cc22f3c53e67d23ccdf2ec31293ea1bfa06374b7f421c90c55864f6cd42cb88cb1c931c1a50d44e364f';

test('basic', (t) => {
	return new Promise((resolve) => {
		const stream = hash();
		stream.write(
			new File({
				contents: Buffer.from(testString),
			})
		);
		stream.once('data', (file) => {
			t.truthy(file.isBuffer());
			t.is(file.digest, testSha1);
			t.truthy(File.isCustomProp('digest'));
			resolve();
		});
	});
});

test('sha1', (t) => {
	return new Promise((resolve) => {
		const stream = hash(hash.Algorithm.SHA1);
		stream.write(
			new File({
				contents: Buffer.from(testString),
			})
		);
		stream.once('data', (file) => {
			t.truthy(file.isBuffer());
			t.is(file.digest, testSha1);
			t.truthy(File.isCustomProp('digest'));
			resolve();
		});
	});
});

test('sha512', (t) => {
	return new Promise((resolve) => {
		const stream = hash(hash.Algorithm.SHA512);
		stream.write(
			new File({
				contents: Buffer.from(testString),
			})
		);
		stream.once('data', (file) => {
			t.truthy(file.isBuffer());
			t.is(file.digest, testSha512);
			resolve();
		});
	});
});

test('with object argument', (t) => {
	return new Promise((resolve) => {
		const stream = hash({ property: 'theDigest' });
		stream.write(
			new File({
				contents: Buffer.from(testString),
			})
		);
		stream.once('data', (file) => {
			t.truthy(file.isBuffer());
			t.is(file.theDigest, testSha1);
			resolve();
		});
	});
});

test('empty object argument', (t) => {
	return new Promise((resolve) => {
		const stream = hash({});
		stream.write(
			new File({
				contents: Buffer.from(testString),
			})
		);
		stream.once('data', (file) => {
			t.truthy(file.isBuffer());
			t.is(file.digest, testSha1);
			resolve();
		});
	});
});

test('stream', (t) => {
	return new Promise((resolve) => {
		const { Readable } = require('stream');
		const rdr = new Readable();
		rdr._read = () => {};
		const stream = hash();
		stream.write(
			new File({
				contents: rdr,
			})
		);
		/* eslint-disable unicorn/no-array-push-push */
		rdr.push(testString.slice(0, 5));
		rdr.push(testString.slice(5));
		rdr.push(null);
		/* eslint-enable unicorn/no-array-push-push */
		stream.once('data', (file) => {
			t.false(file.isBuffer());
			t.true(file.isStream());
			t.is(file.digest, testSha1);
			resolve();
		});
	});
});
