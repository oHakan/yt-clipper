import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeResolver } from './youtube.resolver';

@Module({
  imports: [],
  providers: [YoutubeService, YoutubeResolver],
  exports: [YoutubeService],
})
export class YoutubeModule {}
