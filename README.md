# Node Lambda Tools (TODO need a better name!)

We were finding ourselves duplicating lots of code snippets between aws lambda projects. This repo is a bucket (or [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)) for a bunch of tiny npm modules which can be included in lambda projects. They are intended to be as small as possible and only need to be runnable in the Node 4 AWS [lambda runtime](http://docs.aws.amazon.com/lambda/latest/dg/programming-model.html).

We're currently experimenting with [lerna](https://github.com/lerna/lerna) to manage and publish these modules. They are going to the seek internal repo for now so you'll need to set your project's `.npmrc` accordingly

```
cat "registry=http://npmregistryinternal.seekinfra.com:4873" > .npmrc
```

## Modules

- [Logger](./packages/node-lambda-tools-logger)
- [Config](./packages/node-lambda-tools-config)
