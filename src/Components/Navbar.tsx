import { useState, useEffect, useContext } from "react";
import { ABI } from "../ABI";
import { ErrorContext } from "../App";
import { ethers } from "ethers";

export const contractAddress: string =
	"0xCba263Afe0ab77Ffd105cEFb4eDad9fEA77e7Eb4";

export let provider = window.ethereum
	? new ethers.providers.Web3Provider(window.ethereum)
	: new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_PROVIDER);

export let signer: any =
	window.ethereum && window.ethereum.selectedAddress
		? provider.getSigner()
		: undefined;

export let contract = new ethers.Contract(
	contractAddress,
	ABI,
	signer ?? provider
);
/*eslint-disable*/
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
			signer = provider.getSigner();
			contract = contract.connect(signer);
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
				<div className="mt-32 ml-10 mr-10 text-center">
					Predict the price of Eth to be greater or lower than the current price
					20 seconds ahead of time!
				</div>
			</div>
		</div>
	);
}
