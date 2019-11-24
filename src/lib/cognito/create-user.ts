import * as AWS from "aws-sdk/global";

/**
 * @author Erik Rehn
 * @description Congito function which creates a new user
 * relies on the config object.
 */

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";
import poolData from "./config";

/**
 *
 * Function which creates the user in cognito. This should not
 * include any data about the user other than the bare minimum!
 *
 * @param user A user object which contains information about
 * the user which should be created.
 *
 * @param password The password to be used in the cognito. Har
 * uppcase requrirements and should be longer than 6.
 *
 * @returns promise which resolves the data provided by cognito.
 *
 */
export const createCognitoUser = async (username: string, password: string) => {
  // Template code to create a new user.
  const pool = new CognitoUserPool(poolData);

  await new Promise((res, rej) =>
    pool.signUp(username, password, [], null, (err, data) => {
      if (data) res(data);
      if (err) rej(err);
    })
  );
};
