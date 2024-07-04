import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {VerifyCodeComponent} from "./verify-code/verify-code.component";

export const routes: Routes = [
  { path : "connexion" , component : LoginComponent},
  { path : "verification/:email" , component : VerifyCodeComponent},
  { path : "" , redirectTo : "/connexion", pathMatch : "full"}
];
