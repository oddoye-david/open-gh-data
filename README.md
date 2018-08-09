# Open Ghana Data &middot; [![Test Coverage](https://api.codeclimate.com/v1/badges/cf4ae28d305976e5704b/test_coverage)](https://codeclimate.com/github/oddoye-david/open-gh-data) [![CircleCI](https://circleci.com/gh/oddoye-david/open-gh-data/tree/master.svg?style=svg)](https://circleci.com/gh/oddoye-david/open-gh-data/tree/master)

The Open Ghana Data project is a collection of endpoints to retrieve json-formatted data about Ghana. Hosted live at [Open Ghana Data](https://open-gh-data.herokuapp.com/documentation)

## What you need

- [Node](https://nodejs.org/): This project uses `Node v 10.0.0`.
- [Docker](https://docker.com): For that container goodness

- [MongoDB](https://mongodb.com): Because we're web scale. Lulz.

- [Git](https://git-scm.com): We use [Git](https://git-scm.com) and [GitHub](https://github.com) for version control and collaboration.
  If you don't have a [GitHub](https://github.com) account already you can create one [here](https://github.com/join).
  Follow instructions [here](https://git-scm.com/downloads) to install the latest version of Git for your system.

## Project Setup

1.  Clone the repository
2.  Run `npm install` to grab all the dependencies of the project
3.  Create a copy of the `.env.example` file in the project root directory, rename it to `.env` and set the values for `PORT` and `MONGO_URI` variables. All environment variables go into this file.
4.  Run `docker-compose up -d` to startup the server and mongo database in containers
5.  Alternativley run `npm start` to start the server and make sure you have a mongo instance running (with the uri set in `.env`.
6.  Run `npm run seed` to seed the database

## How to run the test suite

- To run the entire test suite, run `npm test`
- To run integration tests, run `npm test:integration`
- To run the unit tests, run `npm test:unit`

## Contributing

1.  Fork it
2.  Create your feature branch (`git checkout -b my-new-feature`)
3.  Commit your changes (`git commit -am 'Added some feature'`)
4.  Push to the branch (`git push origin my-new-feature`)
5.  Create new Pull Request

## Guidelines

Setup your editor to use the style guide in the `.eslintrc`

## TODO

- Git Hooks to lint before push
