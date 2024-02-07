"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiMetrics = void 0;
const prom = require("prom-client");
class ApiMetrics {
    constructor(db) {
        this.ordinals_api_block_height = new prom.Gauge({
            name: `ordinals_api_block_height`,
            help: 'The most recent Bitcoin block height ingested by the API',
            async collect() {
                const height = await db.getChainTipBlockHeight();
                this.set(height);
            },
        });
        this.ordinals_api_max_inscription_number = new prom.Gauge({
            name: `ordinals_api_max_inscription_number`,
            help: 'Maximum blessed inscription number',
            async collect() {
                const max = await db.getMaxInscriptionNumber();
                if (max)
                    this.set(max);
            },
        });
        this.ordinals_api_max_cursed_inscription_number = new prom.Gauge({
            name: `ordinals_api_max_cursed_inscription_number`,
            help: 'Maximum cursed inscription number',
            async collect() {
                const max = await db.getMaxCursedInscriptionNumber();
                if (max)
                    this.set(max);
            },
        });
    }
    static configure(db) {
        return new ApiMetrics(db);
    }
}
exports.ApiMetrics = ApiMetrics;
//# sourceMappingURL=metrics.js.map