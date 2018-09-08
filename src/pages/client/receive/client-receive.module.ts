import {NgModule} from '@angular/core';
import {IonicPageModule} from "ionic-angular";
import {ClientReceivePage} from "./client-receive";
import {ServerInfoComponentModule} from "../../../components/server-info/server-info.module";
import {BleLogsComponentModule} from "../../../components/logs/ble-logs.module";

@NgModule({
  declarations: [
    ClientReceivePage,
  ],
  imports: [
    ServerInfoComponentModule,
    BleLogsComponentModule,
    IonicPageModule.forChild(ClientReceivePage),
  ],
  exports: []
})
export class ClientReceiveModule {
}
