var fs = require('fs'),
    pkg = require('./package'),
    minor_version = pkg.version.replace(/\.(\d)*$/, ''),
    major_version = pkg.version.replace(/\.(\d)*\.(\d)*$/, ''),
    path = require('path');

function rename_release(v) {
    return function (d, f) {
        var dest = path.join(d, f.replace(/(\.min)?\.js$/, '-' + v + '$1.js').replace('MERFNApp-', ''));
        return dest;
    };
}

module.exports = function (grunt) {
    grunt.initConfig({
        bower_concat: {
            all: {
                dest: 'public/js/vendor/vendor.js',
                cssDest: 'src/public/less/whitelabel/base/vendor.less',
                dependencies: {
                    'react-bootstrap': 'react',
                    'react-spinner': 'react'
                },
                mainFiles: {
                    'react': 'react-with-addons.min.js',
                    'react-spinner': ['index.js', 'react-spinner.css']
                }
            }
        },
        env: {
            dev: {
                src: 'env-dev.json'
            }
        },
        express: {
            options: {},
            dev: {
                options: {
                    script: 'src/server.js',
                    nospawn: true,
                    delay: 5
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                additionalSuffixes: ['.js']
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            test: {
                src: [
                    'src/**/*.js'
                ]
            }
        },
        browserify: {
            release: {
                files: {
                    'build/application.js': ['src/utils/standalone.js']
                },
                options: {
                    transform: ['reactify', 'brfs', 'packageify', 'browserify-shim']
                }
            },
            debug: {
                files: {
                    'build/application.js': ['src/utils/standalone.js']
                },
                options: {
                    bundleOptions: {
                        debug: true
                    },
                    watch: true,
                    transform: ['reactify', 'brfs', 'packageify', 'browserify-shim']
                }
            }
        },
        less: {
            dist: {
                files: {
                    'public/css/whitelabel.css': 'src/public/less/whitelabel/main.less',
                    'public/css/blank-theme.css': 'src/public/less/themes/blank-theme/main.less'
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({browsers: 'last 1 version'}),
                    require('csswring')
                ]
            },
            dist: {
                files: {
                    'public/css/whitelabel.min.css': 'public/css/whitelabel.css',
                    'public/css/blank-theme.min.css': 'public/css/blank-theme.css'
                }
            }
        },
        copy: {
            dev: {
                files: {
                    'public/js/application.min.js': 'build/application.min.js',
                    'public/js/application.js': 'build/application.js'

                }
            },
            release: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: 'build/vendor.min.js',
                        dest: 'release/',
                        rename: rename_release(pkg.version)
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: 'build/application.min.js',
                        dest: 'release/',
                        rename: rename_release(pkg.version)
                    }
                ]
            }
        },
        uglify: {
          js: {
            options: {
              beautify: false,
              ASCIIOnly: true
            },
            files: {
              'build/application.min.js': ['build/application.js'],
              'build/vendor.min.js': ['public/js/vendor/vendor.js']
            }
          }
        },
        clean: {
            js: ['release/', 'build/', 'public/js/application.js', 'public/js/application.min.js']
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                autoWatch: true
            },
            ci: {
                configFile: 'karma.ci.js'
            }
        },
        watch: {
            js: {
                files: ['build/application.js'],
                tasks: ['copy:dev'],
                options: {
                    livereload: true
                }
            },
            karma: {
                files: [
                    'src/**/__tests__/**/*.js'
                ],
                tasks: ['karma:unit']
            },
            less: {
                files: [
                    'src/public/**/*.less'
                ],
                tasks: ['build'],
                options: {
                    livereload: true
                }
            },
            express: {
                files: ['src/server.js', 'src/templates/**/*.jade', 'src/utils/**/*.js'],
                tasks: ['express:dev'],
                options: {
                    nospawn: true
                }
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: 'release/',
                src: ['**/*'],
                dest: 'release-gzip/'
            }
        }
    });

    for (var key in grunt.file.readJSON('package.json').devDependencies) {
        if (key !== 'grunt' && key !== 'grunt-cli' && key.indexOf('grunt') === 0) {
            grunt.loadNpmTasks(key);
        }
    }

    grunt.registerTask('css', ['less:dist', 'postcss']);
    grunt.registerTask('js', ['bower_concat', 'jshint', 'karma:unit', 'browserify:debug', 'uglify:js']);
    grunt.registerTask('js-release', ['bower_concat', 'jshint', 'karma:unit', 'browserify:release', 'uglify:js']);

    grunt.registerTask('build', ['js', 'css', 'copy:dev']);
    grunt.registerTask('build-release', ['js-release', 'css', 'copy:dev']);
    grunt.registerTask('rel', ['js-release', 'css', 'copy:dev']);
    grunt.registerTask('ci', ['clean:js', 'jshint', 'karma:ci']);

    grunt.registerTask('dev', ['env', 'express:dev', 'build', 'watch']);
    grunt.registerTask('release', ['clean:js', 'env', 'copy:release', 'compress']);
};
