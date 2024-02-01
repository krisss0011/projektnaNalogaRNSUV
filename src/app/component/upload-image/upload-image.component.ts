import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss',
})
export class UploadImageComponent implements OnInit {
  blogId?: number;

  constructor(
    private supabase: SupabaseService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.blogId = Number(this.route.snapshot.paramMap.get('id'));
  }

  upload() {
    if (this.blogId) {
      const fileUpload = document.getElementById(
        'fileupload',
      ) as HTMLInputElement;
      const files = fileUpload.files;
      if (files === null) {
        return;
      }

      const imageSubscriptions = [];

      for (let index = 0; index < files.length; index++) {
        const element = files[index];
        imageSubscriptions.push(
          this.supabase.uploadImage(this.blogId, element),
        );
      }

      forkJoin(imageSubscriptions).subscribe((res) => {
        this.router.navigate(['blog', this.blogId]);
      });
    }
  }
}
