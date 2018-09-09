import {Component, ViewChild} from '@angular/core';
import {Nav, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ClientSendPage} from '../pages/client/send/client-send';
import {ClientReceivePage} from '../pages/client/receive/client-receive';
import {ClientNotifyPage} from '../pages/client/notify/client-notify';
import {ServerPage} from "../pages/server/server";
import {BleServerService} from "../providers/ble-server-service";
import {MenuItem} from "../models/MenuItem";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: NavController;
  rootPage: any = HomePage;

  public menuItems: Array<MenuItem>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public bleServer: BleServerService) {
  }

  ngOnInit() {
    this.menuItems = [
      {title: 'Home', component: HomePage},
      {title: 'Recibir', component: ClientReceivePage},
      {title: 'Enviar', component: ClientSendPage},
      {title: 'Proximidad', component: ClientNotifyPage},
      {title: 'Server', component: ServerPage},
    ];
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('cordova')) {
        //Init BLEServer listeners
        this.bleServer.intialize(this.platform.is('android'));
      }
    });
  }

  openMenuItem(menuItem: MenuItem) {
    console.log(menuItem);
    // Reset the content nav to have just this menuItem
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(menuItem.component);
  }
}
