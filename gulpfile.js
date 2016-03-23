var gulp = require('gulp');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var html2js = require('gulp-html2js');




gulp.task('default', function() {
  // place code for your default task here
	console.log("gulpertinger");

	gulp.src(['public/script.js','public/modules/mep/controller.js'] )
	  .pipe(concat('all.js'))
	  .pipe(minify())
	  .pipe(gulp.dest('build'));  // Writes 'build/somedir/somefile.js'

       gulp.src('public/modules/**/*.html')
        .pipe(html2js('angular-templates.js', {
            adapter: 'angular',
            base: 'templates',
            name: 'angular-demo'
        }))
        .pipe(gulp.dest('build/'));
});
