import {DeviceInfo, ScanStatus} from "@ionic-native/bluetooth-le";

export interface AttendanceBLE {
  scanStatus: ScanStatus;
  distance: string;
  isAttendanceServer: boolean;
}
