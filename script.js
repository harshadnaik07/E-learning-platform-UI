let currentCourse = "";

/* LOAD FROM LOCAL STORAGE */
const saved = JSON.parse(localStorage.getItem("coursesData"));
const courses = saved || {
  "HTML": {
    category: "Frontend",
    video: "https://www.youtube.com/embed/HcOc7P5BMi4",
    progress: 0
  },
  "React JS": {
    category: "Frontend",
    video: "https://www.youtube.com/embed/RGKi6LSPDLU",
    progress: 0
  },
  "JavaScript": {
  category: "Frontend",
  video: "https://www.youtube.com/embed/VlPiVmYuoqw", 
  progress: 0
},
"CSS": {
  category: "Frontend",
  video: "https://www.youtube.com/embed/Edsxf_NBFrw", 
  progress: 0
},

  "Python Programming": {
    category: "Backend",
    video: "https://www.youtube.com/embed/UrsmFxEIp5k",
    progress: 0
  },
  "Java Programming": {
    category: "Backend",
    video: "https://www.youtube.com/embed/yRpLlJmRo2w",
    progress: 0 
  }
  
};

const courseList = document.getElementById("courseList");
renderCourses();

/* NAVIGATION */
function showSection(id, el) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll("nav li").forEach(li => li.classList.remove("active"));
  if (el) el.classList.add("active");

  if (id === "profile") loadProfileProgress();
}

/* SEARCH */
function searchCourses() {
  const value = document.getElementById("searchInput").value.toLowerCase();
  courseList.innerHTML = "";
  showSection("courses");

  for (let c in courses) {
    if (c.toLowerCase().includes(value)) {
      courseList.innerHTML += courseCardHTML(c);
    }
  }
}

/* COURSES */
function renderCourses() {
  courseList.innerHTML = "";
  for (let c in courses) {
    courseList.innerHTML += courseCardHTML(c);
  }
}

function courseCardHTML(c) {
  return `
    <div class="course-card modern-card" onclick="openCourse('${c}')">
      <div class="card-gradient"></div>

      <div class="card-content">
        <span class="course-tag">${courses[c].category}</span>
        <h3>${c}</h3>
        <p class="course-desc">
          Learn ${c} with structured lessons and real examples.
        </p>
      </div>

      <div class="card-footer">
        <span>Start Course</span>
      </div>
    </div>
  `;
}

/* VIDEO */
function openCourse(course) {
  currentCourse = course;
  document.getElementById("videoTitle").innerText = course;
  document.getElementById("courseVideo").src = courses[course].video;
  showSection("video");
}

/* PROGRESS */
function completeLesson() {
  if (courses[currentCourse].progress < 100) {
    courses[currentCourse].progress += 25;
    if (courses[currentCourse].progress > 100) courses[currentCourse].progress = 100;
    localStorage.setItem("coursesData", JSON.stringify(courses));
    alert("Lesson completed!");
  }
}

/* PROFILE */
function loadProfileProgress() {
  const box = document.getElementById("allProgress");
  box.innerHTML = "";

  let hasProgress = false;

  for (let c in courses) {
    if (courses[c].progress > 0) {
      hasProgress = true;
      box.innerHTML += `
        <div class="progress-card" onclick="openCourse('${c}')">
          <div class="progress-percent">${courses[c].progress}%</div>
          <h3>${c}</h3>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${courses[c].progress}%"></div>
          </div>
        </div>
      `;
    }
  }

  if (!hasProgress) {
    box.innerHTML = "<p>You haven’t started any course yet.</p>";
  }
}

/* DARK MODE */
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}