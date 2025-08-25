import { auth, db } from "./script.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    alert("Login required!");
    window.location.href = "index.html";
    return;
  }

  const q = query(collection(db, "scores"), where("uid", "==", user.uid));
  const snapshot = await getDocs(q);
  const tbody = document.getElementById("resultsBody");

  snapshot.forEach(doc => {
    const data = doc.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${data.score}</td><td>${data.timestamp?.toDate()}</td>`;
    tbody.appendChild(tr);
  });
});
