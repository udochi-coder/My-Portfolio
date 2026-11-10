from fastapi import APIRouter, HTTPException
from models.course import  CourseCreation,CourseResponse
from services import courseservice

router = APIRouter(prefix="/courses", tags=["Courses"])



@router.post("/courses", response_model=CourseResponse)
async def create_course(course: CourseCreation):
    return await courseservice.creating_course(course)


@router.get("/{course_id}", response_model=CourseResponse)
async def get_course(course_id: str):
    course=await courseservice.get_course_by_id(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course