import { Routes } from '@angular/router';
import { BlogListsComponent } from './component/blog-lists/blog-lists.component';
import { BlogComponent } from './component/blog/blog.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { NewPostComponent } from './component/new-post/new-post.component';
import { UploadImageComponent } from './component/upload-image/upload-image.component';

export const routes: Routes = [
  { path: 'blog/:id', component: BlogComponent },
  { path: 'blogs', component: BlogListsComponent },
  { path: 'upload/:id', component: UploadImageComponent },
  { path: 'new-post', component: NewPostComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: '**', component: BlogListsComponent },
];
