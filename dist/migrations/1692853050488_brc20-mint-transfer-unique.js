"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.dropIndex('brc20_transfers', ['inscription_id']);
    pgm.createIndex('brc20_transfers', ['inscription_id'], { unique: true });
    pgm.dropIndex('brc20_mints', ['inscription_id']);
    pgm.createIndex('brc20_mints', ['inscription_id'], { unique: true });
}
exports.up = up;
function down(pgm) {
    pgm.dropIndex('brc20_transfers', ['inscription_id'], { unique: true });
    pgm.createIndex('brc20_transfers', ['inscription_id']);
    pgm.dropIndex('brc20_mints', ['inscription_id'], { unique: true });
    pgm.createIndex('brc20_mints', ['inscription_id']);
}
exports.down = down;
//# sourceMappingURL=1692853050488_brc20-mint-transfer-unique.js.map