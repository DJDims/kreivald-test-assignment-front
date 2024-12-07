import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IPosition, IUser } from '@interfaces';
import { RequestsService } from 'app/services/service';

@Component({
  selector: 'app-form',
  imports: [CommonModule, 
	MatFormFieldModule, 
	MatInputModule, 
	MatIconModule, 
	MatSelectModule, 
	MatButtonModule, 
	FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
	constructor(private req: RequestsService) {}
	token!: string;
    positions: IPosition[] = [];
	user: IUser = {
		name: '',
		email: '',
		phone: '',
		position_id: 0,
		photo: '' 
	};

    ngOnInit() {
        this.req.Get<IPosition[]>('http://localhost:8000/api/positions').subscribe(data => {
            this.positions = data;
        });
    };

	addUser() {
		let formData: FormData = new FormData();
		if (this.user.photo instanceof File) {
			formData.append('photo', this.user.photo, this.user.photo.name)
		}
		formData.append('name', this.user.name);
		formData.append('email', this.user.email);
		formData.append('phone', this.user.phone);
		formData.append('position_id', String(this.user.position_id));
		this.req.Post('http://localhost:8000/api/users', formData, [{key:'token', value:this.token}]).subscribe(data => {
            this.user.name = "";
            this.user.email = "";
            this.user.phone = "";
            this.user.position_id = 0;
			this.token = ""
        });
	}

	setImg(e: any) {
		let fileList: FileList = e.target.files;
		if (fileList.length < 1) {
			return;
		}
		const file = fileList[0];
		this.user.photo = file;
	}

	getToken() {
		this.req.Get<{token:string}>('http://localhost:8000/api/token').subscribe(data => {
            this.token = data.token;
        });
	}
}
