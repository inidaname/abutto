import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/main/side-bar/side-bar.component';
import { HeaderComponent } from './components/main/header/header.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SideBarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    SideBarComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
