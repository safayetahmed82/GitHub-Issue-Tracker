const spinner = document.getElementById("spinner");

const showSpinner = () => {
  spinner.classList.remove("hidden");
};

const hideSpinner = () => {
  spinner.classList.add("hidden");
};





let allTodos = [];
const loadTodo = async () => {
  showSpinner();

  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";


  await new Promise((res) => setTimeout(res, 500));

  const res = await fetch(url);
  const data = await res.json();

  allTodos = data.data;

  displayTodo(allTodos);

  hideSpinner();
};





loadTodo();