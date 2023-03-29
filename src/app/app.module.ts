import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NotifierModule } from 'angular-notifier';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { CreateItemComponent } from './components/notification/create-item/create-item.component';
import { ListItemComponent } from './components/notification/list-item/list-item.component';
import { TitleComponent } from './components/title/title.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';

@NgModule({
  declarations: [
    AppComponent,
    CreateItemComponent,
    NavComponent,
    ListItemComponent,
    TitleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    NgxAwesomePopupModule.forRoot(),
    DialogConfigModule.forRoot(),
    ConfirmBoxConfigModule.forRoot(),
    ToastNotificationConfigModule.forRoot()
  ],
  exports:[
    NotifierModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
