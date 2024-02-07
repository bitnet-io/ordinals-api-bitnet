"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createTable('counts_by_recursive', {
        recursive: {
            type: 'boolean',
            notNull: true,
            primaryKey: true,
        },
        count: {
            type: 'bigint',
            notNull: true,
            default: 1,
        },
    });
    pgm.sql(`
    INSERT INTO counts_by_recursive (recursive, count)
    (SELECT recursive, COUNT(*) AS count FROM inscriptions GROUP BY recursive)
  `);
}
exports.up = up;
function down(pgm) {
    pgm.dropTable('counts_by_recursive');
}
exports.down = down;
//# sourceMappingURL=1695655140203_counts-by-recursive.js.map