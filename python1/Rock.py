playerOne=input("Player 1,Enter rock,paper or scissors: ")
playerTwo = input("Player 2,Enter rock,paper or scissors: ")

ChoiceOne="rock"
ChoiceTwo="paper"
ChoiceThree="scissors"

if(playerOne in ChoiceOne and playerTwo in ChoiceThree):
    print("Player 1 wins")
elif(playerTwo in ChoiceOne and playerOne in ChoiceThree):
    print("Player 2 wins")
elif (playerOne in ChoiceTwo and playerTwo in ChoiceOne):
    print("Player 1 wins")
elif(playerTwo in ChoiceTwo and playerOne in ChoiceOne):
    print("Player 2 wins")
elif(playerOne in ChoiceThree and playerTwo in ChoiceTwo):
    print("Player 1 wins")
elif(playerTwo in ChoiceThree and playerOne in ChoiceTwo):
    print("Player 2 wins")
elif(playerOne in ChoiceOne and playerTwo in ChoiceOne):
    print("Tie")
elif(playerOne in ChoiceTwo and playerTwo in ChoiceTwo):
    print("Tie")
elif(playerOne in ChoiceThree and playerTwo in ChoiceThree):
    print("Tie")
else:
    print("invalid option")




