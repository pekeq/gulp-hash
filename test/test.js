const test = require('ava');
const File = require('vinyl');
const hash = require('..');

const testString = 'abufferwiththiscontent';
const testSha1 = '8184b61afcaf05dbc2a4c3e7bd618d7e36b9c3ca';
const testSha512 =
	'6cf602fa4792c159bf1e06828dfa6a38e152453f39628cc22f3c53e67d23ccdf2ec31293ea1bfa06374b7f421c90c55864f6cd42cb88cb1c931c1a50d44e364f';

test('sha1', (t) => {
	return new Promise((resolve) => {
		const stream = hash('SHA-1');
		stream.write(
			new File({
				contents: Buffer.from(testString),
			})
		);
		stream.once('data', (file) => {
			t.truthy(file.isBuffer());
			t.is(file.hash, testSha1);
			t.truthy(File.isCustomProp('hash'));
			resolve();
		});
	});
});

test('sha512', (t) => {
	return new Promise((resolve) => {
		const stream = hash('SHA-512');
		stream.write(
			new File({
				contents: Buffer.from(testString),
			})
		);
		stream.once('data', (file) => {
			t.truthy(file.isBuffer());
			t.is(file.hash, testSha512);
			resolve();
		});
	});
});
