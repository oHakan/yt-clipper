import { Injectable } from '@nestjs/common';
import * as ytdl from 'ytdl-core';
import { IVideoDetails } from './youtube.interface';
import * as fs from 'fs';

@Injectable()
export class YoutubeService {
  async getVideoDetails(videoId: string): Promise<IVideoDetails> {
    try {
      const details = await ytdl.getInfo(videoId);

      return {
        name: details.videoDetails.title,
        author: details.videoDetails.author.user,
        thumbnailLink: details.videoDetails.thumbnails[0].url,
        totalViews: details.videoDetails.viewCount,
        durationInt: parseInt(details.videoDetails.lengthSeconds),
        duration: (parseFloat(details.videoDetails.lengthSeconds) / 60).toFixed(
          2,
        ),
      };
    } catch (error) {
      throw error;
    }
  }

  async downloadVideo(videoId: string): Promise<boolean> {
    return new Promise((resolve) => {
      const file = fs.createWriteStream(videoId + '.mp4');
      const pipe = ytdl(videoId, { quality: 'highestvideo' }).pipe(file);

      pipe.on('error', () => resolve(false));
      pipe.on('finish', () => resolve(true));
    });
  }

  async downloadAudio(videoId: string): Promise<boolean> {
    return new Promise((resolve) => {
      const file = fs.createWriteStream(videoId + '.mp3');
      const pipe = ytdl(videoId, { quality: 'highestaudio' }).pipe(file);

      pipe.on('error', () => resolve(false));
      pipe.on('finish', () => resolve(true));
    });
  }
}
