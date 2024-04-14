import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent } from './app.component';
 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EtudiantsModule } from './etudiants/etudiants.module';
import { ProfesseursModule } from './professeurs/professeurs.module';
 
@NgModule({
  imports: [BrowserModule, Ng2SearchPipeModule, EtudiantsModule, ProfesseursModule],
  declarations: [	AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}