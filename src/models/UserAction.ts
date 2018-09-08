import {Constants} from "../utils/Constants";

export class UserAction {

  private email: string;
  private nickname: string;
  private rate: number;

  constructor(){
    this.email = '';
    this.nickname = '';
    this.rate = Constants.DEFAULT_RATE;
  }
}
