import { Routes } from '@angular/router';
import { HomeComponent } from '../app/layout/home/home.component';
import { VideoDetailsComponent } from '../app/videos/video-details/video-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'video/:id', component: VideoDetailsComponent },
  { path: '**', redirectTo: '' } 
];