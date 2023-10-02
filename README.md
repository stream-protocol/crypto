# StreamPay Crypto JS ES Module

Use [StreamPay Crypto JS SDK](https://docs.streampayments.org/crypto) as an ES module.

**Note**: This package dynamically loads the StreamPay Crypto JS SDK from
`https://crypto-js.streampayments.org` and
[StreamPay.js](https://docs.streampayments.org/streampay-js) from `https://js.streampayments.org`. To
be
[PCI compliant](https://docs.streampayments.org/security/guide#validating-pci-compliance),
you must load StreamPay.js directly from `https://js.streampayments.org`. You cannot
include it in a bundle or host it yourself.

[![npm version](https://img.shields.io/npm/v/@streampay/crypto.svg?style=flat-square)](https://www.npmjs.com/package/@streampay/crypto)

## Installation

Use `npm` to install the StreamPay.js and StreamPay Crypto JS module:

```sh
npm install @streampay/streampay-js @streampay/crypto
```

## Usage

### `loadStreamPayOnramp`

This function returns a `Promise` that resolves with a newly created
`StreamPayOnramp` object once StreamPay Crypto JS SDK has loaded. If necessary, it
will load StreamPay Crypto JS and StreamPay.js for you by inserting the script tags.
If you call `loadStreamPayOnramp` in a server environment it will resolve to
`null`.

```js
import {loadStreamPayOnramp} from '@streampay/crypto';

const streampayOnramp = await loadStreamPayOnramp('pk_test_TYooMQauvdEDq54NiTphI7jx');
```

We’ve placed a random API key in this example. Replace it with your
[actual publishable API keys](https://dashboard.streampay.com/account/apikeys) to
test this code through your StreamPay account.

For more information on how to use StreamPay Crypto JS SDK, please refer to the
[StreamPay Crypto docs](https://docs.streampayments.org/crypto).

If you have deployed a
[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/Security/CSP),
make sure to
[include StreamPay.js in your directives](https://docs.streampayments.org/security/guide#content-security-policy).

## TypeScript support

This package includes TypeScript declarations for StreamPay Crypto JS SDK. We
support projects using TypeScript versions >= 3.1.

Some methods in StreamPay Crypto JS SDK accept and return objects from the
[StreamPay API](https://docs.streampayments.org/api). The type declarations in
`@streampay/crypto` for these objects in will always track the
[latest version](https://docs.streampayments.org/api/versioning) of the StreamPay API. If
you would like to use these types but are using an older version of the StreamPay
API, we recommend
[updating to the latest version](https://docs.streampayments.org/upgrades#how-can-i-upgrade-my-api),
or ignoring and overriding the type definitions as necessary.

Note that we may release new [minor and patch](https://semver.org/) versions of
`@streampay/crypto` with small but backwards-incompatible fixes to the type
declarations. These changes will not affect StreamPay Crypto JS SDK itself.

## Ensuring StreamPay.js is available everywhere

To best leverage StreamPay’s advanced fraud functionality, ensure that StreamPay.js
(not StreamPay Crypto JS SDK) is loaded on every page, not just your page that
integrates with StreamPay Crypto. This
[allows StreamPay to detect suspicious behavior](https://docs.streampayments.org/disputes/prevention/advanced-fraud-detection)
that may be indicative of fraud as customers browse your website.

By default, this module will insert a `<script>` tag that loads StreamPay.js from
`https://js.streampayments.org`. This happens as a side effect immediately upon
importing this module. If you utilize code splitting or only include your
JavaScript app on your checkout page, the StreamPay.js script will only be
available in parts of your site. To ensure StreamPay.js is available everywhere,
you can perform either of the following steps:

### Import as a side effect

Import `@streampay/streampay-js` as a side effect in code that will be included
throughout your site (e.g. your root module). This will make sure the StreamPay.js
script tag is inserted immediately upon page load.

```js
import '@streampay/streampay-js';
```

### Manually include the script tag

Manually add the StreamPay.js script tag to the `<head>` of each page on your site.
If an existing script tag is already present, this module will not insert a new
one. When you call `loadStreamPayOnramp`, it will use the existing script tag.

```html
<!-- Somewhere in your site's <head> -->
<script src="https://js.streampayments.org/v3" async></script>
```

### Importing `loadStreamPayOnramp` without side effects

If you would like to use `loadStreamPayOnramp` in your application, but defer
loading the StreamPay.js script until `loadStreamPayOnramp` is first called, use the
alternative `@streampay/crypto/pure` import path:

```js
import {loadStreamPayOnramp} from '@streampay/crypto/pure';

// StreamPay.js will not be loaded until `loadStreamPay` is called
const streampayOnramp = await loadStreamPayOnramp('pk_test_TYooMQauvdEDq54NiTphI7jx');
```

### Disabling advanced fraud detection signals

If you would like to
[disable advanced fraud detection](https://docs.streampayments.org/disputes/prevention/advanced-fraud-detection#disabling-advanced-fraud-detection)
altogether, use `loadStreamPay.setLoadParameters`:

```js
import {loadStreamPay} from '@streampay/streampay-js/pure';
import {loadStreamPayOnramp} from '@streampay/crypto/pure';

loadStreamPay.setLoadParameters({advancedFraudSignals: false});
const streampayOnramp = await loadStreamPayOnramp('pk_test_TYooMQauvdEDq54NiTphI7jx');
```

The `loadStreamPay.setLoadParameters` function is only available when importing
`loadStreamPay` from `@streampay/streampay-js/pure`.

## StreamPay Crypto JS SDK Documentation

- [StreamPay Crypto JS SDK Docs](https://docs.streampayments.org/crypto)
