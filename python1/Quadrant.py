numberOne=int(input("Enter a number: "))
numberTwo=int(input("Enter a number: "))

if(numberOne > 0 and numberTwo > 0):
    print("Q1")
elif(numberOne < 0 and numberTwo > 0):
    print("Q2")
elif(numberOne < 0 and numberTwo < 0):
    print("Q3")
elif(numberOne > 0 and numberTwo < 0):
    print("Q4")
elif(numberOne == 0 and numberTwo == 0):
    print("Origin")
elif(numberTwo == 0 and numberOne != 0):
    print("X-axis")
elif(numberOne == 0 and numberTwo != 0):
    print("Y-axis")
else:
    print("invalid option")



