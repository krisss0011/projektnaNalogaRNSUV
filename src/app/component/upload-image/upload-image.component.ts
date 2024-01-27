import { Component } from '@angular/core';
import { SupabaseService } from '../../supabase.service';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss'
})
export class UploadImageComponent {
  constructor(private supabase: SupabaseService){}

  upload(){
    const fileUpload = document.getElementById('fileupload') as HTMLInputElement
    const files = fileUpload.files
    if(files === null){
      return
    }

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.supabase.uploadImage(element).subscribe(res => {
        console.log(res)
      })
    }    
  }
}
