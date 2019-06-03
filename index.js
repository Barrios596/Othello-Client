const state = {
  x: Number,
  y: Number,
  heuristic: Number,
  maxChild: null,
  children: []
}

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

function toOneDCoordinate(x, y) {
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

function getTurnovers(x, y, player, board) {
  var coordX = []
  var coordY = []
  var turnovers = 0
  if (board[y][x] !== 0) {
    //console.log("ya hay numero")
    return 0
  }
  //left
  if (x > 0) {
    var changesX = []
    var changesY = []
    //console.log("Revisando izq")
    var addTurnovers = 0
    var posX = x - 1
    var posY = y;
    var func = function () {
      while (posX >= 0) {
        let leftSpace = board[posY][posX--]
        switch (leftSpace) {
          case 0:
            changesX =[]
            changesY = []
            addTurnovers = 0
            return
          case player:
            return
          default:
            if (posX + 1 === 0) {
              changesX = []
              changesY = []
              addTurnovers = 0
              return
            }
            else {
              changesX.push(posX + 1)
              changesY.push(posY)
              addTurnovers++
              break 
            }
        }
      }
    }
    func()
    for (var i = 0; i < changesX.length ; i++) {
      coordX.push(changesX[i])
      coordY.push(changesY[i])
    }
    //console.log(`Luego de revisar izq: ${addTurnovers}`)
    turnovers += addTurnovers
  }
  //right
  if (x < 7) {
    var changesX =[]
    var changesY = []
    //console.log("Revisando der")
    var addTurnovers = 0
    var posX = x + 1
    var posY = y;
    var func = function () {
      while (posX <= 7) {
        let rightSpace = board[posY][posX++]
        switch (rightSpace) {
          case 0:
            changesX = []
            changesY = []
            addTurnovers = 0
            return
          case player:
            return
          default:
            if (posX - 1 === 7) {
              changesX = []
              changesY = []
              addTurnovers = 0
              return
            }
            else {
              changesX.push(posX-1)
              changesY.push(posY)
              addTurnovers++
              break 
            }
        }
      }
    }
    func()
    for (var i = 0; i < changesX.length ; i++) {
      coordX.push(changesX[i])
      coordY.push(changesY[i])
    }
    //console.log(`Luego de revisar derecha: ${addTurnovers}`)
    turnovers += addTurnovers
  }
  //up
  if (y > 0) {
    var changesX = []
    var changesY = []
    //console.log("Revisando arriba")
    var addTurnovers = 0
    var posX = x
    var posY = y - 1;
    var func = function () {
      while (posY >= 0) {
        let upperSpace = board[posY--][posX]
        switch (upperSpace) {
          case 0:
            changesX = []
            changesY = []
            addTurnovers = 0
            return
          case player:
            return
          default:
            if (posY + 1 === 0) {
              changesX = []
              changesY = []
              addTurnovers = 0
              return
            }
            else {
              changesX.push(posX)
              changesY.push(posY+1)
              addTurnovers++
              break 
            }
        }
      }
    }
    func()
    for (var i = 0; i < changesX.length ; i++) {
      coordX.push(changesX[i])
      coordY.push(changesY[i])
    }
    //console.log(`Luego de revisar arriba: ${addTurnovers}`)
    turnovers += addTurnovers
  }
  //down
  if (y < 7) {
    var changesX = []
    var changesY = []
    //console.log("Revisando abajo")
    var addTurnovers = 0
    var posX = x
    var posY = y + 1;
    var func = function () {
      while (posY - 1 <= 7) {
        let downSpace = board[posY++][posX]
        switch (downSpace) {
          case 0:
            changesX = []
            changesY = []
            addTurnovers = 0
            return
          case player:
            return
          default:
            if (posY - 1 === 7) {
              changesX = []
              changesY = []
              addTurnovers = 0
              return
            }
            else {
              changesX.push(posX)
              changesY.push(posY-1)
              addTurnovers++
              break 
            }
        }
      }
    }
    func()
    for (var i = 0; i < changesX.length ; i++) {
      coordX.push(changesX[i])
      coordY.push(changesY[i])
    }
    //console.log(`Luego de revisar abajo: ${addTurnovers}`)
    turnovers += addTurnovers
  }
  //up-left
  if (y > 0 && x > 0) {
    var changesX = []
    var changesY = []
    //console.log("Revisando arriba-izq")
    var addTurnovers = 0
    var posX = x - 1
    var posY = y - 1;
    var func = function () {
      while (posY >= 0 && posX >= 0) {
        let ulSpace = board[posY--][posX--]
        switch (ulSpace) {
          case 0:
            changesX = []
            changesY = []
            addTurnovers = 0
            return
          case player:
            return
          default:
            if (posY + 1 === 0 || posX + 1 === 0) {
              changesX = []
              changesY = []
              addTurnovers = 0
              return
            }
            else {
              changesX.push(posX+1)
              changesY.push(posY+1)
              addTurnovers++
              break 
            }
        }
      }
    }
    func()
    for (var i = 0; i < changesX.length ; i++) {
      coordX.push(changesX[i])
      coordY.push(changesY[i])
    }
    //console.log(`Luego de revisar arriba-izq: ${addTurnovers}`)
    turnovers += addTurnovers
  }
  //up-right
  if (y > 0 && x < 7) {
    var changesX = []
    var changesY = []
    //console.log("Revisando arriba-der")
    var addTurnovers = 0
    var posX = x + 1
    var posY = y - 1;
    var func = function () {
      while (posY >= 0 && posX <= 7) {
        let urSpace = board[posY--][posX++]
        switch (urSpace) {
          case 0:
            changesX = []
            changesY = []
            addTurnovers = 0
            return
          case player:
            return
          default:
            if (posY + 1 === 0 || posX - 1 === 7) {
              changesX = []
              changesY = []
              addTurnovers = 0
              return
            }
            else {
              changesX.push(posX-1)
              changesY.push(posY+1)
              addTurnovers++
              break 
            }
        }
      }
    }
    func()
    for (var i = 0; i < changesX.length ; i++) {
      coordX.push(changesX[i])
      coordY.push(changesY[i])
    }
    //console.log(`Luego de revisar arriba-der: ${addTurnovers}`)
    turnovers += addTurnovers
  }
  //down-left
  if (y < 7 && x > 0) {
    var changesX = []
    var changesY = []
    //console.log("Revisando abajo-izq")
    var addTurnovers = 0
    var posX = x - 1
    var posY = y + 1;
    var func = function () {
      while (posY <= 7 && posX >= 0) {
        let dlSpace = board[posY++][posX--]
        switch (dlSpace) {
          case 0:
            changesX = []
            changesY = []
            addTurnovers = 0
            return
          case player:
            return
          default:
            if (posY - 1 === 7 || posX + 1  === 0) {
              changesX = []
              changesY = []
              addTurnovers = 0
              return
            }
            else {
              changesX.push(posX+1)
              changesY.push(posY-1)
              addTurnovers++
              break 
            }
        }
      }
    }
    func()
    for (var i = 0; i < changesX.length ; i++) {
      coordX.push(changesX[i])
      coordY.push(changesY[i])
    }
    //console.log(`Luego de revisar abajo-izq: ${addTurnovers}`)
    turnovers += addTurnovers
  }
  //down-right
  if (y < 7 && x < 7) {
    var changesX = []
    var changesY = []
    //console.log("Revisando abajo-der")
    var addTurnovers = 0
    var posX = x + 1
    var posY = y + 1;
    var func = function () {
      while (posY <= 7 && posX <= 7) {
        let drSpace = board[posY++][posX++]
        switch (drSpace) {
          case 0:
            changesX = []
            changesY = []
            addTurnovers = 0
            return
          case player:
            return
          default:
            if (posY - 1 === 7 || posX - 1 === 7) {
              changesX = []
              changesY = []
              addTurnovers = 0
              return
            }
            else {
              changesX.push(posX-1)
              changesY.push(posY-1)
              addTurnovers++
              break 
            }
        }
      }
    }
    func()
    for (var i = 0; i < changesX.length ; i++) {
      coordX.push(changesX[i])
      coordY.push(changesY[i])
    }
    //console.log(`Luego de revisar abajo-der: ${addTurnovers}`)
    turnovers += addTurnovers
  }
  //console.log(coordX)
  //console.log(coordY)
  return [turnovers,coordX,coordY]
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
    x === 7 && y === 6) { return -10 }
  //favorecer bordes
  else if (x === 0 ||
    x === 7 ||
    y === 0 ||
    y === 7) { return 5 }
  //desfavorecer región 2
  else if (x === 1 ||
    x === 6 ||
    y === 1 ||
    y === 6) { return -5 }
  return 0
}

function getOponent(player) {
  if (player === 1) return 2
  return 1
}

function negaMax(board, player, lookahead, iteration) {
  var nextPlayer = getOponent(player)
  /*console.log(`iter: ${iteration}`)
  console.log(board)
  console.log(`player: ${player}`)*/
  var moves = getPossibleMoves(board, player)
  if ((iteration % 2) == 0) {
    for (var i = 0 ; i < moves.length; i++) {
      moves[i].heuristic *= -1
    }
  }
  if (iteration == lookahead || moves.length == 1) { // hoja del arbol
    moves.sort(compareMoves)
    try {
      let planchazo = moves[0].x
      return moves[0]
    }
    catch(e) {
      var move = Object.create(state)
      move.x = randInt(1,7)
      move.y = randInt(1,7)
      if ((iteration % 2) == 0) {
          move.heuristic = 1000
      }
      else {
        move.heuristic = - 1000
      }
      return move
    }
  }
  else {
    //console.log(`length before of moves: ${moves.length}`)
    for (var i = 0 ; i < moves.length; i++) {
      var newBoard = board.map(function(arr){
        return arr.slice()
      })
      /*console.log(`iter: ${iteration}`)
      console.log(`player: ${player}`)
      console.log(moves[i])*/
      var turnovers = getTurnovers(moves[i].x, moves[i].y, player, newBoard)
      var coordX = turnovers[1]
      var coordY = turnovers[2]
      //console.log(coordX)
      //console.log(coordY)
      newBoard[moves[i].y][moves[i].x] = player
      for (var j = 0; j < coordX.length; j++) {
        newBoard[coordY[j]][coordX[j]] = player
      }
      /*console.log(newBoard)
      console.log(board)
      console.log(`move before: ${moves[i].x},${moves[i].y}`)
      console.log(`heuristic before: ${moves[i].heuristic}`)*/
      var bestChild = negaMax(newBoard, nextPlayer, lookahead, iteration + 1)
      /*console.log(moves[i])
      console.log(`iter: ${iteration}`)
      console.log(`player: ${player}`)
      console.log(`move after: ${moves[i].x},${moves[i].y}`)
      console.log(`heuristic after: ${moves[i].heuristic}`)*/
      try {
        //console.log(`bestChildren: (${bestChildren.x},${bestChildren.y})`)
        moves[i].heuristic = bestChild.heuristic
      }
      catch(e){}
      //console.log(`heuristic: ${moves[i].heuristic}`)
      if ((iteration % 2) == 0 ){
        moves[i].heuristic *= -1
      }
    }
    moves.sort(compareMoves)
  }
  return moves[0]
}

function compareMoves(a, b) {
  if ( a.heuristic > b.heuristic ){
    return -1;
  }
  if ( a.heuristic < b.heuristic ){
    return 1;
  }
  return 0;
}

function getPossibleMoves(board, playerTurnID) {
  var possibleMoves = []
    for (y = 0; y < board.length; y++) {
      for (x = 0; x < board[y].length; x++) {
        //console.log(`${x},${y}`)
        var turnovers = getTurnovers(x, y, playerTurnID, board)[0]
        if (turnovers >  0) {
          var move = Object.create(state)
          move.x = x
          move.y = y
          move.heuristic = turnovers + getBias(x,y)
          possibleMoves.push(move)
        }
      }
    }
  return possibleMoves
}

// Client ----------------------------------------------

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

    var bestMove = negaMax(board, playerTurnID, 5, 1)
    console.log(`(${bestMove.x},${bestMove.y})`)
    var movement = toOneDCoordinate(bestMove.x, bestMove.y)
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
    
    // TODO: Your cleaning board logic here
    
    socket.emit('player_ready', {
      tournament_id: tournamentID,
      player_turn_id: playerTurnID,
      game_id: gameID
    });
});

socket.on('disconnect', function(){});