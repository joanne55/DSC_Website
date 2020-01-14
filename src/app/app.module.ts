import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Routing module that will route to your custom modules
import {AppRoutingModule} from './shared/app-routing.module'

import { ReactiveFormsModule } from "@angular/forms";

// Angular environment (for different environments, in this case to apply firebaseConfig)
import { environment } from 'src/environments/environment';

// Firebase services 
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Custom services
import { AuthService } from "src/app/admin/services/auth/auth.service";

import { AccountModule } from "src/app/admin/account/account.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    AccountModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
