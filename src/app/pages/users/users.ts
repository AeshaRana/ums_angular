import { AfterViewInit, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { UsersService } from './users-service';
import { userData } from './users.data';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { single } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [TableModule, SkeletonModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit, AfterViewInit {
  usersData: userData[] | null = [];
  isLoading = signal(true);

  userDummyData: any[] = [];

  constructor(
    private userService: UsersService,
    private cd: ChangeDetectorRef,
  ) { }
  ngOnInit(): void {
    this.userDummyData = JSON.parse(localStorage.getItem('userData') || 'null');
    if (!this.userDummyData) {
      console.log("dummy not found")
      this.userService.userData$.subscribe((data) => {
        if (data) this.userDummyData = data;
        localStorage.setItem('userData', JSON.stringify(data));
      });
    }
    setTimeout(() => {
      this.isLoading.set(false);
    }, 5000);

    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
  }
}
