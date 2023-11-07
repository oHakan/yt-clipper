import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClipDTO {
  @Field()
  videoId: string;

  @Field()
  startTime: number;

  @Field()
  duration: number;
}
