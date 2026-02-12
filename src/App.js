// import {useState} from 'react';

const initialCourses = [
  {
    id: 1,
    name: "Ultimate React Course",
    totalLessons: 30,
    completedLessons: 12,
    rating: 5,
  },
  {
    id: 2,
    name: "Advanced CSS & Sass",
    totalLessons: 20,
    completedLessons: 20,
    rating: 4,
  },
  {
    id: 3,
    name: "Node.js Boot Camp",
    totalLessons: 25,
    completedLessons: 0,
    rating: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <CourseList />
        <AddCourseForm />
      </div>
      <DetailForm />
    </div>
  );
}

function CourseList() {
  return (
    <div className="course-list">
      <h2>Course List</h2>
      {initialCourses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
}

function Course({ course }) {
  const { name, totalLessons, completedLessons, rating } = course;
  return (
    <div className="course">
      <h3>{name}</h3>
      <p>
        Progress: {completedLessons}/{totalLessons} lessons completed
      </p>
      <p>Rating: {rating} stars</p>
    </div>
  );
}

function AddCourseForm() {
  return (
    <form className="form-add-course">
      <h2>Add New Course</h2>
    </form>
  );
}

function DetailForm() {
  return (
    <form className="form">
      <h2>Course Details</h2>
      {/* Detail form elements will go here */}
    </form>
  );
}
