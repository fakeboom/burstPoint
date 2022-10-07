pragma experimental ABIEncoderV2;
pragma solidity ^0.6.12;
import "@openzeppelin/contracts/access/Ownable.sol";




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
    uint256 public gameLast = 100;

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
        uint256 burstValue = random(1100);
        GameRecord memory gRecord  = GameRecord(burstValue, playerAddresses, GRecordStatus.Pending);
        gameRecords[id] = gRecord;
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

