from fastapi import APIRouter, HTTPException
from models.enrollment import EnrollmentCreation,GradesAssignment,EnrollmentResponse
from services import enrollmentservice


router = APIRouter(prefix="/enrollments", tags=["Enrollments"])


@router.post("/enrollments", response_model=EnrollmentResponse)
async def enrolling_student(enrollment: EnrollmentCreation):
    return await enrollmentservice.enroll_student(enrollment)


@router.patch("/grade", response_model=EnrollmentResponse)
async def enrollment_grades(grade: GradesAssignment):
    return await enrollmentservice.assign_grades(grade)

