/**
 * [gulp 前端开发环境   1->开发环境（port->2222），2->生产环境（port->8888）]
 * @type {[type]}
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'), //- 多个文件合并为一个；
    cleanCSS = require('gulp-clean-css'), //- 压缩CSS为一行；
    ugLify = require('gulp-uglify'), //压缩js
    imageMin = require('gulp-imagemin'), //压缩图片
    pngquant = require('imagemin-pngquant'), // 深度压缩
    htmlMin = require('gulp-htmlmin'), //压缩html
    changed = require('gulp-changed'), //检查改变状态
    less = require('gulp-less'), //压缩合并less
    sass = require('gulp-sass'), //压缩合并less
    rename = require('gulp-rename'), //重命名
    sourcemaps = require('gulp-sourcemaps'), //重命名
    del = require('del'),
    browserSync = require("browser-sync").create(); //浏览器实时刷新



/*-------------开发环境-------------*/
gulp.task('srcServe',['watch'], function() {

    browserSync.init({
        port: 2222,
        server: {
            baseDir: ['src']
        }
    });


});

// 监听文件变化
gulp.task('watch', function() {
    gulp.watch('src/**/*.js').on('change', browserSync.reload);
	gulp.watch('src/**/*.css').on('change', browserSync.reload);
    gulp.watch('src/*.html').on('change', browserSync.reload);
});



/*-----------生产环境-----------*/
//压缩html
gulp.task('html', function() {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    gulp.src('src/**/*.html')
        .pipe(htmlMin(options))
        .pipe(gulp.dest('dist'))
});

//压缩js
gulp.task("script", function() {

    gulp.src(['src/js/*.js'])
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(ugLify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'))

});

// 压缩图片
gulp.task('images', function() {

    gulp.src(['./src/img/*.jpg', './src/img/*.png'])
        .pipe(changed('dist/img', { hasChanged: changed.compareSha1Digest }))
        .pipe(imageMin({
            progressive: true, // 无损压缩JPG图片
            svgoPlugins: [{ removeViewBox: false }], // 不移除svg的viewbox属性
            use: [pngquant()] // 使用pngquant插件进行深度压缩
        }))
        .pipe(gulp.dest('dist/img'))

    gulp.src('./src/img/*.*')
        .pipe(imageMin({
            progressive: true, // 无损压缩JPG图片
            svgoPlugins: [{ removeViewBox: false }], // 不移除svg的viewbox属性
            use: [pngquant()] // 使用pngquant插件进行深度压缩
        }))
        .pipe(gulp.dest('dist/img'))

});
//删除dist下的所有文件
gulp.task('delete', function(cb) {
        return del(['dist/*'], cb);
    })
//复制文件
gulp.task('copy', ['delete'], function() {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'))
});

gulp.task('distServe', ['copy'], function() {
    gulp.start('script', 'html', 'images');
    browserSync.init({
        port: 8888,
        server: {
            baseDir: ['dist']
        }
    });

    gulp.watch('src/js/*.js',['script'])
    gulp.watch('src/*.html',['html'])

});


// gulp distServe->编译环境 srcServe->源码环境
// gulp.task('default', ['distServe']);
gulp.task('default', ['srcServe']);
