// Publishes all html files in templates/*.html to docs/*.html.
// Place root files in `templates/` and partial files in subfolders, for example `templates/layouts`.
//
// Features:
// - partial data with `<partial src="foo/bar.html" />`
// - partial content with `<partial src="foo/bar.html">your content</p>`, then use `{{ content }}` inside the partial to output `your content`
// - partial attributes with `<partial src="foo/bar.html" key="value" />`, then use `{{ key }}` inside the partial to output `value`
// - text.yml data with `{{ any yaml key }}` on any file
// - text.yml attributes with `<put src="any yaml key" foo="bar">` on any file, then use `{{ foo }}` inside the yaml value to output `bar`
//
// Creates one html file in docs/ for each html file in templates/ that doesn't start with `_`.
// Supports markdown partials.
//
// Run `npm install`, then you can `node publish.js` and inspect docs/ files.

const fs = require('fs');
const parser = require('node-html-parser');
const beautify_html = require('js-beautify').html;
const yaml = require('js-yaml');
const showdown = require('showdown');
const markdown = new showdown.Converter();

// config
const inputPath = __dirname + '/templates/';
const outputPath = __dirname + '/docs/';
const dictionary = yaml.load(maybeReadFile(__dirname + '/text.yml')) || {};
const inputFilenameRegex = new RegExp('\.html$');

// main
fs.readdirSync(inputPath)
	.filter(filename => filename.match(inputFilenameRegex))
	.forEach(filename => {
		const outputFilename = outputPath + filename;
		const outputError = `Cannot write output (${outputFilename})`;
		let html = maybeReadFile(inputPath + filename);
		html = replaceSnippets(html, inputPath, dictionary);
		html = beautify_html(html, {indent_size: 2});

		fs.writeFile(outputFilename, html, log_error(outputError));
});

// helpers
function maybeReadFile(filename) {
	try {
		const isMarkdown = (filename.substring(filename.length - 3, filename.length) == '.md');
		const content = fs.readFileSync(filename, 'utf8').toString();
		return isMarkdown ? markdown.makeHtml(content) : content;
	}
	catch(err) {
		console.error(`Missing file (${err.path})`);
		return '';
	}
}

function replaceSnippets(html, inputPath, dictionary) {
	const tag = 'partial', attr = 'src';
	let elem, doc = parser.parse(replaceBraces(html, dictionary));

	while(elem = doc.querySelector(tag + '[' + attr + ']')) {
		const {[attr]: source, ...tagDictionary} = elem.attributes;
		const partialDictionary = {...dictionary, ...tagDictionary, content: elem.innerHTML};
		const rawPartial = readPartial(source, inputPath, dictionary);
		const parsedPartial = replaceBraces(rawPartial, partialDictionary);

		elem.replaceWith(parsedPartial);
	}

	return doc.toString();
}

function replaceBraces(text, dictionary) {
	const regexp = /{{\s*([\w\s]+)\s*}}/g;
	let key;

	return text.replaceAll(regexp, replacement => {
		key = replacement.substring(2, replacement.length - 2).trim()
		return dictionary[key] || replacement;
	});
}

function readPartial(key, inputPath, dictionary) {
	const fileContent = maybeReadFile(inputPath + key);
	return fileContent || dictionary[key] || '';
}

function log_error(msg) {
	return err => { if (err) { console.error(msg); console.error(err); } };
}
