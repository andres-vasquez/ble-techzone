import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {ServerPage} from '../pages/server/server';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/client/list/list';

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
    ServerPage,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ServerPage,
    HomePage,
    ListPage
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
