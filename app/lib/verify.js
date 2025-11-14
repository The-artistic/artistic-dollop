import nacl from 'tweetnacl';
import { createHmac } from 'crypto';

export function verifySignature(payload, headers, opts={}) {
  const method = process.env.SIGN_METHOD || 'hmac';
  if (method === 'hmac') {
    const secret = process.env.SECRET_SIGNING_KEY || '';
    if (!secret) return false;
    const signatureHeader = headers.get('x-farcaster-signature') || headers.get('x-signature') || '';
    const hmac = createHmac('sha256', secret).update(payload).digest('hex');
    const sig = signatureHeader.replace(/^sha256=/i, '');
    return sig === hmac;
  } else if (method === 'ed25519') {
    const pub = process.env.ED25519_PUBLIC_KEY || '';
    if (!pub) return false;
    try {
      const sigHeader = headers.get('x-farcaster-signature') || '';
      const sig = Buffer.from(sigHeader, 'base64');
      const message = Buffer.from(payload);
      const pubkey = Buffer.from(pub, 'base64');
      return nacl.sign.detached.verify(new Uint8Array(message), new Uint8Array(sig), new Uint8Array(pubkey));
    } catch (err) {
      console.error('ed25519 verify err', err);
      return false;
    }
  }
  return false;
}
