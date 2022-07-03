import React, { useEffect } from "react";

const FILMS_QUERY = `
{
  uniswapFactory(
    id: "0x017603C8f29F7f6394737628a93c57ffBA1b7256"
  ) {
    totalVolumeUSD
    totalLiquidityUSD
  }
}
`;

export default function Api() {
    const launches = useLaunches();
    return (
        <div className="py-4" id="text_api">
            <div className="container bg-primary">
                <div className="row">
                    <div className="col-sm-6 text-center">
                        <h4>
                            $
                            {launches.totalVolumeUSD &&
                                launches.totalVolumeUSD
                                    .slice(0, 12)}
                        </h4>
                        <p>Total Volume (USD)</p>
                    </div>
                    <div className="col-sm-6 text-center">
                        <h4>
                            $
                            {launches.totalLiquidityUSD &&
                                launches.totalLiquidityUSD
                                    .slice(0, 10)}
                        </h4>
                        <p>Total Liquidity (USD)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function useLaunches() {
    const [launches, setLaunches] = React.useState([]);
    React.useEffect(() => {
        fetch(
            "https://api.thegraph.com/subgraphs/name/huckleberrydex/huckleberry-subgraph",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: FILMS_QUERY }),
            }
        )
            .then((response) => response.json())
            .then((data) => setLaunches(data.data.uniswapFactory));
    }, []);
    return launches;
}
