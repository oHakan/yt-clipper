import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { YoutubeModule } from './youtube/youtube.module';
import { FfmpegModule } from './ffmpeg/ffmpeg.module';
import { ClipperModule } from './clipper/clipper.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    YoutubeModule,
    FfmpegModule,
    ClipperModule,
  ],
  providers: [AppResolver, AppService],
})
export class AppModule {}
