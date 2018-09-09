import {Component, NgZone} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BaseClientPage} from "../base/BaseClientPage";
import {UserAction} from "../../../models/UserAction";

@IonicPage()
@Component({
  selector: 'client-send',
  templateUrl: 'client-send.html'
})
export class ClientSendPage extends BaseClientPage {

  public inputData: UserAction = new UserAction();

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public ngZone: NgZone) {
    super(events, ngZone);
  }
}
