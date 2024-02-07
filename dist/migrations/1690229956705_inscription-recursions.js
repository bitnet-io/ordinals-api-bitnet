"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createTable('inscription_recursions', {
        id: {
            type: 'bigserial',
            primaryKey: true,
        },
        inscription_id: {
            type: 'bigint',
            notNull: true,
        },
        ref_inscription_id: {
            type: 'bigint',
            notNull: true,
        },
    });
    pgm.createConstraint('inscription_recursions', 'locations_inscription_id_fk', 'FOREIGN KEY(inscription_id) REFERENCES inscriptions(id) ON DELETE CASCADE');
    pgm.createConstraint('inscription_recursions', 'locations_ref_inscription_id_fk', 'FOREIGN KEY(ref_inscription_id) REFERENCES inscriptions(id) ON DELETE CASCADE');
    pgm.createConstraint('inscription_recursions', 'inscriptions_inscription_id_ref_inscription_id_unique', 'UNIQUE(inscription_id, ref_inscription_id)');
    pgm.createIndex('inscription_recursions', ['ref_inscription_id']);
    // Add columns to `inscriptions` table.
    pgm.addColumn('inscriptions', {
        recursive: {
            type: 'boolean',
            default: false,
        },
    });
    pgm.createIndex('inscriptions', ['recursive'], { where: 'recursive = TRUE' });
}
exports.up = up;
//# sourceMappingURL=1690229956705_inscription-recursions.js.map