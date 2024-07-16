const   gulp = require('gulp');
        replace = require('gulp-replace');
        fs = require("fs");

const production = () => {
    fs.readdir('source', (err, list) => {
        list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
        list.forEach((item) => {
            gulp.src(`source/${item}/**/index.html`) 
                .pipe(replace(' ', ' '))
                .pipe(replace("’", "'"))
                .pipe(replace("£", "&pound;"))
                .pipe(replace("°", "&#176;"))
                .pipe(replace("–", "&ndash;"))
                .pipe(replace("†", "&dagger;"))
                .pipe(replace("é", "&eacute;"))
                .pipe(replace("", " "))
                .pipe(gulp.dest(`dist/${item}/HTML/`));
        })
    })
};

module.exports = production;