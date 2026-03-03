import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { RippleModule } from 'primeng/ripple';
import { RouterLink } from "@angular/router";



@Component({
  selector: 'app-sidebar',
  standalone:true,
  imports: [AvatarModule, ButtonModule, DrawerModule, RippleModule, StyleClassModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  @Input() visible!: boolean;
  @Output() close = new EventEmitter<void>();

  onHide() {
    this.close.emit();
  }

  closeCallback(e:Event)
  {
      this.close.emit();
  }

}
