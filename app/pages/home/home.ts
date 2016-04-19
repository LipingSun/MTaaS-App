import {Page, Alert, NavController} from 'ionic-angular';
import {Device} from 'ionic-native';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map'
// import 'rxjs/Rx';


@Page({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    constructor(public nav:NavController, public http:Http) {
    }

    connected = false;
    // deviceUrl = "http://localhost:3000/api/v1/devices";
    deviceUrl = "http://mtaas-controller-elb-1154311609.us-west-2.elb.amazonaws.com:3000/api/v1/devices";

    connect() {
        let deviceInfo = JSON.stringify(Device.device);
        let alert = Alert.create({
            buttons: ['OK']
        });
        console.log(deviceInfo);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.deviceUrl, deviceInfo, {headers: headers})
            // .map(res => res.json())
            .subscribe(
                res => {
                    if (res.status == 201) {
                        alert.setTitle("Connected");
                        alert.setSubTitle(deviceInfo);
                        this.nav.present(alert);
                        this.connected = true;
                    }
                },
                err => {
                    alert.setTitle("Failed");
                    alert.setSubTitle(err.message);
                    this.nav.present(alert);
                }
            );
    }

    disconnect() {
        let alert = Alert.create({
            buttons: ['OK']
        });

        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');

        console.log(this.deviceUrl + Device.device.uuid);

        this.http.delete(this.deviceUrl + '/' + Device.device.uuid)
            // .map(res => res.json())
            .subscribe(
                res => {
                    if (res.status == 200) {
                        alert.setTitle("Disconnected");
                        // alert.setSubTitle(deviceInfo);
                        this.nav.present(alert);
                        this.connected = false;
                    }
                },
                err => {
                    alert.setTitle("Failed");
                    alert.setSubTitle(err.message);
                    this.nav.present(alert);
                }
            );
    }
}
