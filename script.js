let contacts = JSON.parse(localStorage.getItem("emergencyContacts")) || [];
let countdown = null;

const newContactInput = document.getElementById("newContact");
const contactForm = document.getElementById("contact-form");
const contactList = document.getElementById("contactList");
const panicButton = document.getElementById("panicButton");
const countdownDisplay = document.getElementById("countdownDisplay");
const cancelForm = document.getElementById("cancelForm");
const cancelPassword = document.getElementById("cancelPassword");

function renderContacts() {
  contactList.innerHTML = "";
  contacts.forEach((num, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${num}</span>
      <span class="actions">
        <button onclick="editContact(${i})">Edit</button>
        <button onclick="deleteContact(${i})">Delete</button>
      </span>`;
    contactList.appendChild(li);
  });
}

function editContact(index) {
  newContactInput.value = contacts[index];
  contactForm.setAttribute("data-edit-index", index);
}

function deleteContact(index) {
  contacts.splice(index, 1);
  localStorage.setItem("emergencyContacts", JSON.stringify(contacts));
  renderContacts();
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const number = newContactInput.value.trim();
  if (!number) return;

  const editIndex = contactForm.getAttribute("data-edit-index");
  if (editIndex !== null) {
    contacts[editIndex] = number;
    contactForm.removeAttribute("data-edit-index");
  } else {
    contacts.push(number);
  }

  localStorage.setItem("emergencyContacts", JSON.stringify(contacts));
  newContactInput.value = "";
  renderContacts();
});

panicButton.addEventListener("click", () => {
  if (contacts.length === 0) return alert("Add at least one contact");
  countdown = 5;
  cancelForm.classList.remove("hidden");
  updateCountdown();
});

function updateCountdown() {
  countdownDisplay.textContent = `Sending alert in ${countdown} sec...`;
  if (countdown === 0) {
    sendAlerts();
    cancelForm.classList.add("hidden");
    countdownDisplay.textContent = "";
    return;
  }
  countdown--;
  setTimeout(updateCountdown, 1000);
}

cancelForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (cancelPassword.value === "1234") {
    alert("Alert cancelled");
    countdown = null;
    cancelForm.classList.add("hidden");
    countdownDisplay.textContent = "";
    cancelPassword.value = "";
  } else {
    alert("Wrong password!");
  }
});

function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

function sendAlerts() {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const locationLink = `https://maps.google.com/?q=${latitude},${longitude}`;
    const message = `🚨 Emergency! I need help. Here's my location: ${locationLink}`;

    contacts.forEach((num, i) => {
      if (isMobile()) {
        const smsURL = `sms:${num}?body=${encodeURIComponent(message)}`;
        setTimeout(() => window.open(smsURL, "_blank"), i * 2000);
      }

      const waURL = `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
      setTimeout(() => window.open(waURL, "_blank"), i * 2000 + 1000);
    });
  });
}

renderContacts();
