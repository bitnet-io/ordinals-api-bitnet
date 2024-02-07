"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createMaterializedView('address_counts', { data: true }, `SELECT address, COUNT(*) AS count FROM current_locations GROUP BY address`);
    pgm.createIndex('address_counts', ['address'], { unique: true });
}
exports.up = up;
//# sourceMappingURL=1689264599745_address-counts.js.map