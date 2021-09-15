// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { AboutComponent } from './about/about.component';
import { PostContainerComponent } from './dashboard/post-container/post-container.component';
import { SpecificPostComponent } from './dashboard/post-container/specific-post/specific-post.component';
import { NavComponent } from './nav/nav.component';
import { PostFormComponent } from './nav/post-form/post-form.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AboutComponent,
    PostContainerComponent,
    SpecificPostComponent,
    NavComponent,
    PostFormComponent,
    ScrollToTopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
