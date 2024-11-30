import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VideoService } from '../../video.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos: any[] = [];
  videosFiltrados: any[] = [];
  searchTerm: string = '';
  categoriaSelecionada: string = '';

  // Lista de categorias (exemplo)
  categorias: string[] = ['Tecnologia', 'Música'];

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.fetchVideos();
  }

  fetchVideos() {
    this.videoService.getVideos().subscribe(videos => {
      this.videos = videos;
      this.videosFiltrados = videos;
    });
  }

  filtrarVideos() {
    this.videosFiltrados = this.videos.filter(video => {
      const tituloMatch = video.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const categoriaMatch = this.categoriaSelecionada ? video.category === this.categoriaSelecionada : true;
      return tituloMatch && categoriaMatch;
    });
  }
}
