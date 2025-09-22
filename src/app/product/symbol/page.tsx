"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

export default function ProductPage({
  params,
}: {
  params: { symbol: string };
}) {
  const { symbol } = params;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`/API/products/${symbol}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.result || null); // API wraps product in result
      })
      .catch((err) => console.error(err));
  }, [symbol]);

  console.log("product = ", product);

  if (!product) return <p>Loading...</p>;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">{product.symbol}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4 shadow">
          <h2 className="font-bold mb-2">Contract Info</h2>
          <p>Type: {product.contract_type}</p>
          <p>Tick Size: {product.tick_size}</p>
          <p>Impact Size: {product.impact_size}</p>
          <p>Initial Margin: {product.initial_margin}</p>
          <p>Maintenance Margin: {product.maintenance_margin}</p>
        </div>

        <div className="border rounded-lg p-4 shadow">
          <h2 className="font-bold mb-2">Assets</h2>
          <p>Underlying: {product.underlying_asset.symbol}</p>
          <p>Quoting: {product.quoting_asset.symbol}</p>
          <p>Settling: {product.settling_asset.symbol}</p>
        </div>

        <div className="border rounded-lg p-4 shadow md:col-span-2">
          <h2 className="font-bold mb-2">Spot Index</h2>
          <p>Index: {product.spot_index.symbol}</p>
          <ul className="list-disc ml-5">
            {product.spot_index.constituent_exchanges.map((ex, i) => (
              <li key={i}>
                {ex.name} (weight: {ex.weight})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
