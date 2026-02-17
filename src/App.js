import { useState } from "react";

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

function Button({ onClick, children, className }) {
  return (
    <button className={`button ${className || ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState(initialCourses);

  function handleSelectedCourse(course) {
    setSelectedCourse((selected) =>
      selected?.id === course.id ? null : course,
    );
    setShowAddCourseForm(false);
  }

  function handleShowAddCourseForm() {
    setShowAddCourseForm((show) => !show);
    setSelectedCourse(null);
  }

  function handleUpdateCourse(updatedCourse) {
    setCourses((courses) =>
      courses.map((course) =>
        course.id === updatedCourse.id
          ? { ...course, ...updatedCourse }
          : course,
      ),
    );
    setSelectedCourse(null);
  }

  function handleAddCourse(newCourse) {
    setCourses((courses) => [...courses, newCourse]);
    setShowAddCourseForm(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <CourseList
          onSetSelectedCourse={handleSelectedCourse}
          selectedCourse={selectedCourse}
          courses={courses}
        />
        {showAddCourseForm && (
          <AddCourseForm
            onShowAddCourseForm={handleShowAddCourseForm}
            onAddCourse={handleAddCourse}
          />
        )}

        <Button
          onClick={handleShowAddCourseForm}
          className={showAddCourseForm ? "button-close" : ""}
        >
          {showAddCourseForm ? "Close" : "Add Course"}
        </Button>
      </div>
      {selectedCourse && (
        <DetailForm
          selectedCourse={selectedCourse}
          key={selectedCourse.id}
          onUpdateCourse={handleUpdateCourse}
        />
      )}
    </div>
  );
}

function CourseList({ onSetSelectedCourse, selectedCourse, courses }) {
  return (
    <div>
      <h2>Course List</h2>
      <ul className="course-list">
        {courses.map((course) => (
          <Course
            key={course.id}
            course={course}
            onSetSelectedCourse={onSetSelectedCourse}
            selectedCourse={selectedCourse}
          />
        ))}
      </ul>
    </div>
  );
}

function Course({ course, onSetSelectedCourse, selectedCourse }) {
  const { name, totalLessons, completedLessons, rating } = course;
  const isSelected = selectedCourse?.id === course.id;
  return (
    <li className={isSelected ? "course selected" : "course"}>
      <h3>{name}</h3>
      <p>
        Progress: {completedLessons}/{totalLessons} lessons completed
      </p>
      <p>Rating: {rating} stars</p>
      <Button onClick={() => onSetSelectedCourse(course)}>
        {isSelected ? "Close" : "Manage"}
      </Button>
    </li>
  );
}

function AddCourseForm({ onShowAddCourseForm, onAddCourse }) {
  const [rating, setRating] = useState("");
  const [totalLessons, setTotalLessons] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !totalLessons || !rating) return;
    const id = crypto.randomUUID();

    const newCourse = {
      id,
      name,
      totalLessons,
      completedLessons: 0,
      rating,
    };
    onAddCourse(newCourse);
    setName("");
    setTotalLessons("");
    setRating("");
  };
  return (
    <form className="form-add-course" onSubmit={handleSubmit}>
      <h2>Add New Course</h2>
      <label>Course Name:</label>
      <input
        type="text"
        placeholder="Enter course name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Total Lessons:</label>
      <input
        type="number"
        placeholder="Enter total lessons"
        value={totalLessons}
        onChange={(e) =>
          setTotalLessons(e.target.value === "" ? "" : Number(e.target.value))
        }
      />
      <label>Rating:</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        <option value="">Select rating</option>
        <option value="1">1 star</option>
        <option value="2">2 stars</option>
        <option value="3">3 stars</option>
        <option value="4">4 stars</option>
        <option value="5">5 stars</option>
      </select>
      <Button type="submit">Add</Button>
    </form>
  );
}

function DetailForm({ selectedCourse, onUpdateCourse }) {
  const [completedLessons, setCompletedLessons] = useState(
    selectedCourse.completedLessons,
  );
  const [rating, setRating] = useState(selectedCourse.rating);
  const percentage = Math.round(
    (completedLessons / selectedCourse.totalLessons) * 100,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (completedLessons === "" || !rating) return;

    onUpdateCourse({
      ...selectedCourse,
      completedLessons,
      rating,
    });
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Course Details for {selectedCourse.name}</h2>
      <label>Completed Lessons:</label>
      <input
        type="number"
        value={completedLessons}
        onChange={(e) =>
          setCompletedLessons(
            e.target.value === ""
              ? ""
              : Math.max(
                  0,
                  Math.min(Number(e.target.value), selectedCourse.totalLessons),
                ),
          )
        }
      />

      <label>Rating:</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        <option value="">Select rating</option>
        <option value="1">1 star</option>
        <option value="2">2 stars</option>
        <option value="3">3 stars</option>
        <option value="4">4 stars</option>
        <option value="5">5 stars</option>
      </select>
      <label>Progress:</label>
      <span>{percentage}%</span>
      <progress value={percentage} max="100" />
      <Button type="submit">Update Course</Button>
    </form>
  );
}
