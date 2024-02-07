"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.dropConstraint('genesis_locations', 'genesis_locations_inscription_id_unique');
    pgm.createConstraint('genesis_locations', 'genesis_locations_inscription_id_pk', {
        primaryKey: 'inscription_id',
    });
    pgm.createConstraint('genesis_locations', 'genesis_locations_inscription_id_fk', 'FOREIGN KEY(inscription_id) REFERENCES inscriptions(id) ON DELETE CASCADE');
    pgm.createConstraint('genesis_locations', 'genesis_locations_location_id_fk', 'FOREIGN KEY(location_id) REFERENCES locations(id) ON DELETE CASCADE');
    pgm.dropConstraint('current_locations', 'current_locations_inscription_id_unique');
    pgm.createConstraint('current_locations', 'current_locations_inscription_id_pk', {
        primaryKey: 'inscription_id',
    });
    pgm.createConstraint('current_locations', 'current_locations_inscription_id_fk', 'FOREIGN KEY(inscription_id) REFERENCES inscriptions(id) ON DELETE CASCADE');
    pgm.createConstraint('current_locations', 'current_locations_location_id_fk', 'FOREIGN KEY(location_id) REFERENCES locations(id) ON DELETE CASCADE');
}
exports.up = up;
function down(pgm) {
    pgm.dropConstraint('genesis_locations', 'genesis_locations_inscription_id_pk');
    pgm.dropConstraint('genesis_locations', 'genesis_locations_inscription_id_fk');
    pgm.dropConstraint('genesis_locations', 'genesis_locations_location_id_fk');
    pgm.createConstraint('genesis_locations', 'genesis_locations_inscription_id_unique', 'UNIQUE(inscription_id)');
    pgm.dropConstraint('current_locations', 'current_locations_inscription_id_pk');
    pgm.dropConstraint('current_locations', 'current_locations_inscription_id_fk');
    pgm.dropConstraint('current_locations', 'current_locations_location_id_fk');
    pgm.createConstraint('current_locations', 'current_locations_inscription_id_unique', 'UNIQUE(inscription_id)');
}
exports.down = down;
//# sourceMappingURL=1690832271103_location-pointer-constraints.js.map