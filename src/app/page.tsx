// "use client";

// import { useEffect, useState } from "react";

// export default function Home() {
//   interface Index {
//     id: number;
//     symbol: string;
//     description: string;
//     price_method: string;
//     index_type: string;
//     is_composite: boolean;
//     impact_size: string;
//     tick_size: string; // ✅ Include this
//     config: any;
//     constituent_exchanges: any[];
//     constituent_indices: any | null;
//     quoting_asset_id: number;
//     underlying_asset_id: number;
//   }

//   const [indices, setIndices] = useState<Index[]>([]);

//   useEffect(() => {
//     fetch("/API/deltaIndices")
//       .then((res) => res.json())
//       .then((data) => setIndices(data.result))
//       .catch((err) => console.error(err));
//   }, []);

//   console.log("Indices : ", indices);

//   return (
//     <main className="p-8">
//       <h1 className="text-3xl font-bold mb-4">Delta Exchange Indices</h1>
//       <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {indices.map((index) => (
//           <li
//             key={index.id}
//             className="border p-4 rounded-lg shadow hover:shadow-lg transition"
//           >
//             <h2 className="font-bold text-lg">{index.symbol}</h2>
//             <p className="text-sm text-gray-500">{index.description}</p>
//             <p>Type: {index.index_type}</p>
//             <p>Price Method: {index.price_method}</p>
//             <p>Impact Size: {index.impact_size}</p>
//             <p>Tick Size: {index.tick_size}</p>
//           </li>
//         ))}
//       </ul>{" "}
//     </main>
//   );
// }

// products
"use client";

import { useEffect, useState } from "react";

interface Asset {
  id: number;
  symbol: string;
  precision: number;
  deposit_status: string;
  withdrawal_status: string;
}

interface Exchange {
  name: string;
  weight: number;
}

interface SpotIndex {
  id: number;
  symbol: string;
  constituent_exchanges: Exchange[];
  underlying_asset_id: number;
  quoting_asset_id: number;
  tick_size: string;
  index_type: string;
}

interface Product {
  id: number;
  symbol: string;
  description: string;
  contract_type: string;
  default_leverage: string;
  impact_size: number;
  tick_size: string;
  state: string;
  trading_status: string;
  underlying_asset: Asset;
  quoting_asset: Asset;
  settling_asset: Asset;
  spot_index: SpotIndex;
}

export default function DeltaProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.india.delta.exchange/v2/products", {
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => setProducts(data.result || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Delta Exchange Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="font-bold text-xl mb-2">{product.symbol}</h2>
            <p className="text-sm text-gray-500 mb-2">{product.description}</p>
            <div className="text-sm space-y-1">
              <p>
                <span className="font-semibold">Contract Type:</span>{" "}
                {product.contract_type}
              </p>
              <p>
                <span className="font-semibold">Leverage:</span>{" "}
                {product.default_leverage}x
              </p>
              <p>
                <span className="font-semibold">Impact Size:</span>{" "}
                {product.impact_size}
              </p>
              <p>
                <span className="font-semibold">Tick Size:</span>{" "}
                {product.tick_size}
              </p>
              <p>
                <span className="font-semibold">State:</span> {product.state}
              </p>
              <p>
                <span className="font-semibold">Trading Status:</span>{" "}
                {product.trading_status}
              </p>
              <p>
                <span className="font-semibold">Underlying Asset:</span>{" "}
                {product.underlying_asset.symbol}
              </p>
              <p>
                <span className="font-semibold">Quoting Asset:</span>{" "}
                {product.quoting_asset.symbol}
              </p>
              <p>
                <span className="font-semibold">Spot Index:</span>{" "}
                {product.spot_index.symbol} ({product.spot_index.index_type})
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
