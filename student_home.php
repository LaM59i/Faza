<?php
session_start();
include 'database.php';

// تأكد أن الطالب مسجل دخول
if (!isset($_SESSION['student_id'])) {
  header("Location: student_login.php");
  exit;
}

// نجيب بيانات الطالب
$student_id = $_SESSION['student_id'];
$sql = "SELECT name FROM students WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $student_id);
$stmt->execute();
$result = $stmt->get_result();
$student = $result->fetch_assoc();

// معالجة البحث
$conditions = [];
$params = [];
$types = "";

if (!empty($_GET['name'])) {
  $conditions[] = "title LIKE ?";
  $params[] = "%" . $_GET['name'] . "%";
  $types .= "s";
}

if (!empty($_GET['hours'])) {
  $conditions[] = "hours >= ?";
  $params[] = intval($_GET['hours']);
  $types .= "i";
}

if (!empty($_GET['status'])) {
  $conditions[] = "status = ?";
  $params[] = $_GET['status'];
  $types .= "s";
}

$query = "SELECT * FROM opportunities";
if (count($conditions) > 0) {
  $query .= " WHERE " . implode(" AND ", $conditions);
}
$query .= " ORDER BY start_date ASC";

$stmt2 = $conn->prepare($query);
if (count($params) > 0) {
  $stmt2->bind_param($types, ...$params);
}
$stmt2->execute();
$opportunities = $stmt2->get_result();
?>

<!DOCTYPE html>
<html lang="ar">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>الرئيسية | فزعة</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>

  <header>
    <h1>الرئيسية</h1>

    <nav>
      <a href="student_home.php">الرئيسية</a>
      <a href="student_dashboard.php">لوحة الطالب</a>
      <a href="student_opportunities.php">الفرص</a>
      <a href="student_profile.php">الملف الشخصي</a>
    </nav>
  </header>

  <div class="container">
    <h2>مرحبًا، <?php echo htmlspecialchars($student['name']); ?> 👋</h2>
    <p>ابحث عن فرص التطوع أو تحقق من لوحة الطالب لمتابعة تقدمك.</p>
    <hr>

    <!-- منطقة البحث -->
    <h3>ابحث عن الفرص</h3>
    <form method="get">
      <label for="name">اسم الفرصة (اختياري):</label><br>
      <input type="text" id="name" name="name" value="<?= htmlspecialchars($_GET['name'] ?? '') ?>"><br><br>

      <label for="hours">الحد الأدنى للساعات (اختياري):</label><br>
      <input type="number" id="hours" name="hours" min="1"
        value="<?= htmlspecialchars($_GET['hours'] ?? '') ?>"><br><br>

      <label for="status">حالة الفرصة (اختياري):</label><br>
      <select id="status" name="status">
        <option value="">-- اختر الحالة --</option>
        <option value="active" <?= (($_GET['status'] ?? '') == 'active') ? 'selected' : '' ?>>متاحة</option>
        <option value="coming" <?= (($_GET['status'] ?? '') == 'coming') ? 'selected' : '' ?>>قادمة</option>
      </select><br><br>

      <input type="submit" value="بحث" class="button-submit">
    </form>

    <hr>

    <!-- نتائج البحث -->
    <?php if (isset($_GET['name']) || isset($_GET['hours']) || isset($_GET['status'])): ?>
      <h3>نتائج البحث:</h3>
      <div class="card-grid">
        <?php if ($opportunities->num_rows > 0): ?>
          <?php while ($row = $opportunities->fetch_assoc()): ?>
            <div class="card">
              <h3><?= htmlspecialchars($row['title']); ?></h3>
              <p><?= htmlspecialchars($row['description']); ?></p>
              <p><strong>عدد الساعات:</strong> <?= htmlspecialchars($row['hours']); ?></p>
              <p><strong>الحالة:</strong> <?= htmlspecialchars($row['status']); ?></p>
              <?php if ($row['status'] === 'active'): ?>
                <form action="join_opportunity.php" method="post">
                  <input type="hidden" name="opportunity_id" value="<?= $row['id']; ?>">
                  <input type="submit" value="انضم الآن" class="button-submit">
                </form>
              <?php endif; ?>
            </div>
          <?php endwhile; ?>
        <?php else: ?>
          <p>لا توجد فرص مطابقة للبحث.</p>
        <?php endif; ?>
      </div>
    <?php endif; ?>
  </div>

  <script src="script.js"></script>
  <footer>
    <div class="footer-container">
      <h3>تواصل معنا</h3>
      <p>ص.ب 84428، الرياض، المملكة العربية السعودية.</p>
      <p>البريد الإلكتروني: <a href="mailto:info@pnu.edu.sa">info@pnu.edu.sa</a></p>
      <p>الهاتف: +966-11-8220000</p>
      <p>&copy; 2025 جميع الحقوق محفوظة.</p>
    </div>
  </footer>

</body>
</html>
