import {Component, NgZone} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BaseClientPage} from "../base/BaseClientPage";

@IonicPage()
@Component({
  selector: 'client-receive',
  templateUrl: 'client-receive.html'
})
export class ClientReceivePage extends BaseClientPage{


  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events, public ngZone: NgZone) {
    super(events, ngZone);
  }
}
