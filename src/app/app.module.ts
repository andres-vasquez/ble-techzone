import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
// Pages
import {MyApp} from './app.component';
// Modules
import {HomeModule} from "../pages/home/home.module";
import {ClientReceiveModule} from "../pages/client/receive/client-receive.module";
import {ClientSendModule} from "../pages/client/send/client-send.module";
import {ServerModule} from "../pages/server/server.module";
import {ClientNotifyModule} from "../pages/client/notify/client-notify.module";
// Other dependencies
import {Ionic2RatingModule} from 'ionic2-rating';
// Natove components
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {BLE} from '@ionic-native/ble';
// Providers
import {BleClientService} from '../providers/ble-client-service';
import {BleServerService} from '../providers/ble-server-service';
import {BluetoothService} from '../providers/bluetooth-service';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    HomeModule,
    ClientReceiveModule,
    ClientSendModule,
    ClientNotifyModule,
    ServerModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BLE,
    BleClientService,
    BleServerService,
    BluetoothService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
