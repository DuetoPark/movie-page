var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');

gulp.task("styles", async function () {
  gulp.src("./css/*")
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest('build'));
  gulp.src("./css/responsive/*")
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest('build/responsive'));
});
