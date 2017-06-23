import { Component } from '@angular/core';

@Component({
  templateUrl: 'prosCons.html'
})
export class ProsConsPage {
	pros_cons:string = 'pros';
	pros;
	cons;

  constructor() {
  	this.initializeProsCons();
  }

  initializeProsCons() {
  	this.pros = [
  		"Ionic 2 = Angular 2",
  		"Fantastic documentation, community, and examples.",
  		"28+ ready to use Ionic UI components, which can be easily customized and edited.",
      "Override Ionic's CSS elements with ease.",
  		"D3 Technology and other npm/js modules easily importable and usable.",
  		"Organization and Structure.",
      "Tooling with Ionic CLI.",
      "Navigation.",
      "FREE."
  	];
  	this.cons = [
  		"Ionic 2 means Angular 2, which means learning curve.",
  		"Active Ionic development and fixes, which could cause headaches for JPMC internally.",
  		"A bit tough to install and grab npm modules because of JPM restrictions. One time problem."
  	];
  }
}