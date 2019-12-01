import { DynamoDB } from "aws-sdk";
const DocClient = new DynamoDB.DocumentClient();

export class DBObject {
  private buildDBFriendlyObject: any;
  private tableName: any;

  constructor(object: any, tableName: string) {
    this.buildDBFriendlyObject = object;
    this.tableName = tableName;
  }

  save() {
    const params = {
      TableName: this.tableName,
      Item: this.buildDBFriendlyObject
    };

    return DocClient.put(params).promise();
  }
}

function toDBName(value: any): any {
  const type = value.constructor.name;

  switch (type) {
    case "String":
      return "S";
    case "Number":
      return "N";
    case "Boolean":
      return "B";
    case "Object":
      return "M";
    case "Array":
      return "L";
  }
}

export const toDb = (object: any) => {};
