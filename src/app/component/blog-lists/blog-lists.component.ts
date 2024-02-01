import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-lists',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blog-lists.component.html',
  styleUrl: './blog-lists.component.scss',
})
export class BlogListsComponent implements OnInit {
  blogs: Array<{ id: number; title: string; content: string }> = [];

  constructor(private supabase: SupabaseService) {}

  ngOnInit(): void {
    this.supabase.allBlogs().subscribe((response) => {
      if (response.error === null) {
        this.blogs = response.data;
      }
    });
  }
}
