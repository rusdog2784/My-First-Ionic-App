import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { MoreInfoPage } from '../moreInfo/moreInfo';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})
export class ResultsPage {
	search:string;
	criteria:string;
	assetDetails:any;
	displayData = [];
	icons;
	loading;

  constructor(public navCtrl: NavController, private navParams: NavParams, public modalCtrl: ModalController, public http: Http, public loadingCtrl: LoadingController) {
  	this.search = navParams.get("search");
  	this.criteria = navParams.get("criteria");

  	this.loading = this.loadingCtrl.create({
  		spinner: 'crescent',
  		content: 'Loading results...'
  	});
  	this.loading.present();

  	this.http.get('assets/json/assetDetails.json').map(res => res.json()).subscribe(data => {
  		this.assetDetails = data.data;
  		this.initializeData();
  	});
  }

  moreInfo(cardData) {
  	console.log("Index: " + this.displayData.indexOf(cardData));
  	//this.navCtrl.push(MoreInfoPage, { data: cardData });
  	let modal = this.modalCtrl.create(MoreInfoPage, { data: cardData });
  	modal.present();
  }

  searchItem(ev) {
  	this.initializeData();
  	var search = ev.target.value;
  	console.log("Filter search: " + search);
  	var save = [];
  	if (search && search.trim != '') {
	  	for (let item of this.displayData) {
	  		for (let key of Object.keys(item)) {
	  			let value_string = item[key].toString();
	  			if (value_string.indexOf(search) > -1) {
	  				save.push(item);
	  			}
	  		}
	  	}
	  	this.displayData = save;
	  }
  }

  initializeData() {
  	this.displayData = this.assetDetails;
		this.loading.dismiss();
  }

}