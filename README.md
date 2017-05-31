# skelt

[![Build Status](https://travis-ci.org/marmelab/skelt.svg?branch=master)](https://travis-ci.org/marmelab/skelt)

Skelt is a simple function which let you build complex JS objects dynamically from a skeleton pattern.

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

For some reason, it should be necessary to build `complex JS objects` dynamically. Skelt let you achieve this task with simplicity while benefiting from `testability capabilities`.

The function is deadly simple, the first argument represent your `skeleton` object whereas the second argument take a `parameters` object with all values required by the skeleton.

At build step, your skeleton will be walked and `resolved recursively`. By "resolve", i mean that all skeleton functions will be called with the "parameters" argument.

```js
import skelt from 'skelt';

const localize = choices => (({ locale }) => choices[locale]);

const url = ({ locale }) => `http://www.example.com/${locale}`;

const title = localize({
    fr: 'Bienvenue sur mon site',
    en: 'Welcome on my website',
});

const homeSkeleton = {
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

const myObject = skelt(homeSkeleton, { locale: 'fr' });

// The resulting object is the following

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
