import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IVideoDetails {
  @Field()
  name: string;
  @Field()
  thumbnailLink: string;
  @Field()
  totalViews: string;
  @Field()
  author: string;
  @Field()
  duration: string;
}
