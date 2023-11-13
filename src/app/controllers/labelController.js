const puppeteer = require('puppeteer');
const fs = require('fs');
const label = require('../models/labelModel');
const mustache = require('mustache');
const formData = require('form-data');

const createLabel = async(req, res) => {
	// Create a browser instance
	const browser = await puppeteer.launch();
	// const browser = await puppeteer.launch({executablePath: '/path/to/Chrome'});
	// Create a new page
	const page = await browser.newPage();

	// Website URL to export as pdf
	const html = fs.readFileSync('C:/Study/magic-post/src/app/utils/labelTemplate.html', 'utf-8');
	const filledHTML = mustache.render(html, data);

	
	await page.setContent(filledHTML, { waitUntil: 'domcontentloaded' });
	await page.emulateMediaType('screen');

	const pdf = await page.pdf({
		// path: 'result.pdf',
		margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
		printBackground: true,
		format: 'A4',
	});
	// const url = await page.evaluate(() => document.location.href);
	// console.log(url);

	// Set Content-Disposition header
    res.setHeader('Content-Disposition', 'attachment;filename=magic-post-label.pdf');
    // Set content type
    res.setHeader('Content-Type', 'application/pdf');

    // Send the PDF as the response
    res.send(pdf);
	
	await browser.close();
}

module.exports = {createLabel}