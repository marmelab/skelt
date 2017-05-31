# skelt

[![Build Status](https://travis-ci.org/marmelab/skelt.svg?branch=master)](https://travis-ci.org/marmelab/skelt)

Skelt is a simple templating engine for object literals.

- [Installation](#installation)
- [Usage](#usage)
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

For some reason, it should be necessary to build `complex JS objects` dynamically from a predefined `template`. Skelt let you achieve this task with simplicity while benefiting from `testability capabilities`.

Skelt function is deadly simple, his first argument represent your `template` (array, object or function) whereas the second argument is a `parameters` object with all values required by the `template`.

```js
import skelt from 'skelt';

const template = {
    hello: ({ name }) => `Hello ${name}`
};

skelt(template, { name: 'world' });

// =>

{
    hello: 'Hello world'
}

```

At build step, your `template` will be walked and `resolved recursively`. By "resolve", it mean that all template `functions` will be called with the `parameters` object.

```js
import skelt from 'skelt';

const adult = ({ age }) => age > 21;

const personTemplate = ({ age, lastname, firstname }) => ({
    fullname: `${lastname} ${firstname}`,
    age,
    extras: {
        adult,
    }
});

skelt(personTemplate, { lastname: 'John', firstname: 'Doe', age: 42 });

// =>

{
    fullname: 'John Doe',
    age: 42,
    extras: {
        adult: true,
    },
}

```

At the end, you can create your own functions, compose them and build very complex objects from a simple template with imbricated arrays, objects or functions as the example below.

```js
import skelt from 'skelt';

const localize = choices => (({ locale }) => choices[locale]);

const url = ({ locale }) => `http://www.example.com/${locale}`;

const title = localize({
    fr: 'Bienvenue sur mon site',
    en: 'Welcome on my website',
});

const homeTemplate = {
    url,
    title,
    alternativeLanguages: [
        {
            label: 'Français',
            url: url({ locale: 'fr' }),
            title: title({ locale: 'fr' }),
        },
        {
            label: 'English',
            url: url({ locale: 'en' }),
            title: title({ locale: 'en' }),
        },
    ],
    body: localize({
        fr: 'Contenu...',
        de: 'Content...',
    }),
};

skelt(homeTemplate, { locale: 'fr' });

// =>

{
    url: 'http://www.example.com/fr',
    title: 'Bienvenue sur mon site',
    alternativeLanguages: [
        {
            label: 'Français',
            url: 'http://www.example.com/fr',
            title: 'Bienvenue sur mon site',
        },
        {
            label: 'English',
            url: 'http://www.example.com/en',
            title: 'Welcome on my website',
        }
    ],
    body: 'Contenu...',
}

```

## Contributing

Run the tests with this command:

```sh
make test
```
