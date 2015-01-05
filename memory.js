$(function() {

  var game = {
    board: $("#game-board"),
    cards: [],
    picked: [],
    matched: []
  }

  createCards(game.cards);
  game.cards = shuffleCards(game.cards);
  placeCards(game.board, game.cards, game.matched);





  game.board.on("click", ".face-down", function() {
    var card = $(this);

    game.picked.push( parseInt( card.attr("id").substring(4) ) );
    card.addClass("face-up");
    card.removeClass("face-down");


    //if picked the shuffling card
    if (card.text() === "*") {

    	setTimeout(function() {
    	  game.cards = shuffleCards(game.cards);
    	  placeCards(game.board, game.cards, game.matched);
    	  game.picked = [];
      }, 1000);
    }



    //compare 2 letters
    if ( game.picked.length === 2) {
      
      //flip back if not a match
      var pick1 = $("#card" + game.picked[0]);
      var pick2 = $("#card" + game.picked[1]);
    	if ( pick1.text() !== pick2.text() ) {
        
        //wait a second so user can view the cards
        setTimeout(function() {
        	pick1.addClass("face-down");
       	  pick1.removeClass("face-up");
       	  pick2.addClass("face-down");
       	  pick2.removeClass("face-up");
       	}, 1000);

      }

      if ( pick1.text() === pick2.text() ) {
      	//store letters matched (singly)
        game.matched.push(pick1.text());
      }
      
      //clear picked array
      game.picked = [];

    }
    

    
    
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
			cards.push("+");  //auto match
		}
		else {
			cards.push(String.fromCharCode(65 + i % 26));
		}

		
	}

};



var shuffleCards = function(cards) {
	return _.shuffle(cards);
};



var placeCards = function(board, cards, matched) {

	board.empty();

	for (var i = 0; i < 54; i++) { 
	  if (matched.indexOf(cards[i]) > -1) {
			board.append("<div id='card" + i + "' class='card face-up'>" + cards[i] + "</div>");
		}
		else {
			board.append("<div id='card" + i + "' class='card face-down'>" + cards[i] + "</div>");
		}
	}

};



