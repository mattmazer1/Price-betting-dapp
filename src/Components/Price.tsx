import { useState } from "react";
const pricesWs = new WebSocket("wss://ws.coincap.io/prices?assets=ethereum");
/*eslint-disable*/
export default function Price() {
	const [ethPrice, setEthPrice] = useState<any>([]);
	pricesWs.onmessage = function (msg) {
		const ethData = msg.data;
		setEthPrice(ethData.slice(13, 20));
	};

	return (
		<div className="flex flex-row justify-center items-center text-3xl mt-10 ">
			<div className="mr-1">Eth price:</div>
			<div>{ethPrice != 0 ? ethPrice : "Loading..."}</div>
		</div>
	);
}
