import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/login/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { UsersRoutingModule } from './users-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    SharedModule , HttpClientModule, UsersRoutingModule, FormsModule,
    ReactiveFormsModule,
  ],
  exports: [LoginComponent, RegisterComponent]
})
export class UsersModule { }
