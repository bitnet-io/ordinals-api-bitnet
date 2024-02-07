"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.addColumn('locations', {
        block_transfer_index: {
            type: 'int',
        },
    });
    pgm.addIndex('locations', ['block_height', { name: 'block_transfer_index', sort: 'DESC' }]);
    pgm.addIndex('locations', ['block_hash', { name: 'block_transfer_index', sort: 'DESC' }]);
}
exports.up = up;
//# sourceMappingURL=1698897577725_locations-location-index.js.map