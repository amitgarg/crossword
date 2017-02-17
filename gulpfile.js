var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');

//--------DEVELOPMENT PROCESS ----------------------
gulp.task('sass',function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) //Using gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
})

gulp.task('cleanJs',function(callback){
  return del.sync('app/js/.');
})

gulp.task('browserify', function() {
    // Single entry point to browserify 
    gulp.src('app/sourcejs/**/*.js')
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(gulp.dest('app/js'))
      return browserSync.reload();
});

//--- group task to execute every development task
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss',['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/sourcejs/**/*.js', ['browserify']);
  // gulp.watch('app/js/**/*.js', browserSync.reload);
  //Other watchers
})

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
})
//-------------------  END   --------------------------


//---------------OPTIMIZATION PROCESS------------------
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    // .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
})

gulp.task('clean:dist', function(){
  return del.sync('dist');
})

//--------------------  END   --------------------------

gulp.task('build',function(callback){
  runSequence('clean:dist','sass', 'browserify', 'useref', callback)
})

//---- Task to be executed with only gulp command  ----
gulp.task('default', function(callback){
  runSequence(['sass','browserSync','watch'],callback)
})

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
})