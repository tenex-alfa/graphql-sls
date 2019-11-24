/**
 *
 * @author Erik Rehn
 * @description Class which caches DynamoDB Requests
 * and makes sure that no duplicated requests are made
 * to the same ID.
 *
 * Based on a simple Map which keeps track on all the
 * request that have been made to a single ID. If the
 * request is currently being resolved it awaits the
 * request before sending a response back.
 *
 */
class Cache {
  // Initilaizes an empty Map which is to
  // contain all the entries.
  private hash = new Map<String, any>();

  /**
   * Sets the key of the request to assciate
   * with the request.
   *
   * @param key key of the request
   * @param object object of the request response
   * @return the current object inputted.
   */
  set(key: string, object: any) {
    return this.hash.set(key, object);
  }

  /**
   * Sets based on object. This object need to
   * include the default key _id for this function
   * to work.
   *
   * @param object which need to include _key for
   * this cache to work.
   * @return the current object inputted.
   */
  setObject(object: any) {
    // retrives the key from the object
    const key = object._id;

    // If no key exist in object throw exception
    if (!key)
      throw new Error(
        "Cache Error. Cant use set object without key _id in object."
      );

    // Set the hash set to use the key
    this.hash.set(key, object);

    // return inputted object.
    return object;
  }

  /**
   * Returns the cache associated with the key.
   * If the key is being resolved it await the
   * value.
   *
   * @param key Key of value which is to be retrived
   * @return the value
   */
  async get(key: string) {
    // If value is being resolved await for
    // the current value.
    if (this.hash.get(key) instanceof Promise) {
      return await this.hash.get(key);
    }

    // Return value asscoiated with key.
    return this.hash.get(key);
  }

  /**
   * Clears the current cache. All entries will be removed
   */
  clear() {
    this.hash.clear();
  }
}

export const cacheUtils = new Cache();
