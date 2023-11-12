import { Injectable } from '@nestjs/common';
import * as chd from 'child_process';
import * as fs from 'fs';

@Injectable()
export class FfmpegService {
  async checkFfmpeg() {
    return new Promise((resolve) => {
      const command = `ffmpeg -version`;
      const executed = chd.exec(command);

      executed.on('error', () => resolve(false));
      executed.on('close', () => resolve(true));
    });
  }

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

  async convertToBase64(videoId: string) {
    return new Promise((resolve) => {
      const file = fs.createReadStream(videoId + '_trim.mp4', {
        encoding: 'base64',
      });
      let base64string = '';

      file.on('data', (data) => (base64string += data));
      file.on('end', () => {
        fs.unlinkSync(videoId + '.mp4');
        fs.unlinkSync(videoId + '.mp3');
        fs.unlinkSync(videoId + '_output.mp4');
        fs.unlinkSync(videoId + '_trim.mp4');
        resolve(base64string);
      });
    });
  }
}
