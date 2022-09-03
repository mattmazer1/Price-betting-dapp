import { ethers } from "ethers";

export const ABI = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "caller",
				type: "address",
			},
		],
		name: "Lost",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "caller",
				type: "address",
			},
		],
		name: "Won",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "LoH",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getLatestPrice",
		outputs: [
			{
				internalType: "int256",
				name: "",
				type: "int256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "payContract",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "priceE",
		outputs: [
			{
				internalType: "int256",
				name: "",
				type: "int256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "result",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "int256",
				name: "priceEstimate",
				type: "int256",
			},
		],
		name: "setBet",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [],
		name: "withdraw",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];

export const contractAddress: string =
	"0xCba263Afe0ab77Ffd105cEFb4eDad9fEA77e7Eb4";

export let provider = window.ethereum
	? new ethers.providers.Web3Provider(window.ethereum)
	: new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_PROVIDER);

export const signer = provider.getSigner();

export const contract = new ethers.Contract(contractAddress, ABI, signer);
