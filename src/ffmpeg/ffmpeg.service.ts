import { Injectable } from '@nestjs/common';
import * as chd from 'child_process';

@Injectable()
export class FfmpegService {
  async mergeAudioAndVideo(audioFile: string, videoFile: string) {
    return new Promise((resolve) => {
      const command = `ffmpeg -i ${videoFile} -i ${audioFile} -c:v copy -c:a aac ${
        audioFile.split('.')[0]
      }_output.mp4`;
      const executed = chd.exec(command);

      executed.on('error', () => resolve(false));
      executed.on('close', () => resolve(true));
    });
  }
}
