"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountsPgStore = void 0;
const api_toolkit_1 = require("@hirosystems/api-toolkit");
const types_1 = require("../types");
const types_2 = require("./types");
/**
 * This class affects all the different tables that track inscription counts according to different
 * parameters (sat rarity, mime type, cursed, blessed, current owner, etc.)
 */
class CountsPgStore extends api_toolkit_1.BasePgStoreModule {
    async fromResults(countType, filters) {
        switch (countType) {
            case types_2.DbInscriptionIndexResultCountType.all:
                return await this.getInscriptionCount();
            case types_2.DbInscriptionIndexResultCountType.cursed:
                return await this.getInscriptionCount(filters?.cursed === true ? types_1.DbInscriptionType.cursed : types_1.DbInscriptionType.blessed);
            case types_2.DbInscriptionIndexResultCountType.mimeType:
                return await this.getMimeTypeCount(filters?.mime_type);
            case types_2.DbInscriptionIndexResultCountType.satRarity:
                return await this.getSatRarityCount(filters?.sat_rarity);
            case types_2.DbInscriptionIndexResultCountType.address:
                return await this.getAddressCount(filters?.address);
            case types_2.DbInscriptionIndexResultCountType.recursive:
                return await this.getRecursiveCount(filters?.recursive);
            case types_2.DbInscriptionIndexResultCountType.genesisAddress:
                return await this.getGenesisAddressCount(filters?.genesis_address);
            case types_2.DbInscriptionIndexResultCountType.blockHeight:
                return await this.getBlockCount(filters?.genesis_block_height, filters?.genesis_block_height);
            case types_2.DbInscriptionIndexResultCountType.fromblockHeight:
                return await this.getBlockCount(filters?.from_genesis_block_height);
            case types_2.DbInscriptionIndexResultCountType.toblockHeight:
                return await this.getBlockCount(undefined, filters?.to_genesis_block_height);
            case types_2.DbInscriptionIndexResultCountType.blockHeightRange:
                return await this.getBlockCount(filters?.from_genesis_block_height, filters?.to_genesis_block_height);
            case types_2.DbInscriptionIndexResultCountType.blockHash:
                return await this.getBlockHashCount(filters?.genesis_block_hash);
        }
    }
    async applyInscriptions(writes) {
        if (writes.length === 0)
            return;
        const mimeType = new Map();
        const rarity = new Map();
        const recursion = new Map();
        const typeMap = new Map();
        for (const i of writes) {
            mimeType.set(i.mime_type, (mimeType.get(i.mime_type) ?? 0) + 1);
            rarity.set(i.sat_rarity, (rarity.get(i.sat_rarity) ?? 0) + 1);
            recursion.set(i.recursive, (recursion.get(i.recursive) ?? 0) + 1);
            const inscrType = i.number < 0 ? 'cursed' : 'blessed';
            typeMap.set(inscrType, (typeMap.get(inscrType) ?? 0) + 1);
        }
        const mimeTypeInsert = Array.from(mimeType.entries()).map(k => ({
            mime_type: k[0],
            count: k[1],
        }));
        const rarityInsert = Array.from(rarity.entries()).map(k => ({
            sat_rarity: k[0],
            count: k[1],
        }));
        const recursionInsert = Array.from(recursion.entries()).map(k => ({
            recursive: k[0],
            count: k[1],
        }));
        const typeInsert = Array.from(typeMap.entries()).map(k => ({
            type: k[0],
            count: k[1],
        }));
        // `counts_by_address` and `counts_by_genesis_address` count increases are handled in
        // `applyLocations`.
        await this.sql `
      WITH increase_mime_type AS (
        INSERT INTO counts_by_mime_type ${this.sql(mimeTypeInsert)}
        ON CONFLICT (mime_type) DO UPDATE SET count = counts_by_mime_type.count + EXCLUDED.count
      ),
      increase_rarity AS (
        INSERT INTO counts_by_sat_rarity ${this.sql(rarityInsert)}
        ON CONFLICT (sat_rarity) DO UPDATE SET count = counts_by_sat_rarity.count + EXCLUDED.count
      ),
      increase_recursive AS (
        INSERT INTO counts_by_recursive ${this.sql(recursionInsert)}
        ON CONFLICT (recursive) DO UPDATE SET count = counts_by_recursive.count + EXCLUDED.count
      )
      INSERT INTO counts_by_type ${this.sql(typeInsert)}
      ON CONFLICT (type) DO UPDATE SET count = counts_by_type.count + EXCLUDED.count
    `;
    }
    async rollBackInscription(args) {
        await this.sql `
      WITH decrease_mime_type AS (
        UPDATE counts_by_mime_type SET count = count - 1
        WHERE mime_type = ${args.inscription.mime_type}
      ),
      decrease_rarity AS (
        UPDATE counts_by_sat_rarity SET count = count - 1
        WHERE sat_rarity = ${args.inscription.sat_rarity}
      ),
      decrease_recursive AS (
        UPDATE counts_by_recursive SET count = count - 1
        WHERE recursive = ${args.inscription.recursive}
      ),
      decrease_type AS (
        UPDATE counts_by_type SET count = count - 1 WHERE type = ${args.inscription.number < 0 ? types_1.DbInscriptionType.cursed : types_1.DbInscriptionType.blessed}
      ),
      decrease_genesis AS (
        UPDATE counts_by_genesis_address SET count = count - 1
        WHERE address = ${args.location.address}
      )
      UPDATE counts_by_address SET count = count - 1 WHERE address = ${args.location.address}
    `;
    }
    async applyLocations(writes, genesis = true) {
        if (writes.length === 0)
            return;
        await this.sqlWriteTransaction(async (sql) => {
            const table = genesis ? sql `counts_by_genesis_address` : sql `counts_by_address`;
            const oldAddr = new Map();
            const newAddr = new Map();
            for (const i of writes) {
                if (i.old_address)
                    oldAddr.set(i.old_address, (oldAddr.get(i.old_address) ?? 0) + 1);
                if (i.new_address)
                    newAddr.set(i.new_address, (newAddr.get(i.new_address) ?? 0) + 1);
            }
            const oldAddrInsert = Array.from(oldAddr.entries()).map(k => ({
                address: k[0],
                count: k[1],
            }));
            const newAddrInsert = Array.from(newAddr.entries()).map(k => ({
                address: k[0],
                count: k[1],
            }));
            if (oldAddrInsert.length > 0)
                await sql `
          INSERT INTO ${table} ${sql(oldAddrInsert)}
          ON CONFLICT (address) DO UPDATE SET count = ${table}.count - EXCLUDED.count
        `;
            if (newAddrInsert.length > 0)
                await sql `
          INSERT INTO ${table} ${sql(newAddrInsert)}
          ON CONFLICT (address) DO UPDATE SET count = ${table}.count + EXCLUDED.count
        `;
        });
    }
    async rollBackCurrentLocation(args) {
        await this.sqlWriteTransaction(async (sql) => {
            if (args.curr.address) {
                await sql `
          UPDATE counts_by_address SET count = count - 1 WHERE address = ${args.curr.address}
        `;
            }
            if (args.prev.address) {
                await sql `
          UPDATE counts_by_address SET count = count + 1 WHERE address = ${args.prev.address}
        `;
            }
        });
    }
    async getBlockCount(from, to) {
        if (from === undefined && to === undefined)
            return 0;
        const result = await this.sql `
      SELECT COALESCE(SUM(inscription_count), 0) AS count
      FROM inscriptions_per_block
      WHERE TRUE
        ${from !== undefined ? this.sql `AND block_height >= ${from}` : this.sql ``}
        ${to !== undefined ? this.sql `AND block_height <= ${to}` : this.sql ``}
    `;
        return result[0].count;
    }
    async getBlockHashCount(hash) {
        if (!hash)
            return 0;
        const result = await this.sql `
      SELECT COALESCE(SUM(inscription_count), 0) AS count
      FROM inscriptions_per_block
      WHERE block_hash = ${hash}
    `;
        return result[0].count;
    }
    async getInscriptionCount(type) {
        const types = type !== undefined ? [type] : [types_1.DbInscriptionType.blessed, types_1.DbInscriptionType.cursed];
        const result = await this.sql `
      SELECT COALESCE(SUM(count), 0) AS count
      FROM counts_by_type
      WHERE type IN ${this.sql(types)}
    `;
        return result[0].count;
    }
    async getMimeTypeCount(mimeType) {
        if (!mimeType)
            return 0;
        const result = await this.sql `
      SELECT COALESCE(SUM(count), 0) AS count
      FROM counts_by_mime_type
      WHERE mime_type IN ${this.sql(mimeType)}
    `;
        return result[0].count;
    }
    async getSatRarityCount(satRarity) {
        if (!satRarity)
            return 0;
        const result = await this.sql `
      SELECT COALESCE(SUM(count), 0) AS count
      FROM counts_by_sat_rarity
      WHERE sat_rarity IN ${this.sql(satRarity)}
    `;
        return result[0].count;
    }
    async getRecursiveCount(recursive) {
        const rec = recursive !== undefined ? [recursive] : [true, false];
        const result = await this.sql `
      SELECT COALESCE(SUM(count), 0) AS count
      FROM counts_by_recursive
      WHERE recursive IN ${this.sql(rec)}
    `;
        return result[0].count;
    }
    async getAddressCount(address) {
        if (!address)
            return 0;
        const result = await this.sql `
      SELECT COALESCE(SUM(count), 0) AS count
      FROM counts_by_address
      WHERE address IN ${this.sql(address)}
    `;
        return result[0].count;
    }
    async getGenesisAddressCount(genesisAddress) {
        if (!genesisAddress)
            return 0;
        const result = await this.sql `
      SELECT COALESCE(SUM(count), 0) AS count
      FROM counts_by_genesis_address
      WHERE address IN ${this.sql(genesisAddress)}
    `;
        return result[0].count;
    }
}
exports.CountsPgStore = CountsPgStore;
//# sourceMappingURL=counts-pg-store.js.map