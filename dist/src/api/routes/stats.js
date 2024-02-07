"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsRoutes = void 0;
const typebox_1 = require("@sinclair/typebox");
const schemas_1 = require("../schemas");
const cache_1 = require("../util/cache");
const helpers_1 = require("../util/helpers");
const IndexRoutes = (fastify, options, done) => {
    fastify.addHook('preHandler', cache_1.handleInscriptionsPerBlockCache);
    fastify.get('/stats/inscriptions', {
        schema: {
            operationId: 'getStatsInscriptionCount',
            summary: 'Inscription Count per Block',
            description: 'Retrieves statistics on the number of inscriptions revealed per block',
            tags: ['Statistics'],
            querystring: typebox_1.Type.Object({
                from_block_height: typebox_1.Type.Optional(schemas_1.BlockHeightParam),
                to_block_height: typebox_1.Type.Optional(schemas_1.BlockHeightParam),
            }),
            response: {
                200: schemas_1.InscriptionsPerBlockResponse,
                404: schemas_1.NotFoundResponse,
            },
        },
    }, async (request, reply) => {
        const inscriptions = await fastify.db.getInscriptionCountPerBlock({
            ...(0, helpers_1.blockParam)(request.query.from_block_height, 'from_block'),
            ...(0, helpers_1.blockParam)(request.query.to_block_height, 'to_block'),
        });
        await reply.send({
            results: inscriptions,
        });
    });
    done();
};
const StatsRoutes = async (fastify) => {
    await fastify.register(IndexRoutes);
};
exports.StatsRoutes = StatsRoutes;
//# sourceMappingURL=stats.js.map