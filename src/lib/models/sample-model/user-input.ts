/**
 *
 * @author Erik Rehn
 * @description File which handles the creation of
 * user input.
 */

import { InputType, Field } from "type-graphql";

/**
 * Sample class which is the input which can create a user.
 * based on the type-graphql library. This is part of the
 * helper function by Tenex.
 */
@InputType({ description: "The required input to create a single user." })
export class UserInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  description: string;
  @Field()
  password: string;
}
