import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { HttpClient } from '@angular/common/http';


@NgModule({
  providers: [
    HttpClient,
    ApiService
  ],
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

// Example: If you're injecting a service called 'HttpClient'
// import { HttpClient } from '@angular/common/http';

// @NgModule({
//   // ... other module configurations
//   providers: [
//     HttpClient, // Add the dependency here
//     ApiService // Assuming ApiService is in the same module
//   ]
// })
// export class AppModule { }