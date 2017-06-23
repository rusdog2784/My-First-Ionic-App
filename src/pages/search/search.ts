import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';

import { ResultsPage } from '../results/results';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
	searchCriteria = "";
  searchText = "";
	criteria: Array<string> = ["Inventory No", "IP Address", "Asset Name", "Asset Tag", "Serial No"];
  hideCriteria: boolean = true;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {
  }

  search() {
  	if (!this.searchText) {
  		return;
  	} 
  	if (this.searchCriteria == "") {
  		//this.displayAlert();
      this.openMenu();
  	} else {
      this.navCtrl.push(ResultsPage, {
        search: this.searchText,
        criteria: this.searchCriteria
      });
    }
  }

  openMenu() {
    let actionSheet = this.actionSheetCtrl.create();
    for (let c of this.criteria) {
      var button = {
        text: c,
        handler: () => {
          this.searchCriteria = c;
          this.hideCriteria = false;
        }
      };
      actionSheet.addButton(button);
    }
    actionSheet.present();
  }

}












