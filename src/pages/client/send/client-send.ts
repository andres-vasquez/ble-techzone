import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BaseClientPage} from "../base/BaseClientPage";
import {UserAction} from "../../../models/UserAction";

@IonicPage()
@Component({
  selector: 'client-send',
  templateUrl: 'client-send.html'
})
export class ClientSendPage extends BaseClientPage {

  public inputData: UserAction = new UserAction();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
  }
}
