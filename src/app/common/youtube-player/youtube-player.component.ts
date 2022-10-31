import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    const videoId = this.getVideoId(this.youtubeLink);
    const url = `https://www.youtube.com/embed/${videoId}`;
    this.embedLink = this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getVideoId(url: string) {
    if (!url) return null;
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  }
}
