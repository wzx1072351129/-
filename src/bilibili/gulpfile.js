var gulp= require('gulp');
var less=require('gulp-less');
// var cssnano=require('gulp-cssnano');
gulp.task('css',function(){
    gulp.src(['less/*.less','!less/_*.less'])
        .pipe(less())
        // .pipe(cssnano())
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream());
});

var browserSync = require('browser-sync').create();
gulp.task('serve',function(){
    browserSync.init({
        server:{
            baseDir:'./'
        }
    });
    gulp.watch('less/*.less',['css']);
    gulp.watch('css/*.css').on('change',browserSync.reload);
    gulp.watch('js/*.js').on('change',browserSync.reload);
    gulp.watch('*.html').on('change',browserSync.reload);
});

gulp.task('default',['serve']);