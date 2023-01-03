a)If you did not change the mygov.sol file:

You need two separate terminals to execute these commands:

1-> npm i;npx hardhat node

2-> npx hardhat run --network localhost scripts/deploy.js;npm run dev

b)If you did:

npx hardhat clean

npx hardhat compile

cp -rf src/artifacts .

Then you can go the option a.
