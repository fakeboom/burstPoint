// SPDX-License-Identifier: MIT
// Sources flattened with hardhat v2.11.2 https://hardhat.org

// File @openzeppelin/contracts/utils/Context.sol@v3.4.2



pragma solidity >=0.6.0 <0.8.0;

/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with GSN meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}


// File @openzeppelin/contracts/access/Ownable.sol@v3.4.2



pragma solidity >=0.6.0 <0.8.0;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () internal {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}


// File contracts/BurstPointSapp.sol

pragma experimental ABIEncoderV2;
pragma solidity ^0.6.12;

//mark the status of  BetRecord 
enum BRecordStatus { Invalid, Bet, Escape}

//mark the status of  GameRecord 
enum GRecordStatus { Invalid, Pending, Closed}


//bet record in single game
struct BetRecord{
    uint256 betAmount; 
    uint256 burstValue;
    uint256 escapeBlockNum;
    BRecordStatus status;
}


//game record
struct GameRecord{
    uint256 burstValue;
    mapping(address => BetRecord) betRecords;
    address [] playerAddresses;
    GRecordStatus status;
}

contract BurstPoint is Ownable{

    mapping(uint256 => GameRecord) private gameRecords;

    //BurstValue expand 100 times ---- 1.1 => 110 
    uint256 public multiple = 100; 

    //player can bet after game begin and last 10 blockNumber
    uint256 public betLast = 10;

    //player can escape after bet end and last 100 blockNumber, so burstValue less than 1100
    uint256 public gameLast = 50;

    //BurstValue increase 10 perBlock
    uint256 public increasePerBlock = 10;


    constructor() public onlyOwner{

    }


    function ownerAdd() external payable onlyOwner{
    }


    //get a random value in [0, number]
    function random(uint number) public view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
            msg.sender))) % number;
    }


    //begin a singel Game and set burstValue by sha256
    // id : the blockNumber of the game start at  

    function beginGame(uint256 id) external onlyOwner{
        address[] memory playerAddresses = new address[](0);
        uint256 burstValue = random(multiple + gameLast * increasePerBlock);
        GameRecord memory gRecord  = GameRecord(burstValue, playerAddresses, GRecordStatus.Pending);
        gameRecords[id] = gRecord;
    }

    function getBurstValue(uint256 id) external view onlyOwner returns(uint256){
        GameRecord storage gameRecord =  gameRecords[id];
        require(gameRecord.status != GRecordStatus.Invalid, "game is not exist");
        return  gameRecord.burstValue;
    }


    //player guess the burstValue
    function bet(uint256 id, uint256 burstValue) external payable {
        GameRecord storage gameRecord =  gameRecords[id];
        require(gameRecord.status == GRecordStatus.Pending 
            && block.number <= id + betLast 
            && gameRecord.betRecords[msg.sender].status == BRecordStatus.Invalid
            ,"bet time error or have already bet"
            );

        BetRecord memory r = BetRecord(msg.value, burstValue, 0, BRecordStatus.Bet);

        gameRecord.betRecords[msg.sender] = r;
        gameRecord.playerAddresses.push(msg.sender);
    }

    function escape(uint256 id) external {
        require(block.number > id + betLast && block.number <= id + betLast + gameLast, "escape time error");
        GameRecord storage gameRecord =  gameRecords[id];
        require( gameRecord.status == GRecordStatus.Pending, "game not start");
        BetRecord storage r = gameRecord.betRecords[msg.sender];
        require(r.status == BRecordStatus.Bet, "it is not right status to escape");
        r.escapeBlockNum = block.number;

        //r.multi = (block.number - blockNum) * (r.multi - 100) / 100 + 100;
    }


    function totalBalance() external view returns (uint256){
        return address(this).balance;
    }


    //close the game and transfer the reword player should get
    //normally burstValue > 100
    function closeGame(uint256 id) external onlyOwner {
        require(block.number > id + betLast + gameLast, "close time error");
        GameRecord storage gameRecord =  gameRecords[id];
        require( gameRecord.status == GRecordStatus.Pending, "game not start");
        uint256 burstValue = gameRecord.burstValue;
        address[] memory playerAddresses = gameRecord.playerAddresses;
        for(uint i = 0; i < playerAddresses.length; i++){
            BetRecord memory r = gameRecord.betRecords[playerAddresses[i]];
            uint256 playerGuess;
            if(r.status == BRecordStatus.Bet){
                playerGuess = r.burstValue;
            }
            else if(r.status == BRecordStatus.Escape){
                playerGuess = ( r.escapeBlockNum - id - betLast) * increasePerBlock + multiple ;
                if( playerGuess > r.burstValue){
                    playerGuess = r.burstValue;
                }
            }

            if(playerGuess <= burstValue){
                uint re = r.betAmount * playerGuess / multiple;
                payable(playerAddresses[i]).transfer(re);
            }
        }
        gameRecord.status = GRecordStatus.Closed;
    }

    function getGameRecords(uint256 id) external view returns(address[] memory, BetRecord[] memory){
        GameRecord storage gameRecord =  gameRecords[id];
        address[] memory playerAddresses = gameRecord.playerAddresses;
        BetRecord[] memory records = new BetRecord[](playerAddresses.length);
        for(uint i = 0; i < playerAddresses.length; i++){
            BetRecord memory r = gameRecord.betRecords[playerAddresses[i]];
            records[i] = r;
        }
        return (playerAddresses, records);
    }


   

    // function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
    //     uint8 i = 0;
    //     while(i < 32 && _bytes32[i] != 0) {
    //         i++;
    //     }
    //     bytes memory bytesArray = new bytes(i);
    //     for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
    //         bytesArray[i] = _bytes32[i];
    //     }
    //     return string(bytesArray);
    // }

    // function testSha(string memory password) external pure returns(bytes32){
    //     bytes32 gen = sha256(abi.encode(password));
    //     return gen;
    // }

    // function testStr(uint multi, string memory password) external pure returns(string memory){
    //     string memory gen = string(abi.encodePacked(Strings.toString(multi), password));
    //     return gen;
    // }

   

    

}
