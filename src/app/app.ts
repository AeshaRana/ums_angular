import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Dashboard } from './pages/dashboard/dashboard';
import { Footer } from "./layout/footer/footer";
import { SidebarComponent } from "./layout/sidebar/sidebar";
import { UsersService } from './pages/users/users-service';
import { userData } from './pages/users/users.data';
import { ConfirmDialogModule } from "primeng/confirmdialog";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, SidebarComponent, ConfirmDialogModule],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit{
 visible = false;
   usersData:userData[] | null =[]
  totalUsercount:any=signal(0);

 constructor(private userService:UsersService)
 {

 }



 ngOnInit(): void {
   this.userService.getUsers();
    this.userService.userData$.subscribe(data=>{
      this.usersData=data;
    });

    this.totalUsercount=this.usersData?.length;
 }

toggleDrawer() {
  this.visible = !this.visible;
}

openDrawer() {
  this.visible = true;
}

closeDrawer() {
  this.visible = false;
}
}
