import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-19T00:00:00.000Z");
const sourceTitle = "Vision 3 — انگلیسی (۳)، پایه دوازدهم، کد ۱۱۲۲۳۰، سازمان پژوهش و برنامه‌ریزی آموزشی، چاپ هفتم ۱۴۰۳";
const sourceUrl = "https://iranestekhdam.ir/storage/medias/2025-09-15/1757934304_%D8%A7%D9%86%DA%AF%D9%84%DB%8C%D8%B3%DB%8C-3.pdf";

type Item = {
  topic: string;
  prompt: string;
  options: [string, string, string, string];
  answer: number;
  explanation: string;
  pages: string;
};

const makeLesson = (chapter: string, items: Item[]): ExamQuestion[] =>
  items.map((item, index) => ({
    id: `grade12-vision3-${chapter === "Sense of Appreciation" ? "lesson1" : chapter === "Look it Up!" ? "lesson2" : "lesson3"}-${String(index + 1).padStart(2, "0")}`,
    grade: "دوازدهم",
    track: "عمومی",
    subject: "زبان انگلیسی",
    chapter,
    topic: item.topic,
    difficulty: "متوسط",
    prompt: item.prompt,
    options: item.options,
    correctIndex: item.answer,
    explanation: item.explanation,
    sourceStatus: "curriculum-verified",
    sourceTitle,
    sourceUrl,
    sourceYear: "۱۴۰۳",
    verifiedAt,
    reviewerNote: `سؤال تألیفی و مستقل بر اساس محتوای کتاب مشترک Vision 3؛ پاسخ و گزینه‌ها با متن/نکتهٔ آموزشی درس ${chapter}، صفحات چاپی ${item.pages} تطبیق داده شد. این رکورد یک‌بار در بانک مشترک ثبت می‌شود و از طریق نگاشت کتاب عمومی برای هر سه رشته قابل استفاده است.`
  }));

export const verifiedGrade12SharedEnglishVision3: ExamQuestion[] = [
  ...makeLesson("Sense of Appreciation", [
    {
      topic: "Reading comprehension — Dr. Gharib",
      prompt: "According to the lesson, what did Dr. Mohammad Gharib help establish in 1347?",
      options: ["A language institute", "The Children's Medical Center", "A university in Shiraz", "A dictionary publishing house"],
      answer: 1,
      explanation: "در گفت‌وگوی درس آمده است که مرکز طبی کودکان در سال ۱۳۴۷ به‌وسیلهٔ دکتر قریب و یکی از دوستان نزدیکش تأسیس شد.",
      pages: "18–20"
    },
    {
      topic: "Reading comprehension — Respect your Parents",
      prompt: "What does the mother's diary help her son understand?",
      options: ["That he should stop asking questions", "That his mother had patiently answered his repeated questions when he was a child", "That keeping a diary is more important than family relationships", "That children should avoid talking to older people"],
      answer: 1,
      explanation: "خاطرهٔ ثبت‌شده در دفتر نشان می‌دهد مادر بارها با محبت به پرسش تکراری فرزندش پاسخ داده بود؛ داستان بر مهربانی و احترام به والدین تأکید دارد.",
      pages: "23–25"
    },
    {
      topic: "Grammar — Passive voice",
      prompt: "Choose the correct passive form of: “People speak English in many countries.”",
      options: ["English is spoken in many countries.", "English was speaking in many countries.", "English speaks in many countries.", "English has speak in many countries."],
      answer: 0,
      explanation: "در زمان حال سادهٔ مجهول از am/is/are + past participle استفاده می‌کنیم؛ بنابراین speak به spoken تبدیل می‌شود.",
      pages: "29–30"
    },
    {
      topic: "Grammar — Tag questions",
      prompt: "Choose the correct tag question: “Your parents have helped you, _____?”",
      options: ["have they", "haven't they", "didn't they", "don't they"],
      answer: 1,
      explanation: "جملهٔ اصلی مثبت و زمان آن حال کامل است؛ پس پرسش تأییدی منفی با فعل کمکی have و ضمیر they ساخته می‌شود.",
      pages: "30–31"
    },
    {
      topic: "Writing — Compound sentences",
      prompt: "Choose the conjunction that best completes the compound sentence: “The road was closed, _____ we took another route.”",
      options: ["because", "although", "so", "unless"],
      answer: 2,
      explanation: "دو جملهٔ مستقل با so به هم پیوند می‌خورند؛ بسته بودن جاده علت و انتخاب مسیر دیگر نتیجه است.",
      pages: "36–39"
    }
  ]),
  ...makeLesson("Look it Up!", [
    {
      topic: "Reading comprehension — Dictionary guide words",
      prompt: "What do the two guide words at the top of a dictionary page show?",
      options: ["The first and last entries on that page", "The pronunciation of every word on the page", "The number of definitions in the dictionary", "The language in which the dictionary was written"],
      answer: 0,
      explanation: "طبق متن درس، دو واژهٔ راهنما در بالای صفحه نخستین و آخرین مدخل همان صفحه را نشان می‌دهند و پیدا کردن واژه را آسان می‌کنند.",
      pages: "51–53"
    },
    {
      topic: "Vocabulary skills — Dictionary types",
      prompt: "Which dictionary gives word information and definitions in English rather than translating them into Persian?",
      options: ["A bilingual English–Persian dictionary", "A monolingual English dictionary", "A Persian–English dictionary", "A picture-only dictionary"],
      answer: 1,
      explanation: "در فرهنگ لغت تک‌زبانه، توضیح و معنی واژه به همان زبان انگلیسی ارائه می‌شود؛ فرهنگ دوزبانه معادل زبان دیگر را نیز می‌دهد.",
      pages: "47–48"
    },
    {
      topic: "Reading strategy — Highlighting",
      prompt: "According to the lesson, what should a reader highlight in a text?",
      options: ["Every sentence and example", "Only unfamiliar words", "Main ideas and key points, not minor details", "The longest paragraphs"],
      answer: 2,
      explanation: "راهبرد برجسته‌سازی بر انتخاب ایده‌های اصلی و نکته‌های کلیدی تأکید دارد، نه علامت‌گذاری همهٔ جمله‌ها یا جزئیات کم‌اهمیت.",
      pages: "52–53"
    },
    {
      topic: "Grammar — Relative clauses",
      prompt: "Choose the correct relative pronoun: “The student _____ borrowed my dictionary returned it today.”",
      options: ["which", "where", "who", "when"],
      answer: 2,
      explanation: "برای اشاره به انسان در نقش فاعل جمله‌وارهٔ موصولی از who استفاده می‌شود؛ which برای اشیا و حیوانات به‌کار می‌رود.",
      pages: "57–58"
    },
    {
      topic: "Grammar — Conditional sentences, Type II",
      prompt: "Choose the correct completion: “If I _____ a better dictionary, I would understand the new words more easily.”",
      options: ["have", "had", "will have", "am having"],
      answer: 1,
      explanation: "شرطی نوع دوم برای موقعیت فرضی یا غیرواقعی به‌کار می‌رود: If + past simple, would + base verb؛ بنابراین had درست است.",
      pages: "59–61"
    }
  ]),
  ...makeLesson("Renewable Energy", [
    {
      topic: "Reading comprehension — Renewable and nonrenewable resources",
      prompt: "Why are fossil fuels described as nonrenewable in the reading?",
      options: ["They are produced every day by sunlight.", "They can be replaced immediately after use.", "They cannot be replaced easily once they are used up.", "They do not affect air or water."],
      answer: 2,
      explanation: "متن توضیح می‌دهد سوخت‌های فسیلی مانند نفت، گاز طبیعی و زغال‌سنگ به‌آسانی جایگزین نمی‌شوند و با مصرف شدن، ذخیرهٔ آن‌ها کاهش می‌یابد.",
      pages: "79–80"
    },
    {
      topic: "Reading comprehension — Renewable resources",
      prompt: "Which group contains only examples of renewable energy resources mentioned in the lesson?",
      options: ["Coal, oil, and natural gas", "Wind, water, sunshine, tides, and plants", "Gasoline, coal, and sunlight", "Oil, uranium, and natural gas"],
      answer: 1,
      explanation: "در متن، باد، آب، نور خورشید، جزرومد و گیاهان به‌عنوان منابعی معرفی می‌شوند که می‌توانند جایگزین شوند.",
      pages: "79–80"
    },
    {
      topic: "Reading comprehension — Solar energy",
      prompt: "How do solar collectors produce useful heat?",
      options: ["By absorbing sunlight", "By burning coal", "By using underground oil", "By increasing the use of fossil fuels"],
      answer: 0,
      explanation: "طبق متن، صفحات خورشیدی با جذب نور خورشید گرما جمع‌آوری می‌کنند و می‌توان از انرژی خورشیدی برای گرم کردن آب و هوا استفاده کرد.",
      pages: "80–81"
    },
    {
      topic: "Grammar — Passive voice with modals",
      prompt: "Choose the correct passive form: “We should protect the environment.”",
      options: ["The environment should protect.", "The environment should be protected.", "The environment is should protected.", "The environment should be protect."],
      answer: 1,
      explanation: "ساخت مجهول با افعال وجهی به صورت modal + be + past participle است؛ پس should be protected درست است.",
      pages: "83–85"
    },
    {
      topic: "Grammar — Past perfect tense",
      prompt: "Choose the correct form: “By the time we arrived at the station, the train _____.”",
      options: ["leaves", "has left", "had left", "will leave"],
      answer: 2,
      explanation: "برای عملی که پیش از عمل دیگری در گذشته کامل شده است از گذشتهٔ کامل (had + past participle) استفاده می‌کنیم.",
      pages: "85–87"
    }
  ])
];
