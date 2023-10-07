import {parallel, src, dest} from 'gulp'; 
const webp = require('gulp-webp');
const gulpAvif = require('gulp-avif');
const rename = require('gulp-rename')

function build_webp() {
    return src('public/img/*.{jpg,png}')
        .pipe(rename(path => path.basename += path.extname))
        .pipe(webp())
        .pipe(dest("public/img/")); 
}

function build_avif() {
    return src('public/img/*.{jpg,png}')
        .pipe(rename(path => path.basename += path.extname))
        .pipe(gulpAvif())
        .pipe(dest("public/img/")); 
}

export default parallel(build_webp, build_avif); 
