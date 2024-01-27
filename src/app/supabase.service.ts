import { EventEmitter, Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { Observable, filter, from, map, mergeMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  currentlyLoggedIn = new EventEmitter<string>()
  supabaseUrl = 'https://lfuiqodawbdhksxzjkuf.supabase.co'
  supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmdWlxb2Rhd2JkaGtzeHpqa3VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQxMTU4OTIsImV4cCI6MjAxOTY5MTg5Mn0.qET7tr-HOq-1znmx2QcVvSuNJYM-pjurEL8j7vGbBeU`
  supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey)
    this.currentUser()
  }

  currentUser(){
    this.supabase.auth.getUser().then(userResponse =>{
      console.log(userResponse)
      if(userResponse.error===null){
        this.currentlyLoggedIn.emit(userResponse.data.user.email)
      }
      else {
        this.currentlyLoggedIn.emit("None")
      }
    })
  }

  currentAuthor(){
    return from(this.supabase.auth.getUser()).pipe(
      filter(userResponse => userResponse.error === null),
      filter(userResponse => userResponse.data.user != null),
      map(userResponse => userResponse.data.user?.email))
  }

  allBlogs() {
    return from(this.supabase.from('Blog').select())
  }

  getBlog(blogId: number) {
    return from(this.supabase.from('Blog').select().eq('id', blogId))
  }

  getImages(blogId: number){
    return from(this.supabase.from('blog_image').select('Blog(*), image(*)').eq('id', blogId))
  }

  private deleteCorrectBlog(blogId: number, author: string){
    return from(this.supabase.from('Blog').delete().eq('id', blogId).eq('author', author))
  }
  deleteblog(blogId: number){
    return this.currentAuthor().pipe(mergeMap(author => this.deleteCorrectBlog(blogId, author!)))
  }

  signUp(email: string, password: string){
    return this.supabase.auth.signUp({
      email,
      password
    })
  }

  signIn(email: string, password: string){
    console.log("Sign in with", email, password)
    return from(this.supabase.auth.signInWithPassword({
      email,
      password
    })).pipe(tap(response => {
      console.log("Sign in with password")
      if(response.error === null){
        this.currentUser()
      }
    }))
  }

  signInPasswordless(email: string){
    return from(this.supabase.auth.signInWithOtp({
      email
    })).pipe(tap(response => {
      if(response.error === null){
        this.currentUser()
      }
    }))
  }

  signOut(){
    return from(this.supabase.auth.signOut()).pipe(tap(response => {
      if(response.error === null){
        this.currentUser()
      }
    }))
  }

  private postBlog(title: string, author: string, content?: string,){
    return from(this.supabase.from('Blog').insert({
      title,
      content,
      author
    }))
  }

  newBlog(title: string, content?: string){
    return this.currentAuthor().pipe(mergeMap(author => this.postBlog(title, author!, content))) 
  }

  uploadImage(file: File){
    return from(this.supabase.storage.from('images').upload(file.name, file))
  }
}
