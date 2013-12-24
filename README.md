econf
=========

Load configs from hierarchical objects to process.env

[![NPM](https://nodei.co/npm/econf.png?downloads=true&stars=true)](https://nodei.co/npm/econf/)
[![NPM](https://nodei.co/npm-dl/econf.png)](https://nodei.co/npm/econf/)


By default econf tries to load .econf.js file


#Usage
Import the econf at the top of your code to ensure that your configurations will be loaded before anything else

```javascript
require('econf')();
```

optionally, you can specify the file name

```javascript
require('econf')('config.js');
```