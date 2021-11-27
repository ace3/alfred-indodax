import alfy from "alfy";
function numberWithCommas(x) {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
const ticker = alfy.input;

if (ticker.length >= 6) {
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
}
