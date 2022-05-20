npm create vite@latest // CREATE A REACT_VITE_TYPESCRIPT

npm i @openzeppelin/contracts // Install openzeppelin solydity smart_contracts
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6 // install styles lib for react
npm i hardhat -D
npm i dotenv -D
npm i @nomiclabs/hardhat-waffle
npm i --save-dev "@nomiclabs/hardhat-ethers@^2.0.0" "ethereum-waffle@^3.2.0" "ethers@^5.0.0"

// dotenv config 
REACT_APP_RINKEBY_RPC_URL=''
REACT_APP_ETHERSCAN_KEY=''
REACT_APP_PRIVATE_KEY=''

npx hardhat clean 
npx hardhat compile
npx hardhat run scripts/deployRoboPunksNFT.js --network rinkeby

npm i -D @nomiclabs/hardhat-etherscan // Lib for verify and publish contract
npx hardhat verify --network rinkeby 
npx hardhat verify --network rinkeby 0xADf1245580Fc67252f1939b382998b146cf7B07c