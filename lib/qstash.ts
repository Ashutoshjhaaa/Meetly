import { Client } from '@upstash/qstash';

let _qstash: Client | null = null;

export function getQStash(): Client {
  if (!_qstash) {
    if (!process.env.QSTASH_TOKEN) {
      throw new Error('❌ Missing required environment variable: QSTASH_TOKEN');
    }
    _qstash = new Client({ token: process.env.QSTASH_TOKEN });
  }
  return _qstash;
}

/** @deprecated Use getQStash() instead — avoids build-time crash */
export const qstash = {
  publishJSON: (...args: Parameters<Client['publishJSON']>) => getQStash().publishJSON(...args),
};