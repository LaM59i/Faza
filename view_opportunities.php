<?php
include 'database.php';

// جلب جميع الفرص
$query = "SELECT * FROM opportunities ORDER BY start_date DESC";
$result = $conn->query($query);
?>

<!DOCTYPE html>
<html lang="ar">

<head>
  <meta charset="UTF-8">
  <title>الفرص التطوعية | منصة فَزَّاع</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>

  <header>

    <h1>جميع الفرص التطوعية</h1>

    <nav>
      <a href="admin_dashboard.php">الرئيسية</a>
      <a href="view_volunteers.php">المتطوعون</a>
      <a href="view_opportunities.php">الفرص</a>
      <a href="manage_requests.php">الطلبات</a>
    </nav>

    <a href="opportunity_manage.php" class="button">
      + إضافة فرصة جديدة
    </a>

  </header>

  <table>

    <thead>

      <tr>

        <th>الرقم</th>
        <th>العنوان</th>
        <th>تاريخ البداية</th>
        <th>تاريخ النهاية</th>
        <th>الوصف</th>
        <th>الحد الأقصى للمتطوعين</th>
        <th>الساعات</th>
        <th>الحالة</th>
        <th>الإجراءات</th>

      </tr>

    </thead>

    <tbody>

<?php if ($result && $result->num_rows > 0): ?>

<?php while ($row = $result->fetch_assoc()): ?>

<tr>

<td>
<?= htmlspecialchars($row['id']); ?>
</td>

<td>
<?= htmlspecialchars($row['title']); ?>
</td>

<td>
<?= htmlspecialchars($row['start_date']); ?>
</td>

<td>
<?= htmlspecialchars($row['end_date']); ?>
</td>

<td>
<?= htmlspecialchars($row['description']); ?>
</td>

<td>
<?= htmlspecialchars($row['max_volunteers']); ?>
</td>

<td>
<?= htmlspecialchars($row['hours']); ?>
</td>

<td>

<?php
if ($row['status'] == 'active') {
  echo "نشطة";
}
elseif ($row['status'] == 'coming') {
  echo "قادمة";
}
else {
  echo "منتهية";
}
?>

</td>

<td>

<a
href="opportunity_manage.php?id=<?= $row['id']; ?>"
class="button">

تعديل

</a>

<a
href="delete_opportunity.php?id=<?= $row['id']; ?>"
class="button"
style="background:#dc3545">

حذف

</a>

</td>

</tr>

<?php endwhile; ?>

<?php else: ?>

<tr>

<td colspan="9">
لا توجد فرص تطوعية حالياً
</td>

</tr>

<?php endif; ?>

</tbody>

</table>

</body>

</html>
