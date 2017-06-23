import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ViewController, NavParams, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-moreInfo',
  templateUrl: 'moreInfo.html'
})
export class MoreInfoPage {
  more_info_selection:string = 'key_information';
  data;
  chart_data;
  infoTitle = "";
  infoToDisplay = [];
  assetDetailsHeaders = [];
  billToOrganizationHeaders = [];
  btoOrganizationHeaders = [];
  platformCatalogHeaders = [];
  deploymentHeaders = [];
  dAddressHeaders = [];
  contacts = [];
  leftSideTitle:string = "";
  rightSideTitles = [];
  orgChart = [];
  sunburstOptions;
  sunburstData;
  forceOptions;
  forceData;

  constructor(public http: Http, public viewCtrl: ViewController, public navParams: NavParams, public modalCtrl: ModalController) {
  	this.data = navParams.get("data");

    this.http.get('assets/json/orgChart.json').map(res => res.json()).subscribe(data => {
      this.orgChart = data.data;
      this.initializeData();
    });
  }

  done() {
    this.viewCtrl.dismiss();
  }

  changeCol() {
    
  }

  updateInfo(val: string) {
    //this.infoToDisplay = this.chart_data[val];
    //this.infoTitle = val.charAt(0).toUpperCase() + val.slice(1) + ":";
    this.infoToDisplay = [];
    switch (val) {
      case "AssDet":
        this.infoTitle = "Asset Details";
        for (let key of this.assetDetailsHeaders) {
          if (key != "icon" && key != "Contacts") {
            let dict_key = "AssetDetails:" + key;
            this.infoToDisplay.push({
              title: key,
              value: this.data[dict_key]
            });
          }
        }
        break;

      case "BTO":
        this.infoTitle = "Bill To Organization";
        break;

      case "BTO:Org":
        this.infoTitle = "Bill To Organization, Organization";
        break;

      case "PlatCat":
        this.infoTitle = "Platform Catalog";
        break;

      case "Dep":
        this.infoTitle = "Deployment";
        break;

      case "Dep:Addrs":
        this.infoTitle = "Deployment, Address";
        break;
      
      default:
        break;
    }
  }

  initializeData() {
    if (this.data.length != 0) {
      for (let key of Object.keys(this.data)) {
        if (key.indexOf('BillToOrganization') <= -1 && key.indexOf('PlatformCatalog') <= -1 && key.indexOf('Deployment') <= -1) {
          this.assetDetailsHeaders.push(key.slice(key.indexOf(':')+1));
        }
        if (key.indexOf('BillToOrganization') > -1 && key.indexOf('BillToOrganization:Organization') <= -1) {
          this.billToOrganizationHeaders.push(key.slice(key.indexOf(':', key.indexOf(':')+1)+1));
        }
        if (key.indexOf('PlatformCatalog') > -1) {
          this.platformCatalogHeaders.push(key.slice(key.indexOf(':', key.indexOf(':')+1)+1));
        }
        if (key.indexOf('Deployment') > -1 && key.indexOf('Deployment:Address') <= -1) {
          this.deploymentHeaders.push(key.slice(key.indexOf(':', key.indexOf(':')+1)+1));
        }
        if (key.indexOf('BillToOrganization:Organization') > -1) {
          this.btoOrganizationHeaders.push(key.slice(key.indexOf(':', key.indexOf(':', key.indexOf(':')+1)+1)+1));
        }
        if (key.indexOf('Deployment:Address') > -1) {
          this.dAddressHeaders.push(key.slice(key.indexOf(':', key.indexOf(':', key.indexOf(':')+1)+1)+1)); 
        }
      }
      this.contacts = this.data['AssetDetails:Contacts'];
      this.leftSideTitle = Object.keys(this.contacts[0])[0];
      this.rightSideTitles = Object.keys(this.contacts[0]).slice(1);
    }
    this.updateInfo('AssDet');

    this.sunburstData = this.orgChart;
    this.sunburstOptions = {
      chart: {
        type: "sunburstChart",
        height: 450,
        groupColorByParent: true,
        showLabels: true,
        labelFormat: function(d) { return d.name; },
        labelThreshold: 0.2,
        duration: 250,
        mode: "size",
        tooltip: {
          distance: 1,
          position: function () {
            return {
              right: 0,
              top: 30
            };
          },
          contentGenerator: function(d) { return "<div style=''><h3>" + d.data.name + "</h3><p>" + d.data.title + "</p><p>" + d.data.department + "</p></div>"; }
        }
      }
    };

    this.forceData = {
      "nodes": [
        {"x": 469, "y": 410, "poop": "yes"},
        {"x": 493, "y": 364, "poop": "no"},
        {"x": 442, "y": 365},
        {"x": 467, "y": 314},
        {"x": 477, "y": 248},
        {"x": 425, "y": 207},
        {"x": 402, "y": 155},
        {"x": 369, "y": 196},
        {"x": 350, "y": 148},
        {"x": 539, "y": 222},
        {"x": 594, "y": 235},
        {"x": 582, "y": 185},
        {"x": 633, "y": 200}
      ],
      "links": [
        {"source":  0, "target":  1},
        {"source":  1, "target":  2},
        {"source":  2, "target":  0},
        {"source":  1, "target":  3},
        {"source":  3, "target":  2},
        {"source":  3, "target":  4},
        {"source":  4, "target":  5},
        {"source":  5, "target":  6},
        {"source":  5, "target":  7},
        {"source":  6, "target":  7},
        {"source":  6, "target":  8},
        {"source":  7, "target":  8},
        {"source":  9, "target":  4},
        {"source":  9, "target": 11},
        {"source":  9, "target": 10},
        {"source": 10, "target": 11},
        {"source": 11, "target": 12},
        {"source": 12, "target": 10}
      ]
    };
    this.forceOptions = {
      chart: {
        type: 'forceDirectedGraph',
        height: 500,
        showLabel: true,
        width: 400,
        margin:{top: 20, right: 20, bottom: 20, left: 20},
        nodeExtras: function(node) {
          node && node
            .append("text")
            .attr("dx", 8)
            .attr("dy", ".35em")
            .text(function(d) { return d.name })
            .style('font-size', '10px');
        },
        tooltip: {
          contentGenerator: function(d) { 
            return '<div style="width: 100px; white-space: normal;"><p>x: ' + d.x + '</p><br><p>y: ' + d.y + '</p><br><p>index: ' + d.index + '</p><br><p>weight: ' + d.weight + '</p><br><p>px: ' + d.px + '</p><br><p>py: ' + d.py + '</p><br><p>fixed: ' + d.fixed + '</p><br><p>series: ' + d.series[2].key + '</p></div>'; }
        }
      }
    }
  }
}











