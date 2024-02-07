"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BRC20_TRANSFERS_COLUMNS = exports.BRC20_DEPLOYS_COLUMNS = exports.BRC20_OPERATIONS = exports.DbBrc20EventOperation = exports.DbBrc20BalanceTypeId = void 0;
var DbBrc20BalanceTypeId;
(function (DbBrc20BalanceTypeId) {
    DbBrc20BalanceTypeId[DbBrc20BalanceTypeId["mint"] = 0] = "mint";
    DbBrc20BalanceTypeId[DbBrc20BalanceTypeId["transferIntent"] = 1] = "transferIntent";
    DbBrc20BalanceTypeId[DbBrc20BalanceTypeId["transferFrom"] = 2] = "transferFrom";
    DbBrc20BalanceTypeId[DbBrc20BalanceTypeId["transferTo"] = 3] = "transferTo";
})(DbBrc20BalanceTypeId = exports.DbBrc20BalanceTypeId || (exports.DbBrc20BalanceTypeId = {}));
var DbBrc20EventOperation;
(function (DbBrc20EventOperation) {
    DbBrc20EventOperation["deploy"] = "deploy";
    DbBrc20EventOperation["mint"] = "mint";
    DbBrc20EventOperation["transfer"] = "transfer";
    DbBrc20EventOperation["transferSend"] = "transfer_send";
})(DbBrc20EventOperation = exports.DbBrc20EventOperation || (exports.DbBrc20EventOperation = {}));
exports.BRC20_OPERATIONS = ['deploy', 'mint', 'transfer', 'transfer_send'];
exports.BRC20_DEPLOYS_COLUMNS = [
    'id',
    'inscription_id',
    'block_height',
    'tx_id',
    'address',
    'ticker',
    'max',
    'decimals',
    'limit',
    'minted_supply',
    'tx_count',
];
exports.BRC20_TRANSFERS_COLUMNS = [
    'id',
    'inscription_id',
    'brc20_deploy_id',
    'block_height',
    'tx_id',
    'from_address',
    'to_address',
    'amount',
];
//# sourceMappingURL=types.js.map