import { Args, Query, Resolver } from '@nestjs/graphql';
import { FfmpegService } from 'src/ffmpeg/ffmpeg.service';
import { YoutubeService } from 'src/youtube/youtube.service';
import { CreateClipDTO } from './dto/create-clip.dto';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class ClipperResolver {
  constructor(
    private youtubeService: YoutubeService,
    private ffmpegService: FfmpegService,
  ) {}

  @Query(() => String)
  async CreateClip(@Args('CreateClipDTO') createClipDto: CreateClipDTO) {
    try {
      const ffmpegCheck = await this.ffmpegService.checkFfmpeg();

      if (!ffmpegCheck) {
        throw new BadRequestException(
          'Ffmpeg error! Please contact with system developer',
        );
      }

      const videoDetails = await this.youtubeService.getVideoDetails(
        createClipDto.videoId,
      );

      if (videoDetails.durationInt > 600) {
        throw new BadRequestException('Video is longer than 10 minutes!');
      }

      const video = await this.youtubeService.downloadVideo(
        createClipDto.videoId,
      );

      if (!video) {
        throw new BadRequestException('Video Download Error!');
      }

      const audio = await this.youtubeService.downloadAudio(
        createClipDto.videoId,
      );

      if (!audio) {
        throw new BadRequestException('Video Sound Download Error!');
      }

      const mergedVideo = await this.ffmpegService.mergeAudioAndVideo(
        createClipDto.videoId,
      );

      if (!mergedVideo) {
        throw new BadRequestException('Video Merge Error!');
      }

      const trimVideo = await this.ffmpegService.cropVideo(
        createClipDto.videoId,
        createClipDto.startTime,
        createClipDto.duration,
      );

      if (!trimVideo) {
        throw new BadRequestException('Video Trim Error!');
      }

      const videoBase64 = await this.ffmpegService.convertToBase64(
        createClipDto.videoId,
      );

      return videoBase64;
    } catch (error) {
      return error;
    }
  }
}
