import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NvD3Component } from 'ng2-nvd3';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { SearchPage } from '../pages/search/search';
import { ResultsPage } from '../pages/results/results';
import { MoreInfoPage } from '../pages/moreInfo/moreInfo';
import { d3funPage } from '../pages/d3fun/d3fun';
import { ProsConsPage } from '../pages/prosCons/prosCons';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyProvider } from '../providers/my/my';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    SearchPage,
    ResultsPage,
    MoreInfoPage,
    d3funPage,
    ProsConsPage,
    NvD3Component
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    SearchPage,
    ResultsPage,
    MoreInfoPage,
    d3funPage,
    ProsConsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyProvider
  ]
})
export class AppModule {}
