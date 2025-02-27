
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
app.use(express.json());
app.use(cors());

const nonceStore = {};

app.get("/nonce/:address", (req, res) => {
    const { address } = req.params;
    const nonce = Math.floor(Math.random() * 1000000).toString();
    nonceStore[address] = nonce;
    res.json({ nonce });
});

app.post("/verify", (req, res) => {
    const { address, signature } = req.body;
    const nonce = nonceStore[address];
    if (!nonce) return res.status(400).json({ error: "Nonce not found" });

    const message = `Sign this message to authenticate: ${nonce}`;
    const signerAddress = ethers.utils.verifyMessage(message, signature);

    if (signerAddress.toLowerCase() === address.toLowerCase()) {
        res.json({ success: true, address });
    } else {
        res.status(400).json({ error: "Invalid signature" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
