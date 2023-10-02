import {findScript} from './shared';

describe('findScript', () => {
  const CASES: Array<[string, boolean]> = [
    ['https://crypto-js.streampayments.org/crypto-onramp-outer.js', true],
    ['https://crypto-js.streampayments.org/crypto-onramp-outer.js?something', false],
    ['https://crypto-js.streampayments.org/soemthing.js', false],
    ['https://js.streampayments.org/crypto-onramp-outer.js', false],
  ];

  afterEach(() => {
    for (const [url] of CASES) {
      const script = document.querySelector(`script[src="${url}"]`);

      if (script && script.parentElement) {
        script.parentElement.removeChild(script);
      }
    }

    delete window.StreamPay;
  });

  test.each(CASES)(
    'findScript with <script src="%s"></script>',
    (url, shouldBeFound) => {
      const script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);

      expect(!!findScript()).toBe(shouldBeFound);
    }
  );
});
