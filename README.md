# mongo-incremental-id-generator

A [node.js](http://nodejs.org) module for mongodb, that generates auto incremental ids for specified string keys. 

[![Build Status](https://travis-ci.org/lionvs/mongo-incremental-id-generator.svg?branch=master)](https://travis-ci.org/lionvs/mongo-incremental-id-generator)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Don't use this generator unless you actually need auto incremental ids because it will limit scalability as you are essentially creating a single point of failure/bottleneck where you are maintaining the sequence values for each key.

Can you re-use generator values?

Well – yes, technically you can. But – NO, you shouldn't. Never. Never ever. Not only that this would destroy the nice chronological sequence (you can't judge a row's “age” by just looking at the ID any more), the more you think about it the more headaches it'll give you. Moreover it is an absolute contradiction to the entire concept of unique row identifiers.

So unless you have good reasons to re-use generator values, JUST DON'T DO IT!


## Usage

mongo-incremental-id-generator is very small mudule and easy to use:

```js
var idGenerator = require('mongo-incremental-id-generator')(connectionString)
```

The connection string should follow the format described in [the mongo connection string docs](http://docs.mongodb.org/manual/reference/connection-string/).

After we connected we can generate incremental ids for specific keys.
The format for callbacks is always `callback(error, value)` where error is null if no exception has occured.

```js
// generate new id for the key with increment step
idGenerator.generateId(key, step, function (err, id) {
	// id - auto generated id
})

// pick last generated id for the key
idGenerator.pickLastId(key, function (err, id) {
	// id - last generated id
})

// reset last generated id for the key to the newId 
idGenerator.resetId(key, newId, function (err, id) {
	// id - newId
})
