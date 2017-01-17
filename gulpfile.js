const gulp 		  = require("gulp");
const sass 		  = require("gulp-sass");
const notify 	  = require("gulp-notify");
const htmlmin 	= require("gulp-htmlmin");
const cssmin 	  = require('gulp-clean-css');
const imageop   = require('gulp-image-optimization');

gulp.task('compile', function () {
	return gulp.src("./source/scss/**/*.scss")
			.pipe(sass())
			.on("error", notify.onError({title:"Erro ao compilar CSS", message:"<%= error.message %>"}))
			.pipe(gulp.dest("./source/css"))
});

gulp.task('min-css', function(){
  return gulp.src('./source/css/**/*.css')
    		.pipe(cssmin({compatibility: 'ie8'}))
   			.pipe(gulp.dest('./build/css'));
});

gulp.task('min-html', function() {
  return gulp.src('./source/*.html')
    		.pipe(htmlmin({collapseWhitespace: true}))
    		.pipe(gulp.dest('./build'));
});

gulp.task('img', function(cb) {
    gulp.src(['./source/img/**/*']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('./build/img')).on('end', cb).on('error', cb);
});

gulp.task('watch', function() {
    gulp.watch('./source/scss/**/*.scss', ['compile']);
    gulp.watch('./source/css/**/*.css', ['min-css']);
    gulp.watch('./source/*.html', ['min-html']);
    gulp.watch('./source/img/**/*', ['img']);
});

gulp.task('default',['compile','watch']);