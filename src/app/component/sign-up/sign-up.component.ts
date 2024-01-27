import { Component } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  email?: string
  password?: string

  constructor (private supabase: SupabaseService, private router: Router){}

  signUp(){
    if(this.email != undefined && this.password != undefined){
      console.log(this.email, this.password)
      this.supabase.signUp(this.email, this.password).then(response =>{
        if(response.error === null){
          this.router.navigate(["blogs"])
        }
      })
    }
  }
}
