import { Args, Query, Resolver } from '@nestjs/graphql';
import { YoutubeService } from './youtube.service';
import { getVideoDetailsDTO } from './dto/get-video-details.dto';
import { BadRequestException } from '@nestjs/common';
import { IVideoDetails } from './youtube.interface';

@Resolver()
export class YoutubeResolver {
  constructor(private youtubeService: YoutubeService) {}

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
}
