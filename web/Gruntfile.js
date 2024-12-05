module.exports = function (grunt) {

  const develop = process.env.NODE_ENV != 'production';

  // Project configuration

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sourceDir: 'src/main/frontend',

    buildDir: 'target/frontend',

    targetDir: 'target/classes/public/',

    // Clean build directory
    clean: {
      options: {
        force: true,
      },
      'helix-core': {
        src: ['<%= buildDir %>/*'],
      },
    },

    // Compile Sass files
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

    // Apply JavaScript lint rules
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

    // Transpile and bundle JavaScript files
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
            'fetch',
            'flat',
            'history',
            'intl-messageformat',
            'lodash',
            'moment',
            'moment/locale/el',
            'prop-types',
            'react',
            'react-dom',
            'react-intl',
            'react-redux',
            'react-router',
            'react-router-dom',
            'react-transition-group',
            'reactstrap',
            'redux',
            'redux-logger',
            'redux-thunk',
            'connected-react-router',
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
            'flat',
            'history',
            'intl-messageformat',
            'lodash',
            'moment',
            'moment/locale/el',
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
            'prop-types',
            'react',
            'react-dom',
            'react-intl',
            'react-redux',
            'react-router',
            'react-router-dom',
            'react-transition-group',
            'reactstrap',
            'redux',
            'redux-logger',
            'redux-thunk',
            'connected-react-router',
          ],
        },
        files: {
          '<%= buildDir %>/js/vendor/react-with-redux.js': [],
        },
      },
    },

    // Minify JavaScript files
    uglify: {
      options: {
        banner: '/*! Package: <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: true,
        compress: {
          // Workaround for https://github.com/mishoo/UglifyJS2/issues/3274
          collapse_vars: false,
        },
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

    // Copy files to build folder
    copy: {
      options: {
        mode: '0644',
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
            cwd: 'node_modules/font-awesome/fonts/',
            src: '*',
            dest: '<%= targetDir %>/fonts',
          },
        ],
      },
      'vendor': {
        files: [{
          expand: true,
          filter: 'isFile',
          cwd: '<%= buildDir %>/',
          src: 'js/vendor/*.js',
          dest: '<%= targetDir %>',
        },],
      },
      'assets': {
        files: [{
          expand: true,
          filter: 'isFile',
          cwd: '<%= sourceDir %>/assets',
          src: ['**/*'],
          dest: '<%= targetDir %>',
        },],
      },
    },

    // Watch for file changes during development
    watch: {
      options: {
        interrupt: true
      },
      'helix-core-assets': {
        files: ['<%= sourceDir %>/assets/**/*'],
        tasks: ['copy:assets'],
      },
      'helix-core-i18n-data': {
        files: ['<%= sourceDir %>/js/helix-core/i18n/**/*.json'],
        tasks: ['copy:helix-core-i18n-data'],
      },
      'helix-core-scripts': {
        files: ['<%= sourceDir %>/js/helix-core/**/*.js'],
        tasks: ['copy:helix-core-scripts'],
      },
      'helix-core-stylesheets': {
        files: ['<%= sourceDir %>/scss/**/*.scss'],
        tasks: ['sass:helix-core', 'copy:helix-core-stylesheets'],
      },
    },

  });

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

  // Display environment properties
  grunt.registerTask('mode', function () {
    grunt.log.writeln('Building in [' + (process.env.NODE_ENV || 'development') + '] mode');
  });

  // Transpile, bundle and minify JavaScript files
  grunt.registerTask('build:vendor', develop ?
    ['browserify:vendor-util', 'browserify:vendor-react'] :
    ['browserify:vendor-util', 'browserify:vendor-react', 'uglify:vendor']);

  grunt.registerTask('build:helix-core', develop ?
    ['sass:helix-core', 'eslint:helix-core', 'browserify:helix-core',] :
    ['sass:helix-core', 'eslint:helix-core', 'browserify:helix-core', 'uglify:helix-core']);

  grunt.registerTask('build', ['build:vendor', 'build:helix-core']);

  // Development build
  grunt.registerTask('develop', ['mode', 'clean', 'build', 'copy', 'watch']);

  // Production build
  grunt.registerTask('default', ['mode', 'clean', 'build', 'copy']);
};
