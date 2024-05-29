import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from '@exalif/ngx-skeleton-loader';
import { SearchComponent } from './search/search.component';
import { InfoComponent } from './search/info/info.component';
import { MainComponent } from './search/main/main.component';

@NgModule({
  declarations: [AppComponent, SearchComponent, InfoComponent, MainComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
