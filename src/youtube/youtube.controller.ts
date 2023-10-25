import { Controller, Get, Param } from '@nestjs/common';
import * as fs from 'fs';

@Controller('youtube')
export class YoutubeController {
  @Get('video/:id')
  async getVideoWithId(@Param('id') id: string) {
    return new Promise((resolve) => {
      const file = fs.createReadStream(id + '_trim.mp4', {
        encoding: 'base64',
      });
      let base64string = '';

      file.on('data', (data) => (base64string += data));
      file.on('end', () => {
        fs.unlinkSync(id + '.mp4');
        fs.unlinkSync(id + '.mp3');
        fs.unlinkSync(id + '_output.mp4');
        fs.unlinkSync(id + '_trim.mp4');
        resolve(base64string);
      });
    });
  }
}
