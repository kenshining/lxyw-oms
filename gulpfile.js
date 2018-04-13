var gulp = require("gulp");
//删除文件gulp-clean模块
var clean = require('gulp-clean');
//获取gulp-sass模块
var sass = require('gulp-sass');
//获取 gulp-clean-css 模块（用于压缩 CSS）
var cleanCSS = require('gulp-clean-css');
var minifyCSS = require('gulp-minify-css');
//获取重命名gulp-rename模块
var rename = require('gulp-rename');
//同步执行组件 
var squence = require('gulp-sequence');
//文件合并
var concat = require('gulp-concat');

//清理动作
gulp.task("clean", function(){ 
    return gulp.src(['./dist/**/*.*','./public/stylesheets/**/*.css'],{read:false})
    .pipe(clean());
});

// 给gulp设置任务，编译sass
// 在命令行输入 gulp sass 启动此任务
gulp.task('sass', function() {
  // 被编译文件的路径
  // ** 匹配路径中的0个或多个目录及其子目录
  // 使用数组的方式来匹配多种文件 gulp.src(['js/*.js','css/*.css','*.html'])
  return gulp.src('./src/sass/**/*.scss')
  .pipe(sass())
  //编译后文件输出的目录
  .pipe(gulp.dest('./dist/css'));

});

//压缩CSS文件
gulp.task('cssmin',function(){
	//获取输入路径
	 return gulp.src('./dist/css/**/*.css')
   .pipe(rename({suffix: '.min'}))
   .pipe(cleanCSS())
   .pipe(gulp.dest('./public/stylesheets/'));
});

// 编译CSS\INMAGES相关命令，LESS+SASS同时编译,开发时运行实施监控文件更新。
gulp.task('css', function(){
	squence('clean', 'sass','cssmin',function() {
	    console.log( "css init build ok!" );
	    //监听文件修改，当文件修改则执行less任务
		gulp.watch('./src/sass/**/*.scss',function(event){
			squence('clean','sass','cssmin')(function (err) {
				if (err){
				console.log(err);
			}else{
				console.log( "css build ok!" );
			}
			});
		});

	});
});