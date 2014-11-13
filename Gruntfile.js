module.exports = function(grunt) {

/*
                 __  _       
 __  ___  _ _   / _|(_) __ _ 
/ _|/ _ \| ' \ |  _|| |/ _` |
\__|\___/|_||_||_|  |_|\__, |
                       |___/ 

*/
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      main: ['js/bes/main.js'], // lib/**/*.js
      options: {
        eqeqeq: true, // tripple equals '==='
        freeze: true, // dont overide native objects i.e. Array(), Date();
        immed: true, // functions pust be wrapped in parehtheses i.e. (function(){})();
        latedef: true, // dont use variables before they are defined
        forin: true, // filter objects in for loops
        nonbsp: true, // (N)on (B)reaking (W)hite (S)pace
        quotmark: true, // keep quote marks consistent
        undef: true, // cannot use undeclared variables
        // unused: true, // finds unused variables
        devel: true, // allow console.log() etc
        strict: true, // strict mode = ECMAScript5
        // maxparams: 3, // max number of parameters passed into a function i.e. myFunction('param1', 'param2', 'param3', param4);
        // maxdepth: 2, // how nested your code blocks can get
        globals: {
          // jQuery: true,
          // Modernizr: true,
          // TweenMax: true
        }
      }
      /* ignore_warning: {
        options: {
          '-W015': true,
        },
        src: ['js/main.js'],
      } */
    }, // end of jshint

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/bes/main.js',
        dest: 'js/bes/main-min.js'
      }
    }, // end of uglify

    browserify: {
      // standalone: {
        src: ['js/main.js'],
        dest: 'js/bundle.js',
        /* options: {
          bundleOptions: {
            standalone: '<%= pkg.name %>'
          }
        } */
      /* src: 'js/main.js',
      dest: 'js/bundle.js',
      opts: {
        // basedir: 'js/main.js'

        standalone: 'bundle'
      } */
    }, // end of browserify

    sass: {
      dist: {
        options: {
          style: 'expanded' // compact (each style on one line), compressed (all on one line), expanded (untouched).
        },
        files: {
          'css/main.css': 'scss/main.scss' // 'destination': 'source'
        }
      }
    }, // end of sass

    autoprefixer: { // (update prefix database = $ npm update caniuse-db)
      single_file: {
        options: {
          browsers: ['last 5 versions', 'ie 8', 'ie 9']
        },
        src: 'css/main.css',
        dest: 'css/main.css'
      }
    }, // end of autoprefixr

    jsonlint: {
      src: ['cron/harcourts.json']
    }, // end of jsonlint

    imagemin: {
      options: {
        optimizationLevel: 3
      },
      dynamic: {
        files: [{
          expand: true,
          src: ['img/**/*.{png,jpg,gif,svg}']   // Actual patterns to match
        }]
      }
    }, // end of imagemin

    // --- --- --- --- --- --- ---
    // watch is always at the end...
    // --- --- --- --- --- --- ---
    watch: {
      css: {
        files: 'scss/*.scss',
        tasks: ['cssTasks'],
        options: {
          interrupt: true,
          livereload: 12345 // use this port to stop the 'live reload' port conflict
        }
      },
      js: {
        files: 'js/bes/main.js',
        tasks: ['jsTasks'],
        options: {
          interrupt: true,
          livereload: 12345 // use this port to stop the 'live reload' port conflict
        }
      }
    } // end of watch

  }); // end of config

/*
       _              _           
 _ __ | | _  _  __ _ (_) _ _   ___
| '_ \| || || |/ _` || || ' \ (_-<
| .__/|_| \_,_|\__, ||_||_||_|/__/
|_|            |___/              

*/

  // https://www.npmjs.org/package/grunt-concurrent

  // css
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  // https://www.npmjs.org/package/grunt-contrib-cssmin

  // js
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');

  // json
  grunt.loadNpmTasks('grunt-jsonlint');

  // images
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // watch
  grunt.loadNpmTasks('grunt-contrib-watch');

/*
 _              _       
| |_  __ _  ___| |__ ___
|  _|/ _` |(_-<| / /(_-<
 \__|\__,_|/__/|_\_\/__/

*/

  grunt.registerTask('default', ['jsTasks', 'cssTasks']);
  grunt.registerTask('cssTasks', ['sass', 'autoprefixer']);
  grunt.registerTask('jsTasks', ['jshint', /* 'uglify' */]);

};