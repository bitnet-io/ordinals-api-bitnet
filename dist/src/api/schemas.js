"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brc20TokenDetailsSchem = exports.Brc20TokenDetailsSchema = exports.Brc20HolderResponseSchema = exports.Brc20SupplySchem = exports.Brc20SupplySchema = exports.Brc20TokenResponseSchem = exports.Brc20TokenResponseSchema = exports.Brc20ActivityResponseSchema = exports.Brc20BalanceResponseSchem = exports.Brc20BalanceResponseSchema = exports.BlockInscriptionTransferSchema = exports.InscriptionLocationResponseSchema = exports.ApiStatusResponse = exports.SatoshiResponse = exports.InscriptionResponse = exports.PaginatedResponse = exports.OrderParam = exports.Order = exports.OrderByParam = exports.OrderBy = exports.Brc20TokensOrderByParam = exports.Brc20TokenOrderBy = exports.Brc20OperationsParam = exports.Brc20OperationParam = exports.LimitParam = exports.OffsetParam = exports.CursedParam = exports.RecursiveParam = exports.OutputParam = exports.TimestampParam = exports.SatoshiRaritiesParam = exports.MimeTypesParam = exports.BlockParam = exports.BlockHashParamCType = exports.BlockHashParam = exports.BlockHeightParamCType = exports.BlockHeightParam = exports.OrdinalParam = exports.InscriptionIdentifierParam = exports.InscriptionNumbersParam = exports.InscriptionNumberParamCType = exports.InscriptionNumberParam = exports.InscriptionIdsParam = exports.InscriptionIdParamCType = exports.InscriptionIdParam = exports.Brc20TickersParam = exports.Brc20TickerParam = exports.AddressesParam = exports.AddressParam = exports.OpenApiSchemaOptions = void 0;
exports.InscriptionsPerBlockResponse = exports.InscriptionsPerBlock = exports.InvalidSatoshiNumberResponse = exports.NotFoundResponse = void 0;
const api_toolkit_1 = require("@hirosystems/api-toolkit");
const typebox_1 = require("@sinclair/typebox");
const compiler_1 = require("@sinclair/typebox/compiler");
const ordinal_satoshi_1 = require("./util/ordinal-satoshi");
exports.OpenApiSchemaOptions = {
    openapi: {
        info: {
            title: 'BitOrdinals API',
            description: 'A service that indexes Bitcoin Ordinals data and exposes it via REST API endpoints.',
            version: api_toolkit_1.SERVER_VERSION.tag,
        },
        externalDocs: {
            url: 'https://github.com/hirosystems/ordinals-api',
            description: 'Source Repository',
        },
        servers: [
            {
                url: 'https://bitnft.io/',
                description: 'mainnet',
            },
        ],
        tags: [
            {
                name: 'Inscriptions',
                description: 'Endpoints to query ordinal inscriptions',
            },
            {
                name: 'Satoshis',
                description: 'Endpoints to query Satoshi ordinal and rarity information',
            },
            {
                name: 'BIT-20',
                description: 'Endpoints to query BIT-20 token balances and events',
            },
            {
                name: 'Statistics',
                description: 'Endpoints to query statistics on ordinal inscription data',
            },
        ],
    },
};
// ==========================
// Parameters
// ==========================
const Nullable = (type) => typebox_1.Type.Union([type, typebox_1.Type.Null()]);
exports.AddressParam = typebox_1.Type.String({
    title: 'Address',
    description: 'Bitcoin address',
    examples: ['bc1p8aq8s3z9xl87e74twfk93mljxq6alv4a79yheadx33t9np4g2wkqqt8kc5'],
});
exports.AddressesParam = typebox_1.Type.Array(exports.AddressParam, {
    title: 'Addresses',
    description: 'Array of Bitcoin addresses',
    examples: [
        [
            'bc1p8aq8s3z9xl87e74twfk93mljxq6alv4a79yheadx33t9np4g2wkqqt8kc5',
            'bc1pscktlmn99gyzlvymvrezh6vwd0l4kg06tg5rvssw0czg8873gz5sdkteqj',
        ],
    ],
});
exports.Brc20TickerParam = typebox_1.Type.String();
exports.Brc20TickersParam = typebox_1.Type.Array(exports.Brc20TickerParam);
exports.InscriptionIdParam = typebox_1.Type.RegEx(/^[a-fA-F0-9]{64}i[0-9]+$/, {
    title: 'Inscription ID',
    description: 'Inscription ID',
    examples: ['38c46a8bf7ec90bc7f6b797e7dc84baa97f4e5fd4286b92fe1b50176d03b18dci0'],
});
exports.InscriptionIdParamCType = compiler_1.TypeCompiler.Compile(exports.InscriptionIdParam);
exports.InscriptionIdsParam = typebox_1.Type.Array(exports.InscriptionIdParam, {
    title: 'Inscription IDs',
    description: 'Array of inscription IDs',
    examples: [
        [
            '38c46a8bf7ec90bc7f6b797e7dc84baa97f4e5fd4286b92fe1b50176d03b18dci0',
            'e3af144354367de58c675e987febcb49f17d6c19e645728b833fe95408feab85i0',
        ],
    ],
});
exports.InscriptionNumberParam = typebox_1.Type.Integer({
    title: 'Inscription Number',
    description: 'Inscription number',
    examples: ['10500'],
});
exports.InscriptionNumberParamCType = compiler_1.TypeCompiler.Compile(exports.InscriptionNumberParam);
exports.InscriptionNumbersParam = typebox_1.Type.Array(exports.InscriptionNumberParam, {
    title: 'Inscription Numbers',
    description: 'Array of inscription numbers',
    examples: [['10500', '65']],
});
exports.InscriptionIdentifierParam = typebox_1.Type.Union([exports.InscriptionIdParam, exports.InscriptionNumberParam], {
    title: 'Inscription Identifier',
    description: 'Inscription unique identifier (number or ID)',
    examples: ['145000', '38c46a8bf7ec90bc7f6b797e7dc84baa97f4e5fd4286b92fe1b50176d03b18dci0'],
});
exports.OrdinalParam = typebox_1.Type.Integer({
    title: 'Ordinal Number',
    description: 'Ordinal number that uniquely identifies a satoshi',
    examples: [257418248345364],
    minimum: 0,
    exclusiveMaximum: ordinal_satoshi_1.SAT_SUPPLY,
});
exports.BlockHeightParam = typebox_1.Type.RegEx(/^[0-9]+$/, {
    title: 'Block Height',
    description: 'Bitcoin block height',
    examples: [777678],
});
exports.BlockHeightParamCType = compiler_1.TypeCompiler.Compile(exports.BlockHeightParam);
exports.BlockHashParam = typebox_1.Type.RegEx(/^[0]{8}[a-fA-F0-9]{56}$/, {
    title: 'Block Hash',
    description: 'Bitcoin block hash',
    examples: ['0000000000000000000452773967cdd62297137cdaf79950c5e8bb0c62075133'],
});
exports.BlockHashParamCType = compiler_1.TypeCompiler.Compile(exports.BlockHashParam);
exports.BlockParam = typebox_1.Type.Union([exports.BlockHashParam, exports.BlockHeightParam], {
    title: 'Block Identifier',
    description: 'Bitcoin block identifier (height or hash)',
    examples: [777654, '0000000000000000000452773967cdd62297137cdaf79950c5e8bb0c62075133'],
});
exports.MimeTypesParam = typebox_1.Type.Array(typebox_1.Type.RegEx(/^\w+\/[-.\w]+(?:\+[-.\w]+)?$/, {
    title: 'MIME Type',
    description: 'MIME type for an inscription content',
    examples: ['image/png'],
}), {
    title: 'MIME Types',
    description: 'Array of inscription MIME types',
    examples: [['image/png', 'image/jpeg']],
});
exports.SatoshiRaritiesParam = typebox_1.Type.Array(typebox_1.Type.Enum(ordinal_satoshi_1.SatoshiRarity, {
    title: 'Rarity',
    description: 'Rarity of a single satoshi according to Ordinal Theory',
    examples: ['uncommon'],
}), {
    title: 'Rarity',
    description: 'Array of satoshi rarity values',
    examples: [['common', 'uncommon']],
});
exports.TimestampParam = typebox_1.Type.Integer({
    title: 'Timestamp',
    description: 'Block UNIX epoch timestamp (milliseconds)',
    examples: [1677731361],
});
exports.OutputParam = typebox_1.Type.RegEx(/^[a-fA-F0-9]{64}:[0-9]+$/, {
    title: 'Transaction Output',
    description: 'An UTXO for a Bitcoin transaction',
    examples: ['8f46f0d4ef685e650727e6faf7e30f23b851a7709714ec774f7909b3fb5e604c:0'],
});
exports.RecursiveParam = typebox_1.Type.Boolean({
    title: 'Recursive',
    description: 'Whether or not the inscription is recursive',
    examples: [false],
});
exports.CursedParam = typebox_1.Type.Boolean({
    title: 'Cursed',
    description: 'Whether or not the inscription is cursed',
    examples: [false],
});
exports.OffsetParam = typebox_1.Type.Integer({
    minimum: 0,
    title: 'Offset',
    description: 'Result offset',
});
exports.LimitParam = typebox_1.Type.Integer({
    minimum: 1,
    maximum: 60,
    title: 'Limit',
    description: 'Results per page',
});
exports.Brc20OperationParam = typebox_1.Type.Union([
    typebox_1.Type.Literal('deploy'),
    typebox_1.Type.Literal('mint'),
    typebox_1.Type.Literal('transfer'),
    typebox_1.Type.Literal('transfer_send'),
], {
    title: 'Operation',
    description: 'BRC-20 token operation. Note that a BRC-20 transfer is a two step process `transfer` (creating the inscription, which makes funds transferrable) and `transfer_send` (sending the inscription to a recipient, which moves the funds)',
    examples: ['deploy', 'mint', 'transfer', 'transfer_send'],
});
exports.Brc20OperationsParam = typebox_1.Type.Array(exports.Brc20OperationParam);
var Brc20TokenOrderBy;
(function (Brc20TokenOrderBy) {
    Brc20TokenOrderBy["tx_count"] = "tx_count";
    Brc20TokenOrderBy["index"] = "index";
})(Brc20TokenOrderBy = exports.Brc20TokenOrderBy || (exports.Brc20TokenOrderBy = {}));
exports.Brc20TokensOrderByParam = typebox_1.Type.Enum(Brc20TokenOrderBy, {
    title: 'Order By',
    description: 'Parameter to order results by',
});
var OrderBy;
(function (OrderBy) {
    OrderBy["number"] = "number";
    OrderBy["genesis_block_height"] = "genesis_block_height";
    OrderBy["ordinal"] = "ordinal";
    OrderBy["rarity"] = "rarity";
})(OrderBy = exports.OrderBy || (exports.OrderBy = {}));
exports.OrderByParam = typebox_1.Type.Enum(OrderBy, {
    title: 'Order By',
    description: 'Parameter to order results by',
});
var Order;
(function (Order) {
    Order["asc"] = "asc";
    Order["desc"] = "desc";
})(Order = exports.Order || (exports.Order = {}));
exports.OrderParam = typebox_1.Type.Enum(Order, {
    title: 'Order',
    description: 'Results order',
});
// ==========================
// Responses
// ==========================
const PaginatedResponse = (type, title) => typebox_1.Type.Object({
    limit: typebox_1.Type.Integer({ examples: [20] }),
    offset: typebox_1.Type.Integer({ examples: [0] }),
    total: typebox_1.Type.Integer({ examples: [1] }),
    results: typebox_1.Type.Array(type),
}, { title });
exports.PaginatedResponse = PaginatedResponse;
exports.InscriptionResponse = typebox_1.Type.Object({
    id: typebox_1.Type.String({
        examples: ['1463d48e9248159084929294f64bda04487503d30ce7ab58365df1dc6fd58218i0'],
    }),
    number: typebox_1.Type.Integer({ examples: [248751] }),
    address: Nullable(typebox_1.Type.String({
        examples: ['bc1pvwh2dl6h388x65rqq47qjzdmsqgkatpt4hye6daf7yxvl0z3xjgq247aq8'],
    })),
    genesis_address: Nullable(typebox_1.Type.String({
        examples: ['bc1pvwh2dl6h388x65rqq47qjzdmsqgkatpt4hye6daf7yxvl0z3xjgq247aq8'],
    })),
    genesis_block_height: typebox_1.Type.Integer({ examples: [778921] }),
    genesis_block_hash: typebox_1.Type.String({
        examples: ['0000000000000000000452773967cdd62297137cdaf79950c5e8bb0c62075133'],
    }),
    genesis_tx_id: typebox_1.Type.String({
        examples: ['1463d48e9248159084929294f64bda04487503d30ce7ab58365df1dc6fd58218'],
    }),
    genesis_fee: typebox_1.Type.String({ examples: ['3179'] }),
    genesis_timestamp: typebox_1.Type.Integer({ exmaples: [1677733170000] }),
    tx_id: typebox_1.Type.String({
        examples: ['1463d48e9248159084929294f64bda04487503d30ce7ab58365df1dc6fd58218'],
    }),
    location: typebox_1.Type.String({
        examples: ['1463d48e9248159084929294f64bda04487503d30ce7ab58365df1dc6fd58218:0:0'],
    }),
    output: typebox_1.Type.String({
        examples: ['1463d48e9248159084929294f64bda04487503d30ce7ab58365df1dc6fd58218:0'],
    }),
    value: Nullable(typebox_1.Type.String({ examples: ['546'] })),
    offset: Nullable(typebox_1.Type.String({ examples: ['0'] })),
    sat_ordinal: typebox_1.Type.String({ examples: ['1232735286933201'] }),
    sat_rarity: typebox_1.Type.String({ examples: ['common'] }),
    sat_coinbase_height: typebox_1.Type.Integer({ examples: [430521] }),
    mime_type: typebox_1.Type.String({ examples: ['text/plain'] }),
    content_type: typebox_1.Type.String({ examples: ['text/plain;charset=utf-8'] }),
    content_length: typebox_1.Type.Integer({ examples: [59] }),
    timestamp: typebox_1.Type.Integer({ examples: [1677733170000] }),
    curse_type: Nullable(typebox_1.Type.String({ examples: ['p2wsh'] })),
    recursive: typebox_1.Type.Boolean({ examples: [true] }),
    recursion_refs: Nullable(typebox_1.Type.Array(typebox_1.Type.String({
        examples: [
            '1463d48e9248159084929294f64bda04487503d30ce7ab58365df1dc6fd58218i0',
            '541076e29e1b63460412d3087b37130c9a14abd0beeb4e9b2b805d2072c84dedi0',
        ],
    }))),
}, { title: 'Inscription Response' });
exports.SatoshiResponse = typebox_1.Type.Object({
    coinbase_height: typebox_1.Type.Integer({ examples: [752860] }),
    cycle: typebox_1.Type.Integer({ examples: [0] }),
    decimal: typebox_1.Type.String({ examples: ['752860.20444193'] }),
    degree: typebox_1.Type.String({ examples: ['0°122860′892″20444193‴'] }),
    inscription_id: typebox_1.Type.Optional(typebox_1.Type.String({
        examples: ['ff4503ab9048d6d0ff4e23def81b614d5270d341ce993992e93902ceb0d4ed79i0'],
    })),
    epoch: typebox_1.Type.Number({ examples: [3] }),
    name: typebox_1.Type.String({ examples: ['ahehcbywzae'] }),
    offset: typebox_1.Type.Number({ examples: [20444193] }),
    percentile: typebox_1.Type.String({ examples: ['91.15654869285287%'] }),
    period: typebox_1.Type.Integer({ examples: [373] }),
    rarity: typebox_1.Type.Enum(ordinal_satoshi_1.SatoshiRarity, { examples: ['common'] }),
}, { title: 'Satoshi Response' });
exports.ApiStatusResponse = typebox_1.Type.Object({
    server_version: typebox_1.Type.String({ examples: [''] }),
    status: typebox_1.Type.String(),
    block_height: typebox_1.Type.Optional(typebox_1.Type.Integer()),
    max_inscription_number: typebox_1.Type.Optional(typebox_1.Type.Integer()),
    max_cursed_inscription_number: typebox_1.Type.Optional(typebox_1.Type.Integer()),
}, { title: 'Api Status Response' });
exports.InscriptionLocationResponseSchema = typebox_1.Type.Object({
    block_height: typebox_1.Type.Integer({ examples: [778921] }),
    block_hash: typebox_1.Type.String({
        examples: ['0000000000000000000452773967cdd62297137cdaf79950c5e8bb0c62075133'],
    }),
    address: Nullable(typebox_1.Type.String({
        examples: ['bc1pvwh2dl6h388x65rqq47qjzdmsqgkatpt4hye6daf7yxvl0z3xjgq247aq8'],
    })),
    tx_id: typebox_1.Type.String({
        examples: ['1463d48e9248159084929294f64bda04487503d30ce7ab58365df1dc6fd58218'],
    }),
    location: typebox_1.Type.String({
        examples: ['1463d48e9248159084929294f64bda04487503d30ce7ab58365df1dc6fd58218:0:0'],
    }),
    output: typebox_1.Type.String({
        examples: ['1463d48e9248159084929294f64bda04487503d30ce7ab58365df1dc6fd58218:0'],
    }),
    value: Nullable(typebox_1.Type.String({ examples: ['546'] })),
    offset: Nullable(typebox_1.Type.String({ examples: ['0'] })),
    timestamp: typebox_1.Type.Integer({ examples: [1677733170000] }),
}, { title: 'Inscription Location Response' });
exports.BlockInscriptionTransferSchema = typebox_1.Type.Object({
    id: typebox_1.Type.String({
        examples: ['1463d48e9248159084929294f64bda04487503d30ce7ab58365df1dc6fd58218i0'],
    }),
    number: typebox_1.Type.Integer({ examples: [248751] }),
    from: exports.InscriptionLocationResponseSchema,
    to: exports.InscriptionLocationResponseSchema,
});
exports.Brc20BalanceResponseSchema = typebox_1.Type.Object({
    ticker: typebox_1.Type.String({ examples: ['PEPE'] }),
    available_balance: typebox_1.Type.String({ examples: ['1500.00000'] }),
    transferrable_balance: typebox_1.Type.String({ examples: ['500.00000'] }),
    overall_balance: typebox_1.Type.String({ examples: ['2000.00000'] }),
    decimals: typebox_1.Type.Integer({ examples: [8] }),
});
exports.Brc20BalanceResponseSchem = typebox_1.Type.Object({
    tick: typebox_1.Type.String({ examples: ['PEPE'] }),
    available_balance: typebox_1.Type.String({ examples: ['1500.00000'] }),
    transferrable_balance: typebox_1.Type.String({ examples: ['500.00000'] }),
    overall_balance: typebox_1.Type.String({ examples: ['2000.00000'] }),
    decimals: typebox_1.Type.Integer({ examples: [8] }),
});
exports.Brc20ActivityResponseSchema = typebox_1.Type.Object({
    operation: typebox_1.Type.Union([
        typebox_1.Type.Literal('deploy'),
        typebox_1.Type.Literal('mint'),
        typebox_1.Type.Literal('transfer'),
        typebox_1.Type.Literal('transfer_send'),
    ]),
    ticker: typebox_1.Type.String({ examples: ['PEPE'] }),
    inscription_id: typebox_1.Type.String({
        examples: ['1463d48e9248159084929294f64bda04487503d30ce7ab58365df1dc6fd58218i0'],
    }),
    block_height: typebox_1.Type.Integer({ examples: [778921] }),
    block_hash: typebox_1.Type.String({
        examples: ['0000000000000000000452773967cdd62297137cdaf79950c5e8bb0c62075133'],
    }),
    tx_id: typebox_1.Type.String({
        examples: ['1463d48e9248159084929294f64bda04487503d30ce7ab58365df1dc6fd58218'],
    }),
    location: typebox_1.Type.String({
        examples: ['1463d48e9248159084929294f64bda04487503d30ce7ab58365df1dc6fd58218:0:0'],
    }),
    address: typebox_1.Type.String({
        examples: ['bc1pvwh2dl6h388x65rqq47qjzdmsqgkatpt4hye6daf7yxvl0z3xjgq247aq8'],
    }),
    timestamp: typebox_1.Type.Integer({ examples: [1677733170000] }),
    mint: typebox_1.Type.Optional(typebox_1.Type.Object({
        amount: Nullable(typebox_1.Type.String({ examples: ['1000000'] })),
    })),
    deploy: typebox_1.Type.Optional(typebox_1.Type.Object({
        max_supply: typebox_1.Type.String({ examples: ['21000000'] }),
        mint_limit: Nullable(typebox_1.Type.String({ examples: ['100000'] })),
        decimals: typebox_1.Type.Integer({ examples: [8] }),
    })),
    transfer: typebox_1.Type.Optional(typebox_1.Type.Object({
        amount: typebox_1.Type.String({ examples: ['1000000'] }),
        from_address: typebox_1.Type.String({
            examples: ['bc1pvwh2dl6h388x65rqq47qjzdmsqgkatpt4hye6daf7yxvl0z3xjgq247aq8'],
        }),
    })),
    transfer_send: typebox_1.Type.Optional(typebox_1.Type.Object({
        amount: typebox_1.Type.String({ examples: ['1000000'] }),
        from_address: typebox_1.Type.String({
            examples: ['bc1pvwh2dl6h388x65rqq47qjzdmsqgkatpt4hye6daf7yxvl0z3xjgq247aq8'],
        }),
        to_address: typebox_1.Type.String({
            examples: ['bc1pvwh2dl6h388x65rqq47qjzdmsqgkatpt4hye6daf7yxvl0z3xjgq247aq8'],
        }),
    })),
});
exports.Brc20TokenResponseSchema = typebox_1.Type.Object({
    id: typebox_1.Type.String({
        examples: ['1463d48e9248159084929294f64bda04487503d30ce7ab58365df1dc6fd58218i0'],
    }),
    number: typebox_1.Type.Integer({ examples: [248751] }),
    block_height: typebox_1.Type.Integer({ examples: [752860] }),
    tx_id: typebox_1.Type.String({
        examples: ['1463d48e9248159084929294f64bda04487503d30ce7ab58365df1dc6fd58218'],
    }),
    address: typebox_1.Type.String({
        examples: ['bc1pvwh2dl6h388x65rqq47qjzdmsqgkatpt4hye6daf7yxvl0z3xjgq247aq8'],
    }),
    ticker: typebox_1.Type.String({ examples: ['PEPE'] }),
    max_supply: typebox_1.Type.String({ examples: ['21000000'] }),
    mint_limit: Nullable(typebox_1.Type.String({ examples: ['100000'] })),
    decimals: typebox_1.Type.Integer({ examples: [8] }),
    deploy_timestamp: typebox_1.Type.Integer({ examples: [1677733170000] }),
    minted_supply: typebox_1.Type.String({ examples: ['1000000'] }),
    tx_count: typebox_1.Type.Integer({ examples: [300000] }),
}, { title: 'BRC-20 Token Response' });
exports.Brc20TokenResponseSchem = typebox_1.Type.Object({
    tick: typebox_1.Type.String({ examples: ['PEPE'] }),
    max_supply: typebox_1.Type.String({ examples: ['21000000'] }),
    decimals: typebox_1.Type.Integer({ examples: [8] }),
    limit_per_mint: Nullable(typebox_1.Type.String({ examples: ['100000'] })),
    remaining_supply: typebox_1.Type.String({ examples: ['1000000'] }),
    deploy_incr_number: typebox_1.Type.Integer({ examples: [752860] }),
}, { title: 'BIT-20 Token Response' });
exports.Brc20SupplySchema = typebox_1.Type.Object({
    max_supply: typebox_1.Type.String({ examples: ['21000000'] }),
    minted_supply: typebox_1.Type.String({ examples: ['1000000'] }),
    holders: typebox_1.Type.Integer({ examples: [240] }),
});
exports.Brc20SupplySchem = typebox_1.Type.Object({
    //  max_supply: Type.String({ examples: ['21000000'] }),
    //  minted_supply: Type.String({ examples: ['1000000'] }),
    holders: typebox_1.Type.Integer({ examples: [240] }),
});
exports.Brc20HolderResponseSchema = typebox_1.Type.Object({
    address: typebox_1.Type.String({
        examples: ['bc1pvwh2dl6h388x65rqq47qjzdmsqgkatpt4hye6daf7yxvl0z3xjgq247aq8'],
    }),
    overall_balance: typebox_1.Type.String({ examples: ['2000.00000'] }),
});
exports.Brc20TokenDetailsSchema = typebox_1.Type.Object({
    token: exports.Brc20TokenResponseSchema,
    supply: exports.Brc20SupplySchema,
}, { title: 'BRC-20 Token Details Response' });
exports.Brc20TokenDetailsSchem = typebox_1.Type.Object({
    ticker: exports.Brc20TokenResponseSchem,
    supply: exports.Brc20SupplySchem,
}, { title: 'BRC-20 Token Details Response' });
exports.NotFoundResponse = typebox_1.Type.Object({
    error: typebox_1.Type.Literal('Not found'),
}, { title: 'Not Found Response' });
exports.InvalidSatoshiNumberResponse = typebox_1.Type.Object({
    error: typebox_1.Type.Literal('Invalid satoshi ordinal number'),
}, { title: 'Invalid Satoshi Number Response' });
exports.InscriptionsPerBlock = typebox_1.Type.Object({
    block_height: typebox_1.Type.String({ examples: ['778921'] }),
    block_hash: typebox_1.Type.String({
        examples: ['0000000000000000000452773967cdd62297137cdaf79950c5e8bb0c62075133'],
    }),
    inscription_count: typebox_1.Type.String({ examples: ['100'] }),
    inscription_count_accum: typebox_1.Type.String({ examples: ['3100'] }),
    timestamp: typebox_1.Type.Integer({ examples: [1677733170000] }),
});
exports.InscriptionsPerBlockResponse = typebox_1.Type.Object({
    results: typebox_1.Type.Array(exports.InscriptionsPerBlock),
});
//# sourceMappingURL=schemas.js.map