import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: '', component: AboutComponent }
]

@NgModule({
  declarations: [AboutComponent],
  imports: [RouterModule.forChild(ROUTES)]

})

export class AboutModule {}
