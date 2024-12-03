import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private authService: AuthService, 
    private router: Router
  ){}
  // Add logic or data bindings specific to the homepage if needed
  strAccountName : string = 'Jay Mg Mg';
  blnCollapse : boolean = false;
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  CollapseOn(){
    this.blnCollapse = !this.blnCollapse;
  }
}
