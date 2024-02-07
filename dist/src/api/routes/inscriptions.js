"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InscriptionsRoutes = void 0;
const typebox_1 = require("@sinclair/typebox");
const value_1 = require("@sinclair/typebox/value");
const schemas_1 = require("../schemas");
const cache_1 = require("../util/cache");
const helpers_1 = require("../util/helpers");
function inscriptionIdArrayParam(param) {
    return schemas_1.InscriptionIdParamCType.Check(param) ? { genesis_id: [param] } : { number: [param] };
}
function inscriptionIdParam(param) {
    return schemas_1.InscriptionIdParamCType.Check(param) ? { genesis_id: param } : { number: param };
}
function bigIntParam(param) {
    return param ? BigInt(param) : undefined;
}
const IndexRoutes = (fastify, options, done) => {
    fastify.addHook('preHandler', cache_1.handleInscriptionTransfersCache);
    fastify.get('/inscriptions', {
        schema: {
            operationId: 'getInscriptions',
            summary: 'List of Inscriptions',
            description: 'Retrieves a list of inscriptions with options to filter and sort results',
            tags: ['Inscriptions'],
            querystring: typebox_1.Type.Object({
                genesis_block: typebox_1.Type.Optional(schemas_1.BlockParam),
                from_genesis_block_height: typebox_1.Type.Optional(schemas_1.BlockHeightParam),
                to_genesis_block_height: typebox_1.Type.Optional(schemas_1.BlockHeightParam),
                from_genesis_timestamp: typebox_1.Type.Optional(schemas_1.TimestampParam),
                to_genesis_timestamp: typebox_1.Type.Optional(schemas_1.TimestampParam),
                from_sat_ordinal: typebox_1.Type.Optional(schemas_1.OrdinalParam),
                to_sat_ordinal: typebox_1.Type.Optional(schemas_1.OrdinalParam),
                from_sat_coinbase_height: typebox_1.Type.Optional(schemas_1.BlockHeightParam),
                to_sat_coinbase_height: typebox_1.Type.Optional(schemas_1.BlockHeightParam),
                from_number: typebox_1.Type.Optional(schemas_1.InscriptionNumberParam),
                to_number: typebox_1.Type.Optional(schemas_1.InscriptionNumberParam),
                id: typebox_1.Type.Optional(schemas_1.InscriptionIdsParam),
                number: typebox_1.Type.Optional(schemas_1.InscriptionNumbersParam),
                output: typebox_1.Type.Optional(schemas_1.OutputParam),
                address: typebox_1.Type.Optional(schemas_1.AddressesParam),
                genesis_address: typebox_1.Type.Optional(schemas_1.AddressesParam),
                mime_type: typebox_1.Type.Optional(schemas_1.MimeTypesParam),
                rarity: typebox_1.Type.Optional(schemas_1.SatoshiRaritiesParam),
                recursive: typebox_1.Type.Optional(schemas_1.RecursiveParam),
                cursed: typebox_1.Type.Optional(schemas_1.CursedParam),
                // Pagination
                offset: typebox_1.Type.Optional(schemas_1.OffsetParam),
                limit: typebox_1.Type.Optional(schemas_1.LimitParam),
                // Ordering
                order_by: typebox_1.Type.Optional(schemas_1.OrderByParam),
                order: typebox_1.Type.Optional(schemas_1.OrderParam),
            }),
            response: {
                200: (0, schemas_1.PaginatedResponse)(schemas_1.InscriptionResponse, 'Paginated Inscriptions Response'),
                404: schemas_1.NotFoundResponse,
            },
        },
    }, async (request, reply) => {
        const limit = request.query.limit ?? helpers_1.DEFAULT_API_LIMIT;
        const offset = request.query.offset ?? 0;
        const inscriptions = await fastify.db.getInscriptions({ limit, offset }, {
            ...(0, helpers_1.blockParam)(request.query.genesis_block, 'genesis_block'),
            ...(0, helpers_1.blockParam)(request.query.from_genesis_block_height, 'from_genesis_block'),
            ...(0, helpers_1.blockParam)(request.query.to_genesis_block_height, 'to_genesis_block'),
            ...(0, helpers_1.blockParam)(request.query.from_sat_coinbase_height, 'from_sat_coinbase'),
            ...(0, helpers_1.blockParam)(request.query.to_sat_coinbase_height, 'to_sat_coinbase'),
            from_genesis_timestamp: request.query.from_genesis_timestamp,
            to_genesis_timestamp: request.query.to_genesis_timestamp,
            from_sat_ordinal: bigIntParam(request.query.from_sat_ordinal),
            to_sat_ordinal: bigIntParam(request.query.to_sat_ordinal),
            from_number: request.query.from_number,
            to_number: request.query.to_number,
            genesis_id: request.query.id,
            number: request.query.number,
            output: request.query.output,
            address: request.query.address,
            genesis_address: request.query.genesis_address,
            mime_type: request.query.mime_type,
            sat_rarity: request.query.rarity,
            recursive: request.query.recursive,
            cursed: request.query.cursed,
        }, {
            order_by: request.query.order_by ?? schemas_1.OrderBy.genesis_block_height,
            order: request.query.order ?? schemas_1.Order.desc,
        });
        await reply.send({
            limit,
            offset,
            total: inscriptions.total,
            results: (0, helpers_1.parseDbInscriptions)(inscriptions.results),
        });
    });
    fastify.get('/inscriptions/transfers', {
        schema: {
            operationId: 'getTransfersPerBlock',
            summary: 'Transfers per block',
            description: 'Retrieves a list of inscription transfers that ocurred at a specific Bitcoin block',
            tags: ['Inscriptions'],
            querystring: typebox_1.Type.Object({
                block: schemas_1.BlockParam,
                // Pagination
                offset: typebox_1.Type.Optional(schemas_1.OffsetParam),
                limit: typebox_1.Type.Optional(schemas_1.LimitParam),
            }),
            response: {
                200: (0, schemas_1.PaginatedResponse)(schemas_1.BlockInscriptionTransferSchema, 'Paginated Block Transfers Response'),
                404: schemas_1.NotFoundResponse,
            },
        },
    }, async (request, reply) => {
        const limit = request.query.limit ?? helpers_1.DEFAULT_API_LIMIT;
        const offset = request.query.offset ?? 0;
        const transfers = await fastify.db.getTransfersPerBlock({
            limit,
            offset,
            ...(0, helpers_1.blockParam)(request.query.block, 'block'),
        });
        await reply.send({
            limit,
            offset,
            total: transfers.total,
            results: (0, helpers_1.parseBlockTransfers)(transfers.results),
        });
    });
    done();
};
const ShowRoutes = (fastify, options, done) => {
    fastify.addHook('preHandler', cache_1.handleInscriptionCache);
    fastify.get('/inscriptions/:id', {
        schema: {
            operationId: 'getInscription',
            summary: 'Specific Inscription',
            description: 'Retrieves a single inscription',
            tags: ['Inscriptions'],
            params: typebox_1.Type.Object({
                id: schemas_1.InscriptionIdentifierParam,
            }),
            response: {
                200: schemas_1.InscriptionResponse,
                404: schemas_1.NotFoundResponse,
            },
        },
    }, async (request, reply) => {
        const inscription = await fastify.db.getInscriptions({ limit: 1, offset: 0 }, { ...inscriptionIdArrayParam(request.params.id) });
        if (inscription.total > 0) {
            await reply.send((0, helpers_1.parseDbInscription)(inscription.results[0]));
        }
        else {
            await reply.code(404).send(value_1.Value.Create(schemas_1.NotFoundResponse));
        }
    });
    fastify.get('/inscriptions/:id/content', {
        schema: {
            operationId: 'getInscriptionContent',
            summary: 'Inscription content',
            description: 'Retrieves the contents of a single inscription',
            tags: ['Inscriptions'],
            params: typebox_1.Type.Object({
                id: schemas_1.InscriptionIdentifierParam,
            }),
            response: {
                200: typebox_1.Type.Uint8Array(),
                404: schemas_1.NotFoundResponse,
            },
        },
    }, async (request, reply) => {
        const inscription = await fastify.db.getInscriptionContent(inscriptionIdParam(request.params.id));
        if (inscription) {
            const bytes = (0, helpers_1.hexToBuffer)(inscription.content);
            await reply
                .headers({
                'content-type': inscription.content_type,
                'content-length': inscription.content_length,
            })
                .send(bytes);
        }
        else {
            await reply.code(404).send(value_1.Value.Create(schemas_1.NotFoundResponse));
        }
    });
    fastify.get('/inscriptions/:id/transfers', {
        schema: {
            operationId: 'getInscriptionTransfers',
            summary: 'Inscription transfers',
            description: 'Retrieves all transfers for a single inscription',
            tags: ['Inscriptions'],
            params: typebox_1.Type.Object({
                id: schemas_1.InscriptionIdentifierParam,
            }),
            querystring: typebox_1.Type.Object({
                offset: typebox_1.Type.Optional(schemas_1.OffsetParam),
                limit: typebox_1.Type.Optional(schemas_1.LimitParam),
            }),
            response: {
                200: (0, schemas_1.PaginatedResponse)(schemas_1.InscriptionLocationResponseSchema, 'Paginated Inscription Locations Response'),
                404: schemas_1.NotFoundResponse,
            },
        },
    }, async (request, reply) => {
        const limit = request.query.limit ?? helpers_1.DEFAULT_API_LIMIT;
        const offset = request.query.offset ?? 0;
        const locations = await fastify.db.getInscriptionLocations({
            ...inscriptionIdParam(request.params.id),
            limit,
            offset,
        });
        await reply.send({
            limit,
            offset,
            total: locations.total,
            results: (0, helpers_1.parseInscriptionLocations)(locations.results),
        });
    });
    done();
};
const InscriptionsRoutes = async (fastify) => {
    await fastify.register(IndexRoutes);
    await fastify.register(ShowRoutes);
};
exports.InscriptionsRoutes = InscriptionsRoutes;
//# sourceMappingURL=inscriptions.js.map