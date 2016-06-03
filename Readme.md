[![Stories in Ready](https://badge.waffle.io/codefordenver/viz-template.png?label=ready&title=Ready)](https://waffle.io/codefordenver/viz-template)

# Data Vizualization Starter Repo

## Up and running

In your terminal, clone the project. After installing the depenencies, you can start the server and visit `http://localhost:3000`.

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

# License

MIT
