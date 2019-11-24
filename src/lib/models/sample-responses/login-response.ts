import { ObjectType, Field, FieldResolver, Root } from "type-graphql";

@ObjectType({ description: "Default user" })
export class LoginResponse {
  @Field()
  token: string;
  @Field()
  expiration: number;
}
