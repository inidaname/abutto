import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/main/side-bar/side-bar.component';
import { HeaderComponent } from './components/main/header/header.component';



@NgModule({
  declarations: [
    SideBarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    SideBarComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
