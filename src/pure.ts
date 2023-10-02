import {loadScript, initStreamPayOnramp, LoadStreamPayOnramp} from './shared';
import {loadStreamPay} from '@streampay/streampay-js/pure';

export const loadStreamPayOnramp: LoadStreamPayOnramp = (...args) => {
  const startTime = Date.now();

  return Promise.all([loadStreamPay(...args), loadScript()]).then(
    ([, maybeStreamPayOnramp]) =>
      initStreamPayOnramp(maybeStreamPayOnramp, args, startTime)
  );
};
