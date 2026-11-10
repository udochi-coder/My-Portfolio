from fastapi import APIRouter,HTTPException
from models.user import UserCreation,UserLogin
from services import userservice



router = APIRouter(prefix="/users" , tags=["Users"])

@router.post("/users", response_model=UserLogin)
async def create_user(user: UserCreation):
    return await userservice.creating_user(user)


@router.get("/{user_id}", response_model=UserLogin)
async def get_user_by_id(user_id: str):
    user = await userservice.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
