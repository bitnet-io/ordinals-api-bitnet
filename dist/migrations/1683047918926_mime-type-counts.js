"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createMaterializedView('mime_type_counts', { data: true }, `SELECT mime_type, COUNT(*) AS count FROM inscriptions GROUP BY mime_type`);
    pgm.createIndex('mime_type_counts', ['mime_type'], { unique: true });
}
exports.up = up;
//# sourceMappingURL=1683047918926_mime-type-counts.js.map