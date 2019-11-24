import { UserInput } from "./user-input";
import { ObjectType, Field, FieldResolver, Root } from "type-graphql";

@ObjectType({ description: "Default user" })
export class User {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  creationDate: number;
  @Field()
  description: string;
  /**
   * @chainable
   * @param userInput
   */
  fromInput(userInput: UserInput): User {
    this.email = userInput.email;
    this.description = userInput.description;
    this.username = userInput.username;
    return this;
  }
  /**
   * @chainable
   * @param date
   */
  setCreationDate(date: number) {
    this.creationDate = date;
    return this;
  }
}
