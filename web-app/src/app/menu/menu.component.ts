import { Component, OnInit } from '@angular/core';
import { Response } from '../models/response';
import { Transactions } from '../models/transaction';

import { ApiService } from '../services/api.service';
import { CryptoService } from '../services/crypto.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  transactions: Transactions;
  menu: boolean = false;
  constructor(
    private apiService: ApiService,
    private cryptoService: CryptoService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const dec = this.cryptoService.decrypt(
      'Kvc0yo6N14ei0A0syt1xibfBDJcJ+oiZk6DVZ1cEmXkLaqCjaJ3srwetJHUizzQXknR0BbgLQLpddS2gD6vwMslQXrswWHJnlZdPbn0K7HmB6H1jSIULjAMDjYCmMxzMGVc2GASiZ6JxbtNjTMUiO9uVawuljFMvXeexLevegsdB1twDwFH7L6YPjn7xWHvINhD12HPm/sULKWhpjKTxE5EehliFSu/pzr5Wndvx80K4/pxJvxVjeTxdRTTKRstzokWWhZl0R32/V14waIJ1hw=='
    );

    console.log('Decrypt:', dec);
    this.apiService.getPurchases().subscribe((purchases: Response) => {
      const decode = this.cryptoService.decrypt(purchases.payload);
      console.log(this.cryptoService.decrypt(purchases.payload));
      console.log('>>Type:', typeof decode);
      this.transactions = JSON.parse(decode);
      console.log(this.transactions);
    });
  }

  logout(): void {
    this.storageService.logout();
  }

  toggle(): void {
    this.menu = !this.menu;
  }
}
