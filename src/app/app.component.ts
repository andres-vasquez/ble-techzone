import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/client/list/list';
import {ServerPage} from "../pages/server/server";
import {BleServerService} from "../providers/ble-server-service";
import {MenuItem} from "../models/MenuItem";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  server: MenuItem;
  samples: Array<MenuItem>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public bleServer: BleServerService) {
    this.initializeApp();

    //Add server menu
    this.server = new MenuItem('md-bluetooth', "BLE Server", ServerPage);


    this.samples = [
      {icon: 'md-home', title: 'Home', component: HomePage},
      {icon: 'md-menu', title: 'List', component: ListPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if(this.platform.is('cordova')){
        //Init BLEServer listeners
        this.bleServer.init();
      }
    });
  }

  openMenuItem(menuItem: MenuItem) {
    // Reset the content nav to have just this menuItem
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(menuItem.component);
  }
}
