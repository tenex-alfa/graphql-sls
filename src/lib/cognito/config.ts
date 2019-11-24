/**
 * @author Erik Rehn
 * @description this is a config object for cognito
 *
 */

export const cognitoConfig = {
  UserPoolId: process.env.userpoolid,
  ClientId: process.env.clientid
};
export default cognitoConfig;
