export * from './api';
export * from './crypto-js';

import {StreamPayOnramp, StreamPayOnrampConstructor} from './crypto-js';

export const loadStreamPayOnramp: (
  publishableKey: string
) => Promise<StreamPayOnramp | null>;

declare global {
  interface Window {
    // StreamPay Onramp must be loaded directly from https://crypto-js.streampayments.org, which
    // places a `StreamPayOnramp` object on the window
    StreamPayOnramp?: StreamPayOnrampConstructor;
  }
}
