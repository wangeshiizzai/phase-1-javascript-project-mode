// This is where we keep our data (like a little server address)
const API = "http://localhost:3000/appointments";

// Get the list <ul> or <ol> from the page
let list = document.getElementById("list");

// Function to show all appointments
async function load() {
  // Get the data from the server and turn it into a list
  let data = await (await fetch(API)).json();
  // Clear the list before adding new items
  list.innerHTML = "";
  // Go through each appointment and add it to the page
  data.forEach(a => {
    let li = document.createElement("li");
    li.textContent = `${a.date} ${a.time} - ${a.name} → ${a.doctor}`;
    list.appendChild(li);
  });
}

// When the form is sent (submit)
document.getElementById("form").addEventListener("submit", async e => {
  e.preventDefault(); // Stop the page from reloading
  // Get the values from the form
  let name = document.getElementById("name").value;
  let age = +document.getElementById("age").value;
  let preg = document.getElementById("pregnant").checked;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;

  // Decide which doctor the person should see
  let doctor = age < 12 ? "Pediatrician" : preg ? "OBGYN" : "General Doctor";

  // Save the new appointment on the server
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, preg, date, time, doctor })
  });

  e.target.reset(); // Clear the form
  load(); // Show the updated list
});

// If the emergency button is clicked
document.getElementById("emergency").addEventListener("click", () => {
  alert("🚑 Emergency! Come now!");
});

// Load the list when the page first opens
load();
