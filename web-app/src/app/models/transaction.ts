import { Header } from '../models/header';
import { Item } from './item';

export class Transactions {
  public headers: Header;
  public count: number;
  public items: Item[];
}
