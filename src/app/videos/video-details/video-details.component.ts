import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {
  video: any;

  // Dados de exemplo (substitua por dados reais de uma API ou serviço)
  videoData = [
    { 
      id: 1,
      title: 'Introdução ao Angular',
      description: 'Aprenda o básico do Angular.',
      url: 'assets/videos/introducao-angular.mp4',
      uploadDate: '01/11/2024',
      views: 1500
    },
    // Outros vídeos...
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const videoId = Number(this.route.snapshot.paramMap.get('id'));
    this.video = this.videoData.find(v => v.id === videoId);
  }
}
