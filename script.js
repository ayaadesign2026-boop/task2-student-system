// 1. هيكلة بيانات الطالب (Class & Constructor)
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }

  // 2. دوال التحليل الأكاديمي (Methods)
  // أ. دالة حساب المتوسط باستخدام reduce
  calculateAverage() {
    if (this.grades.length === 0) return 0;
    const sum = this.grades.reduce((acc, currentGrade) => acc + currentGrade, 0);
    return Number((sum / this.grades.length).toFixed(2));
  }

  // ب. دالة التقدير بناءً على المتوسط
  getGradeLetter(average) {
    if (average >= 90) return "A";
    else if (average >= 80) return "B";
    else if (average >= 70) return "C";
    else if (average >= 60) return "D";
    else if (average >= 50) return "E";
    else return "F";
  }

  // ج. دالة النتيجة النهائية
  getFinalStatus() {
    const avg = this.calculateAverage();
    if (avg >= 50 && this.attendance >= 75) {
      return "ناجح";
    } else {
      return "يحتاج مراجعة";
    }
  }
}

// 3. نظام تشغيل الجامعة (Objects Array)
const studentsList = [
  new Student(101, "أحمد محمود", [85, 90, 88], 92),      // متفوق
  new Student(102, "سارة علي", [45, 42, 48], 80),        // متعثرة (متوسط 45)
  new Student(103, "كريم حسن", [40, 44, 42], 76),        // متعثر (متوسط 42)
  new Student(104, "منى إبراهيم", [70, 65, 75], 60)      // متوسط جيد لكن حضور ضعيف
];

// 4. لجنة الرأفة (Array Methods)
// أ. الاستخراج: الطلاب الذين تتراوح متوسطاتهم بين 40 و 49
const strugglingStudents = studentsList.filter((student) => {
  const avg = student.calculateAverage();
  return avg >= 40 && avg <= 49;
});

// ب. المعالجة: إضافة 5 درجات رأفة للمتوسط
const boostedAverages = strugglingStudents.map((student) => {
  return {
    name: student.name,
    oldAverage: student.calculateAverage(),
    newAverage: student.calculateAverage() + 5
  };
});

// ج. التحليل: جمع المتوسطات الجديدة باستخدام reduce
const totalBoostedSum = boostedAverages.reduce((acc, item) => acc + item.newAverage, 0);

// د. متوسط الرأفة مع درع حماية لمنع القسمة على صفر
const overallMercyAverage = boostedAverages.length > 0 
  ? Number((totalBoostedSum / boostedAverages.length).toFixed(2)) 
  : 0;

// 5. المخرجات (Console Logging)
console.log("=== 📊 التقرير الأكاديمي الشامل للطلاب ===");
studentsList.forEach((student) => {
  const avg = student.calculateAverage();
  const grade = student.getGradeLetter(avg);
  const status = student.getFinalStatus();
  
  console.log(
    `الاسم: ${student.name} | المتوسط: ${avg} | التقدير: ${grade} | النتيجة: ${status}`
  );
});

console.log("\n=== 🤝 لجنة الرأفة (الطلاب المشمولون بالدعم) ===");
console.log(boostedAverages);

console.log("\n=== 📈 متوسط درجات المتعثرين بعد الرأفة ===");
console.log(`المتوسط العام بعد التعديل: ${overallMercyAverage}`);