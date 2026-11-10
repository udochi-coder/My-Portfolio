weight=int(input("Enter your weight in kg: "))
height=float(input("Enter your height in meters: "))
weightcalc=height * height
bmi=weight / weightcalc
if(bmi < 18.5):
    print("Underweight")
if(bmi <=18.5  and bmi >= 24.9):
    print("Normal")
if(bmi <=25 and bmi >=29.9):
    print("Overweight")
if(bmi >= 30):
    print("Obese")


