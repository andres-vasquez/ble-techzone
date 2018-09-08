import {NgModule} from '@angular/core';
import {ClientNotifyPage} from "./client-notify";
import {IonicPageModule} from "ionic-angular";
import {ServerInfoComponentModule} from "../../../components/server-info/server-info.module";
import {BleLogsComponentModule} from "../../../components/logs/ble-logs.module";

@NgModule({
  declarations: [
    ClientNotifyPage,
  ],
  imports: [
    ServerInfoComponentModule,
    BleLogsComponentModule,
    IonicPageModule.forChild(ClientNotifyPage),
  ],
  exports: []
})
export class ClientNotifyModule {
}
