import { cacheUtils } from "./cache";
import { toDynamoObject } from "@tenex/dynamoose-object";
import * as AWS from "aws-sdk";
import { createDataLoader } from "@lifeomic/dynamodb-dataloader";

const tableName = process.env.db;

const table = new AWS.DynamoDB();
const loader = createDataLoader({ client: table });

/**
 * Class which handles all get and put
 * requests.
 */
class DB {
  // Get the current table name.
  // Will be read in from the .env
  // varibles
  private tableName: string;

  // Simple constructor to set tablename
  constructor(tableName: string) {
    this.tableName = tableName;
  }

  /**
   * return the object which has the key _id
   * in the dynamoDB table associated with the
   * tablename.
   * @param _id the primary key which the object
   *            uses in the DynamoDB.
   *
   * @return the object which lays in the DynamoDB table.
   */
  async get(_id: string): Promise<any> {
    // Checks if the cache util has seen the value before.
    // if it has return cached value instead of previouse value.
    if (await cacheUtils.get(_id)) return cacheUtils.get(_id);

    // Uses a dataloader to load a single
    // get item into the loader.
    const data = await loader.load({
      table: this.tableName,
      key: { _id: { S: _id } }
    });

    // Parses response data from strange dynamoDB format
    // to more JS friendly object.
    const parsed = parse(data);

    console.log(parsed);

    // Set a new cache entry and return the object.
    return cacheUtils.setObject(parsed);
  }

  async put(id: string, body: object) {
    // Sets the object into the cache. As we know that we
    // are going to upload we can cache the object before
    // uploading the item.
    const object: any = cacheUtils.setObject({ _id: id, ...body });

    // Creates a DynamoDB object which has a
    // save attribute which uploads a object.
    const dobj = toDynamoObject(this.tableName, object);

    // Here we save the created object
    await dobj.save();

    // a status of 200
    return {
      status: 200
    };
  }
}

/**
 * Helper function which converts
 * from dynamo object into js-object.
 *
 * @param object DynamoDB object
 */
function parse(object: any) {
  // Creates ouput object
  let out: any = {};

  // Loops threw all the objects keys
  for (const key in object) {
    // If key is S meaning in DynamoDB that
    // it is string set key to the value of
    // string.
    if (key == "S") out = object[key];

    // If key is N meaning in DynamoDB that
    // it is number set key to the value of
    // the string.
    if (key == "N") out = parseInt(object[key]);

    // Does the same for the childer of the object.
    if (object[key]?.S) out[key] = object[key].S;
    if (object[key]?.N) out[key] = parseInt(object[key].N);

    // If the value is of type L or M meaning list or map.
    // call funciton recursivly to get value
    if (object[key]?.L) out[key] = object[key].L.map(parse);
    if (object[key]?.M) out[key] = object[key].M.map(parse);
  }
  return out;
}
export const DBHandler = new DB(tableName);
