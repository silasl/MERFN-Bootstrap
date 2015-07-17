# MERFN bootstrap

## Development
1. run `npm i`
2. run `bower i`
3. run `grunt dev`

### Unit Testing
Tests use Jasmine 2 run with Karma

Tests are run as part of all the grunt steps, however you can do some nice TDD by running

`npm test`

This will start an auto-watch instance of the karma runner.

## Versioning

To update the app version

1. From the root, run `./bin/version "<next version id">`
2. This means that `./bin/version "1.0.1"` would bump the version up to 1.0.1. This then committed and ready to push.# MERFN-Bootstrap
