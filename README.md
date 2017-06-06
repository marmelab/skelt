# skelt

[![Build Status](https://travis-ci.org/marmelab/skelt.svg?branch=master)](https://travis-ci.org/marmelab/skelt)

Skelt is a templating engine for object literals.

- [Installation](#installation)
- [Usage](#usage)
- [Performance](#use-memoize-to-improve-performance)
- [Contributing](#contributing)

## Installation

Install with:

```sh
npm install -S skelt
```

or

```sh
yarn add skelt
```

## Usage

When you need to build *complex JS objects* dynamically from a predefined *template object*, use Skelt to benefit from *testability capabilities*.

Skelt is a deadly simple function: the first argument represent your *template* object, whereas the second argument is a *parameters* object with all values required by the template.

```js
skelt = (template, parameters) => object
```

Here is the compulsory "hello, world" example:

```js
import skelt from 'skelt';

const template = {
    welcome: ({ name }) => `Hello ${name}`
};

skelt(template, { name: 'world' });
// {
//    welcome: 'Hello world'
// }
```

At build step, the template is walked and resolved *recursively*. That means that all functions values are executed with the `parameters` object as argument. Non-function values are just passed as is.

```js
import skelt from 'skelt';

const personTemplate = {
    fullName: ({firstName, lastName }) => `${firstName} ${lastName}`,
    age: ({ age }) => age,
    misc: {
        isAdult: ({ age }) => age > 21,
    }
};

skelt(personTemplate, { firstName: 'John', lastName: 'Doe', age: 42 });
// {
//    fullName: 'John Doe',
//    age: 42,
//    misc: {
//        isAdult: true,
//    },
// }
```

The template can also be a function returning an object, which somehow makes writing templates easier:

```js
import skelt from 'skelt';

const isAdult = ({ age }) => age > 21;

const personTemplate = ({ age, firstName, lastName }) => ({
    fullName: `${firstName} ${lastName}`,
    age,
    misc: {
        isAdult,
    }
});

skelt(personTemplate, { lastname: 'John', firstname: 'Doe', age: 42 });

// same result as above
```

That means you can build very complex objects from simple templates using composition, as shown in the example below.

```js
import skelt from 'skelt';

const url = ({ locale }) => `http://www.example.com/${locale}`;
const localize = choices => ({ locale }) => choices[locale]; // higher-order function!
const title = localize({
    fr: 'Bienvenue sur mon site',
    en: 'Welcome on my website',
});

const homeTemplate = {
    url,
    title,
    body: localize({
        fr: 'Bonjour le monde',
        de: 'Hello, world',
    }),
    tags: localize({
        fr: ['accueil', 'test'],
        en: ['welcome', 'test'],
    })
};

skelt(homeTemplate, { locale: 'fr' });
// {
//    url: 'http://www.example.com/fr',
//    title: 'Bienvenue sur mon site',
//    body: 'Bonjour le monde',
//    tags: ['accueil', 'test'],
// }
```

## Use Memoize To Improve Performance

Because of the full traversal and resolving of the template, performance can sometimes be suboptimal.

To speed up the computing time for templating, you can use the `memoize` function of your choice in your template. This way, functions are only called the first time the template is rendered. Here is an example:

```js
import skelt from 'skelt';
import memoize from 'lodash/memoize';

import fibonnaci from './some-fibonnaci-module';

skelt({
    function: 'fibonnaci',
    result: memoize(fibonnaci),
}, { n: 10 });

// {
//    function: 'fibonnaci',
//    result: 55, // computed only the first time for n = 10
// }
```

## Contributing

Run the tests with this command:

```sh
make test
```

## License

Skelt is licensed under the [MIT Licence](https://github.com/marmelab/skelt/blob/master/LICENSE.md), courtesy of [Marmelab](http://marmelab.com) and [ARTE](http://www.arte.tv/fr/).
