import {Constants} from "../../../utils/Constants";
import {Events} from "ionic-angular";
import {NgZone} from "@angular/core";
import {BleClientService} from "../../../providers/ble-client-service";

export class BaseClientPage {
  public serverId: number = Constants.DEFAULT_SERVER_ID;
  constructor(public events: Events, public ngZone: NgZone, public clientService: BleClientService) {
  }

  connect(){

  }
}
