Run these sequentially:

npx hardhat clean

npx hardhat compile

mv -rf src/artifacts .

npx hardhat node

npx hardhat run --network localhost scripts/deploy.js

npm run dev
