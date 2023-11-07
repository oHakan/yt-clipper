import { Module } from '@nestjs/common';
import { FfmpegModule } from 'src/ffmpeg/ffmpeg.module';
import { ClipperResolver } from './clipper.resolver';
@Module({
  imports: [FfmpegModule, YoutubeModule],
  providers: [ClipperResolver],
})
export class YoutubeModule {}
