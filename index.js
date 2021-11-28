import alfy from "alfy";
import dayjs from "dayjs";
function numberWithCommas(x) {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
const ticker = alfy.input;

if (ticker.length === 6) {
	const data = await alfy.fetch("https://indodax.com/api/ticker/" + ticker);

	if (data.error) {
		alfy.error(`Ticker ${ticker} not found, try something like BTCIDR`);
	} else {
		alfy.output([
			{
				title: `Ticker: ${ticker.toUpperCase()}`,
				subtitle: `Current Price: Rp.${numberWithCommas(data.ticker.last)}`,
			},
		]);
	}
} else {
	if (ticker === "all") {
		const data = await alfy.fetch("https://indodax.com/api/ticker_all");

		const result = [];

		result.push(
			{
				title: "Ticker: BTCIDR",
				subtitle: `Current Price: Rp.${numberWithCommas(
					data.tickers["btc_idr"].last
				)}`,
			},
			{
				title: "Ticker: ETHIDR",
				subtitle: `Current Price: Rp.${numberWithCommas(
					data.tickers["eth_idr"].last
				)}`,
			},
			{
				title: "Ticker: USDTIDR",
				subtitle: `Current Price: Rp.${numberWithCommas(
					data.tickers["usdt_idr"].last
				)}`,
			},
			{
				title: "Ticker: BNBIDR",
				subtitle: `Current Price: Rp.${numberWithCommas(
					data.tickers["bnb_idr"].last
				)}`,
			},
			{
				title: "Ticker: HNSTIDR",
				subtitle: `Current Price: Rp.${numberWithCommas(
					data.tickers["hnst_idr"].last
				)}`,
			}
		);
		alfy.output(result);
	}
}
