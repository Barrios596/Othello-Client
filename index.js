const state = {
  x: Number,
  y: Number,
  heuristic: Number,
  children: []
}

var tileRep = ['_', 'X', 'O'],
    N = 8;
    
var readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
console.log('start app')

function randInt(a, b){
  min = Math.ceil(a);
  max = Math.floor(b);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ix(row, col){
  console.log(row);
  console.log(col);
  console.log('abcdefgh'.indexOf(col));
  return (row - 1) * N + 'abcdefgh'.indexOf(col);
}

function getBoardLetter(a) {
  switch(a){
    case 0:
      return 'A'
    case 1:
      return 'B'
    case 2:
      return 'C'
    case 3:
      return 'D'
    case 4:
      return 'E'
    case 5:
      return 'F'
    case 6:
      return 'G'
    case 7:
      return 'H'
  }
}

function humanBoard(board){

  var result = '    A  B  C  D  E  F  G  H';

  for(var i = 0; i < board.length; i++){
    if(i % N === 0){
      result += '\n\n ' + (parseInt(Math.floor(i / N)) + 1) + ' ';
    }

    result += ' ' + tileRep[board[i]] + ' ';
  }

  return result;
}

function toOneDCoordinate(x, y) {
  console.log(`le esta entrando: ${x},${y}`)
  console.log((y * 8) + x)
  return (y * 8) + x
}

function convertBoard(rawBoard) {
  var board = []
  var row = []
  for (i = 0; i < rawBoard.length; i++) {
    row.push(rawBoard[i])
    if (((i + 1) % 8 === 0)){
      board.push(row)
      row = []
    }
  }
  return board
}

function validateHumanPosition(position){
  var validated = position.length === 2;

  if(validated){
    var row = parseInt(position[0]),
        col = position[1].toLowerCase();

    return (1 <= row && row <= N) && ('abcdefgh'.indexOf(col) >= 0);
  }

  return false;
}

function getTurnovers(x, y, player, board) {
  var turnovers = 0
  if (board[y][x] !== 0) {
    //console.log("ya hay numero")
    return 0
  }
  //left
  if (x > 0) {
    //console.log("Revisando izq")
    var addTurnovers = 0
    var posX = x - 1
    var posY = y;
    var func = function () {
      while (posX >= 0) {
        let leftSpace = board[posY][posX--]
        switch (leftSpace) {
          case 0:
            addTurnovers = 0
            return
          case player:
            return
          default:
            if (posX + 1 === 0) {
              addTurnovers = 0
              return
            }
            else {
              addTurnovers++
              break 
            }
        }
      }
    }
    func()
    console.log(`Luego de revisar izq: ${addTurnovers}`)
    turnovers += addTurnovers
  }
  //right
  if (x < 7) {
    //console.log("Revisando der")
    var addTurnovers = 0
    var posX = x + 1
    var posY = y;
    var func = function () {
      while (posX <= 7) {
        let rightSpace = board[posY][posX++]
        switch (rightSpace) {
          case 0:
            addTurnovers = 0
            return
          case player:
            return
          default:
            if (posX - 1 === 7) {
              addTurnovers = 0
              return
            }
            else {
              addTurnovers++
              break 
            }
        }
      }
    }
    func()
    //console.log(`Luego de revisar derecha: ${addTurnovers}`)
    turnovers += addTurnovers
  }
  //up
  if (y > 0) {
    //console.log("Revisando arriba")
    var addTurnovers = 0
    var posX = x
    var posY = y - 1;
    var func = function () {
      while (posY >= 0) {
        let upperSpace = board[posY--][posX]
        switch (upperSpace) {
          case 0:
            addTurnovers = 0
            return
          case player:
            return
          default:
            if (posY + 1 === 0) {
              addTurnovers = 0
              return
            }
            else {
              addTurnovers++
              break 
            }
        }
      }
    }
    func()
    //console.log(`Luego de revisar arriba: ${addTurnovers}`)
    turnovers += addTurnovers
  }
  //down
  if (y < 7) {
    //console.log("Revisando abajo")
    var addTurnovers = 0
    var posX = x
    var posY = y + 1;
    var func = function () {
      console.log("func")
      while (posY - 1 <= 7) {
        console.log("while")
        let downSpace = board[posY++][posX]
        switch (downSpace) {
          case 0:
          console.log("encontro 0")
            addTurnovers = 0
            return
          case player:
            console.log("encontro playa")
            return
          default:
            console.log("encontro la otra playa")
            if (posY - 1 === 7) {
              console.log("debug 1")
              addTurnovers = 0
              return
            }
            else {
              console.log("debug 2")
              addTurnovers++
              break 
            }
        }
      }
    }
    func()
    //console.log(`Luego de revisar abajo: ${addTurnovers}`)
    turnovers += addTurnovers
  }
  //up-left
  if (y > 0 && x > 0) {
    //console.log("Revisando arriba-izq")
    var addTurnovers = 0
    var posX = x - 1
    var posY = y - 1;
    var func = function () {
      while (posY >= 0 && posX >= 0) {
        let ulSpace = board[posY--][posX--]
        switch (ulSpace) {
          case 0:
            addTurnovers = 0
            return
          case player:
            return
          default:
            if (posY + 1 === 0 || posX + 1 === 0) {
              addTurnovers = 0
              return
            }
            else {
              addTurnovers++
              break 
            }
        }
      }
    }
    func()
    //console.log(`Luego de revisar arriba-izq: ${addTurnovers}`)
    turnovers += addTurnovers
  }
  //up-right
  if (y > 0 && x < 7) {
    //console.log("Revisando arriba-der")
    var addTurnovers = 0
    var posX = x + 1
    var posY = y - 1;
    var func = function () {
      while (posY >= 0 && posX <= 7) {
        let urSpace = board[posY--][posX++]
        switch (urSpace) {
          case 0:
            addTurnovers = 0
            return
          case player:
            return
          default:
            if (posY + 1 === 0 || posX - 1 === 7) {
              addTurnovers = 0
              return
            }
            else {
              addTurnovers++
              break 
            }
        }
      }
    }
    func()
    //console.log(`Luego de revisar arriba-der: ${addTurnovers}`)
    turnovers += addTurnovers
  }
  //down-left
  if (y < 7 && x > 0) {
    //console.log("Revisando abajo-izq")
    var addTurnovers = 0
    var posX = x - 1
    var posY = y + 1;
    var func = function () {
      while (posY <= 7 && posX >= 0) {
        let dlSpace = board[posY++][posX--]
        switch (dlSpace) {
          case 0:
            addTurnovers = 0
            return
          case player:
            return
          default:
            if (posY - 1 === 7 || posX + 1  === 0) {
              addTurnovers = 0
              return
            }
            else {
              addTurnovers++
              break 
            }
        }
      }
    }
    func()
    //console.log(`Luego de revisar abajo-izq: ${addTurnovers}`)
    turnovers += addTurnovers
  }
  //down-right
  if (y < 7 && x < 7) {
    //console.log("Revisando abajo-der")
    var addTurnovers = 0
    var posX = x + 1
    var posY = y + 1;
    var func = function () {
      while (posY <= 7 && posX <= 7) {
        let drSpace = board[posY++][posX++]
        switch (drSpace) {
          case 0:
            addTurnovers = 0
            return
          case player:
            return
          default:
            if (posY - 1 === 7 || posX - 1 === 7) {
              addTurnovers = 0
              return
            }
            else {
              addTurnovers++
              break 
            }
        }
      }
    }
    func()
    console.log(`Luego de revisar abajo-der: ${addTurnovers}`)
    turnovers += addTurnovers
  }
  return turnovers
}

function getBias(x, y) {
  // favorecer esquinas
  if (x === 0 && y=== 0 ||
    x === 0 && y ===7 ||
    x === 7 && y=== 0 ||
    x === 7 && y ===7) { return 10 }
  // desfavorecer region 4 
  else if (x === 1 && y === 0 ||
    x === 0 && y === 1 ||
    x === 1 && y === 1 ||
    x === 7 && y === 1 ||
    x === 6 && y === 1 ||
    x === 6 && y === 0 ||
    x === 6 && y === 7 ||
    x === 6 && y === 6 ||
    x === 7 && y === 6) { return -5 }
  //favorecer bordes
  else if (x === 0 ||
    x === 7 ||
    y === 0 ||
    y === 7) { return 5 }
  //desfavorecer región 2
  else if (x === 1 ||
    x === 6 ||
    y === 1 ||
    y === 6) { return -3 }
  return 0
}

var url = 'http://localhost:4000'
var userName = 'barri'
var tournamentID = 12
var socket = require('socket.io-client')(url);

console.log('socket configured')

socket.on('connect', function() {

    console.log('Te has conectado al servidor.');

    socket.emit('signin', {
        user_name: userName,
        tournament_id: tournamentID,
        user_role: 'player'
      });
});

socket.on('ok_signin', function(){
    console.log(`Has iniciado sesión como ${userName}.`);
});

socket.on('ready', function(data){
    var gameID = data.game_id;
    var playerTurnID = data.player_turn_id;
    var rawBoard = data.board;
    var board = convertBoard(rawBoard)
    console.log(board)
    console.log(`Es tu turno, tu id es el ${playerTurnID}`);

    var x = randInt(0,7)
    var y = randInt(0,7)
    var possibleMoves = []
    for (y = 0; y < board.length; y++) {
      for (x = 0; x < board[y].length; x++) {
        console.log(`${x},${y}`)
         var turnovers = getTurnovers(x, y, playerTurnID, board)
        if (turnovers >  0) {
          var move = Object.create(state)
          move.x = x
          move.y = y
          move.heuristic = turnovers + getBias(x,y)
          possibleMoves.push(move)
        }
      }
    }
    console.log(possibleMoves)
    console.log(`(${possibleMoves[0].x},${possibleMoves[0].y})`)
    var movement = toOneDCoordinate(possibleMoves[0].x, possibleMoves[0].y);
    console.log(movement)

    socket.emit('play', {
      tournament_id: tournamentID,
      player_turn_id: playerTurnID,
      game_id: gameID,
      movement: movement
    });
});

socket.on('finish', function(data){
    var gameID = data.game_id;
    var playerTurnID = data.player_turn_id;
    var winnerTurnID = data.winner_turn_id;
    var board = data.board;
    
    // TODO: Your cleaning board logic here
    
    socket.emit('player_ready', {
      tournament_id: tournamentID,
      player_turn_id: playerTurnID,
      game_id: gameID
    });
});

socket.on('disconnect', function(){});