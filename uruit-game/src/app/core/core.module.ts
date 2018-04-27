import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { StatsComponent } from './stats/stats.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [
   HomeComponent,
   FooterComponent,
   HeaderComponent,
   StatsComponent
  ],
  exports: [
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    StatsComponent
  ]
})
export class CoreModule {}
