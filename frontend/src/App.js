
import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

function App() {
    const [address, setAddress] = useState(null);
    const [message, setMessage] = useState(null);
    const [signature, setSignature] = useState(null);
    const [verified, setVerified] = useState(false);

    async function connectWallet() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            setAddress(accounts[0]);

            const { data } = await axios.get(`http://localhost:5000/nonce/${accounts[0]}`);
            setMessage(`Sign this message to authenticate: ${data.nonce}`);
        } else {
            alert("Please install MetaMask!");
        }
    }

    async function signMessage() {
        if (!message || !address) return;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signedMessage = await signer.signMessage(message);
        setSignature(signedMessage);

        const response = await axios.post("http://localhost:5000/verify", {
            address,
            signature: signedMessage,
        });

        if (response.data.success) {
            setVerified(true);
        } else {
            alert("Verification failed!");
        }
    }

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Web3 Authentication with MetaMask</h1>
            <button onClick={connectWallet} className="bg-blue-500 text-white p-2 rounded">
                {address ? `Connected: ${address}` : "Connect Wallet"}
            </button>
            {message && !signature && (
                <button onClick={signMessage} className="bg-green-500 text-white p-2 rounded mt-2">
                    Sign Message
                </button>
            )}
            {verified && <p className="text-green-500 mt-2">Authentication Successful!</p>}
        </div>
    );
}

export default App;
