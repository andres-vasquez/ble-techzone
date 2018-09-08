import {NgModule} from '@angular/core';
import {IonicPageModule} from "ionic-angular";
import {ServerPage} from "./server";
import {ServerInfoComponentModule} from "../../components/server-info/server-info.module";
import {BleLogsComponentModule} from "../../components/logs/ble-logs.module";

@NgModule({
  declarations: [
    ServerPage,
  ],
  imports: [
    ServerInfoComponentModule,
    BleLogsComponentModule,
    IonicPageModule.forChild(ServerPage),
  ],
  exports: []
})
export class ServerModule {
}
