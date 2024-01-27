import { Component } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
  content?: string
  title?: string

  constructor(private supabase: SupabaseService, private router: Router){}

  newPost(){
    if(this.title){
      this.supabase.newBlog(this.title, this.content).subscribe(response => {
        if(response.error === null){
          this.router.navigate(['blogs'])
        }
      })
    }
  }
}
