// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.0;

// apenas uma interface com duas funções que podem ser compartilhadas por qualquer token

interface IToken {
  function mint( uint amount, address to) external;
  function transferFrom(address sender, address recipient, uint256 amount) external;
   function balanceOf(address account) external view returns (uint256);
}
