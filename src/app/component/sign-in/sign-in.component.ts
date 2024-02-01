import { Component } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  constructor(private supabase: SupabaseService) {}
  email?: string;
  password?: string;

  signIn() {
    if (this.email && this.password) {
      this.supabase
        .signIn(this.email, this.password)
        .subscribe((response) => {});
    } else {
      if (this.email) {
        this.supabase
          .signInPasswordless(this.email)
          .subscribe((response) => {});
      }
    }
  }
}
