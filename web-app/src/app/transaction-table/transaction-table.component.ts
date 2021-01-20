import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ApiService } from '../services/api.service';
import { CryptoService } from '../services/crypto.service';
import { Item } from '../models/item';
import { Transactions } from '../models/transaction';

import { defaultItems } from '../constants';
@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss'],
})
export class TransactionTableComponent implements OnInit {
  @Input() transactions: Transactions;

  form: FormGroup;
  headers: String[];
  items: Item[];
  itemsToShow: Item[];

  newForm: FormGroup;

  pageSize: number = 10;
  pageIndex: number = 0;
  pageOptions: number[] = [];
  report: any;

  constructor(
    private apiService: ApiService,
    private cryptoService: CryptoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    console.log('>Trans', this.transactions);
    this.headers = this.getHeaders();
    this.validateItems();
  }

  get filterValue() {
    return this.form.get('filterValue');
  }

  get filterField() {
    return this.form.get('filterField');
  }

  get dates() {
    return this.form.get('dates');
  }

  createForm(): void {
    this.form = this.fb.group({
      dates: ['', Validators.required],
      filterField: [''],
      filterValue: [''],
    });
    console.log('>>Form', this.form);
  }

  downloadExcel(): void {
    /* this.apiService.getExcelReport().subscribe((report) => {
      const decode = this.cryptoService.decrypt(report.payload);
      this.report = JSON.parse(decode);
      console.log(this.report);
    }); */
  }

  getHeaders(): String[] {
    return Object.keys(this.transactions.headers);
  }

  search(): void {
    console.log('####');
  }

  paginationEvent(pageIndex: number): void {
    if (this.pageOptions.includes(pageIndex + 1)) {
      this.pageIndex = pageIndex;
      console.log('>>Page', this.pageIndex, this.pageSize);
      this.sliceTeams();
      console.log('>>Show:', this.itemsToShow);
    }
  }

  sliceTeams() {
    this.itemsToShow = this.items.slice(
      this.pageIndex * this.pageSize,
      this.pageSize * (this.pageIndex + 1)
    );
    console.log('>Items', this.items);
  }

  validateItems(): void {
    if (this.transactions.items !== null) {
      this.items = this.transactions.items;
    } else {
      this.items = defaultItems;
    }
    this.pageOptions = [...Array(Math.ceil(this.items.length / 10)).keys()].map(
      (i) => i + 1
    );
    console.log('>>Indices', this.pageOptions);
    this.sliceTeams();
  }
}
