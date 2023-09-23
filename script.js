// Define an empty students array to store the fetched data
let students = [];

// Function to fetch JSON data from the URL
function fetchData() {
  const jsonUrl = "./demo-json-data.json";

  return fetch(jsonUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      students = data; // Update the students array with the fetched data
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// renderStudent function to print data in the table
function renderStudent(displayData = students) {
  const tbody = document.getElementById("student-body");
  tbody.innerHTML = "";
  displayData.forEach((student, index) => {
    const row = document.createElement("tr");

    // Create and append the "ID" column first
    const idColumn = document.createElement("td");
    idColumn.textContent = student.id;
    row.appendChild(idColumn);

    // Create and append the "Name" column with an image
    const nameColumn = document.createElement("td");
    const nameContainer = document.createElement("div");

    // Create a circular image container
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("circular-image");

    // Create an image element
    const imageElement = document.createElement("img");
    imageElement.src = student.img_src;
    imageElement.alt = "Student Image";

    // Create a span element for the student's full name
    const nameSpan = document.createElement("span");
    nameSpan.textContent = student.first_name + " " + student.last_name;

    // Append the image to the circular image container
    imageContainer.appendChild(imageElement);

    // Append the image container and full name to the nameContainer
    nameContainer.appendChild(imageContainer);
    nameContainer.appendChild(nameSpan);

    // Append nameContainer to the "Name" column
    nameColumn.appendChild(nameContainer);

    // Append the "Name" column to the row
    row.appendChild(nameColumn);

    // Create and append other columns in the specified order
    const columns = ["gender", "class", "marks", "passing", "email"];
    columns.forEach((column) => {
      const td = document.createElement("td");
      if (column === "passing") {
        td.textContent = student.passing ? "Passing" : "Failed";
      } else {
        td.textContent = student[column];
      }
      row.appendChild(td);
    });

    tbody.appendChild(row);
  });
}

// Function to filter and update the table based on the search input
function filterTable() {
  const searchText = searchInput.value.toLowerCase();
  const filteredData = students.filter(
    (student) =>
      student.first_name.toLowerCase().includes(searchText) ||
      student.last_name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText)
  );
  renderStudent(filteredData, "mainTable");
}

// Event listeners
window.addEventListener("load", () => {
  fetchData().then(() => {
    renderStudent(); // Render the table with the fetched data when the page loads
  });
});

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const sortAZ = document.getElementById("sortAZ");
const sortZA = document.getElementById("sortZA");
const sortMarks = document.getElementById("sortMarks");
const sortPassing = document.getElementById("sortPassing");
const sortClass = document.getElementById("sortClass");
const sortGender = document.getElementById("sortGender");
const tableBody = document.getElementById("student-body");
const femaleTable = document.getElementById("femaleTable");
const maleTable = document.getElementById("maleTable");

// Function to render the table based on the given data
function renderTable(students, elementId) {
  displayData = students;
  let tbody;
  if(elementId == null){
    tbody = document.getElementById("student-body");
  }
  else{
    tbody = elementId;
  }
  tbody.innerHTML = "";
  displayData.forEach((student, index) => {
    const row = document.createElement("tr");

    // Create and append the "ID" column first
    const idColumn = document.createElement("td");
    idColumn.textContent = student.id;
    row.appendChild(idColumn);

    // Create and append the "Name" column with an image
    const nameColumn = document.createElement("td");
    const nameContainer = document.createElement("div");

    // Create a circular image container
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("circular-image");

    // Create an image element
    const imageElement = document.createElement("img");
    imageElement.src = student.img_src;
    imageElement.alt = "Student Image";

    // Create a span element for the student's full name
    const nameSpan = document.createElement("span");
    nameSpan.textContent = student.first_name + " " + student.last_name;

    // Append the image to the circular image container
    imageContainer.appendChild(imageElement);

    // Append the image container and full name to the nameContainer
    nameContainer.appendChild(imageContainer);
    nameContainer.appendChild(nameSpan);

    // Append nameContainer to the "Name" column
    nameColumn.appendChild(nameContainer);

    // Append the "Name" column to the row
    row.appendChild(nameColumn);

    // Create and append other columns in the specified order
    const columns = ["gender", "class", "marks", "passing", "email"];
    columns.forEach((column) => {
      const td = document.createElement("td");
      if (column === "passing") {
        td.textContent = student.passing ? "Passing" : "Failed";
      } else {
        td.textContent = student[column];
      }
      row.appendChild(td);
    });

    tbody.appendChild(row);
  });
}

// Function to filter and update the table based on the search input
function filterTable() {
  const searchText = searchInput.value.toLowerCase();
  const filteredData = students.filter(
    (student) =>
      student.first_name.toLowerCase().includes(searchText) ||
      student.last_name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) 
  );
  renderTable(filteredData, "mainTable");
}

// Event listener for input field change (handles real-time search)
searchInput.addEventListener("input", filterTable);

// Event listener for search button click
searchButton.addEventListener("click", () => {
    filterTable();
});


//  sortAZ
sortAZ.addEventListener("click", () => {
  const sortedData = [...students].sort((a, b) => {
    const fullNameA = `${a.first_name} ${a.last_name}`;
    const fullNameB = `${b.first_name} ${b.last_name}`;
    return fullNameA.localeCompare(fullNameB);
  });
  renderTable(sortedData);
  const mainTable = document.getElementById("mainTable");
    mainTable.style.display = "table";
});

//  sortZA
sortZA.addEventListener("click", () => {
  const sortedData = [...students].sort((a, b) => {
    const fullNameA = `${a.first_name} ${a.last_name}`;
    const fullNameB = `${b.first_name} ${b.last_name}`;
    return fullNameB.localeCompare(fullNameA);
  });
  renderTable(sortedData);
  const mainTable = document.getElementById("mainTable");
    mainTable.style.display = "table";
});

// sortMarks
sortMarks.addEventListener("click", () => {
  const sortedData = [...students].sort((a, b) => a.marks - b.marks);
  renderTable(sortedData);
  const mainTable = document.getElementById("mainTable");
    mainTable.style.display = "table";
});

// sortPassing
sortPassing.addEventListener("click", () => {
  const passingStudents = students.filter((student) => student.passing);
  renderTable(passingStudents);
  const mainTable = document.getElementById("mainTable");
    mainTable.style.display = "table";
});

// sortClass
sortClass.addEventListener("click", () => {
  // Create a custom sorting function to group students by class
  const customSort = (a, b) => {
    const classA = parseInt(a.class, 10);
    const classB = parseInt(b.class, 10);

    if (classA < classB) return -1;
    if (classA > classB) return 1;
    return 0;
  };

  // Sort the students using the custom sorting function
  const sortedData = [...students].sort(customSort);

  renderTable(sortedData);
  const mainTable = document.getElementById("mainTable");
    mainTable.style.display = "table";
});

// For sorting by gender, you can create two separate arrays for male and female students
// and render them in the respective tables (femaleTable and maleTable).
//sorting by gender
sortGender.addEventListener("click", () => {
    const maleTable = document.getElementById("maleTable");
    const femaleTable = document.getElementById("femaleTable");
    const maleBody = document.getElementById("male-body");
    const femaleBody = document.getElementById("female-body");
    
    // Filter male and female students
    const maleStudents = students.filter((student) => student.gender === "Male");
    const femaleStudents = students.filter((student) => student.gender === "Female");
    
    // Render male students in the male table
    renderTable(maleStudents, maleBody);
    
    // Render female students in the female table
    renderTable(femaleStudents, femaleBody);
    
    // Hide the main student table
    const mainTable = document.getElementById("mainTable");
    mainTable.style.display = "none";
    
    // Display the male and female tables
    maleTable.style.display = "table";
    femaleTable.style.display = "table";
});
