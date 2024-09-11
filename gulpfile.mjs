import {parallel, src, dest} from 'gulp'; 
import webp from 'gulp-webp';
// import gulpAvif from 'gulp-avif';
import rename from 'gulp-rename'; 

function build_webp() {
    return src('public/img/*')
        .pipe(rename(path => path.basename += path.extname))
        .pipe(webp())
        .pipe(dest("public/img/")); 
}

// function build_avif() {
//     return src('public/img/*')
//         .pipe(rename(path => path.basename += path.extname))
//         .pipe(gulpAvif())
//         .pipe(dest("public/img/")); 
// }

export default parallel(build_webp); 
