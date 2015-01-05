memory-game
===========

Javascript memory game (part of my series of simple practice projects)


GAMEPLAY PROBLEM: if automatch flips back, player can just keep clicking it
make it stay flipped up, but flip it back over if the cards are reshuffled so THEN you can use it again if you find it


for practice with new stuff: add some nice simple jquery animations for card flipping and matching!


let play go until end, 'high score' being least # of turns



best to add card functions to game object itself?
also much refactoring needed to modularize code better (especially the repetition of the settimeout to wait to flip cards)

!also need to make it not allow new flips until 2 unmatched cards are flipped back (just set a simple flag)


underscore really necessary just for shuffle function?
couldn't I just randomly pick an element from array, then splice that element out afterward, and repeat?



!!!DONT FORGET TO REMOVE HELPER LETTERS ON FACE DOWN CARDS WHEN DONE TESTING!!!!