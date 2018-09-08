import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Page} from "ionic-angular/umd/navigation/nav-util";
import {ClientReceivePage} from "../client/receive/client-receive";
import {ClientSendPage} from "../client/send/client-send";
import {ClientNotifyPage} from "../client/notify/client-notify";
import {ServerPage} from "../server/server";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  openClientReceive() {
    this.openPage(ClientReceivePage);
  }

  openClientSend() {
    this.openPage(ClientSendPage);
  }

  openClientNotify() {
    this.openPage(ClientNotifyPage);
  }

  openServer() {
    this.openPage(ServerPage);
  }

  openPage(page: Page) {
    this.navCtrl.push(page);
  }
}
