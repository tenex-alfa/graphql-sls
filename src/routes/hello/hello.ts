import { env } from "../../lib/get-env";

const f = async function(event: any) {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `🎉Healthchesck!🎉 env = ${env}`
      },
      null,
      2
    )
  };
};

export default f;
