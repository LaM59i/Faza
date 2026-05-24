<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Student Home | Fazaa</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header>
    <h1>Student Home</h1>
    <nav>
      <a href=" Student dashboard.html">Dashboard</a>
      <a href="Student Opportunities.html">Opportunities</a>
      <a href="Student Profile.html">Profile</a>
    </nav>
  </header>

  <div class="container">
    <h2>Welcome, Student!</h2>
    <p>Search for volunteering opportunities or check your dashboard to view your progress.</p>
 <hr>

  <!-- منطقة البحث -->
  <h3>Search Opportunities</h3>
  <form action="search_results.html" method="get">
    <!-- اسم الفرصة -->
    <label for="name">Opportunity Name (optional):</label><br>
    <input type="text" id="name" name="name"><br><br>

    <!-- عدد الساعات -->
    <label for="hours">Minimum Hours (optional):</label><br>
    <input type="number" id="hours" name="hours" min="1"><br><br>

    <!-- حالة الفرصة -->
    <label for="status">Opportunity Status (optional):</label><br>
    <select id="status" name="status">
      <option value="">-- Select Status --</option>
      <option value="available">Available</option>
      <option value="upcoming">Upcoming</option>
     
    </select><br><br>
    <hr>
    <!-- زر البحث -->
    <input type="submit"  value="Search" class="button-submit"></input>
  </form>
 
  <script src="script.js"></script>

</body>
</html>
