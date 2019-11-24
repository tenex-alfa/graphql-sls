import { LoginResponse } from "./../sample-responses/login-response";
import { CreateUserResponse } from "../sample-responses/create-user-response";
import { createCognitoUser } from "./../../cognito/create-user";
import { UserInput } from "./user-input";
import { putUserToDB } from "./../../db/db-put";
import { getUserFromDB } from "./../../db/db-get";
import { User } from "./user-type";
import { Resolver, Query, Arg, FieldResolver, Mutation } from "type-graphql";
import { loginUser } from "../../cognito/login-user";

/**
 * User resolver all the other users resolvers should
 * extends this resolver to ensure that they include all
 * the required fields.
 *
 */
@Resolver(() => User)
export class UserResolver {
  /**
   * Logins in a user with cognito.
   *
   * @param username username of the user which is
   * @param password
   */
  @Query(() => User)
  async getUser(@Arg("email") email: string): Promise<User> {
    console.log("Retriving user from db...");
    return getUserFromDB(email);
  }

  /**
   * Logins in a user with cognito.
   *
   * @param email email of the user which is
   * @param password
   */
  @Query(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<LoginResponse> {
    return await loginUser(email, password);
  }

  @Mutation(() => CreateUserResponse)
  async createUser(
    @Arg("input") userInput: UserInput
  ): Promise<CreateUserResponse> {
    const { email, password } = userInput;
    const token = await createCognitoUser(email, password);
    const user = new User().fromInput(userInput).setCreationDate(Date.now());
    await putUserToDB(email, user);
    return {
      message: `A user has been created, ${user.email}`,
      status: 200
    };
  }
}
