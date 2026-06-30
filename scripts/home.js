const spinner = document.getElementById("spinner");

const showSpinner = () => {
  spinner.classList.remove("hidden");
};

const hideSpinner = () => {
  spinner.classList.add("hidden");
};

let allTodos = [];
const loadTodo = async () => {
  try {
    showSpinner();

    const url =
      "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    await new Promise((res) => setTimeout(res, 500));

    const res = await fetch(url);
    const data = await res.json();

    allTodos = data.data;

    displayTodo(allTodos);
  } catch (error) {
    console.log("Error loading todos:", error);
  } finally {
    hideSpinner();
  }
};


// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const searchInput = document.getElementById("search-input");

function setActiveButton(activeButton) {
  allBtn.classList.remove("active");
  openBtn.classList.remove("active");
  closedBtn.classList.remove("active");

  activeButton.classList.add("active");
}

const loadBoxDetail = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayModalDetail(details.data);
};
const displayModalDetail = (word) => {
//   console.log(word);
  const statusClass =
    word.status.toLowerCase() === "open" ? "btn-success" : "btn-secondary";

  const priorityClass =
    word.priority.toLowerCase() === "high" ? "btn-error" : "btn-warning";
  const detailContainer = document.getElementById("details-container");
  detailContainer.innerHTML = `
    <div class="">
              <h1 class="text-2xl">${word.title}</h1>
            </div>
            <div class="flex gap-5">
              <button class="btn btn-sm rounded-full ${statusClass}">
               ${word.status}
               </button>
              <h4>· Open by ${word.assignee}</h4>
              <h4>· ${new Date(word.createdAt).toLocaleDateString()}</h4>
            </div>
            <div class="flex gap-10">
               ${(word.labels ??[])
                 .map(
                   (label) => `
                <div class="badge badge-warning badge-sm uppercase">
                    ${label}
                </div>
               `,
                 )
                 .join("")}
            </div>
            <h3>
              ${word.description}
            </h3>
            <div class="flex gap-[140px]">
              <div>
                <h3>
                  Assignee: <br />
                  ${word.assignee ?? "Not Assigne"}
                </h3>
              </div>
              <div>
                Priority <br />
                <button class="btn btn-sm rounded-full ${priorityClass}">
                 ${word.priority}
                </button>
              </div>
            </div>
   
   `;
  document.getElementById("word_modal").showModal();
};
  const displayTodo = (todos = []) => {
// const displayTodo = (todos) => {
  const issueContainer = document.getElementById("issue-container");
  const totalIssue = document.getElementById("total-issue");

  issueContainer.innerHTML = "";
  todos.forEach((todo) => {
    const todoCard = document.createElement("div");
    const statusClass =
      todo.status.toLowerCase() === "open" ? "open-border" : "closed-border";

    todoCard.classList.add(statusClass);

    todoCard.innerHTML = `
        <div onclick ="loadBoxDetail(${todo.id})" class="bg-base-100 rounded-xl shadow p-4 h-full flex flex-col">

        <!-- Top Row -->
        <div  class="flex justify-between items-center">

        <div>
            ${
              todo.status === "open"
                ? `<img src="./assets/Open-Status.png" alt="">`
                : `<img src="./assets/Closed- Status .png" alt="">`
            }
        </div>

        <div class="badge badge-soft badge-warning">
            ${todo.priority}
        </div>

       </div>

    <!-- Title -->
    <h2 class="font-bold text-lg mt-4">
        ${todo.title}
    </h2>

    <!-- Description -->
    <p class="text-sm text-gray-500 mt-3">
        ${todo.description}
    </p>

    <!-- Labels -->
    <div class="flex gap-2 flex-wrap mt-4">

        ${todo.labels
          .map(
            (label) => `
                <div class="badge badge-warning badge-sm uppercase">
                    ${label}
                </div>
            `,
          )
          .join("")}

    </div>

    <!-- Push footer to bottom -->
    <div class="mt-auto">

        <hr class="my-4">

        <div class="flex justify-between text-xs text-gray-500">

            <div>
                <p>#${todo.id} by ${todo.author}</p>
                <p>Assignee: ${todo.assignee ?? "Unassigned"}</p>
            </div>

            <div class="text-right">
                <p>${new Date(todo.createdAt).toLocaleDateString()}</p>
                <p>Updated: ${new Date(todo.updatedAt).toLocaleDateString()}</p>
            </div>

        </div>

    </div>

</div>
`;
    issueContainer.append(todoCard);
  });
  totalIssue.innerText = todos.length;
  // totalIssue.innerText = "Hello";
};
allBtn.addEventListener("click", () => {
  setActiveButton(allBtn);

  displayTodo(allTodos);
});

openBtn.addEventListener("click", () => {
  showSpinner();
  setActiveButton(openBtn);

  const openTodos = allTodos.filter((todo) => todo.status === "open");
  displayTodo(openTodos);
  hideSpinner();
});

closedBtn.addEventListener("click", () => {
  showSpinner();
  setActiveButton(closedBtn);

  const closedTodos = allTodos.filter((todo) => todo.status === "closed");
  displayTodo(closedTodos);
  hideSpinner();
});
searchInput.addEventListener("input", (e) => {
  const searchText = e.target.value;

  if (searchText === "") {
    displayTodo(allTodos);
    return;
  }

  fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`,
  )
    .then((res) => res.json())
    .then((data) => {
      displayTodo(data.data);
    });
});


loadTodo();