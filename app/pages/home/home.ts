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

  connect() {
    // let deviceUrl = "http://192.168.1.118:3000/api/v1/devices";
    let deviceUrl = "http://mtaas-controller-elb-1154311609.us-west-2.elb.amazonaws.com:3000/api/v1/devices";
    let deviceInfo = JSON.stringify(Device.device);
    let alert = Alert.create({
      buttons: ['OK']
    });
    console.log(deviceInfo);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(deviceUrl, deviceInfo, {headers: headers})
        // .map(res => res.json())
        .subscribe(
            res => {
              if (res.status == 201) {
                alert.setTitle("Connected");
                alert.setSubTitle(deviceInfo);
                this.nav.present(alert);
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
