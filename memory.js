$(function() {

  var game = {
    board: $("#game-board"),
    cards: []	
  }

  createCards(game.cards);
  game.cards = shuffleCards(game.cards);
  placeCards(game.board, game.cards);



  game.board.on("click", ".card", function() {
    var card = $(this);
    card.toggleClass("face-up");
    card.toggleClass("face-down");
  });


});










var createCards = function(cards) {

	//9x6 grid of memory cards held in array, 26 pairs of letters and 2 special cards (54 total)
	//capital letters start at char code 65 (A)
	
	for (var i = 0; i < 54; i++) {
		if (i === 52) {
			cards.push("*");  //re-shuffle
		}
		else if (i === 53) {
			cards.push("+");  //bonus view
		}
		else {
			cards.push(String.fromCharCode(65 + i % 26));
		}

		
	}

};



var shuffleCards = function(cards) {
	return _.shuffle(cards);
}



var placeCards = function(board, cards) {
	for (var i = 0; i < 54; i++) { 
	  board.append("<div id='card" + i + "' class='card face-down'>" + cards[i] + "</div>");
	}
}