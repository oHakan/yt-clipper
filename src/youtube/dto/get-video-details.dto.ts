import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class getVideoDetailsDTO {
  @Field()
  videoId: string;
}
