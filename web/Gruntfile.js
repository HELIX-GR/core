module.exports = function (grunt) {

  const develop = process.env.NODE_ENV != 'production';

  // Project configuration

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sourceDir: 'src/main/frontend',

    buildDir: 'target/frontend',

    targetDir: 'target/classes/public/',

    clean: {
      options: {
        force: true,
      },
      'helix-core': {
        src: ['<%= buildDir %>/*'],
      },
    },


    uglify: {
      options: {
        banner: '/*! Package: <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: true,
      },
      'helix-core': {
        files: {
          '<%= buildDir %>/js/helix-core.min.js': ['<%= buildDir %>/js/helix-core.js'],
        },
      },
      'vendor': {
        files: {
          '<%= buildDir %>/js/vendor/util.min.js': ['<%= buildDir %>/js/vendor/util.js'],
          '<%= buildDir %>/js/vendor/react-with-redux.min.js': ['<%= buildDir %>/js/vendor/react-with-redux.js'],
        },
      },
    },


    browserify: {
      options: {
        /* moved to package.json */
        watch: true,
      },
      'helix-core': {
        options: {
          // Exclude the modules below from being packaged into the main JS file:
          // The following will be resolved globally (shim) or via earlier vendor includes
          external: [
            'fetch', 'lodash', 'immutable', 'history', 'url-search-params', 'flat',
            'moment', 'moment/locale/el',
            'react', 'react-dom', 'prop-types', 'react-router-dom',
            'redux', 'redux-logger', 'redux-thunk', 'react-router-redux', 'react-redux',
            'reactstrap', 'react-transition-group',
            'intl-messageformat', 'react-intl', 'react-intl/locale-data/en', 'react-intl/locale-data/el',
          ]
        },
        files: {
          '<%= buildDir %>/js/helix-core.js': ['<%= sourceDir %>/js/helix-core/main.js'],
        },
      },
      'vendor-util': {
        options: {
          alias: [
            'isomorphic-fetch:fetch',
          ],
          require: [
            'moment', 'moment/locale/el',
            'url-search-params',
            'intl-messageformat',
            'lodash',
            'flat',
            'history',
            'immutable',
          ],
        },
        files: {
          '<%= buildDir %>/js/vendor/util.js': []
        },
      },
      'vendor-react': {
        options: {
          alias: [
            'tether:reactstrap-tether',
          ],
          require: [
            'react', 'react-dom', 'prop-types', 'react-router-dom',
            'redux', 'redux-logger', 'redux-thunk', 'react-router-redux', 'react-redux',
            'reactstrap', 'react-transition-group',
            'react-intl', 'react-intl/locale-data/en', 'react-intl/locale-data/el',
          ],
        },
        files: {
          '<%= buildDir %>/js/vendor/react-with-redux.js': [],
        },
      },
    },


    sass: {
      'helix-core': {
        options: {
          style: develop ? 'expanded' : 'compressed',
        },
        files: {
          '<%= buildDir %>/css/style.css': ['<%= sourceDir %>/scss/style.scss'],
        },
      },
    },


    copy: {
      options: {
        mode: '0644',
      },
      'apidoc': {
        expand: true,
        filter: 'isFile',
        cwd: 'apidoc/docs/',
        src: ['**/*'],
        dest: '<%= targetDir %>/docs/',
      },
      'helix-core-scripts': {
        files: [{
          expand: true,
          filter: 'isFile',
          cwd: '<%= buildDir %>',
          src: 'js/helix-core*.js',
          dest: '<%= targetDir %>',
        },],
      },
      'helix-core-i18n-data': {
        files: [
          // Note i18n data are just copied verbatim to build/target directory
          {
            expand: true,
            filter: 'isFile',
            cwd: '<%= sourceDir %>/js/helix-core',
            src: 'i18n/**/*.json',
            dest: '<%= buildDir %>',
          },
          {
            expand: true,
            filter: 'isFile',
            cwd: '<%= buildDir %>',
            src: 'i18n/**/*.json',
            dest: '<%= targetDir %>',
          },
        ],
      },
      'helix-core-stylesheets': {
        files: [{
          expand: true,
          filter: 'isFile',
          cwd: '<%= buildDir %>',
          src: 'css/*.css',
          dest: '<%= targetDir %>',
        },
        ],
      },
      'helix-core-ol': {
        files: [{
          expand: true,
          filter: 'isFile',
          cwd: 'node_modules',
          src: 'ol/*.css',
          dest: '<%= targetDir %>/vendor',
        },
        ],
      },
      'helix-core-fonts': {
        files: [
          {
            expand: true,
            cwd: 'node_modules',
            src: 'font-awesome/css/*.*',
            dest: '<%= targetDir %>/vendor',
          }, {
            expand: true,
            cwd: 'node_modules',
            src: 'font-awesome/fonts/*.*',
            dest: '<%= targetDir %>/vendor',
          },
        ],
      },
      'vendor': {
        files: [{
          expand: true,
          filter: 'isFile',
          cwd: '<%= buildDir %>/',
          src: 'vendor/*.js',
          dest: '<%= targetDir %>',
        },],
      },
    },


    eslint: {
      'helix-core': {
        options: {
          configFile: develop ? '.eslintrc.develop.js' : '.eslintrc.js',
        },
        src: [
          '<%= sourceDir %>/js/helix-core/**/*.js',
          '!<%= sourceDir %>/js/helix-core/__tests__/**/*.js',
        ],
      },
    },


    watch: {
      options: {
        interrupt: true
      },
      'helix-core-scripts': {
        files: ['<%= sourceDir %>/js/helix-core/**/*.js'],
        tasks: ['copy:helix-core-scripts'],
      },
      'helix-core-i18n-data': {
        files: ['<%= sourceDir %>/js/helix-core/i18n/**/*.json'],
        tasks: ['copy:helix-core-i18n-data'],

      },
      'helix-core-stylesheets': {
        files: ['<%= sourceDir %>/scss/**/*.scss'],
        tasks: ['sass:helix-core', 'copy:helix-core-stylesheets'],
      },
    },

    apidoc: {
      'core-action': {
        src: "apidoc/src/core-action",
        dest: "apidoc/docs/core-action",
        template: "apidoc/template",
        options: {
          debug: false,
          includeFilters: [".*\\.js$"]
        }
      }
    },

    jsdoc: {
      'helix-core': {
        src: [
          '<%= sourceDir %>/js/helix-core/**/*.js',
          '!<%= sourceDir %>/js/helix-core/__tests__/**/*.js',
        ],
        options: {
          destination: 'jsdoc',
        }
      },
    },

  }); /* initConfig */


  //
  // Load task modules
  //

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-apidoc');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-browserify');

  //
  // Events
  //

  grunt.event.on('watch', function (action, filePath, target) {
    grunt.log.writeln(target + ': ' + filePath + ' has ' + action);
  });

  //
  // Tasks
  //

  grunt.registerTask('mode', function () {
    grunt.log.writeln('Buidling in [' + (process.env.NODE_ENV || 'development') + '] mode');
  });

  grunt.registerTask('docs', ['apidoc', 'jsdoc', 'copy:apidoc']);

  grunt.registerTask('browserify:vendor', [
    'browserify:vendor-util', 'browserify:vendor-react',
  ]);

  grunt.registerTask('build:helix-core', develop ?
                     ['sass:helix-core', 'eslint:helix-core', 'browserify:helix-core', 'copy:helix-core-i18n-data'] :
                     ['sass:helix-core', 'eslint:helix-core', 'browserify:helix-core', 'copy:helix-core-i18n-data', 'uglify:helix-core']);

  grunt.registerTask('build:vendor', develop ? ['browserify'] : ['browserify:vendor', 'uglify:vendor']);

  grunt.registerTask('build', ['build:helix-core', 'build:vendor']);

  grunt.registerTask('develop', ['mode', 'clean', 'build', 'docs', 'copy', 'watch']);

  grunt.registerTask('default', ['mode', 'clean', 'build', 'docs', 'copy']);
};
