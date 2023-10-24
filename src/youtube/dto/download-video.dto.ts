import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class downloadVideoDTO {
  @Field()
  videoId: string;
}
