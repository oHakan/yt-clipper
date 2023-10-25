import { Args, Query, Resolver } from '@nestjs/graphql';
import { YoutubeService } from './youtube.service';
import { getVideoDetailsDTO } from './dto/get-video-details.dto';
import { BadRequestException } from '@nestjs/common';
import { IVideoDetails } from './youtube.interface';
import { downloadVideoDTO } from './dto/download-video.dto';
import { FfmpegService } from 'src/ffmpeg/ffmpeg.service';

@Resolver()
export class YoutubeResolver {
  constructor(
    private youtubeService: YoutubeService,
    private ffmpegService: FfmpegService,
  ) {}

  @Query(() => IVideoDetails)
  async getVideoDetails(
    @Args('getVideoDetailsDto') getVideoDetailsDto: getVideoDetailsDTO,
  ) {
    try {
      const result = await this.youtubeService.getVideoDetails(
        getVideoDetailsDto.videoId,
      );

      if (!result) {
        throw new BadRequestException('Video Not Found');
      }

      return result;
    } catch (error) {
      return error;
    }
  }

  @Query(() => Boolean)
  async downloadVideo(
    @Args('downloadVideoDto') downloadVideoDto: downloadVideoDTO,
  ) {
    try {
      const video = await this.youtubeService.downloadVideo(
        downloadVideoDto.videoId,
      );

      if (!video) {
        throw new BadRequestException('Video Download Error!');
      }

      const audio = await this.youtubeService.downloadAudio(
        downloadVideoDto.videoId,
      );

      if (!audio) {
        throw new BadRequestException('Video Sound Download Error!');
      }

      const mergedVideo = await this.ffmpegService.mergeAudioAndVideo(
        downloadVideoDto.videoId,
      );

      if (!mergedVideo) {
        throw new BadRequestException('Video Merge Error!');
      }

      const trimVideo = await this.ffmpegService.cropVideo(
        downloadVideoDto.videoId,
        downloadVideoDto.startTime,
        downloadVideoDto.duration,
      );

      if (!trimVideo) {
        throw new BadRequestException('Video Trim Error!');
      }

      return true;
    } catch (error) {
      return error;
    }
  }
}
