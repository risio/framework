<p align="center">
    <img src="https://avatars3.githubusercontent.com/u/37673741?s=200&v=4" height="60">
    <h3 align="center">Risio - Node.js Framework</h3>
    <p align="center">Risio aims to provide a high level of abstraction to common logic used in web applications in a easy and fun-to-code-in way ;)<p>
    <p align="center">
        <a href="https://lernajs.io/">
            <img src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg" alt="Lerna">
        </a>
        <a href="https://travis-ci.org/risio/framework" target="_blank">
            <img src="https://travis-ci.org/risio/framework.svg?branch=develop" alt="Travis">
        </a>
        <img src="https://badges.greenkeeper.io/risio/framework.svg" alt="Greenkeeper.io">
    </p>
</p>

## Roadmap

- [ ] Initial 0.1.0 release
- [ ] Website and documentation using https://www.gatsbyjs.org/

## Getting started

- `npm install` - Install dependencies
- `npm start` - Start watching the playground
- `npm run test-watch` - Start watching the tests

## Playground

This is used to test out functionalities of the framework.

> This will compile and watch the Typescript files of each framework module so that they can be used inside the Playground.

- `npm start`

## Testing

> You can either run this at root level to run all tests, or change directory into one of the modules and run the command there.

- `npm run test`

> To watch the tests.

- `npm run watch-test`

## Structure

Under the hood [Lerna](https://lernajs.io/) is used to split a single git repository into multiple npm packages. All packages can be found under the `packages` directory. Since the playground is marked as `private: true` in it's `package.json`, it's not published with the other modules.

## Modules

- `risio-config` - Configuration management (currently reads from process.ENV all `RISIO_` prefixed variables)
- `risio-mail` - Easily send emails using different transports
