Run these sequentially:

npm i

npx hardhat clean

npx hardhat compile

cp -rf src/artifacts .

npx hardhat node

npx hardhat run --network localhost scripts/deploy.js

npm run dev
