from motor.motor_asyncio import AsyncIOMotorClient

Mongo_url = "mongodb://localhost:27017"
Database_name = "student_management"

client = AsyncIOMotorClient(Mongo_url)
db = client[Database_name]

users_collection = db["users"]
courses_collection = db["courses"]
enrollments_collection = db["enrollments"]