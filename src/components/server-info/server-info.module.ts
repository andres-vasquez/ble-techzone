import {NgModule} from '@angular/core';
import {ServerInfoComponent} from './server-info';
import {IonicPageModule} from 'ionic-angular';

@NgModule({
  declarations: [ServerInfoComponent],
  imports: [IonicPageModule.forChild(ServerInfoComponent)],
  exports: [ServerInfoComponent]
})
export class ServerInfoComponentModule {
}
