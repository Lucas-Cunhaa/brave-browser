// This Source Code Form is subject to the terms of the Mozilla Public 
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

/**
 * @class LRUCacheConfig
 * @description 
 * Implements a Least Recently Used (LRU) cache mechanism using JavaScript's `Map`.
 * The cache automatically removes the oldest (least recently used) item
 * when the limit is reached.
 *
 * Example:
 * ```js
 * const cache = new LRUCacheConfig(3);
 * cache.set('a', 1);
 * cache.set('b', 2);
 * cache.set('c', 3);
 * cache.get('a'); // refreshes 'a'
 * cache.set('d', 4); // removes 'b' (oldest)
 * ```
 */
class LRUCacheConfig {
    /** @private @constant {number} Default cache limit */
    #DEFAULT_LIMIT = 1000;

   /**
   * @constructor
   * @param {number} [limit=1000] - Maximum number of items the cache can hold.
   */
    constructor(limit = this.#DEFAULT_LIMIT) {
        this.cache = new Map()
        this.limit = limit
    }

   /**
   * Retrieves a value from the cache.
   * If the key exists, it is marked as most recently used.
   *
   * @param {any} key - The key to retrieve.
   * @returns {any|null} The cached value, or `null` if not found.
   */
    get(key) {
        if(!this.cache.has(key)) return null
        const value = this.cache.get(key)
       
        this.cache.delete(key)
        this.cache.set(key, value)

        return value
    }

   /**
   * Inserts or updates a value in the cache.
   * If the cache is full, the least recently used (oldest) item is removed.
   *
   * @param {any} key - The key to store.
   * @param {any} value - The value to store.
   */
    set(key, value) {
        if (this.cache.size >= this.limit) {
            const oldestKey = this.cache.keys().next().value
            this.cache.delete(oldestKey)
        }

        this.cache.set(key, value)
    }

   /**
   * Checks whether a key exists in the cache.
   *
   * @param {any} key - The key to check.
   * @returns {boolean} True if the key exists, false otherwise.
   */
    hasKey(key) {
        return this.cache.has(key)
    }

   /**
   * Returns the cache size limit.
   *
   * @returns {number} The maximum number of entries allowed in the cache.
   */
    getLimit() {
        return this.limit
    }
}

module.exports = LRUCacheConfig;