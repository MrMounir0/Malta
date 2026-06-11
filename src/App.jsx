import { useState } from "react";

const sadTips = [
  "لا تيأس. راجع أخطاءك وابدأ الفصل القادم بخطة دراسة من أول أسبوع.",
  "قسم المادة إلى أجزاء صغيرة. ساعة يوميًا أفضل من ضغط ليلة الامتحان.",
  "ركز على الأسئلة المتكررة واسأل المدرس عن نقاط ضعفك قبل الاختبار.",
  "اعمل جدول بسيط. مراجعة قصيرة بعد كل محاضرة تفرق كثير.",
  "الفشل محاولة ناقصة وليس نهاية الطريق. عوضها الفصل القادم بتركيز أعلى."
];

function App() {
  const [examScore, setExamScore] = useState("");
  const [homeworkScore, setHomeworkScore] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [screenAnim, setScreenAnim] = useState("");

  const getRandomTip = () => {
    const index = Math.floor(Math.random() * sadTips.length);
    return sadTips[index];
  };

  const calculateResult = () => {
    const exam = Number(examScore);
    const homework = Number(homeworkScore);

    if (examScore === "" || homeworkScore === "") {
      setError("دخل درجة الامتحان ودرجة الوظيفة أولًا.");
      setResult(null);
      return;
    }

    if (exam < 0 || exam > 100 || homework < 0 || homework > 100) {
      setError("الدرجات لازم تكون بين 0 و 100.");
      setResult(null);
      return;
    }

    setError("");

    const total = exam * 0.75 + homework * 0.25;
    const roundedTotal = Math.round(total);

    let status = "";
    let message = "";
    let advice = "";
    let mood = "";
    let emojis = "";
    let anim = "";

    if (homework <= 40 || roundedTotal < 58) {
      status = "راسب";
      message = "للأسف لم تنجح هذه المرة.";
      advice = getRandomTip();
      mood = "sad";
      emojis = "😢💔📚";
      anim = "fail";
    } else if (roundedTotal === 58) {
      status = "قريب جدًا";
      message = "بدك علامتين مساعدة لتنجح.";
      advice = "ركز على مراجعة بسيطة واطلب توضيح درجتك من المدرس.";
      mood = "neutral";
      emojis = "😐📘";
      anim = "fail";
    } else if (roundedTotal === 59) {
      status = "قريب جدًا";
      message = "بدك علامة مساعدة لتنجح.";
      advice = "أنت قريب من النجاح. راجع درجتك بهدوء وشوف فرص التحسين.";
      mood = "neutral";
      emojis = "🙂📘";
      anim = "fail";
    } else if (roundedTotal >= 60 && roundedTotal <= 70) {
      status = "ناجح";
      message = "مبروك نجحت شحط.";
      advice = "الفصل الجاي ارفع مستواك أكثر.";
      mood = "pass";
      emojis = "😄🎉👏";
      anim = "success";
    } else if (roundedTotal >= 71 && roundedTotal <= 100) {
      status = "نجاح قوي";
      message = "ألف مبروك نجاح يا وحش.";
      advice = "نتيجة ممتازة. استمر على نفس المستوى.";
      mood = "success";
      emojis = "🔥🏆🎉😎🚀";
      anim = "super-success";
    }

    setResult({
      total: roundedTotal,
      exactTotal: total.toFixed(2),
      status,
      message,
      advice,
      mood,
      emojis
    });

    setScreenAnim(anim);
    setTimeout(() => setScreenAnim(""), 1800);
  };

  return (
    <main className={`page ${screenAnim}`}>
      <section className="card">
        <div className="badge">حاسبة المحصلة</div>
        <h1>احسب نتيجتك النهائية</h1>
        <p className="dua">لا تنسو تدعو لأخوكن منير بالنجاح والتوفيق 🤍</p>

        <div className="inputs">
          <label>
            درجة الامتحان
            <input
              type="number"
              min="0"
              max="100"
              placeholder="مثال: 80"
              value={examScore}
              onChange={(e) => setExamScore(e.target.value)}
            />
          </label>

          <label>
            درجة الوظيفة
            <input
              type="number"
              min="0"
              max="100"
              placeholder="مثال: 70"
              value={homeworkScore}
              onChange={(e) => setHomeworkScore(e.target.value)}
            />
          </label>
        </div>

        <button className="calc-btn" onClick={calculateResult}>
          احسب المحصلة
        </button>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className={`result ${result.mood}`}>
            <div className="score-circle">
              <span>{result.total}</span>
              <small>من 100</small>
            </div>
            <div className="result-content">
              <h2>{result.status}</h2>
              <p className="message">{result.message}</p>
              <p className="emojis">{result.emojis}</p>
              <p className="advice">{result.advice}</p>
              <p className="exact">المحصلة الدقيقة: {result.exactTotal}</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
