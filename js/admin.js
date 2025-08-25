import { auth, db, logout } from "./script.js";
import { collection, getDocs, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const adminEmail = "admin@example.com"; // change to your email

auth.onAuthStateChanged(async (user) => {
  if (!user || user.email !== adminEmail) {
    alert("? Access denied");
    window.location.href = "index.html";
  } else {
    loadScores();
    loadUsers();
  }
});

// Load all scores
async function loadScores() {
  const snapshot = await getDocs(collection(db, "scores"));
  const tbody = document.getElementById("scoresBody");
  tbody.innerHTML = "";
  snapshot.forEach(doc => {
    const d = doc.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${d.email}</td><td>${d.score}</td><td>${d.timestamp?.toDate()}</td>`;
    tbody.appendChild(tr);
  });
}

// Add new test
window.addNewTest = async function() {
  const title = document.getElementById("testTitle").value;
  const raw = document.getElementById("testQuestions").value;
  try {
    const questions = JSON.parse(raw);
    await addDoc(collection(db, "tests"), {
      title,
      questions,
      createdAt: serverTimestamp()
    });
    document.getElementById("testMsg").innerText = "? Test added!";
  } catch (err) {
    document.getElementById("testMsg").innerText = "?? Invalid JSON!";
  }
}

// Load users (emails from scores)
async function loadUsers() {
  const snapshot = await getDocs(collection(db, "scores"));
  const emails = new Set();
  snapshot.forEach(doc => emails.add(doc.data().email));
  const ul = document.getElementById("userList");
  ul.innerHTML = "";
  emails.forEach(email => {
    const li = document.createElement("li");
    li.innerText = email;
    ul.appendChild(li);
  });
}

window.logout = logout;
