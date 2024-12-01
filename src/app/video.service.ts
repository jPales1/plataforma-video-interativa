import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/videos`);
  }

  getVideo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/videos/${id}`);
  }

  addVideo(video: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/videos`, video);
  }

  updateVideo(video: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/videos/${video.id}`, video);
  }

  deleteVideo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/videos/${id}`);
  }

  incrementViews(videoId: string): Observable<any> {
    return this.getVideo(Number(videoId)).pipe(
      switchMap(video => {
        const updatedViews = video.views + 1;
        return this.http.patch(`${this.apiUrl}/videos/${videoId}`, { views: updatedViews });
      })
    );
  }
}
