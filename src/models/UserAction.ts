import {Constants} from "../utils/Constants";

export class UserAction {

  public email: string;
  public question: string;


  constructor(email: string, question: string) {
    this.email = email;
    this.question = question;
  }
}
