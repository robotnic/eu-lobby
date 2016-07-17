var gulp = require('gulp');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var html2js = require('gulp-html2js');
var inject = require('gulp-inject');
var templateCache = require('gulp-angular-templatecache');
var concatCss = require('gulp-concat-css');
var watch = require('gulp-watch');


var spritesmith = require('gulp.spritesmith');
var imageResize = require('gulp-image-resize');

gulp.task('copy',function(){
	gulp.src(['public/icons/*']).pipe(gulp.dest('build/icons'));
	gulp.src(['public/manifest.json']).pipe(gulp.dest('build/manifest.json'));
});


gulp.task('sprite', function () {
  var spriteData = gulp.src('./images/*.jpg')
 .pipe(imageResize({ 
      width : 30,
      height : 35,
      quality : 10,
      crop : true,
      upscale : false
    }))
   .pipe(spritesmith({
    imgName: 'sprite.jpg',
    cssName: 'sprite.css'
  }));
  spriteData.on("error",function(error){
	console.log("errorr",error);
  });
  return spriteData.pipe(gulp.dest('build'));
});

var cssfiles=[
"public/style.css",
"public/modules/**/*.css",
"public/bower_components/angular-material/angular-material.css"
]
 
gulp.task('css', function () {
  //return gulp.src('public/**/*.css')
  return gulp.src(cssfiles)
    .pipe(concatCss("styles/bundle.css"))
    .pipe(gulp.dest('build'));
});



var sources=[

"public/bower_components/angular/angular.js",
"public/bower_components/angular-sanitize/angular-sanitize.js",
"public/bower_components/angular-ui-router/release/angular-ui-router.js",
"public/bower_components/angular-aria/angular-aria.js",
"public/bower_components/angular-animate/angular-animate.js",
"public/bower_components/angular-material/angular-material.js",
"public/bower_components/ng-country-select/dist/ng-country-select.js",
"public/bower_components/json-formatter/dist/json-formatter.js",
"public/bower_components/moment/moment.js",
"public/bower_components/angular-moment/angular-moment.js",
"public/modules/dossier/controller.js",
"public/modules/mep/controller.js",
"public/modules/vote/controller.js",
"public/modules/cal/cal.js",
"public/modules/timeline/timeline.js",
"public/bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js",
"public/bower_components/lodash/dist/lodash.js",
"public/bower_components/google-diff-match-patch/diff_match_patch.js",
"public/bower_components/angular-diff-match-patch/angular-diff-match-patch.js",
"build/angular-templates.js",
"public/script.js"
]


gulp.task('templateswatch', function() {
    gulp.watch('public/modules/**/*.html', ['templates','js-fef']);
    gulp.watch('public/index.html', ['html']);
    gulp.watch('public/**/*.css',['css']);
    gulp.watch('public/script.js',['js-fef']);
    gulp.watch('public/modules/**/*.js',['js-fef']);
//  })
})


gulp.task('templates', function() {
	console.log("doing the templates");
        gulp.src('public/modules/**/*.html')
	.pipe(templateCache("angular-templates.js",{module:"templates",transformUrl:function(url){return "modules/"+url},standalone:true}))
        .pipe(gulp.dest('build'));
})

gulp.task('html', function() {
	console.log("updating index.html");
	gulp.src(['public/index.html'],{
		addRootSlash: false,  // ensures proper relative paths
		ignorePath: 'build/' // ensures proper relative paths
	    })
	  .pipe(inject(gulp.src(['build/concat.js'], {read: false}), {relative: false}))
	  //.pipe(inject(gulp.src('public/**/*.js', {read: false}), {relative: true}))
	  //.pipe(inject(gulp.src('public/concat.js')))
	  .pipe(gulp.dest('build'));
});


    gulp.task('js-fef', function(){
        return gulp.src(sources)
            .pipe(concat('concat.js'))
//	    .pipe(minify())
            .pipe(gulp.dest('build'));
    });

    gulp.task('default', ['templates','templateswatch','js-fef','html','copy','css'], function(){});
    gulp.task('all', ['sprite','templates','js-fef','html','copy'], function(){});
    //gulp.task('default', ['sprite'], function(){});

