/* Declaracion de constantes */
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

/* ejecuta una tarea de gulp */
gulp.task('sass', () => {

    /* archivos que se vana a procesar */
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/*.scss'
    ])

    /* comprimir y convierte a  css el sass */
    .pipe(sass({ outputStyle: 'compressed' }))
        /* donde se van a guardar lo procesado */
        .pipe(gulp.dest('src/css'))
        /* lo va inyectar en el html con browserSync */
        .pipe(browserSync.stream());
});

/* Al realizar cambios en mi js copiate a la carpeta src/js y actualiza el server */
gulp.task('js', () => {

    return gulp.src([
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/popper.js/dist/umd/popper.min.js'
        ])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
});

//Tarea serve:
gulp.task('serve', gulp.series('sass', function() {
    browserSync.init({
        server: './src'
    });

    gulp.watch([
        'node_modules/bootstrap/scss/bootstrap.min.scss',
        'src/scss/*.scss'
    ], gulp.series('sass'));

    gulp.watch('src/*.html').on('change', browserSync.reload);
}));

gulp.task('font-awesome', () => {
    /* copia los archivos hacia src/css */
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('src/css'));
});

gulp.task('fonts', () => {
    /* copias las fuentes necesarios para fontawesome a src/css */
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('src/fonts'));
});

/* ejecucion */
gulp.task('default', gulp.parallel('js', 'font-awesome', 'fonts', 'serve'))