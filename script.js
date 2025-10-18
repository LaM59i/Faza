

const volunteers = JSON.parse(localStorage.getItem("volunteersList")) || [];
const opportunities = JSON.parse(localStorage.getItem("opportunitiesList")) || [];

document.getElementById("totalVolunteers").textContent = volunteers.length;
document.getElementById("totalOpportunities").textContent = opportunities.length;

const activeCount = opportunities.filter(op => op.status === "active").length;
document.getElementById("activeOpportunities").textContent = activeCount;






// 🔹 Add / Edit Opportunity page
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("opportunityForm");
  if (!form) return; // ما نسوي شي لو مو في الصفحة الصحيحة

  const titleInput = document.getElementById("title");
  const dateInput = document.getElementById("date");
  const descInput = document.getElementById("description");
  const volInput = document.getElementById("volunteers");
  const hoursInput = document.getElementById("hours");
  const existingSelect = document.getElementById("existingOpportunity");

  // نحمل الفرص الموجودة من localStorage
  let opportunities = JSON.parse(localStorage.getItem("opportunitiesList")) || [];

  // عرضها في القائمة
  opportunities.forEach((op, index) => {
    const opt = document.createElement("option");
    opt.value = index;
    opt.textContent = op.title;
    existingSelect.appendChild(opt);
  });

  // لما المستخدم يختار فرصة للتعديل
  existingSelect.addEventListener("change", () => {
    const selected = existingSelect.value;
    if (selected === "") {
      form.reset();
    } else {
      const op = opportunities[selected];
      titleInput.value = op.title;
      dateInput.value = op.date;
      descInput.value = op.description;
      volInput.value = op.volunteers;
      hoursInput.value = op.hours;
    }
  });

 
  
  
  
  
  
  
  // عند الحفظ أو الإضافة
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newData = {
      title: titleInput.value,
      date: dateInput.value,
      description: descInput.value,
      volunteers: volInput.value,
      hours: hoursInput.value,
      status: "active"
    };

    const selected = existingSelect.value;
    if (selected === "") {
      opportunities.push(newData); // إضافة جديدة
      alert(" Opportunity added successfully!");
    } else {
      opportunities[selected] = newData; // تعديل
      alert(" Opportunity updated successfully!");
    }

    // نحفظ التغييرات
    localStorage.setItem("opportunitiesList", JSON.stringify(opportunities));
    form.reset();
    existingSelect.value = "";
  });
});
 





// 🔹 View Opportunities page
document.addEventListener("DOMContentLoaded", function () {
  const table = document.querySelector("table");

  if (!table) return; // لو الصفحة مش هي View Opportunities نوقف

  // نحمل الفرص من localStorage
  const opportunities = JSON.parse(localStorage.getItem("opportunitiesList")) || [];

  // نمسح أي صف موجود (عدا رأس الجدول)
  table.querySelectorAll("tr:not(:first-child)").forEach(tr => tr.remove());

  // نضيف كل فرصة للجدول
  opportunities.forEach((op, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${op.title}</td>
      <td>${op.date}</td>
      <td>${op.description}</td>
      <td>${op.volunteers}</td>
      <td>${op.hours}</td>
      <td>
        <a href="Opportunity manage.html?edit=${index}" class="button">Edit</a>
        <a href="#" class="button delete-btn" data-index="${index}">Delete</a>
      </td>
    `;
    table.appendChild(row);
  });

  // حذف فرصة عند الضغط على زر Delete
  table.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const idx = e.target.getAttribute("data-index");
      if (confirm("Are you sure you want to delete this opportunity?")) {
        opportunities.splice(idx, 1);
        localStorage.setItem("opportunitiesList", JSON.stringify(opportunities));
        location.reload();
      }
    }
  });
});





// 🔹 View Volunteers page
document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("volunteerTable");
  if (!tableBody) return;

  // تحميل المتطوعين من localStorage
  const volunteers = JSON.parse(localStorage.getItem("volunteersList")) || [];

  // مسح أي صف موجود (عدا رأس الجدول)
  tableBody.innerHTML = "";

  // عرض كل متطوع
  volunteers.forEach((vol, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${vol.name}</td>
      <td>${vol.id}</td>
      <td>${vol.email}</td>
      <td>${vol.college}</td>
      <td>${vol.phone}</td>
      <td>${vol.hours}</td>
      <td>
        <a href="volunteers manage.html?edit=${index}" class="button">Edit</a>
        <a href="#" class="button delete-btn" data-index="${index}">Delete</a>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // حذف متطوع عند الضغط على Delete
  tableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const idx = e.target.getAttribute("data-index");
      if (confirm("Are you sure you want to delete this volunteer?")) {
        volunteers.splice(idx, 1);
        localStorage.setItem("volunteersList", JSON.stringify(volunteers));
        location.reload();
      }
    }
  });
});






// 🔹 Add / Edit Volunteer page
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const idInput = document.getElementById("studentID");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const collegeInput = document.getElementById("college");
  const phoneInput = document.getElementById("phone");
  const selectVol = form.querySelector("select[name='volunteer']");

  // تحميل المتطوعين من localStorage
  let volunteers = JSON.parse(localStorage.getItem("volunteersList")) || [];

  // عرض المتطوعين في القائمة
  volunteers.forEach((vol, index) => {
    const opt = document.createElement("option");
    opt.value = index;
    opt.textContent = vol.name;
    selectVol.appendChild(opt);
  });

  // تعبئة الحقول عند اختيار متطوع للتعديل
  selectVol.addEventListener("change", () => {
    const idx = selectVol.value;
    if (idx === "") {
      form.reset();
    } else {
      const vol = volunteers[idx];
      nameInput.value = vol.name;
      idInput.value = vol.id;
      emailInput.value = vol.email;
      passwordInput.value = vol.password;
      collegeInput.value = vol.college;
      phoneInput.value = vol.phone;
    
    }
  });

  // حفظ أو إضافة متطوع
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newVol = {
      name: nameInput.value,
      id: idInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      college: collegeInput.value,
      phone: phoneInput.value,
      hours: 0
    };

    const selected = selectVol.value;
    if (selected === "") {
      volunteers.push(newVol);
      alert(" Volunteer added successfully!");
    } else {
      volunteers[selected] = newVol;
      alert(" Volunteer updated successfully!");
    }

    // حفظ في localStorage
    localStorage.setItem("volunteersList", JSON.stringify(volunteers));
    form.reset();
    selectVol.value = "";
  });
});






// 🔹 Student Dashboard page
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card-grid .card p");
  if (!cards.length) return;

  // نحصل على بيانات الطالب الحالي (مثلاً آخر تسجيل دخول)
  const student = JSON.parse(localStorage.getItem("studentData")) || {};

  // إجمالي الساعات
  const totalHours = student.hours || 0;

  // عدد المشاركات (عدد الفرص اللي سجل فيها الطالب)
  const participations = student.participations ? student.participations.length : 0;

  // حالة الفرص (نكتب أسماء الفرص المسجلة)
  const opportunitiesStatus = student.participations && student.participations.length > 0
    ? student.participations.join(", ")
    : "No activities yet";

  // تحديث الكروت
  cards[0].textContent = totalHours;
  cards[1].textContent = participations;
  cards[2].textContent = opportunitiesStatus;
});





// 🔹 Student Home page - Search Opportunities
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (!form) return;

  const opportunities = JSON.parse(localStorage.getItem("opportunitiesList")) || [];

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.toLowerCase();
    const hours = parseInt(document.getElementById("hours").value);
    const status = document.getElementById("status").value;

    // تصفية الفرص حسب المعايير
    let results = opportunities.filter(op => {
      let match = true;
      if (name && !op.title.toLowerCase().includes(name)) match = false;
      if (hours && op.hours < hours) match = false;
      if (status && op.status !== status) match = false;
      return match;
    });

    // عرض النتائج في صفحة جديدة أو ضمن الصفحة نفسها
    let resultsWindow = window.open("", "Search Results", "width=600,height=400");
    resultsWindow.document.write("<h2>Search Results</h2>");
    if (results.length === 0) {
      resultsWindow.document.write("<p>No opportunities found.</p>");
    } else {
      resultsWindow.document.write("<ul>");
      results.forEach(op => {
        resultsWindow.document.write(`<li>${op.title} | ${op.date} | ${op.description} | Hours: ${op.hours}</li>`);
      });
      resultsWindow.document.write("</ul>");
    }
  });
});





// 🔹 Student Login page
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // تحقق من بيانات الأدمن
    if (email === "ad@ex.com" && password === "ad123") {
      window.location.href = "Admin Dashboard.html";
      return;
    }

    // تحميل الطلاب من localStorage
    const students = JSON.parse(localStorage.getItem("studentsList")) || [];
    const student = students.find(st => st.email === email && st.password === password);

    if (student) {
      // تخزين بيانات الطالب الحالي
      localStorage.setItem("studentData", JSON.stringify(student));
      window.location.href = "Student Home.html";
    } else {
      alert(" Invalid email or password");
    }
  });
});








// 🔹 Student Opportunities page
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  if (!container) return;

  const student = JSON.parse(localStorage.getItem("studentData")) || {};
  let opportunities = JSON.parse(localStorage.getItem("opportunitiesList")) || [];

  // مسح أي بطاقات موجودة (إذا أردنا إعادة التحميل)
  const cardGrids = container.querySelectorAll(".card-grid");
  cardGrids.forEach(grid => grid.innerHTML = "");

  // تقسيم الفرص إلى متاحة (active) وقادمة (upcoming)
  const available = opportunities.filter(op => op.status === "active");
  const upcoming = opportunities.filter(op => op.status === "upcoming");

  function createOpportunityCard(op) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${op.title}</h3>
      <p>${op.description}</p>
      <details>
        <summary>More Info</summary>
        <p><strong>Details:</strong> ${op.description}</p>
        <p><strong>Date:</strong> ${op.date}</p>
        <p><strong>Hours:</strong> ${op.hours}</p>
        <button class="join-btn">Join Now!</button>
      </details>
    `;
    const joinBtn = card.querySelector(".join-btn");
    joinBtn.addEventListener("click", () => {
      if (!student.participations) student.participations = [];
      if (!student.hours) student.hours = 0;

      if (!student.participations.includes(op.title)) {
        student.participations.push(op.title);
        student.hours += parseInt(op.hours) || 0;
        localStorage.setItem("studentData", JSON.stringify(student));
        alert(` You joined "${op.title}"!`);
      } else {
        alert("You already joined this opportunity.");
      }
    });
    return card;
  }

  // عرض الفرص المتاحة
  const availableGrid = container.querySelector(".card-grid:nth-of-type(1)");
  available.forEach(op => availableGrid.appendChild(createOpportunityCard(op)));

  // عرض الفرص القادمة
  const upcomingGrid = container.querySelector(".card-grid:nth-of-type(2)");
  upcoming.forEach(op => upcomingGrid.appendChild(createOpportunityCard(op)));
});







// 🔹 Student Profile page
document.addEventListener("DOMContentLoaded", function () {
  const student = JSON.parse(localStorage.getItem("studentData")) || {};
  if (!student) return;

  const container = document.querySelector(".container");
  if (!container) return;

  const profileSection = container.querySelector("section");
  const form = profileSection.querySelector("form");

  // عرض البيانات الحالية
  const usernameP = profileSection.querySelector("p:nth-of-type(1)");
  const emailP = profileSection.querySelector("p:nth-of-type(2)");
  const phoneP = profileSection.querySelector("p:nth-of-type(3)");

  usernameP.textContent = `Username: ${student.name || ""}`;
  emailP.textContent = `Email: ${student.email || ""}`;
  phoneP ? phoneP.textContent = `Phone: ${student.phone || ""}` : null;

  // تعبئة الحقول بالقيم الحالية
  form.username.value = student.name || "";
  form.email.value = student.email || "";
  form.phone.value = student.phone || "";

  // حفظ التعديلات
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    student.name = form.username.value || student.name;
    student.email = form.email.value || student.email;
    student.phone = form.phone.value || student.phone;

    localStorage.setItem("studentData", JSON.stringify(student));

    // تحديث العرض
    usernameP.textContent = `Username: ${student.name}`;
    emailP.textContent = `Email: ${student.email}`;
    if (phoneP) phoneP.textContent = `Phone: ${student.phone}`;

    alert(" Profile updated successfully!");
  });
});






// 🔹 Student Sign Up page
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const studentID = form.studentID.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const phone = form.phone.value.trim();
    const college = form.college.value.trim();

    // جلب قائمة الطلاب من localStorage
    let students = JSON.parse(localStorage.getItem("studentsList")) || [];

    // التحقق من البريد الإلكتروني إذا موجود مسبقًا
    if (students.some(st => st.email === email)) {
      alert(" Email already registered!");
      return;
    }

    // إنشاء الطالب الجديد
    const newStudent = {
      name,
      id: studentID,
      email,
      password,
      phone,
      college,
      hours: 0,
      participations: []
    };

    students.push(newStudent);
    localStorage.setItem("studentsList", JSON.stringify(students));

    // تخزين بيانات الطالب الحالي
    localStorage.setItem("studentData", JSON.stringify(newStudent));

    alert(" Account created successfully!");
    window.location.href = "Student Home.html";
  });
});
