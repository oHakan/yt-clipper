import { Module } from '@nestjs/common';
import { FfmpegModule } from 'src/ffmpeg/ffmpeg.module';
import { ClipperResolver } from './clipper.resolver';
import { YoutubeModule } from 'src/youtube/youtube.module';
@Module({
  imports: [FfmpegModule, YoutubeModule],
  providers: [ClipperResolver],
})
export class ClipperModule {}
