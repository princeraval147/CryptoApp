export interface Product {
  id: number;
  symbol: string;
  description: string;
  notional_type: string;
  impact_size: number;
  initial_margin: string;
  maintenance_margin: string;
  contract_value: string;
  contract_unit_currency: string;
  tick_size: string;
  state: string;
  trading_status: string;
  default_leverage: string;
  taker_commission_rate: string;
  maker_commission_rate: string;
  contract_type: string;
  position_size_limit: number;

  underlying_asset: {
    id: number;
    symbol: string;
    precision: number;
    deposit_status: string;
    withdrawal_status: string;
  };

  quoting_asset: {
    id: number;
    symbol: string;
    precision: number;
    deposit_status: string;
    withdrawal_status: string;
  };

  settling_asset: {
    id: number;
    symbol: string;
    precision: number;
    deposit_status: string;
    withdrawal_status: string;
  };

  spot_index: {
    id: number;
    symbol: string;
    constituent_exchanges: {
      name: string;
      weight: number;
    }[];
    underlying_asset_id: number;
    quoting_asset_id: number;
    tick_size: string;
    index_type: string;
  };
}
