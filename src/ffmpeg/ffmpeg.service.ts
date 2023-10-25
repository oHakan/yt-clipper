import { Injectable } from '@nestjs/common';
import * as chd from 'child_process';

@Injectable()
export class FfmpegService {
  async mergeAudioAndVideo(videoId: string) {
    return new Promise((resolve) => {
      const command = `ffmpeg -i ${videoId}.mp4 -i ${videoId}.mp3 -c:v copy -c:a aac ${videoId}_output.mp4`;
      const executed = chd.exec(command);

      executed.on('error', () => resolve(false));
      executed.on('close', () => resolve(true));
    });
  }

  async cropVideo(videoId: string, startTime: number, duration: number) {
    return new Promise((resolve) => {
      const command = `ffmpeg -ss ${startTime} -i ${videoId}_output.mp4 -to ${duration} -c:v libx264 -c:a aac -crf 18  ${videoId}_trim.mp4`;
      const executed = chd.exec(command);

      executed.on('error', () => resolve(false));
      executed.on('close', () => resolve(true));
    });
  }
}
