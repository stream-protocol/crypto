/* eslint-disable @typescript-eslint/no-var-requires */

describe('pure module', () => {
  const ONRAMP_SCRIPT_SELECTOR =
    'script[src^="https://crypto-js.streampayments.org/crypto-onramp-outer.js"]';
  const SCRIPT_SELECTOR = 'script[src^="https://js.streampayments.org/v3"]';

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockReturnValue();
  });

  afterEach(() => {
    const scripts = Array.from(
      document.querySelectorAll(`${SCRIPT_SELECTOR}, ${ONRAMP_SCRIPT_SELECTOR}`)
    );

    for (const script of scripts) {
      if (script.parentElement) {
        script.parentElement.removeChild(script);
      }
    }

    delete window.StreamPay;
    delete window.StreamPayOnramp;

    jest.resetModules();
    jest.restoreAllMocks();
  });

  test('does not inject the script if loadStreamPay is not called', async () => {
    require('./pure');

    expect(document.querySelector(SCRIPT_SELECTOR)).toBe(null);
    expect(document.querySelector(ONRAMP_SCRIPT_SELECTOR)).toBe(null);
  });

  test('it injects the script if loadStreamPay is called', async () => {
    const {loadStreamPayOnramp} = require('./pure');
    loadStreamPayOnramp('pk_test_foo');

    expect(document.querySelector(SCRIPT_SELECTOR)).not.toBe(null);
    expect(document.querySelector(ONRAMP_SCRIPT_SELECTOR)).not.toBe(null);
  });

  test('it can load the script with advanced fraud signals disabled', async () => {
    const {loadStreamPay} = require('@streampay/streampay-js/pure');
    loadStreamPay.setLoadParameters({advancedFraudSignals: false});

    const {loadStreamPayOnramp} = require('./pure');
    loadStreamPayOnramp('pk_test_foo');

    expect(
      document.querySelector(
        'script[src^="https://js.streampayments.org/v3?advancedFraudSignals=false"]'
      )
    ).not.toBe(null);
    expect(document.querySelector(ONRAMP_SCRIPT_SELECTOR)).not.toBe(null);
  });
});
