import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    // ...existing code...
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Add HttpClientModule here
    // ...existing code...
  ],
  providers: [],
  // Removed bootstrap array as AppComponent is standalone
})
export class AppModule {}
