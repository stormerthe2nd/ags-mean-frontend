// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { AboutComponent } from './about/about.component';
import { PostContainerComponent } from './dashboard/post-container/post-container.component';
import { SpecificPostComponent } from './dashboard/post-container/specific-post/specific-post.component';
import { NavComponent } from './nav/nav.component';
import { PostFormComponent } from './nav/post-form/post-form.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { ProductComponent } from './product/product.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ImgMagnifier } from 'ng-img-magnifier';
import { ViewMoreComponent } from './view-more/view-more.component';
import { GoogleSignInComponent } from './google-sign-in/google-sign-in.component';
import { environment } from 'src/environments/environment';
import { DevComponent } from './dev/dev.component';

const { clientId } = environment

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
    ProductComponent,
    SearchResultComponent,
    ViewMoreComponent,
    GoogleSignInComponent,
    DevComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ImgMagnifier,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              clientId
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
