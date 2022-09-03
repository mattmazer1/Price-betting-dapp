import { useContext } from "react";
import { LoadingContext } from "../App";

export default function Loader() {
	const { loading } = useContext(LoadingContext);
	return (
		<div className=" flex justify-center" id={loading ? "on" : "off"}>
			<div className="loader mt-72"></div>
		</div>
	);
}
