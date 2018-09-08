import {NgModule} from '@angular/core';
import {IonicPageModule} from "ionic-angular";
import {ClientSendPage} from "./client-send";
import {Ionic2RatingModule} from "ionic2-rating";
import {ServerInfoComponentModule} from "../../../components/server-info/server-info.module";
import {BleLogsComponentModule} from "../../../components/logs/ble-logs.module";

@NgModule({
  declarations: [
    ClientSendPage,
  ],
  imports: [
    ServerInfoComponentModule,
    BleLogsComponentModule,
    IonicPageModule.forChild(ClientSendPage),
    Ionic2RatingModule
  ],
  exports: []
})
export class ClientSendModule {
}
