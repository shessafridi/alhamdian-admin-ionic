import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { getVideoId } from '../helpers/getYoutubeVideoId';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss'],
})
export class YoutubePlayerComponent implements OnInit {
  @Input() youtubeLink = '';
  embedLink: SafeResourceUrl | string | null = null;

  constructor(private _sanitizer: DomSanitizer) {}

  ngOnInit() {
    const videoId = getVideoId(this.youtubeLink);
    const url = `https://www.youtube.com/embed/${videoId}`;
    this.embedLink = this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
