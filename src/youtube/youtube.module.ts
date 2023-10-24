import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeResolver } from './youtube.resolver';
import { FfmpegModule } from 'src/ffmpeg/ffmpeg.module';

@Module({
  imports: [FfmpegModule],
  providers: [YoutubeService, YoutubeResolver],
})
export class YoutubeModule {}
