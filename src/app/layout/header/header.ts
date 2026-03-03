import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from "../sidebar/sidebar";
import { AuthService } from '../../auth/login/auth-service';
import { Router } from '@angular/router';
import { Toast } from "primeng/toast";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StyleClass, StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule, MenubarModule, AvatarModule, ButtonModule, ConfirmDialogModule,StyleClassModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
 authService=inject(AuthService);
 router=inject(Router);
 messageService=inject(MessageService);
 confirmationService=inject(ConfirmationService);
 disabled=signal(this.authService.isLoggedIn())
 
    items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Users',
      icon: 'pi pi-users',
      routerLink: '/users'
    }
  ];

  isLoggedIn()
  {
    return this.authService.isLoggedIn()
  }

  logout() {
    this.confirmationService.confirm({
            // target: event.target as EventTarget,
            message: 'Do you want to logout?',
            header: 'Confirm Logout',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Yes',
            rejectButtonProps: {
                label: 'Yes',
                severity: 'danger',
                outlined: true
            },
            acceptButtonProps: {
                label: 'May be later',
                severity: 'secondary'
            },
        
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
              
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                  this.authService.logOut()
            }
  })
   

  }

 @Output() menuClick = new EventEmitter<void>();

  open() {
    this.menuClick.emit();
  }

}
