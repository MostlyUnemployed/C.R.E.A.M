pragma solidity 0.5.0;

contract WETH9 {
    string public name     = "Wrapped Ether";
    string public symbol   = "WETH";
    uint8  public decimals = 18;

    event  Approval(address indexed src, address indexed guy, uint wad);
    event  Transfer(address indexed src, address indexed dst, uint wad);
    event  Deposit(address indexed dst, uint wad);
    event  Withdrawal(address indexed src, uint wad);

    mapping (address => uint)                       public  balanceOf;
    mapping (address => mapping (address => uint))  public  allowance;

    function() external payable {
        deposit();
    }
    function deposit() public payable {
        balanceOf[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    function withdraw(uint wad) public {
        require(balanceOf[msg.sender] >= wad);
        balanceOf[msg.sender] -= wad;
        msg.sender.transfer(wad);
        emit Withdrawal(msg.sender, wad);
    }

    function totalSupply() public view returns (uint) {
        return address(this).balance;
    }

    function approve(address guy, uint wad) public returns (bool) {
        allowance[msg.sender][guy] = wad;
        emit Approval(msg.sender, guy, wad);
        return true;
    }

    function transfer(address dst, uint wad) public returns (bool) {
        return transferFrom(msg.sender, dst, wad);
    }

    function transferFrom(address src, address dst, uint wad)
        public
        returns (bool)
    {
        require(balanceOf[src] >= wad);

        if (src != msg.sender && allowance[src][msg.sender] != uint(-1)) {
            require(allowance[src][msg.sender] >= wad);
            allowance[src][msg.sender] -= wad;
        }

        balanceOf[src] -= wad;
        balanceOf[dst] += wad;

        emit Transfer(src, dst, wad);

        return true;
    }
}

interface Compound {

  function supply(address asset, uint amount) external returns (uint);

  function withdraw(address asset, uint requestedAmount) external returns (uint);

}

contract Cream {

//   address public constant COMPOUND_ADDRESS = 0x3FDA67f7583380E67ef93072294a7fAc882FD7E7;
//   address public constant WETH_ADDRESS = 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2;

  address public constant COMPOUND_ADDRESS = 0x61bbd7Bd5EE2A202d7e62519750170A52A8DFD45;
  address payable public constant WETH_ADDRESS = 0xc778417E063141139Fce010982780140Aa0cD5Ab;


  address public owner;
  WETH9 public weth;
  Compound public compound;

  mapping(uint256 => uint256) public fatcats;
  Kitty[] public kitties;

  struct Kitty {
      uint256 id;
      uint256 value;
      int256 x;
      int256 y;
      uint256 rot;
  }

  modifier onlyOwner () {
    require (msg.sender == owner);
    _;
  }

  constructor () public {
    owner = tx.origin;
    weth = WETH9(WETH_ADDRESS);
    compound = Compound(COMPOUND_ADDRESS);
  }

  function meow (uint256 _kittyId, int256 x, int256 y, uint256 rot) onlyOwner public payable {
    require (fatcats[_kittyId] == 0);
    require (msg.value > 0);

    // @todo we need to ensure that the kitty is owned by msg.sender

    fatcats[_kittyId] = msg.value;
    Kitty memory kit = Kitty(_kittyId, msg.value, x, y, rot);
    kitties.push(kit);

    // wrap the ETH
    address(weth).call.value(msg.value).gas(50000)("");

    // allow compound to move the WETH
    require(weth.approve(COMPOUND_ADDRESS, msg.value));

    // deposit the WETH into compound
    compound.supply(WETH_ADDRESS, msg.value);
  }

  function lick (uint256 _amount) onlyOwner public {
    compound.withdraw(WETH_ADDRESS, _amount);
    for (uint256 i = 0; i < kitties.length; i++) {
        delete fatcats[kitties[i].id];
    }
    delete kitties;
    weth.withdraw(weth.balanceOf(address(this)));
    msg.sender.transfer(address(this).balance);
  }

  function getKittyCount () public view returns (uint256) {
      return kitties.length;
  }

  function () external payable {
    require(msg.sender == WETH_ADDRESS);
  }

}

contract CreamFactory {

  mapping(address => address) public creams;
  address[] public users;

  function deployCream () public {
    require(creams[msg.sender] == address(0));
    Cream newCream = new Cream();
    creams[msg.sender] = address(newCream);
    users.push(msg.sender);
  }

  function getNumberOfUsers () public view returns (uint256) {
      return users.length;
  }

}