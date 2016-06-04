[![Stories in Ready](https://badge.waffle.io/codefordenver/viz-template.png?label=ready&title=Ready)](https://waffle.io/codefordenver/viz-template)

# Data Visualization Starter Repo

> **NOTE**: This repo uses javascript es2015 (transpiled to current javascript with babel.js). If you are not familiar with this, it is recommended you look at https://babeljs.io/docs/learn-es2015/ for a quick reference to get you up to speed.

## Up and running

You will need [Node.js](https://nodejs.org/en/) to develop.

In your terminal, clone the project. After installing the dependencies, you can start the server and visit `http://localhost:3000`.

```sh
$ git clone git@github.com:codefordenver/viz-template.git
$ npm install
$ npm start
```

## Developing

Before you start developing, you need to remove the remote (which is pointed to `codefordenver/viz-template` when you clone it) and add a remote that's tied to your github account.

```sh
$ git remote rm origin
$ git remote add origin <URL to your repo here>
```

If you don't want to deal with remotes, you can just remove the `.git` file and initialize a new git repository.

```sh
$ rm -rf .git
$ git init
```

## Adding template code to an existing repository

If you are starting from an existing repository, and would like to add this template code,
simply run the following in your terminal:

```sh
git remote add viz-template https://github.com/codefordenver/viz-template.git && \
git fetch viz-template && \
git merge -X theirs viz-template/master
```

> **NOTE**: The `merge -X theirs` will in this case merge in the history from this repo, but use your local existing files in place of any conflicting files with this repo.

## License

MIT
