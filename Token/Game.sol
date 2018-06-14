pragma solidity ^0.4.23;

/* Remix.Ethereum.org */
contract Game {

    struct Player {
        uint256 id;
        bool active;
        address playerAddress;
    }

    mapping (address => Player) players;

    event GameJoined (address playerAddress, string id);

    modifier isActive() {
        if(players[msg.sender].active != true ) {
          _;
        }
    }

    function setPlayer(address playerAddress) internal isActive {
        /*string[] memory currentPlayers;
        currentPlayers.push(players[msg.sender]);*/
    }

    function getPlayer() constant public returns (string[]) {
        return players[msg.sender];
    }

    function startNewGame() internal {
        GameJoined(msg.sender, "Generate Random String");
    }

}
