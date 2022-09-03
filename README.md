## Eth price betting dapp

https://eth-price-bet.netlify.app/

A betting dapp, where you bet on Eth's last 3 digits to be higher or lower than Eth's price after 20 seconds.

This is more of a proof of concept than something that is usable. The oracle price feed has a big delay compared to the live price. And to accept the result transaction within the time frame leads to poor UX as the block confirmation times are very unpredictable.

Everything related to time and prices should be off chain.

### Stack:

Solidity, Ethers, React, Typescript, Tailwind, Hardhat
