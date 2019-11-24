import { LoginResponse } from "./../models/sample-responses/login-response";
/**
 *
 * @author Erik Rehn
 * @description Logins in a user and returns the token and
 * the expiration date.
 */

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";

// Imports the config object
import poolData from "./config";

/**
 * Signs in a user and returns the token and
 * the expiration date of the token.
 *
 * @param username the username which is to be
 * used upon sign in.
 * @param password the password which is to be
 * used upon sign in.
 *
 * @returns the token and expiration which is the
 * time when the token becomes invalid.
 *
 */
const loginUser = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const Username = username;
  const Password = password;
  const authData = { Username, Password };
  const pool = new CognitoUserPool(poolData);
  const userData = { Username, Pool: pool };
  const authDetails = new AuthenticationDetails(authData);
  const cognitoUser = new CognitoUser(userData);

  const login = (resolve: any, reject: any) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: data => resolve(data),
      onFailure: err => reject(err)
    });
  };

  const res: any = await new Promise(login);
  const expiration = res.idToken.payload.exp;
  const token = res.idToken.jwtToken;

  return {
    token,
    expiration
  };
};

export { loginUser };
