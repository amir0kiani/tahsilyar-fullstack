import { useMemo, useState } from "react";

type LearningSession = { id?: number; subject: string; topic: string; completed?: number };
type Props = { answers: Record<string, string>; sessions: LearningSession[]; completed: number[] };
type Guide = { title: string; category: string; match: string[]; steps: string[]; warning: string };

const guides: Guide[] = [
  { title: "زیست‌شناسی: بازیابی فعال", category: "حفظی ـ مفهومی", match: ["زیست"], steps: ["یک بخش کوتاه را بخوان و کتاب را ببند.", "فرایندها و رابطه‌های علت‌ومعلولی را از حافظه توضیح بده.", "شکل‌ها و قیدهای متن را جداگانه بررسی کن.", "تست بزن و دلیل رد هر گزینه را ثبت کن."], warning: "صرفاً چندبارخوانی یا هایلایت‌کردن را معادل یادگیری ندان." },
  { title: "ریاضی و حسابان: حل مرحله‌ای", category: "مسئله‌محور", match: ["ریاضی", "حسابان", "هندسه", "آمار", "گسسته"], steps: ["قبل از دیدن پاسخ، داده‌ها و خواستهٔ سؤال را بنویس.", "راه‌حل را مرحله‌به‌مرحله و با دلیل پیش ببر.", "پس از بررسی پاسخ، سؤال مشابهی را بدون کمک حل کن.", "اشتباه را در یکی از دسته‌های مفهوم، محاسبه یا راهبرد ثبت کن."], warning: "دیدن راه‌حل بدون حل مستقل، تسلط را ثابت نمی‌کند." },
  { title: "فیزیک و شیمی: مفهوم تا کاربرد", category: "مفهومی ـ مسئله‌محور", match: ["فیزیک", "شیمی"], steps: ["مفهوم یا قانون را با زبان خودت توضیح بده.", "واحدها، فرض‌ها و شرایط کاربرد رابطه را مشخص کن.", "یک مثال حل‌شده را تحلیل و سپس بدون نگاه بازسازی کن.", "تست ترکیبی بزن و علت خطا را یادداشت کن."], warning: "فرمول را جدا از مفهوم و شرایط استفاده حفظ نکن." },
  { title: "زبان انگلیسی: یادآوری در فاصله", category: "زبان", match: ["انگلیسی", "زبان"], steps: ["واژه را همراه با جمله و کاربردش یاد بگیر.", "معنی را از روی واژه به یاد بیاور، نه فقط برعکس.", "واژه‌های دشوار را فردا و چند روز بعد مرور کن.", "در متن کوتاه، واژه را در بافت واقعی تشخیص بده."], warning: "فهرست طولانی واژه بدون آزمون از حافظه معمولاً ماندگاری کمتری دارد." },
  { title: "فارسی و علوم‌وفنون: تحلیل متن", category: "متن و ادبیات", match: ["فارسی", "نگارش", "علوم و فنون", "ادبی"], steps: ["نکتهٔ ادبی یا آرایه را با نمونهٔ روشن تعریف کن.", "شاهد را دقیق پیدا کن و دلیل انتخابت را توضیح بده.", "نمونه‌های مشابه را مقایسه کن تا تفاوت‌ها مشخص شود.", "تست‌های غلط را بر اساس علت اشتباه دسته‌بندی کن."], warning: "فقط حفظ‌کردن اسم آرایه یا قاعده برای تشخیص در تست کافی نیست." },
  { title: "تاریخ، جغرافیا و علوم انسانی: پیوندسازی", category: "مفهومی ـ متنی", match: ["تاریخ", "جغرافیا", "جامعه", "روان‌شناسی", "فلسفه", "منطق", "اقتصاد", "دین و زندگی", "عربی"], steps: ["مطالب را به پرسش و پاسخ کوتاه تبدیل کن.", "علت، پیامد، شباهت و تفاوت را در جدول یا نقشهٔ مفهومی بنویس.", "کتاب را ببند و ترتیب یا رابطه‌ها را از حافظه بازگو کن.", "با تست، تفاوت گزینه‌های نزدیک را بررسی کن."], warning: "خلاصه‌نویسی طولانی را جایگزین بازیابی فعال نکن." },
  { title: "روش عمومی: مرور فاصله‌دار", category: "مرور و تثبیت", match: ["*"], steps: ["همان روز، چند دقیقه نکات دشوار را از حافظه مرور کن.", "در جلسهٔ بعد، پیش از بازخوانی خودت را امتحان کن.", "موارد فراموش‌شده را زودتر و موارد مسلط را با فاصلهٔ بیشتر مرور کن.", "پیشرفت را با پاسخ درست و حل مستقل بسنج."], warning: "فاصلهٔ مرور را با توجه به میزان یادآوری واقعی تنظیم کن." },
];

const answer = (answers: Record<string, string>, keys: string[]) => {
  for (const key of keys) { const value = answers[key]?.trim(); if (value) return value; }
  return "";
};

export default function AcademicLearningHub({ answers, sessions, completed }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("همه");
  const track = answer(answers, ["پایه و رشته", "پایه", "رشته"]);
  const priorities = answer(answers, ["دروس اولویت‌دار", "دروس امروز"]);
  const dailyTime = answer(answers, ["میزان ساعت مطالعه", "زمان مطالعه", "بازهٔ زمانی", "ساعت مطالعه"]);
  const goal = answer(answers, ["هدف قبولی", "هدف آزمون", "امتحان نزدیک", "امتحان پیشرو"]);
  const answeredCount = Object.values(answers).filter((value) => Boolean(value?.trim())).length;
  const doneSessions = sessions.filter((session, index) => completed.includes(session.id ?? index)).length;
  const ratio = sessions.length ? Math.round((doneSessions / sessions.length) * 100) : null;
  const categories = useMemo(() => ["همه", ...Array.from(new Set(guides.map((guide) => guide.category)))], []);
  const filteredGuides = guides.filter((guide) => {
    const text = [guide.title, guide.category, ...guide.steps, guide.warning].join(" ").toLocaleLowerCase("fa");
    const matchesQuery = !query.trim() || text.includes(query.trim().toLocaleLowerCase("fa"));
    const matchesCategory = category === "همه" || guide.category === category;
    return matchesQuery && matchesCategory;
  });

  return <section className="academic-hub" aria-label="DNA تحصیلی و بانک آموزشی">
    <div className="academic-hub-heading">
      <div><p className="eyebrow">شناخت مسیر یادگیری</p><h2>DNA تحصیلی تو</h2><p>این جمع‌بندی فقط از پاسخ‌های ثبت‌شده و جلسه‌های علامت‌خورده ساخته می‌شود؛ تشخیص روان‌شناختی یا پیش‌بینی نمره نیست.</p></div>
      <span className="academic-hub-badge">{answeredCount} دادهٔ ثبت‌شده</span>
    </div>
    <div className="academic-dna-grid">
      <article className="academic-dna-item"><span>پایه و رشته</span><strong>{track || "هنوز ثبت نشده"}</strong><small>{track ? "بر اساس پروفایل تو" : "برای شخصی‌سازی، پروفایل را کامل کن."}</small></article>
      <article className="academic-dna-item"><span>اولویت فعلی</span><strong>{priorities || "هنوز مشخص نشده"}</strong><small>از پاسخ مربوط به درس‌های منتخب</small></article>
      <article className="academic-dna-item"><span>زمان مطالعه</span><strong>{dailyTime || "هنوز ثبت نشده"}</strong><small>ظرفیت اعلام‌شدهٔ خودت، نه زمان تخمینی</small></article>
      <article className="academic-dna-item"><span>هدف آموزشی</span><strong>{goal || "هنوز ثبت نشده"}</strong><small>هدف را دقیق‌تر ثبت کن تا برنامه واقع‌بینانه‌تر شود.</small></article>
      <article className="academic-dna-item academic-dna-progress"><span>پایبندی ثبت‌شده به جلسات</span><strong>{ratio === null ? "داده کافی نیست" : String(ratio) + "٪"}</strong>{ratio === null ? <small>پس از ساخت برنامه و ثبت جلسه‌ها نمایش داده می‌شود.</small> : <><div className="academic-mini-track"><i style={{ width: String(ratio) + "%" }} /></div><small>{doneSessions} جلسه از {sessions.length} جلسهٔ برنامه علامت خورده است.</small></>}</article>
    </div>
    <div className="academic-hub-heading learning-bank-heading">
      <div><p className="eyebrow">ابزارهای قابل اجرا</p><h2>بانک آموزشی</h2><p>روش‌ها را متناسب با درس انتخاب کن؛ بعد از مطالعه، خودت را بدون نگاه‌کردن به منبع امتحان کن.</p></div>
    </div>
    <div className="learning-bank-controls">
      <label className="learning-search"><span className="sr-only">جست‌وجوی روش مطالعه</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جست‌وجو: مرور، تست، زیست‌شناسی..." /></label>
      <label className="learning-category"><span className="sr-only">دسته‌بندی روش مطالعه</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
    </div>
    {filteredGuides.length ? <div className="learning-guide-grid">{filteredGuides.map((guide) => <article className="learning-guide-card" key={guide.title}>
      <div className="learning-guide-meta"><span>{guide.category}</span><span>راهنمای عملی</span></div><h3>{guide.title}</h3><ol>{guide.steps.map((step) => <li key={step}>{step}</li>)}</ol><p className="learning-guide-warning"><strong>حواست باشد:</strong> {guide.warning}</p>
    </article>)}</div> : <div className="learning-empty">موردی با این جست‌وجو پیدا نشد. عبارت دیگری امتحان کن یا دسته‌بندی را روی «همه» بگذار.</div>}
  </section>;
}
