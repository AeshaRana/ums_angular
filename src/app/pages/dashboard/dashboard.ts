import { AfterViewInit, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CardComponent } from './cards/card/card';
import { userData } from '../users/users.data';
import { UsersService } from '../users/users-service';

import { async, asyncScheduler, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, TagModule, CardComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
  userCount: any = 0;
  apiUsers:any=0;
  count: string | null = JSON.parse(localStorage.getItem('newUserCount') || 'null');
  countData: number = 0;

  constructor(
    private user: UsersService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.user.userData$.pipe(map((value) => value?.length)).subscribe((value) => {
      
      this.userCount = Number(value);
      this.apiUsers=Number(value);
      const dummyCount = Number(this.count ?? this.userCount);
      const dummyUserCountData = Number(value ?? 0);
      const data = dummyCount - dummyUserCountData;

      this.userCount = dummyCount;
      this.countData = data>0?data:0;

      // console.log(this.userCount)
      console.log(this.countData)

      this.cd.detectChanges();
    });
  }

 
}
