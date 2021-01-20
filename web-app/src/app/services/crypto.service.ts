import { enc, AES, mode, pad, MD5 } from 'crypto-js';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private static CONFIG = {
    mode: mode.ECB,
    padding: pad.Pkcs7,
  };

  encrypt(message: string): string {
    const toEncryptedArray = enc.Utf8.parse(message);
    const payload = AES.encrypt(
      toEncryptedArray,
      this.getKey(),
      CryptoService.CONFIG
    );
    return payload.ciphertext.toString(enc.Base64);
  }
  decrypt(message: string): string {
    console.log('>>Message', message);
    const toEncryptArray = enc.Base64.parse(message);
    const payload = AES.decrypt(
      { ciphertext: toEncryptArray },
      this.getKey(),
      CryptoService.CONFIG
    );
    return payload.toString(enc.Utf8);
  }
  private getKey() {
    return enc.Hex.parse(MD5(environment.criptoKey).toString());
  }
}
