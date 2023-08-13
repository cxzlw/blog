module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{css,ico,png,gif,js,html}'
	],
	globIgnores: [
		'icons/*'
	], 
	swDest: 'public/sw.js',
	swSrc: 'source/sw.js', 
};