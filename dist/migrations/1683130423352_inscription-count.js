"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createMaterializedView('inscription_count', { data: true }, `SELECT COUNT(*) AS count FROM inscriptions`);
    pgm.createIndex('inscription_count', ['count'], { unique: true });
}
exports.up = up;
//# sourceMappingURL=1683130423352_inscription-count.js.map