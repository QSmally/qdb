
const CacheStrategy = require("../../Structures/CacheStrategy");

class RestrictedCacheStrategy extends CacheStrategy {

    /**
     * @typedef {Object} RestrictedStrategyProperties
     * @property {Number} [maxSize] A maximum size for the cache of the Connection.
     * @property {EvictionPolicy} [evictionAlgorithm] An eviction mode for this cache.
     */

    /**
     * Initialises the caching strategy.
     * @param {RestrictedStrategyProperties} properties
     */
    constructor({ maxSize, evictionAlgorithm }) {
        super();

        /**
         * A maximum size for the cache of the Connection.
         * @name RestrictedCacheStrategy#maxSize
         * @type {Number}
         * @readonly
         */
        this.maxSize = maxSize;

        /**
         * An eviction mode for this cache.
         * @name RestrictedCacheStrategy#evictionAlgorithm
         * @type {EvictionPolicy}
         * @readonly
         */
        this.evictionAlgorithm = evictionAlgorithm;
    }

    /**
     * Applies the eviction mode to the passing elements of the cache, calls the
     * default method if it passes.
     * @param {String} keyContext As address to memory map this data model to.
     * @param {DataModel} document The value to set in the cache, as a parsed memory model.
     */
    patch(keyContext, document) {
        if (this.maxSize !== Infinity &&
            this.memoryStore.size >= this.maxSize &&
            !this.memoryStore.has(keyContext) &&
            !this.evictionAlgorithm(this.memoryStore)) return;
        super.patch(keyContext, document);
    }
}

module.exports = RestrictedCacheStrategy;
