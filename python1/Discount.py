totalbill=int(input("What is your total bill?"))
member=input("Are you a member: 'yes' or 'no'? ")
answerOne="yes"
answerTwo="no"


if(totalbill >= 1000 and member == answerOne):
    print("10% off")
elif(totalbill >= 1000 and member == answerTwo):
    print("5% off")
else:
    print(totalbill, "Special discount Offer, Get 10% OFF your purchase today if you are member.Thank you for shopping with us")

