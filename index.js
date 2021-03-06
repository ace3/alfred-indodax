import alfy from "alfy";
import dayjs from "dayjs";
import formatThousands from "format-thousands";

let [ticker, amount = 1] = alfy.input.trim().split(" ");

const data = await alfy.fetch("https://indodax.com/api/ticker_all", {
  maxAge: 1000 * 60,
});

let item;
if (ticker.includes('idr')) {
  item = data.tickers[ticker.replace("idr", "_idr")] || undefined;
}
else {
  item = data.tickers[`${ticker}_idr`] || undefined;
}


if (item) {
  const date = dayjs(item.server_time * 1000).format("DD MMM YYYY HH:mm:ss");
  const price = formatThousands(item.last * amount, ".");
  const output = [
    {
      title: `${ticker.replace("idr", "/idr").toUpperCase()} - Rp. ${price}`,
      subtitle: `Last update: ${date} (cmd+c to copy the price)`,
      arg: `${ticker
        .replace("idr", "/idr")
        .toUpperCase()} - Rp. ${price} | Last update: ${date}`,
      quicklookurl: `https://indodax.com/market/${ticker.toUpperCase()}`,
      valid: true,
    },
  ];
  alfy.output(output);
} else {
  alfy.error(`Pair ${ticker} not found.`);
}
