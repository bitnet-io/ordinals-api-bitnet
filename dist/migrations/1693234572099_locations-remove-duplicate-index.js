"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.dropIndex('locations', ['inscription_id'], { ifExists: true });
}
exports.up = up;
function down(pgm) {
    pgm.createIndex('locations', ['inscription_id'], { ifNotExists: true });
}
exports.down = down;
//# sourceMappingURL=1693234572099_locations-remove-duplicate-index.js.map