import { auth, db } from "./script.js";
import { collection, addDoc, serverTimestamp, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const validAccessCode = "1234"; // Replace or store in Firestore

let questions = [];
let answers = {};

// Unlock test
window.unlockTest = async function() {
  const code = document.getElementById("accessCode").value;
  if (code !== validAccessCode) {
    document.getElementById("unlockMsg").innerText = "Invalid code!";
    return;
  }
  document.getElementById("unlockMsg").innerText = "? Test unlocked!";
  document.getElementById("testSection").style.display = "block";
  await loadQuestions();
}

// Load test from Firestore
async function loadQuestions() {
  const snapshot = await getDocs(collection(db, "tests"));
  if (snapshot.empty) {
    document.getElementById("testContainer").innerHTML = "No test available.";
    return;
  }
  // Take first test for now
  const data = snapshot.docs[0].data();
  questions = data.questions;

  const container = document.getElementById("testContainer");
  container.innerHTML = "";
  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.innerHTML = `<p>${q.q}</p>` +
      q.options.map(opt => `
        <label>
          <input type="radio" name="q${i}" value="${opt}">
          ${opt}
        </label><br>`).join("");
    container.appendChild(div);
  });
}

// Submit test
window.submitTest = async function() {
  let score = 0;
  questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  const user = auth.currentUser;
  if (!user) {
    document.getElementById("testMsg").innerText = "?? You must log in first.";
    return;
  }

  await addDoc(collection(db, "scores"), {
    uid: user.uid,
    email: user.email,
    score,
    timestamp: serverTimestamp()
  });

  document.getElementById("testMsg").innerText = "? Test submitted! Score: " + score;
}
