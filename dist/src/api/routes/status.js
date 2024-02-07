"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusRoutes = void 0;
const schemas_1 = require("../schemas");
const api_toolkit_1 = require("@hirosystems/api-toolkit");
const cache_1 = require("../util/cache");
const StatusRoutes = (fastify, options, done) => {
    fastify.addHook('preHandler', cache_1.handleInscriptionTransfersCache);
    fastify.get('/', {
        schema: {
            operationId: 'getApiStatus',
            summary: 'API Status',
            description: 'Displays the status of the API',
            tags: ['Status'],
            response: {
                200: schemas_1.ApiStatusResponse,
            },
        },
    }, async (request, reply) => {
        const result = await fastify.db.sqlTransaction(async (sql) => {
            const block_height = await fastify.db.getChainTipBlockHeight();
            const max_inscription_number = await fastify.db.getMaxInscriptionNumber();
            const max_cursed_inscription_number = await fastify.db.getMaxCursedInscriptionNumber();
            return {
                server_version: `ordinals-api ${api_toolkit_1.SERVER_VERSION.tag} (${api_toolkit_1.SERVER_VERSION.branch}:${api_toolkit_1.SERVER_VERSION.commit})`,
                status: 'ready',
                block_height,
                max_inscription_number,
                max_cursed_inscription_number,
            };
        });
        await reply.send(result);
    });
    done();
};
exports.StatusRoutes = StatusRoutes;
//# sourceMappingURL=status.js.map