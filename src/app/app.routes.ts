import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { VideoDetailsComponent } from './videos/video-details/video-details.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'video/:id', component: VideoDetailsComponent },
  { path: '**', component: NotFoundComponent }  
];