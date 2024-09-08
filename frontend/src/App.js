import "./App.css";
import { ethers } from "ethers";
import { useEffect, useState, useCallback } from "react";
import KirtanContract from "./contracts/KirtanContract.sol/KirtanContract.json";

function App() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(undefined);
  const [contract, setContract] = useState("");
  const abi = KirtanContract.abi;

  const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

  const connectWallet = useCallback(async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install the MetaMask extension");
        return;
      }

      const [selectedAddress] = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setSelectedAddress(selectedAddress);

      const _provider = new ethers.providers.Web3Provider(ethereum);
      await _provider.ready;
      const signer = _provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      setContract(contract);
    } catch (error) {
      console.error(error);
    }
  }, [abi]);

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  useEffect(() => {
    async function fetchData() {
      if (contract) {
        const _name = await contract.ownerName();
        setName(_name);

        const _bal = await contract.ownerBal();
        setBalance(ethers.utils.formatEther(_bal.toString()));
      }
    }
    fetchData();
  }, [contract]);

  window.ethereum.on("accountsChanged", (accounts) => {
    if (accounts[0] && accounts[0] !== selectedAddress) {
      connectWallet();
    }
  });

  async function handleTransfer() {
    try {
      if (!contract) {
        alert("Please connect your wallet first");
        return;
      }

      if (!amount || amount <= 0) {
        alert("Amount should be greater than 0");
        return;
      }

      const value = ethers.utils.parseEther(amount);
      const transaction = await contract.transferOwner({
        value,
      });

      await transaction.wait();

      const _bal = await contract.ownerBal();
      setBalance(ethers.utils.formatEther(_bal.toString()));

      alert("Transaction successful!");
    } catch (error) {
      console.error(error);
      alert("Transaction failed");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Contract Owner Name: {name}</h1>
        <p className="text-lg text-center mb-6">Contract Owner Balance: {balance} Ethers</p>
        <label htmlFor="transfer" className="block text-sm font-medium text-gray-700 mb-2">
          Transfer amount to Owner
        </label>
        <input
          type="number"
          id="transfer"
          inputMode="numeric"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
        />
        <button
          onClick={handleTransfer}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Transfer Owner
        </button>
      </div>
    </main>
  );
}

export default App;
