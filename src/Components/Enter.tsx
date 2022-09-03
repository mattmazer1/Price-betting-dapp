import { useState, useEffect, useContext } from "react";
import { contract } from "../ABI";
import { ErrorContext, LoadingContext } from "../App";
import { ethers } from "ethers";
/*eslint-disable*/
export default function Enter() {
	const { loading, setLoading } = useContext(LoadingContext);
	const { setShowError } = useContext(ErrorContext);
	const [ethPrice, setEthPrice] = useState<number>(0);
	const [amountEntered, setAmountEntered] = useState<number>(ethPrice);
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

	const handleSubmit = async (event: any) => {
		event.preventDefault();
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

	const fetchChainPrice = async () => {
		try {
			const fetchPrice = await contract.getLatestPrice();
			setEthPrice(fetchPrice.toString());
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
	}, [ethPrice]);

	const notEntered = () => {
		return (
			<>
				<div className="flex flex-col justify-center items-center text-xl mt-10 ">
					<div className="ml-8 mr-8 text-center">
						Each bet requires 0.01 Eth
					</div>
					<div className="ml-8 mr-8 text-center">
						You earn 0.05 Eth for each successful bet
					</div>
				</div>
				<div className="flex flex-col justify-center items-center">
					<form className="mt-10" onSubmit={handleSubmit}>
						<input
							className=" text-black w-20 h-8 rounded px-2 py-0.5 text-lg"
							type="text"
							pattern="[0-9]*"
							maxLength={6}
							minLength={3}
							value={amountEntered}
							onChange={(e) =>
								setAmountEntered((v: any) =>
									e.target.validity.valid ? e.target.value : v
								)
							}
						/>

						<input
							className=" bg-green-500 hover:bg-green-600 rounded h-8 w-16 bounce font-bold text-lg"
							type="submit"
							value="Bet"
						/>
					</form>
					<div className="mt-4 text-xs">
						You can only bet on the last three digits
					</div>
					<div className="text-xs">You have to be connected to bet</div>
				</div>
			</>
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
