export class UserAction {

  private _email: string;
  private _question: string;
  private _feedback: number;

  constructor(email: string, question: string) {
    this._email = email;
    this._question = question;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get question(): string {
    return this._question;
  }

  set question(value: string) {
    this._question = value;
  }

  get feedback(): number {
    return this._feedback;
  }

  set feedback(value: number) {
    this._feedback = value;
  }
}
