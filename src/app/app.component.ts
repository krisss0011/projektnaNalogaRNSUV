import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SupabaseService } from './supabase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ProjektnaNaloga';
  user = "None"
  constructor(private supabase: SupabaseService){

  }
  ngOnInit(): void {
    this.supabase.currentlyLoggedIn.subscribe(user => this.user= user)
  }

  signOut(){
    this.supabase.signOut().subscribe(response => {
      if(response.error === null){
        console.log("Logged out")
      }
    })
  }
}
