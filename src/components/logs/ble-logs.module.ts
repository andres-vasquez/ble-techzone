import {NgModule} from '@angular/core';
import {BleLogsComponent} from './ble-logs';
import {IonicPageModule} from 'ionic-angular';

@NgModule({
  declarations: [BleLogsComponent],
  imports: [IonicPageModule.forChild(BleLogsComponent)],
  exports: [BleLogsComponent]
})
export class BleLogsComponentModule {
}
