import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  blogId?: number;
  author?: string;
  title?: string;
  content?: string;
  images: string[] = [];

  currentlyLoggedIn?: string;

  constructor(
    private supabase: SupabaseService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.blogId = Number(this.route.snapshot.paramMap.get('id'));

    this.supabase.getBlog(this.blogId).subscribe((response) => {
      if (response.error === null) {
        this.title = response.data[0].title;
        this.content = response.data[0].content;
        this.author = response.data[0].author;
      }
    });

    this.supabase.getImages(this.blogId).subscribe((response) => {
      if (response) {
        console.log(response);
        this.images = response;
      }
    });
    this.supabase
      .currentAuthor()
      .subscribe((author) => (this.currentlyLoggedIn = author));
    this.supabase.currentlyLoggedIn.subscribe(
      (user) => (this.currentlyLoggedIn = user),
    );
  }

  delete() {
    if (this.blogId) {
      this.supabase.deleteblog(this.blogId).subscribe((response) => {
        console.log(response);
        this.router.navigate(['blogs']);
      });
    }
  }
}
