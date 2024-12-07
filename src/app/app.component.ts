import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RequestsService } from './services/service';
import { IPosition } from '@interfaces';
import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, CommonModule, TableComponent, FormComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
    
}
