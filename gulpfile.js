// Dependencies
var gulp = require('gulp')
  , gulpLoadPlugins = require('gulp-load-plugins')
  , mainBowerFiles = require('main-bower-files')

// Autoload Gulp tasks from package.json
var plugins = gulpLoadPlugins();

// Get js libs from assets/js/dependencies and main bower_component files
var localLibs = ['assets/js/dependencies/*.js'];
var bowerLibs = mainBowerFiles().map(function(x){ return __dirname+"/" ? x.replace(__dirname+"/","") : x });
var libs = bowerLibs.concat(localLibs);

// Paths
var dirs = {
  dev: {
    config:  ['bower.json','package.json'],
    img:     ['assets/img/**/*.jpg',
              'assets/img/**/*.jpeg',
              'assets/img/**/*.gif',
              'assets/img/**/*.png'],
    svg:     ['assets/img/**/*.svg'],
    js:      ['assets/js/*.js'], // Specifically top-level only
    libs:    libs,
    data:    ['assets/data/**/*.json'],
    sass:    ['assets/sass/**/*.scss'],
    fonts:   ['assets/fonts/**/*'],
    html:    ['assets/partials/**/*']
  },
  prod: {
    images:   '.tmp/public/images',
    scripts:  '.tmp/public/scripts',
    styles:   '.tmp/public/styles',
    views:    '.tmp/public/partials'
  }
}

gulp.task('install', function () {
  return gulp.src(dirs.dev.config)
  .pipe(plugins.install());
});

// ----------------------------------------------------------------
// Styles

  gulp.task('css', function () {
    return gulp.src(dirs.dev.sass)
    .pipe(plugins.sass({errLogToConsole: true}))
    .pipe(plugins.autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(plugins.size({showFiles: true}))
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.size({showFiles: true}))
    .pipe(gulp.dest(dirs.prod.styles))
  });

  gulp.task('fonts', function() {
    return gulp.src(dirs.dev.fonts)
    .pipe(gulp.dest(dirs.prod.styles));
  });

// ----------------------------------------------------------------
// Javascript

  // Vendor JS
  gulp.task('libs', function() {
    return gulp.src(dirs.dev.libs)
    .pipe(plugins.concat('libs.min.js'))
    .pipe(plugins.size({showFiles: true}))
    .pipe(plugins.uglifyjs({mangle: false}))
    .pipe(plugins.size({showFiles: true}))
    .pipe(gulp.dest(dirs.prod.scripts));
  });

  // Project JS
  gulp.task('js', function() {
    return gulp.src(dirs.dev.js)
    .pipe(plugins.size({showFiles: true}))
    .pipe(plugins.uglifyjs({mangle: false}))
    .pipe(plugins.concat('app.min.js'))
    .pipe(plugins.size({showFiles: true}))
    .pipe(gulp.dest(dirs.prod.scripts));
  });

  // Datafiles
  gulp.task('data', function() {
    return gulp.src(dirs.dev.data)
    .pipe(gulp.dest(dirs.prod.scripts));
  });

  // Datafiles
  gulp.task('html', function() {
    return gulp.src(dirs.dev.html)
    .pipe(gulp.dest(dirs.prod.views));
  });

// ----------------------------------------------------------------
// Images

    gulp.task('img', function() {
      return gulp.src(dirs.dev.img)
      // .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
      .pipe(gulp.dest(dirs.prod.images));
    });

    gulp.task('svg', function() {
      return gulp.src(dirs.dev.svg)
      .pipe(plugins.svgmin())
      .pipe(plugins.replace(/_[0-9]+_/g, '')) // Illustrator SVGs; strip appended strings from id names
      .pipe(gulp.dest(dirs.prod.images));
    });

// ----------------------------------------------------------------
// Tasks

gulp.task('watch', function() {
  gulp.watch(dirs.dev.js,     ['js']);
  gulp.watch(dirs.dev.libs,   ['libs']);
  gulp.watch(dirs.dev.config, ['libs']);
  gulp.watch(dirs.dev.data,   ['data']);
  //
  gulp.watch(dirs.dev.sass,   ['css']);
  //
  gulp.watch(dirs.dev.fonts,  ['fonts']);
  gulp.watch(dirs.dev.img,    ['img']);
  gulp.watch(dirs.dev.svg,    ['svg']);
  //
  gulp.watch(dirs.dev.html,   ['html']);
});

gulp.task('assets', ['img', 'svg', 'fonts']);
gulp.task('build', ['css', 'js', 'libs', 'html', 'data']);
gulp.task('init', ['install', 'build', 'assets', 'watch']);
gulp.task('default', ['build', 'watch']);
