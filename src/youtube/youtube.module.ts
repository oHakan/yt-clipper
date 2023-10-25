import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeResolver } from './youtube.resolver';
import { FfmpegModule } from 'src/ffmpeg/ffmpeg.module';
import { YoutubeController } from './youtube.controller';

@Module({
  imports: [FfmpegModule],
  providers: [YoutubeService, YoutubeResolver],
  controllers: [YoutubeController],
})
export class YoutubeModule {}
