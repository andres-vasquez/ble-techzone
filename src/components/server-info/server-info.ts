import {Component, Input} from '@angular/core';
import {Constants} from "../../utils/Constants";

@Component({
  selector: 'server-info',
  templateUrl: 'server-info.html'
})
export class ServerInfoComponent {

  @Input() serverId: number = Constants.DEFAULT_SERVER_ID;

  constructor() {

  }
}
