import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NotifierModule } from 'angular-notifier';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { CreateItemComponent } from './components/item/create-item/create-item.component';
import { ListItemComponent } from './components/item/list-item/list-item.component';
import { TitleComponent } from './components/title/title.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { LanguageInterceptor } from './interceptors/language.interceptor';

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
    ToastNotificationConfigModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  exports:[
    NotifierModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
