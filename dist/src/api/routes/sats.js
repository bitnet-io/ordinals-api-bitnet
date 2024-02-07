"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatRoutes = void 0;
const typebox_1 = require("@sinclair/typebox");
const schemas_1 = require("../schemas");
const ordinal_satoshi_1 = require("../util/ordinal-satoshi");
const helpers_1 = require("../util/helpers");
const SatRoutes = (fastify, options, done) => {
    fastify.get('/sats/:ordinal', {
        schema: {
            operationId: 'getSatoshi',
            summary: 'Satoshi Ordinal',
            description: 'Retrieves ordinal information for a single satoshi',
            tags: ['Satoshis'],
            params: typebox_1.Type.Object({
                ordinal: schemas_1.OrdinalParam,
            }),
            response: {
                200: schemas_1.SatoshiResponse,
                400: schemas_1.InvalidSatoshiNumberResponse,
            },
        },
    }, async (request, reply) => {
        let sat;
        try {
            sat = new ordinal_satoshi_1.OrdinalSatoshi(request.params.ordinal);
        }
        catch (error) {
            await reply.code(400).send({ error: 'Invalid satoshi ordinal number' });
            return;
        }
        const inscriptions = await fastify.db.getInscriptions({ limit: 1, offset: 0 }, { sat_ordinal: BigInt(request.params.ordinal) });
        await reply.send({
            coinbase_height: sat.blockHeight,
            cycle: sat.cycle,
            epoch: sat.epoch,
            period: sat.period,
            offset: sat.offset,
            decimal: sat.decimal,
            degree: sat.degree,
            name: sat.name,
            rarity: sat.rarity,
            percentile: sat.percentile,
            inscription_id: inscriptions.results[0]?.genesis_id,
        });
    });
    fastify.get('/sats/:ordinal/inscriptions', {
        schema: {
            operationId: 'getSatoshiInscriptions',
            summary: 'Satoshi Inscriptions',
            description: 'Retrieves all inscriptions associated with a single satoshi',
            tags: ['Satoshis'],
            params: typebox_1.Type.Object({
                ordinal: schemas_1.OrdinalParam,
            }),
            querystring: typebox_1.Type.Object({
                // Pagination
                offset: typebox_1.Type.Optional(schemas_1.OffsetParam),
                limit: typebox_1.Type.Optional(schemas_1.LimitParam),
            }),
            response: {
                200: (0, schemas_1.PaginatedResponse)(schemas_1.InscriptionResponse, 'Paginated Satoshi Inscriptions Response'),
                400: schemas_1.InvalidSatoshiNumberResponse,
            },
        },
    }, async (request, reply) => {
        let sat;
        try {
            sat = new ordinal_satoshi_1.OrdinalSatoshi(request.params.ordinal);
        }
        catch (error) {
            await reply.code(400).send({ error: 'Invalid satoshi ordinal number' });
            return;
        }
        const limit = request.query.limit ?? helpers_1.DEFAULT_API_LIMIT;
        const offset = request.query.offset ?? 0;
        const inscriptions = await fastify.db.getInscriptions({ limit, offset }, { sat_ordinal: BigInt(sat.ordinal) });
        await reply.send({
            limit,
            offset,
            total: inscriptions.total,
            results: (0, helpers_1.parseDbInscriptions)(inscriptions.results),
        });
    });
    done();
};
exports.SatRoutes = SatRoutes;
//# sourceMappingURL=sats.js.map