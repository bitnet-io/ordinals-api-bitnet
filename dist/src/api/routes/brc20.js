"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brc20Routes = void 0;
const typebox_1 = require("@sinclair/typebox");
const value_1 = require("@sinclair/typebox/value");
const schemas_1 = require("../schemas");
const cache_1 = require("../util/cache");
const helpers_1 = require("../util/helpers");
const Brc20Routes = (fastify, options, done) => {
    fastify.addHook('preHandler', cache_1.handleInscriptionTransfersCache);
    fastify.get('/brc-20/tokens', {
        schema: {
            operationId: 'getBrc20Tokens',
            summary: 'BRC-20 Tokens',
            description: 'Retrieves information for BRC-20 tokens',
            tags: ['BIT-20'],
            querystring: typebox_1.Type.Object({
                ticker: typebox_1.Type.Optional(schemas_1.Brc20TickersParam),
                // Sorting
                order_by: typebox_1.Type.Optional(schemas_1.Brc20TokensOrderByParam),
                // Pagination
                offset: typebox_1.Type.Optional(schemas_1.OffsetParam),
                limit: typebox_1.Type.Optional(schemas_1.LimitParam),
            }),
            response: {
                200: (0, schemas_1.PaginatedResponse)(schemas_1.Brc20TokenResponseSchema, 'Paginated BRC-20 Token Response'),
            },
        },
    }, async (request, reply) => {
        const limit = request.query.limit ?? helpers_1.DEFAULT_API_LIMIT;
        const offset = request.query.offset ?? 0;
        const response = await fastify.db.brc20.getTokens({
            limit,
            offset,
            ticker: request.query.ticker,
            order_by: request.query.order_by,
        });
        await reply.send({
            limit,
            offset,
            total: response.total,
            results: (0, helpers_1.parseBrc20Tokens)(response.results),
        });
    });
    fastify.get('/brc-20/tokens/:ticker', {
        schema: {
            operationId: 'getBrc20TokenDetails',
            summary: 'BRC-20 Token Details',
            description: 'Retrieves information for a BRC-20 token including supply and holders',
            tags: ['BIT-20'],
            params: typebox_1.Type.Object({
                ticker: schemas_1.Brc20TickerParam,
            }),
            response: {
                200: schemas_1.Brc20TokenDetailsSchema,
                404: schemas_1.NotFoundResponse,
            },
        },
    }, async (request, reply) => {
        const token = await fastify.db.brc20.getToken({ ticker: request.params.ticker });
        if (!token) {
            await reply.code(404).send(value_1.Value.Create(schemas_1.NotFoundResponse));
        }
        else {
            await reply.send({
                token: (0, helpers_1.parseBrc20Tokens)([token])[0],
                supply: (0, helpers_1.parseBrc20Supply)(token),
            });
        }
    });
    fastify.get('/bit-20/tokens/:ticker', {
        schema: {
            operationId: 'getBrc20TokenDetails',
            summary: 'BRC-20 Token Details',
            description: 'Retrieves information for a BRC-20 token including supply and holders',
            tags: ['BIT-20'],
            querystring: typebox_1.Type.Object({
                ticker: typebox_1.Type.Optional(schemas_1.Brc20TickersParam),
                // Sorting
                order_by: typebox_1.Type.Optional(schemas_1.Brc20TokensOrderByParam),
                // Pagination
                offset: typebox_1.Type.Optional(schemas_1.OffsetParam),
                limit: typebox_1.Type.Optional(schemas_1.LimitParam),
            }),
            params: typebox_1.Type.Object({
                ticker: schemas_1.Brc20TickerParam,
            }),
            response: {
            //          200: Brc20TokenDetailsSchem,
            //          404: NotFoundResponse,
            },
        },
    }, 
    //    async (request, reply) => {
    //      const token = await fastify.db.brc20.getToken({ ticker: request.params.ticker });
    //      if (!token) {
    //        await reply.code(404).send(Value.Create(NotFoundResponse));
    //      } else {
    //        await reply.send({
    //          token: parseBrc20Token([token])[0],
    //          supply: parseBrc20Suppl(token),
    //        });
    //      }
    //    }
    async (request, reply) => {
        const limit = request.query.limit ?? helpers_1.DEFAULT_API_LIMIT;
        const offset = request.query.offset ?? 0;
        const response = await fastify.db.brc20.getTokens({
            limit,
            offset,
            ticker: request.query.ticker,
            order_by: request.query.order_by,
        });
        //      await reply.send(parseBrc20Token(response.results));
        await reply.send({
            //        limit,
            //        offset,
            //        total: response.total,
            ticker: (0, helpers_1.parseBrc20Token)(response.results),
        });
    });
    fastify.get('/brc-20/tokens/:ticker/holders', {
        schema: {
            operationId: 'getBrc20TokenHolders',
            summary: 'BRC-20 Token Holders',
            description: 'Retrieves a list of holders and their balances for a BRC-20 token',
            tags: ['BIT-20'],
            params: typebox_1.Type.Object({
                ticker: schemas_1.Brc20TickerParam,
            }),
            querystring: typebox_1.Type.Object({
                // Pagination
                offset: typebox_1.Type.Optional(schemas_1.OffsetParam),
                limit: typebox_1.Type.Optional(schemas_1.LimitParam),
            }),
            response: {
                200: (0, schemas_1.PaginatedResponse)(schemas_1.Brc20HolderResponseSchema, 'Paginated BRC-20 Holders Response'),
                404: schemas_1.NotFoundResponse,
            },
        },
    }, async (request, reply) => {
        const limit = request.query.limit ?? helpers_1.DEFAULT_API_LIMIT;
        const offset = request.query.offset ?? 0;
        const holders = await fastify.db.brc20.getTokenHolders({
            limit,
            offset,
            ticker: request.params.ticker,
        });
        if (!holders) {
            await reply.code(404).send(value_1.Value.Create(schemas_1.NotFoundResponse));
            return;
        }
        await reply.send({
            limit,
            offset,
            total: holders.total,
            results: (0, helpers_1.parseBrc20Holders)(holders.results),
        });
    });
    fastify.get('/brc-20/balances/:address', {
        schema: {
            operationId: 'getBrc20Balances',
            summary: 'BRC-20 Balances',
            description: 'Retrieves BRC-20 token balances for a Bitcoin address',
            tags: ['BIT-20'],
            params: typebox_1.Type.Object({
                address: schemas_1.AddressParam,
            }),
            querystring: typebox_1.Type.Object({
                ticker: typebox_1.Type.Optional(schemas_1.Brc20TickersParam),
                block_height: typebox_1.Type.Optional(schemas_1.BlockHeightParam),
                // Pagination
                offset: typebox_1.Type.Optional(schemas_1.OffsetParam),
                limit: typebox_1.Type.Optional(schemas_1.LimitParam),
            }),
            response: {
                200: (0, schemas_1.PaginatedResponse)(schemas_1.Brc20BalanceResponseSchema, 'Paginated BRC-20 Balance Response'),
            },
        },
    }, async (request, reply) => {
        const limit = request.query.limit ?? helpers_1.DEFAULT_API_LIMIT;
        const offset = request.query.offset ?? 0;
        const balances = await fastify.db.brc20.getBalances({
            limit,
            offset,
            address: request.params.address,
            ticker: request.query.ticker,
            block_height: request.query.block_height ? parseInt(request.query.block_height) : undefined,
        });
        await reply.send({
            limit,
            offset,
            total: balances.total,
            results: (0, helpers_1.parseBrc20Balances)(balances.results),
        });
    });
    fastify.get('/bit-20/balances/:address', {
        schema: {
            operationId: 'getBrc20Balances',
            summary: 'BRC-20 Balances',
            description: 'Retrieves BRC-20 token balances for a Bitcoin address',
            tags: ['BIT-20'],
            params: typebox_1.Type.Object({
                address: schemas_1.AddressParam,
            }),
            querystring: typebox_1.Type.Object({
                ticker: typebox_1.Type.Optional(schemas_1.Brc20TickersParam),
                block_height: typebox_1.Type.Optional(schemas_1.BlockHeightParam),
                // Pagination
                offset: typebox_1.Type.Optional(schemas_1.OffsetParam),
                limit: typebox_1.Type.Optional(schemas_1.LimitParam),
            }),
            response: {},
        },
    }, async (request, reply) => {
        const limit = request.query.limit ?? helpers_1.DEFAULT_API_LIMIT;
        const offset = request.query.offset ?? 0;
        const balances = await fastify.db.brc20.getBalances({
            limit,
            offset,
            address: request.params.address,
            ticker: request.query.ticker,
            block_height: request.query.block_height ? parseInt(request.query.block_height) : undefined,
        });
        await reply.send((0, helpers_1.parseBrc20Balance)(balances.results));
    });
    fastify.get('/brc-20/activity', {
        schema: {
            operationId: 'getBrc20Activity',
            summary: 'BRC-20 Activity',
            description: 'Retrieves BRC-20 activity filtered by ticker, address, operation, or at a specific block height',
            tags: ['BIT-20'],
            querystring: typebox_1.Type.Object({
                ticker: typebox_1.Type.Optional(schemas_1.Brc20TickersParam),
                block_height: typebox_1.Type.Optional(schemas_1.BlockHeightParam),
                operation: typebox_1.Type.Optional(schemas_1.Brc20OperationsParam),
                address: typebox_1.Type.Optional(schemas_1.AddressParam),
                // Pagination
                offset: typebox_1.Type.Optional(schemas_1.OffsetParam),
                limit: typebox_1.Type.Optional(schemas_1.LimitParam),
            }),
            response: {
                200: (0, schemas_1.PaginatedResponse)(schemas_1.Brc20ActivityResponseSchema, 'Paginated BRC-20 Activity Response'),
            },
        },
    }, async (request, reply) => {
        const limit = request.query.limit ?? helpers_1.DEFAULT_API_LIMIT;
        const offset = request.query.offset ?? 0;
        const balances = await fastify.db.brc20.getActivity({ limit, offset }, {
            ticker: request.query.ticker,
            block_height: request.query.block_height
                ? parseInt(request.query.block_height)
                : undefined,
            operation: request.query.operation,
            address: request.query.address,
        });
        await reply.send({
            limit,
            offset,
            total: balances.total,
            results: (0, helpers_1.parseBrc20Activities)(balances.results),
        });
    });
    done();
};
exports.Brc20Routes = Brc20Routes;
//# sourceMappingURL=brc20.js.map