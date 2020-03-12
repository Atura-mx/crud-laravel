const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

mix.styles(['public/js/ajax/bootstrapV/formValidation.min.css',
            'public/js/ajax/sweetalert2.min.css',
        ], 'public/css/all.css');

mix.scripts(['public/js/ajax/modernizr.js',
            'public/js/ajax/jquery.min.js',
            'public/js/bootstrap.js',
            'public/js/ajax/bootstrapV/formValidation.min.js',
            'public/js/ajax/bootstrapV/bootstrapV.min.js',
            'public/js/ajax/bootstrapV/es_ES.js',
            'public/js/ajax/sweetalert2.all.min.js',
            'public/js/ajax/general.js',
            'public/js/ajax/mail.js'
        ], 'public/js/all.js');