import { ChangeDetectorRef, Component, forwardRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from "primeng/floatlabel";
import { IconFieldModule } from "primeng/iconfield";
import { userData } from '../users/users.data';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { IftaLabelModule } from 'primeng/iftalabel';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { UsersService } from '../users/users-service';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,
    IconFieldModule,
    IftaLabelModule,
    PasswordModule,
    FloatLabelModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    IftaLabelModule,
    FormsModule,
    ButtonModule, DividerModule, MessageModule, ToastModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
  providers: [MessageService,]
})
export class AddUser implements OnInit {
  formData: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required,]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)])
  })
  userCount$: number | undefined;
  messageService = inject(MessageService)
  manualCount: number | undefined = 0;
  usersData: userData[] | null = []


  constructor(private userService: UsersService, private cd: ChangeDetectorRef) {

  }


  ngOnInit(): void {
    this.userService.userData$.pipe(map((value) => value?.length)).subscribe((value) => {
      this.userCount$ = value;
      this.manualCount = this.userCount$;

      this.cd.detectChanges();
    });


    this.userService.userData$.subscribe(data => this.usersData = data);
  }
  onSubmit() {

    if (this.formData.valid) {
      if(localStorage.getItem('newUserCount'))
      {
        const count: string | null = JSON.parse(localStorage.getItem('newUserCount') || 'null');
          this.manualCount=Number(count);
          this.manualCount++;
      }
      else
      {
       this.manualCount?this.manualCount++:1;
      }
      
      const data = {
        id: Number(this.manualCount),
        username: this.formData.value.name,
        email: this.formData.value.email,
        phone: this.formData.value.phone
      }
      this.usersData?.push(data)
      localStorage.setItem('userData', JSON.stringify(this.usersData));
      localStorage.setItem('newUserCount',JSON.stringify(this.manualCount));
    

    }
    else {
      console.log("invalid data")
    }


    this.formData.reset();

  }
}
