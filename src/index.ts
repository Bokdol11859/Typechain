import * as CryptoJS from "crypto-js";

class Block {
  static calculateBlockHash(
    index: number,
    previousHash: string,
    timeStamp: number,
    data: string
  ): string {
    return CryptoJS.SHA256(index + previousHash + timeStamp + data).toString();
  }

  static validateStructure(aBlock: Block): boolean {
    return (
      typeof aBlock.index === "number" &&
      typeof aBlock.hash === "string" &&
      typeof aBlock.previousHash === "string" &&
      typeof aBlock.timeStamp === "number" &&
      typeof aBlock.data === "string"
    );
  }

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timeStamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timeStamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timeStamp = timeStamp;
  }
}

const genesisBlock: Block = new Block(
  0,
  "20202020202",
  "",
  "First Block",
  123456
);

let blockchain: Block[] = [genesisBlock];

function getBlockchain(): Block[] {
  return blockchain;
}

function getLatestBlock(): Block {
  return blockchain[blockchain.length - 1];
}

function getNewTimeStamp(): number {
  return Math.round(new Date().getTime() / 1000);
}

function createNewBlock(data: string): Block {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock);
  return newBlock;
}

function getHashForBlock(aBlock: Block): string {
  return Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timeStamp,
    aBlock.data
  );
}

function isBlockValid(candidateBlock: Block, previousBlock: Block): boolean {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
}

function addBlock(candidateBlock: Block): void {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
}

createNewBlock("Second Block");
createNewBlock("Third Block");
createNewBlock("Fourth Block");
createNewBlock("Fifth Block");
console.log(blockchain);

export {};
