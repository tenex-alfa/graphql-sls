import { ObjectType, Field, FieldResolver, Root } from "type-graphql";

@ObjectType({ description: "Default user" })
export class CreateUserResponse {
  @Field()
  message: string;
  @Field()
  status: number;
}
