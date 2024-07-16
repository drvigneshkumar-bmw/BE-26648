const   gulp = require('gulp');
        browserSync = require('browser-sync').create();
        reload = browserSync.reload;
        taskPlatforms = require('./platforms');
        taskImages = require('./images')
        taskProduction = require('./production');
        runSequence = require('run-sequence');
        clean = require('gulp-clean');


gulp.task("platforms", taskPlatforms);
gulp.task("images", taskImages);
gulp.task("production", taskProduction);

// Deleted the dist folder making it easier to see which mail you are working on. 
gulp.task('delete', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});
// The gulp watch task which starts the server and watches for changes //
gulp.task('server', () => {
    browserSync.init({
        server: "./dist",
        directory: true,
        open: false,
        port: 4000
    });
    gulp.watch(`source/**/*.html`, ['production']).on('change', browserSync.reload); 
});

gulp.task('watch', function(callback){
    runSequence(
        'delete',
        ['prod',
        'server'], 
        callback
        );
});

gulp.task('prod', ['images', 'platforms', 'production']);