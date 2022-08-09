import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  isSidebarVisible = false;
  private userSub: Subscription;
  isAuthenticated = false;
  userEmail: string;
  userID: string;
  onShowTutorialSideBar = true;
  constructor(private authService: AuthService, private dataStorage: DataStorageService) { }

  download(): void {
    
  }

  ngOnInit(): void {
    this.dataStorage.fetchRecipients();
    this.dataStorage.fetchSenders();
    this.authService.user.subscribe(user =>{
      this.isAuthenticated =!!user
      this.userEmail = this.authService.user.value.email;
      this.userID = this.authService.user.value.id;
      console.log(this.userID);
      
    });
    
  }

  onShowTutorial(){
    this.onShowTutorialSideBar = !this.onShowTutorialSideBar;
  }

  onShowSidebar(){
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  
  onCreate(){
  }

  onGtUser(){
    this.authService.getUser();
    console.log(this.authService.getUser());
    
  }

  onLogout(){
    this.isSidebarVisible = false;
    this.isAuthenticated = false;

  }

  ngOnDestroy(): void {
    this.authService.user.unsubscribe();
  }
  
}
