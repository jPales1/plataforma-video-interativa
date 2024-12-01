import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../video.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-video-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {
  video: any;
  userId: string | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private sanitizer: DomSanitizer,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    const videoId = this.route.snapshot.paramMap.get('id');
    if (videoId) {
      this.videoService.getVideo(Number(videoId)).subscribe(video => {
        this.video = video;
        this.incrementViews(videoId);
      });
    }

    this.auth.user$.subscribe(user => {
      this.userId = user?.sub;
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    const videoId = url.split('v=')[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  incrementViews(videoId: string): void {
    this.videoService.incrementViews(videoId).subscribe();
  }
}
