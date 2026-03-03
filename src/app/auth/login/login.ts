
import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';

import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PasswordModule } from 'primeng/password';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from "primeng/button";
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-login',
  imports: [FormsModule,
    InputIcon,
    IconFieldModule,
    IftaLabelModule,
    PasswordModule,
    FloatLabelModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    IftaLabelModule,
    FormsModule,
    ButtonModule,DividerModule,MessageModule,ToastModule],
     providers:[MessageService],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
   username: any;
  password: any;
  items: any[] = [];
  messageService=inject(MessageService)
  // loginForm!:FormGroup;


  constructor(private route:Router)
  {

  }


  onLogin() {
    if (this.username === "admin" && this.password === "admin@123") {
      localStorage.setItem('token',"adminlogintoken780024");
      this.route.navigateByUrl('/dashboard')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged in sucessfully', life: 3000 })
      
    }
    else
    {
       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Cridentials',life: 3000  });
    }
  }

  redirectRegister()
  {
    this.route.navigateByUrl('register')
  }

}
