const   gulp = require('gulp');
        imagemin = require('gulp-imagemin');
        imageminMozjpeg = require('imagemin-mozjpeg'); 
        fs = require("fs");

const images = () => {
    fs.readdir('source', (err, list) => {
        list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
        list.forEach((item) => {
            gulp.src(`source/${item}/images/*`)
                .pipe(imagemin([
                    imageminMozjpeg({
                        quality: 85
                    })
                ]))
                .pipe(gulp.dest(`dist/${item}/HTML/images/`))
        })
    })
};

module.exports = images;