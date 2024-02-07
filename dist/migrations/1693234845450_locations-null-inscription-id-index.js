"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createIndex('locations', ['inscription_id'], { where: 'inscription_id IS NULL' });
}
exports.up = up;
//# sourceMappingURL=1693234845450_locations-null-inscription-id-index.js.map