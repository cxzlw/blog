module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{css,ico,jpg,png,gif,js,xml,html}'
	],
	globIgnores: [
		'icons/*'
	], 
	swDest: 'public/sw.js',
	swSrc: 'source/sw.js', 
};
