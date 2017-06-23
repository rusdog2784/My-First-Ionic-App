import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MyProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MyProvider {
	private _name:string;
	private _age:number;

  constructor(public http: Http) {
  	this._name = 'Scott Russell';
  	this._age = 22;
  }

  get name() {
  	return this._name;
  }

  set name(newVal) {
  	console.log('Set name = ' + newVal);
  	this._name = newVal;
  }

  get age() {
  	return this._age;
  }

  set age(newVal) {
  	console.log('Set age = ' + newVal);
  	this._age = newVal;
  }

}
