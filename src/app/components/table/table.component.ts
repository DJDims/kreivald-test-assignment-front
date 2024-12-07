import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ILinks, IPagination, IUser } from '@interfaces';
import { RequestsService } from 'app/services/service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
	constructor(private req: RequestsService) {}
	
	displayedColumns: string[] = ['photo', 'name', 'email', 'phone', 'position'];
	data!: IPagination ;
	dataSource!: IUser[];
	links!: ILinks;

	fetchPage(url?: string) {
		this.req.Get<IPagination>(url ? url : `http://localhost:8000/api/users`).subscribe(data => {
			this.dataSource = data.users;
            this.links = data.links;
			this.data = data;
		});
	}

	ngOnInit() {
		this.fetchPage();
	};
}
