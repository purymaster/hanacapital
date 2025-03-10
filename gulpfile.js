import { src, dest, lastRun, watch, series, parallel } from "gulp";
import { deleteAsync } from 'del';
import ejs from 'gulp-ejs';
import merge from 'merge-stream';
import prefix from "gulp-autoprefixer";
import px2rem from "gulp-px2rem";
import gulpSass from 'gulp-sass';
import sassCompiler from 'sass';
import sourcemaps from 'gulp-sourcemaps';
import beautify from 'gulp-beautify';
import sync from 'browser-sync';

const sass = gulpSass(sassCompiler);

const handleError = (error) => {
  console.error(error.toString());
  this.emit('end');
};

const clean = () => deleteAsync(['output/*']);

const html = () => {
  const regularHtml = () => {
    return src(['src/**/*.html', '!src/error/**/*.html'])
      .pipe(ejs().on('error', handleError))
      .pipe(beautify.html({
        indent_size: 2,
        indent_with_tabs: true,
      }))
      .pipe(dest('output/template'))
      .pipe(sync.reload({ stream: true }));
  };

  const errorHtml = () => {
    return src('src/error/**/*.html')
      .pipe(ejs().on('error', handleError))
      .pipe(beautify.html({
        indent_size: 2,
        indent_with_tabs: true,
      }))
      .pipe(dest('output/static/error'))
      .pipe(sync.reload({ stream: true }));
  };

  return merge(regularHtml(), errorHtml());
};

const css = () => {
  return src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "expanded",
      sourceComments: false
    }).on('error', handleError))
    // .pipe(prefix())
    // .pipe(px2rem())
    // .pipe(beautify.css({
    //   indent_size: 2,
    //   indent_with_tabs: true,
    // }))
    .pipe(sourcemaps.write('.', { includeContent: false }))
    .pipe(dest('output/static/css'))
    .pipe(sync.reload({ stream: true }));
};

const js = () => {
  return src('src/js/**/*.js')
    .pipe(beautify.js({
      indent_size: 2,
      indent_with_tabs: true,
    }))
    .pipe(dest('output/static/js'))
    .pipe(sync.reload({ stream: true }));
};

const img = () => {
  return src('src/img/**/*.{png,jpg,jpeg,gif,svg}', { encoding: false })
    .pipe(dest('output/static/img'))
    .pipe(sync.reload({ stream: true }));
};

const font = () => {
  return src('src/fonts/*', { encoding: false })
    .pipe(dest('output/static/fonts'))
    .pipe(sync.reload({ stream: true }));
};

const liveServer = () => {
  return new Promise(resolve => {
    sync.init({
      port: 3000,
      browser: 'chrome',
      server: {
        baseDir: "output",
        index: 'template/index.html',
      }
    });
    resolve();
  });
};

const watchServer = () => {
  watch('src/**/*.{ejs,html}', html);
  watch('src/sass/**/*.scss', css);
  watch('src/js/*.js', js);
  watch('src/img/**/*.{png,jpg,jpeg,gif,svg}', img);
  watch('src/fonts/*', font);
};

const defaultTask = series(
  clean,
  parallel(html, css, js, img, font),
  liveServer,
  watchServer
);

export { defaultTask as default };