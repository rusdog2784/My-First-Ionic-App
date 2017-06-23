import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ViewController, NavController, NavParams, LoadingController } from 'ionic-angular';
declare let d3: any;

@Component({
	selector: 'page-d3fun',
	templateUrl: 'd3fun.html'
})
export class d3funPage {
	loading;
	orgChart:any;
	sunburstChart;
	sunburstData;

	constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
		this.loading = this.loadingCtrl.create({
  		spinner: 'crescent',
  		content: 'Loading results...'
  	});
  	this.loading.present();

  	this.http.get('assets/json/orgChart.json').map(res => res.json()).subscribe(data => {
  		this.orgChart = data.data;
  		this.initializeData();
  	});
	}

	initializeData() {
		this.sunburstChart = {
			"chart": {
				"type": "sunburstChart",
		    "height": 450,
		    "groupColorByParent": true,
		    "showLabels": true,
		    "duration": 500,
		    "mode": "size",
		    "labelFormat": function (d) { return d.name + ' (' + d.size + ')'; },
		    "tooltip": {
		    	enabled: false
		    }
		  }
		};

		this.sunburstData = this.orgChart;
		this.loading.dismiss();
	}
}