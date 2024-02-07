"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createMaterializedView('sat_rarity_counts', { data: true }, `
    SELECT sat_rarity, COUNT(*) AS count
    FROM inscriptions AS i
    GROUP BY sat_rarity
    `);
    pgm.createIndex('sat_rarity_counts', ['sat_rarity'], { unique: true });
}
exports.up = up;
//# sourceMappingURL=1683061444855_sat-rarity-counts.js.map