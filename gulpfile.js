'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require("gulp-rename");
var jsdoc2md = require("jsdoc-to-markdown")




gulp.task('build', function (cb) {
	pump([
				gulp.src('src/*.js'),
				uglify({
					preserveComments:"license"
				}),
		rename({ suffix: '.min' }),
				gulp.dest("build")
		],
		cb
	);
});


/*
'use strict'
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
 
gulp.task('docs', function () {
	return gulp.src('src/*.js')
		.pipe(gulpJsdoc2md({ template: fs.readFileSync('./README.hbs', 'utf8') }))
		.on('error', function (err) {
			gutil.log(gutil.colors.red('jsdoc2md failed'), err.message)
		})
		.pipe(rename(function (path) {
			path.extname = '.md'
		}))
		.pipe(gulp.dest('docs'));
});
*/


gulp.task('docs', function () {
	var fs = require('fs')
	var jsdoc2md = require('jsdoc-to-markdown')
	
	jsdoc2md({ src: "src/*.js" })
		.pipe(process.stdout)
	
	/*
	return jsdoc2md.render({ files: 'lib/*.js' })
		.then(output => fs.writeFileSync('docs/api.md', output))
	*/
});