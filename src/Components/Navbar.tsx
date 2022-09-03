import { useState, useEffect, useContext } from "react";
import { provider } from "../ABI";
import { ErrorContext } from "../App";

export default function Navbar() {
	const { setShowError } = useContext(ErrorContext);
	const [buttonText, setButtonText] = useState<string>("Connect wallet");

	const connectNetwork = async () => {
		const chainId = 5; //goerli
		if (window.ethereum.networkVersion !== chainId) {
			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: "0x5" }],
			});
		}
	};

	const connectWallet = async () => {
		if (window.ethereum) {
			await provider.send("eth_requestAccounts", []);
			connectNetwork();
			window.ethereum.on("accountsChanged", function () {
				window.location.reload();
			});

			window.ethereum.on("networkChanged", function () {
				window.location.reload();
			});
		} else {
			setButtonText("Connect Wallet");
			setShowError(true);
			const err = setTimeout(() => {
				setShowError(false);
			}, 1000);

			return () => clearTimeout(err);
		}
	};
	const persistRender = async () => {
		const accounts = await provider.listAccounts();
		if (accounts.length > 0) {
			setButtonText("Connected");

			connectNetwork();
		} else {
			setButtonText("Connect wallet");
		}

		window.ethereum.on("accountsChanged", function () {
			window.location.reload();
			console.log("test");
		});

		window.ethereum.on("networkChanged", function () {
			window.location.reload();
			console.log("testing");
		});
	};
	useEffect(() => {
		persistRender();
	}, []);

	return (
		<div>
			<button
				onClick={connectWallet}
				className="absolute mt-5 right-2 text-xl bg-orange-600 rounded-lg px-3 py-2 hover:bg-orange-700 bounce"
			>
				{buttonText}
			</button>
			<div className="flex flex-col justify-center items-center text-xl">
				<div className="mt-52 ml-10 mr-10 text-center">
					Predict the price of Eth to be greater or lower than the current price
					20 seconds ahead of time!
				</div>
			</div>
		</div>
	);
}
