import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-14T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی زبان انگلیسی (۲)، پایه یازدهم، سازمان پژوهش و برنامه‌ریزی آموزشی، چاپ ۱۴۰۵–۱۴۰۶";
const sourceUrl = "https://www.roshd.ir/zaban/Content/کتاب-زبان-انگلیسی-یازدهم-متوسطه";

function authored(
  id: string,
  chapter: string,
  topic: string,
  prompt: string,
  options: [string, string, string, string],
  correctIndex: number,
  explanation: string,
  pages: string,
  difficulty: "آسان" | "متوسط" | "سخت" = "متوسط",
): ExamQuestion {
  return {
    id: `grade11-english2-authored-${id}`,
    grade: "یازدهم",
    track: "عمومی",
    subject: "زبان انگلیسی",
    chapter,
    topic,
    difficulty,
    prompt,
    options,
    correctIndex,
    explanation,
    sourceStatus: "reviewed",
    sourceTitle,
    sourceUrl,
    sourceYear: "۱۴۰۵–۱۴۰۶",
    verifiedAt,
    reviewerNote: `AUTHORED/ORIGINAL — سؤال از نو نوشته شده و به هیچ آزمونی منتسب نیست. متن، پاسخ و گزینه‌های انحرافی با کتاب درسی تطبیق داده شده‌اند؛ ارجاع: درس «${chapter}»، صفحات ${pages}.`,
  };
}

export const verifiedGrade11English2: ExamQuestion[] = [
  // Lesson 1: Understanding People (textbook pages 15–47).
  authored("lesson1-language-function", "Understanding People", "Reading comprehension",
    "According to the reading, what is the main function of language?",
    [
      "To help people exchange knowledge, beliefs, wishes, and feelings.",
      "To make all people use the same written alphabet.",
      "To prevent communication between different regions.",
      "To replace spoken communication with numbers."
    ], 0,
    "در متن، زبان نظامی برای ارتباط معرفی می‌شود که مردم با آن دانش، باورها، خواسته‌ها و احساسات خود را مبادله می‌کنند.",
    "24–25", "آسان"),
  authored("lesson1-language-facts", "Understanding People", "Reading details",
    "Which statement is mentioned in the introductory facts of Lesson 1?",
    [
      "Most languages in the world have no written form.",
      "All languages have exactly the same number of speakers.",
      "Deaf people cannot use language to communicate.",
      "No language disappears over time."
    ], 0,
    "در بخش آغازین درس آمده است که بیشتر زبان‌های جهان شکل نوشتاری ندارند؛ گزینه‌های دیگر با همان بخش ناسازگارند.",
    "15–16", "متوسط"),
  authored("lesson1-saberian-french", "Understanding People", "Dialogue comprehension",
    "When and where did Mr. Saberian begin learning French?",
    [
      "At school when he was thirteen.",
      "At a language institute when he was fifteen.",
      "At a university in Moscow.",
      "After he started working as a translator."
    ], 1,
    "در گفت‌وگو، او آغاز یادگیری انگلیسی را در مدرسه و در سیزده‌سالگی و آغاز یادگیری فرانسوی را در مؤسسهٔ زبان و در پانزده‌سالگی بیان می‌کند.",
    "19–21", "آسان"),
  authored("lesson1-much-information", "Understanding People", "Countable and uncountable nouns",
    "Choose the correct question: “_____ information does your teacher need?”",
    ["How many", "How much", "How often", "How long"], 1,
    "Information اسم غیرقابل‌شمارش است؛ برای پرسش دربارهٔ مقدار آن از How much استفاده می‌شود.",
    "29–32", "آسان"),
  authored("lesson1-simple-sentence", "Understanding People", "Simple sentences",
    "In the sentence “The bird does not sing”, which group of words is the subject?",
    ["does not sing", "The bird", "not sing", "sing"], 1,
    "موضوع جمله The bird است؛ عبارت does not sing دربارهٔ آن خبر می‌دهد و بخش فعلی جمله را می‌سازد.",
    "37–39", "متوسط"),

  // Lesson 2: A Healthy Lifestyle (textbook pages 49–79).
  authored("lesson2-family-health", "A Healthy Lifestyle", "Reading comprehension",
    "Why does the reading recommend checking family health history?",
    [
      "To understand whether particular illnesses have occurred in the family.",
      "To decide which language a person should learn.",
      "To avoid all kinds of physical activity.",
      "To replace regular health checks."
    ], 0,
    "متن پیشنهاد می‌کند سابقهٔ سلامت خانواده بررسی شود تا فرد از وجود بیماری‌های خاص در میان اعضای خانواده آگاه شود.",
    "57–60", "متوسط"),
  authored("lesson2-balanced-diet", "A Healthy Lifestyle", "Healthy habits",
    "Which choice best matches the reading's description of a balanced diet?",
    [
      "Eating only protein and avoiding all other food groups.",
      "Having suitable servings of bread, vegetables, fruits, protein, and oil.",
      "Replacing meals with sweets and fast food.",
      "Eating large amounts of one type of food every day."
    ], 1,
    "در متن، مصرف متعادل نان، سبزی‌ها، میوه‌ها، پروتئین و روغن به‌عنوان بخشی از تغذیهٔ سالم معرفی می‌شود.",
    "58–59", "آسان"),
  authored("lesson2-darband-invitation", "A Healthy Lifestyle", "Dialogue comprehension",
    "What does Behzad invite Sina to do in Darband?",
    [
      "To go shopping for a new computer.",
      "To meet a language teacher.",
      "To go climbing and walking.",
      "To watch a movie at home."
    ], 2,
    "بهداد به سینا پیشنهاد می‌کند همراه او و رضا برای کوهنوردی و پیاده‌روی به دربند برود.",
    "53–55", "آسان"),
  authored("lesson2-present-perfect", "A Healthy Lifestyle", "Present perfect",
    "Choose the correct form: “I _____ seen you since Norooz.”",
    ["didn't", "haven't", "am not", "don't"], 1,
    "با since برای بیان وضعیتی که از گذشته تا زمان حال ادامه دارد، در این جمله از حال کامل منفی (haven't seen) استفاده می‌شود.",
    "64–70", "متوسط"),
  authored("lesson2-gerund-subject", "A Healthy Lifestyle", "Gerunds",
    "Which sentence uses a gerund as its subject?",
    [
      "Swimming is useful for everyone.",
      "She is swimming in the pool.",
      "They watched the swimming competition.",
      "He will swim tomorrow."
    ], 0,
    "در گزینهٔ نخست، Swimming اسم مصدر است و نقش نهاد جمله را دارد؛ در گزینه‌های دیگر swimming یا swim نقش فعلی دیگری دارد.",
    "72–75", "متوسط"),

  // Lesson 3: Art and Culture (textbook pages 81–107).
  authored("lesson3-art-identity", "Art and Culture", "Reading comprehension",
    "According to the reading, what does art show as a part of culture?",
    [
      "The way of life and identity of a nation.",
      "Only the prices of goods in a market.",
      "The number of languages spoken in a country.",
      "The rules of grammar used by artists."
    ], 0,
    "متن توضیح می‌دهد که هنر به‌عنوان بخشی از فرهنگ، شیوهٔ زندگی و هویت یک ملت را نشان می‌دهد و بازتاب‌دهندهٔ تاریخ جامعه است.",
    "90–92", "آسان"),
  authored("lesson3-handicrafts", "Art and Culture", "Reading details",
    "How can making and selling handicrafts benefit a country, according to the reading?",
    [
      "By reducing the need for cultural exchange.",
      "By helping the economy and introducing the country's culture to others.",
      "By replacing every other form of art.",
      "By preventing tourists from learning about local traditions."
    ], 1,
    "در متن، ساخت و فروش صنایع‌دستی راهی برای کمک به اقتصاد کشور و معرفی فرهنگ آن به ملت‌های دیگر دانسته می‌شود.",
    "90–91", "متوسط"),
  authored("lesson3-appreciate", "Art and Culture", "Vocabulary",
    "In the context of the reading, the word “appreciate” is closest in meaning to _____ .",
    ["ignore", "value", "damage", "hide"], 1,
    "در واژه‌آموزی درس، appreciate به معنای ارزش‌دانستن یا قدر چیزی را دانستن آمده است.",
    "88–91", "آسان"),
  authored("lesson3-first-conditional", "Art and Culture", "Conditional type I",
    "Which sentence is a correct example of a Type I conditional?",
    [
      "If tourists buy local handicrafts, they will support local artists.",
      "If tourists bought local handicrafts, they support local artists yesterday.",
      "If tourists will buy local handicrafts, they supported local artists.",
      "If tourists buying local handicrafts, they will support local artists."
    ], 0,
    "در شرطی نوع اول، بخش if با حال ساده می‌آید و نتیجه معمولاً با will به‌علاوهٔ شکل سادهٔ فعل بیان می‌شود.",
    "96–103", "متوسط"),
  authored("lesson3-infinitive", "Art and Culture", "Infinitives",
    "In the sentence “We want to know a country well”, which words form the infinitive?",
    ["want to", "to know", "a country", "know a country"], 1,
    "در ساختار want to know، عبارت to know مصدر با to است و پس از فعل want آمده است.",
    "101–105", "متوسط"),
];
