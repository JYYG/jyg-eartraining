/* Instanciation de tous les modules utilisés */
var gulp        = require('gulp'),
    minifyHtml  = require('gulp-minify-html'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    usemin      = require('gulp-usemin'),
    sass        = require('gulp-sass');




var dist = "./IETapp/www/";

/* ------------------- */
/* Création des tâches */
/* ------------------- */


// --------- INDEX.html ---------

gulp.task('index', function(){
   return gulp.src('./index.html')
        .pipe(replace({
            'appJS': 'app/app.min.js',
            'libsJS': 'libs/libs.min.js',
            'scriptJS': 'js/script.min.js',
            'css': 'css/app.min.css',
            'ctrlJS': 'app/controllers/ctrl.min.js'
        }))
        .pipe(minifyHtml({ conditionals: true }))
        .pipe(gulp.dest(dist));
});


//gulp.task('favicon', function(){
//    return gulp.src('./favicon.png')
//        .pipe(gulp.dest('./dist/'));
//});
// 
/*gulp.task('apple-touch-icon', function(){
    return gulp.src('./apple-touch-icon.png')
        .pipe(gulp.dest('./dist/'));
});*/


gulp.task('images', function(){
    return gulp.src(['./images/**/*.*', '!./images/{svg,svg/*.svg}'])
//        .pipe(imagemin({
//            progressive: true,
//            use: [
//                pngquant({ quality: '20-40', speed: 4 })
//            ]
//        }))
        .pipe(gulp.dest(dist+'images/'));
});


/* app.js */
// desc : concatène et minifie app/app.js et les fichiers app/controllers/**/*.js
gulp.task('app', function(){
    return gulp.src([
            './app/app.js',
            './app/controllers/**/*.js',
            './app/services/*.js'
        ])
        .pipe(concat('app.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(dist+'app/'));
});

/* STORE */
gulp.task('store', function(){
    return gulp.src('./app/store/*.*')
        .pipe(gulp.dest(dist+'app/store/'));
});

/* VIEWS */
gulp.task('views', function(){
   return gulp.src('./app/views/**/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest(dist+'app/views/'));
});



// --------- CORDOVA---------
// desc : minimise et concatène au format CSS les fichiers SASS
gulp.task('cordova', function(){
    gulp.src('./cordova.js').pipe(gulp.dest(dist)); 
});



// --------- LIBS ---------
// desc : concatène et minifie les librairies

gulp.task('libs', function(){
    return gulp.src([
            './libs/jquery-1.12.0/jquery-1.12.0.js',
            'libs/angular-1.5.0/angular-1.5.0.js',
            'libs/angular-route-1.5.0/angular-route.js',
            'libs/angular-touch-1.5.0/angular-touch.js',
            'libs/angular-animate-1.1.5/angular-animate.js',
            'libs/ng-cordova/ng-cordova.js',
            'libs/fastclick/fastclick.js'
        ]) 
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dist+'libs/'));
});


// --------- JS ---------
// desc : concatène et minifie les scripts

gulp.task('script', function(){
    return gulp.src([
            './js/*.js'
        ]) 
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dist+'js/'));
});





// --------- CSS---------
// desc : minimise et concatène au format CSS les fichiers SASS
gulp.task('css', function(){
    gulp.src('./css/sass/app.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(gulp.dest('./css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss()) 
        .pipe(gulp.dest('./css/'))
        .pipe(gulp.dest(dist+'css/')); 
});

// --------- FONTS---------
// desc : minimise et concatène au format CSS les fichiers SASS
gulp.task('fonts', function(){
    gulp.src('./css/fonts/*')
        .pipe(gulp.dest(dist+'css/fonts/')); 
});



// --------- SOUNDS ---------
// desc : minimise et concatène au format CSS les fichiers SASS
gulp.task('sounds', function(){
    gulp.src('./sounds/**/*')
        .pipe(gulp.dest(dist+'sounds/')); 
});

// --------- TICK ---------
// desc : minimise et concatène au format CSS les fichiers SASS
gulp.task('tick', function(){
    gulp.src('./sounds/*')
        .pipe(gulp.dest(dist+'sounds/')); 
});




// --------- GULPFILE ---------
// desc : surveille gulpfile.js et relance gulp quand il y a une modification
gulp.slurped = false;

gulp.task('auto-reload', function(){
    if(!gulp.slurped){
        gulp.watch('gulpfile.js', ['default']);
        gulp.slurped = true;
    }
});
 

/* -------------------- */
/* Lancement des tâches */
/* -------------------- */


/* Task "default" obligatoire */
//gulp.task('default', ['index', 'favicon', 'images', 'libs', 'script', 'css', 'fonts']);

gulp.task('default', ['index', 'app', 'store', 'cordova', 'views', 'images', 'libs', 'script', 'css', 'fonts', 'sounds', 'tick'], function(){
    gulp.watch('./index.html', ['index']);
    gulp.watch('./app/**/*.js', ['app']);
    gulp.watch('./app/views/**/*.html', ['views']);
    gulp.watch('./app/store/*.js', ['store']);  
    gulp.watch('./css/sass/*.scss', ['css']);
    gulp.watch('./js/*.js', ['script']);
    gulp.watch('./images/**/*.*', ['images']);
}); 
