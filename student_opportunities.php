<?php
session_start();
include 'database.php';

// نتأكد أن الطالب مسجل دخول
if (!isset($_SESSION['student_id'])) {
    header("Location: student_login.php");
    exit;
}

$student_id = $_SESSION['student_id'];
$q = isset($_GET['q']) ? trim($_GET['q']) : '';

// نجيب الفرص حسب البحث
$sql = "SELECT * FROM opportunities 
        WHERE title LIKE ? 
           OR hours LIKE ? 
           OR status LIKE ? 
        ORDER BY start_date ASC";

$stmt = $conn->prepare($sql);
$like = "%" . $q . "%";
$stmt->bind_param("sss", $like, $like, $like);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        echo '<div class="card">';
        echo '<h3>' . htmlspecialchars($row['title']) . '</h3>';
        echo '<p><strong>الوصف:</strong> ' . htmlspecialchars($row['description']) . '</p>';
        echo '<p><strong>تاريخ البداية:</strong> ' . htmlspecialchars($row['start_date']) . '</p>';
        echo '<p><strong>تاريخ النهاية:</strong> ' . htmlspecialchars($row['end_date']) . '</p>';
        echo '<p><strong>عدد الساعات:</strong> ' . htmlspecialchars($row['hours']) . '</p>';
        echo '<p class="status"><strong>الحالة:</strong> ' . htmlspecialchars($row['status']) . '</p>';

        // فقط إذا كانت الفرصة "متاحة" (active) يظهر زر الانضمام
        if ($row['status'] === 'active') {
            echo '<form action="join_opportunity.php" method="post" style="margin-top:10px;">';
            echo '<input type="hidden" name="opportunity_id" value="' . $row['id'] . '">';
            echo '<input type="submit" value="انضم الآن" class="button-submit">';
            echo '</form>';
        }

        echo '</div>';
    }
} else {
    echo '<p style="text-align:center;">لا توجد فرص مطابقة للبحث</p>';
}
?>
