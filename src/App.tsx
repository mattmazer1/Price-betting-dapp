import { useState, createContext } from "react";

import Enter from "./Components/Enter";
import ErrorNotify from "./Components/Error";
import Loader from "./Components/Loader";
import Navbar from "./Components/Navbar";
import Price from "./Components/Price";

export const LoadingContext = createContext({
	loading: false,
	setLoading: (setLoading: boolean): void => {},
});

export const ErrorContext = createContext({
	showError: false,
	setShowError: (setShowError: boolean): void => {},
});

export default function App() {
	const [loading, setLoading] = useState<boolean>(false);
	const [showError, setShowError] = useState<boolean>(false);

	return (
		<div>
			<LoadingContext.Provider value={{ loading, setLoading }}>
				<ErrorContext.Provider value={{ showError, setShowError }}>
					<ErrorNotify />
					<Navbar />
					<Loader />
					<Price />
					<Enter />
				</ErrorContext.Provider>
			</LoadingContext.Provider>
		</div>
	);
}
