import { useState, useEffect, useContext } from "react";
import { contract } from "./Navbar";
import { ErrorContext, LoadingContext } from "../App";
import { ethers } from "ethers";
/*eslint-disable*/
export default function Enter() {
	const { loading, setLoading } = useContext(LoadingContext);
	const { setShowError } = useContext(ErrorContext);
	const [ethPrice, setEthPrice] = useState<number>(0);
	const [amountEntered, setAmountEntered] = useState<number>(ethPrice);
	const [amountEnteredTwo, setAmountEnteredTwo] = useState<number>(0);
	const [amountEnteredThree, setAmountEnteredThree] = useState<number>(0);
	const [paid, setPaid] = useState<boolean>(false);
	const [outcome, setOutcome] = useState<string>("");
	const [reveal, setReveal] = useState<boolean>(false);

	const revealResult = async () => {
		const waitForTimer = setTimeout(async () => {
			try {
				setReveal(true);
				const result = await contract.result();
				await result.wait(1);
				setLoading(false);
			} catch (error) {
				setShowError(true);
				const err = setTimeout(() => {
					setShowError(false);
				}, 1000);

				return () => clearTimeout(err);
			}
		}, 22000);
		return () => clearTimeout(waitForTimer);
	};

	const buttonReveal = async () => {
		try {
			if (reveal === true) {
				const result = await contract.result();
				await result.wait(1);
				setLoading(false);
			} else {
				console.log("button rev error");
			}
		} catch (error) {
			setShowError(true);
			const err = setTimeout(() => {
				setShowError(false);
			}, 1000);

			return () => clearTimeout(err);
		}
	};

	const submitOne = async () => {
		try {
			const setTheBet = await contract.setBet(amountEntered, {
				value: ethers.utils.parseEther((0.01).toString()),
			});
			console.log(amountEntered);
			await setTheBet.wait(1);
			setPaid(true);
			setLoading(true);

			revealResult();

			contract.on("Won", (caller, event) => {
				setOutcome("You won 0.05 Eth!");
				const showStatus = setTimeout(() => {
					window.location.reload();
					setPaid(false);
					setReveal(false);
					setOutcome("");
				}, 4000);
				return () => clearTimeout(showStatus);
			});

			contract.on("Lost", (caller, event) => {
				setOutcome("You lost!");
				const showStatus = setTimeout(() => {
					window.location.reload();
					setPaid(false);
					setReveal(false);
					setOutcome("");
				}, 4000);
				return () => clearTimeout(showStatus);
			});
		} catch (error) {
			setShowError(true);
			const err = setTimeout(() => {
				setShowError(false);
			}, 1000);

			return () => clearTimeout(err);
		}
	};

	const submitTwo = async () => {
		try {
			const setTheBet = await contract.setBet(amountEnteredTwo, {
				value: ethers.utils.parseEther((0.01).toString()),
			});
			console.log(amountEnteredTwo);
			await setTheBet.wait(1);
			setPaid(true);
			setLoading(true);

			revealResult();

			contract.on("Won", (caller, event) => {
				setOutcome("You won 0.05 Eth!");
				const showStatus = setTimeout(() => {
					window.location.reload();
					setPaid(false);
					setReveal(false);
					setOutcome("");
				}, 4000);
				return () => clearTimeout(showStatus);
			});

			contract.on("Lost", (caller, event) => {
				setOutcome("You lost!");
				const showStatus = setTimeout(() => {
					window.location.reload();
					setPaid(false);
					setReveal(false);
					setOutcome("");
				}, 4000);
				return () => clearTimeout(showStatus);
			});
		} catch (error) {
			setShowError(true);
			const err = setTimeout(() => {
				setShowError(false);
			}, 1000);

			return () => clearTimeout(err);
		}
	};

	const submitThree = async () => {
		try {
			const setTheBet = await contract.setBet(amountEnteredThree, {
				value: ethers.utils.parseEther((0.01).toString()),
			});
			console.log(amountEnteredThree);
			await setTheBet.wait(1);
			setPaid(true);
			setLoading(true);

			revealResult();

			contract.on("Won", (caller, event) => {
				setOutcome("You won 0.05 Eth!");
				const showStatus = setTimeout(() => {
					window.location.reload();
					setPaid(false);
					setReveal(false);
					setOutcome("");
				}, 4000);
				return () => clearTimeout(showStatus);
			});

			contract.on("Lost", (caller, event) => {
				setOutcome("You lost!");
				const showStatus = setTimeout(() => {
					window.location.reload();
					setPaid(false);
					setReveal(false);
					setOutcome("");
				}, 4000);
				return () => clearTimeout(showStatus);
			});
		} catch (error) {
			setShowError(true);
			const err = setTimeout(() => {
				setShowError(false);
			}, 1000);

			return () => clearTimeout(err);
		}
	};

	const fetchChainPrice = async () => {
		try {
			const fetchPrice = await contract.getLatestPrice();
			const stringPrice = fetchPrice.toString();
			setEthPrice(parseInt(stringPrice));
		} catch (error) {
			setShowError(true);
			const err = setTimeout(() => {
				setShowError(false);
			}, 1000);

			return () => clearTimeout(err);
		}
	};

	useEffect(() => {
		fetchChainPrice();
		setAmountEntered(ethPrice);
		setAmountEnteredTwo(ethPrice - 243);
		setAmountEnteredThree(ethPrice + 243);
	}, [ethPrice]);

	const notEntered = () => {
		return (
			<div className="flex justify-center mt-10 mb-40">
				<div className="block text-white p-1 rounded-lg shadow-lg bg-slate-800 max-w-xs sm:max-w-sm">
					<div className="flex flex-col justify-center items-center text-lg mt-10 ">
						<div className="ml-8 mr-8 text-center">
							Each bet requires 0.01 Eth
						</div>
						<div className="ml-8 mr-8 text-center">
							You earn 0.05 Eth for each successful bet
						</div>
					</div>
					<div className="flex flex-col justify-center items-center">
						<button onClick={submitOne} className="buttonBase mt-10">
							{amountEntered}
						</button>
						<p className=" text-xs">Bet</p>
						<button onClick={submitTwo} className="buttonBase mt-8">
							{amountEnteredTwo}
						</button>
						<p className=" text-xs">Bet</p>
						<button onClick={submitThree} className="buttonBase mt-8 ">
							{amountEnteredThree}
						</button>
						<p className=" text-xs">Bet</p>
						<div className="mt-10 text-md ml-8 mr-8 text-center">
							You can only bet on the last three digits
						</div>
						<div className="text-sm mb-10 ml-8 mr-8 text-center">
							You have to be connected to bet
						</div>
					</div>
				</div>
			</div>
		);
	};
	const entered = () => {
		return (
			<div className="flex flex-col justify-center items-center mt-10 text-xl">
				<div className="ml-10 mr-10 text-center">
					You can get the results once the button turns purple
				</div>
				<div className="ml-10 mr-10 text-center">
					You will have 30 seconds to accept the transaction and for it to be
					verified otherwise it will fail
				</div>
				{reveal ? (
					<button onClick={buttonReveal} className="buttonBase mt-6">
						Get results
					</button>
				) : (
					<button className="buttonBase mt-6 bg-stone-600 hover:bg-stone-600 cursor-wait">
						Get results
					</button>
				)}

				<div className="text-2xl mt-5">{outcome}</div>
			</div>
		);
	};
	return (
		<div>
			<>{paid ? entered() : notEntered()}</>
		</div>
	);
}
