"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.dropIndex('locations', ['block_hash']);
    pgm.dropIndex('locations', ['block_height']);
    pgm.createIndex('locations', [
        { name: 'block_height', sort: 'DESC' },
        { name: 'tx_index', sort: 'DESC' },
    ]);
}
exports.up = up;
function down(pgm) {
    pgm.dropIndex('locations', [
        { name: 'block_height', sort: 'DESC' },
        { name: 'tx_index', sort: 'DESC' },
    ]);
    pgm.createIndex('locations', ['block_hash']);
    pgm.createIndex('locations', ['block_height']);
}
exports.down = down;
//# sourceMappingURL=1705363472553_locations-block-height-indexes.js.map