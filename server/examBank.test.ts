import { describe, expect, it } from "vitest";
import { examQuestions } from "./examBank";
import { curriculumCatalog } from "./curriculumCatalog";
import { verifiedQuestions } from "./verifiedQuestionBank";
import { buildGradeSpecificCatalog } from "./db";

const allQuestions = [...examQuestions, ...verifiedQuestions];

describe("curriculum and assessment question bank", () => {
  it("has unique IDs and valid four-choice answer keys across all bundled questions", () => {
    expect(new Set(allQuestions.map((question) => question.id)).size).toBe(allQuestions.length);
    for (const question of allQuestions) {
      expect(question.options).toHaveLength(4);
      expect(question.correctIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex).toBeLessThan(4);
      expect(question.explanation.length).toBeGreaterThan(5);
      expect(question.prompt.length).toBeGreaterThan(8);
    }
  });

  it("keeps the original sample-authored bank clearly separate", () => {
    expect(examQuestions.length).toBeGreaterThanOrEqual(50);
    expect(examQuestions.every((question) => question.sourceStatus === "sample-authored")).toBe(true);
  });

  it("records traceable provenance for every official- or mock-exam-adapted question", () => {
    expect(verifiedQuestions.length).toBeGreaterThanOrEqual(29);
    for (const question of verifiedQuestions) {
      expect(["official-exam-adapted", "mock-exam-adapted", "reviewed"]).toContain(question.sourceStatus);
      expect(question.sourceTitle).toBeTruthy();
      const uploadedSource = question.sourceTitle?.includes("(فایل ارسالی کاربر)") ?? false;
      if (uploadedSource) {
        expect(question.sourceQuestionNumber).toBeTruthy();
      } else {
        expect(question.sourceUrl).toMatch(/^https:\/\//);
        expect(question.sourceYear).toBeTruthy();
      }
      expect(question.verifiedAt).toBeInstanceOf(Date);
      expect(question.reviewerNote).toBeTruthy();
    }
  });

  it("does not label rewritten practice items as verbatim official exam questions", () => {
    expect(verifiedQuestions.every((question) => question.sourceStatus !== "official-exam")).toBe(true);
    expect(verifiedQuestions.every((question) => ["official-exam-adapted", "mock-exam-adapted", "reviewed"].includes(question.sourceStatus ?? ""))).toBe(true);
  });

  it("maps the Grade 11 humanities climate questions to the exact Geography 2 lesson title", () => {
    const climateQuestions = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "جغرافیا" &&
      question.chapter === "نواحی آب و هوایی" &&
      question.sourceStatus === "reviewed"
    );
    expect(climateQuestions).toHaveLength(4);
    expect(verifiedQuestions.some((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "جغرافیا" &&
      ["نواحی طبیعی", "نواحی آب‌وهوایی"].includes(question.chapter)
    )).toBe(false);
  });

  it("includes five traceable Grade 11 humanities history questions adapted from the official Khordad 1404 final exam", () => {
    const questions = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "تاریخ" &&
      question.chapter === "ایران در دوران غزنوی، سلجوقی و خوارزمشاهی" &&
      question.sourceStatus === "official-exam-adapted" &&
      question.sourceTitle?.includes("خرداد ۱۴۰۴")
    );
    expect(questions).toHaveLength(5);
    for (const question of questions) {
      expect(question.sourceUrl).toBe("https://dl.novinkonkor.com/nahaye/11/ensani/1404/khordad/tarikh_2.pdf");
      expect(question.sourceYear).toBe("۱۴۰۴");
      expect(question.sourceQuestionNumber).toBeTruthy();
      expect(question.verifiedAt).toBeInstanceOf(Date);
      expect(question.reviewerNote).toBeTruthy();
    }
  });

  it("uses verified chapter maps for Grade 11 common textbooks", () => {
    const chaptersFor = (subject: string) =>
      curriculumCatalog.find((book) => book.track === "عمومی" && book.grade === "یازدهم" && book.subject === subject)?.chapters ?? [];

    expect(chaptersFor("فارسی")).toEqual([
      "ادبیات تعلیمی", "ادبیات سفر و زندگی", "ادبیات غنایی", "ادبیات پایداری",
      "ادبیات انقلاب اسلامی", "ادبیات حماسی", "ادبیات داستانی", "ادبیات جهان",
    ]);
    expect(chaptersFor("نگارش")).toHaveLength(6);
    expect(chaptersFor("زبان انگلیسی")).toEqual(["Understanding People", "A Healthy Lifestyle", "Art and Culture"]);
    expect(chaptersFor("تاریخ معاصر ایران")).toHaveLength(26);
    expect(chaptersFor("انسان و محیط زیست")).toHaveLength(7);
    for (const subject of ["فارسی", "نگارش", "زبان انگلیسی", "تاریخ معاصر ایران", "انسان و محیط زیست"]) {
      expect(chaptersFor(subject)).not.toContain("کل کتاب");
    }
  });

  it("includes the official Grade 11 calculus and experimental laboratory chapter maps", () => {
    const book = (track: string, subject: string) =>
      curriculumCatalog.find((item) => item.grade === "یازدهم" && item.track === track && item.subject === subject);
    expect(book("ریاضی", "حسابان")?.chapters).toEqual([
      "جبر و معادله", "تابع", "توابع نمایی و لگاریتمی", "مثلثات", "حد و پیوستگی",
    ]);
    const labChapters = ["کلیات", "آزمایش‌های مربی", "آزمایش‌های دستورالعملی", "آزمایش‌های کاوشگری"];
    expect(book("ریاضی", "آزمایشگاه علوم تجربی")?.chapters).toEqual(labChapters);
    expect(book("تجربی", "آزمایشگاه علوم تجربی")?.chapters).toEqual(labChapters);
  });

  it("keeps Grade 11 Arabic and Dini editions separated by track", () => {
    const book = (track: string, subject: string) =>
      curriculumCatalog.find((item) => item.grade === "یازدهم" && item.track === track && item.subject === subject);

    expect(curriculumCatalog.some((item) => item.grade === "یازدهم" && item.track === "عمومی" && ["عربی", "دین و زندگی"].includes(item.subject))).toBe(false);
    expect(book("انسانی", "عربی")?.chapters).toEqual(["مواعظ قیمة", "صناعة التلميع في الأدب الفارسي", "عجائب المخلوقات", "تأثير اللغة الفارسية على اللغة العربية", "الصدق", "ارحموا ثلاثاً", "لا تقنطوا"]);
    const mathArabic = book("ریاضی", "عربی")?.chapters ?? [];
    const scienceArabic = book("تجربی", "عربی")?.chapters ?? [];
    expect(mathArabic).toHaveLength(7);
    expect(scienceArabic).toEqual(mathArabic);
    expect(book("انسانی", "دین و زندگی")?.chapters).toHaveLength(18);
    const nonHumanitiesDini = ["هدایت الهی", "تداوم هدایت", "معجزه جاویدان", "مسئولیت‌های پیامبر (ص)", "امامت، تداوم رسالت", "پیشوایان اسوه", "وضعیت فرهنگی، اجتماعی و سیاسی مسلمانان، پس از رحلت رسول خدا (ص)", "احیای ارزش‌های راستین", "عصر غیبت", "مرجعیت و ولایت فقیه", "عزت نفس", "پیوند مقدس"];
    expect(book("ریاضی", "دین و زندگی")?.chapters).toEqual(nonHumanitiesDini);
    expect(book("تجربی", "دین و زندگی")?.chapters).toEqual(nonHumanitiesDini);
  });

  it("does not treat Arabic skill labels as official Grade 11 lessons", () => {
    const catalog = buildGradeSpecificCatalog([
      { track: "انسانی", grade: "یازدهم", subject: "عربی", chapter: "ترجمه", sourceStatus: "reviewed" },
      { track: "انسانی", grade: "یازدهم", subject: "عربی", chapter: "واژگان", sourceStatus: "reviewed" },
      { track: "انسانی", grade: "یازدهم", subject: "عربی", chapter: "مفهوم عبارات", sourceStatus: "reviewed" },
    ]);
    const arabic = catalog.find((item) => item.track === "انسانی" && item.grade === "یازدهم" && item.subject === "عربی");
    expect(arabic?.questionCount).toBe(3);
    expect(arabic?.lessonCoverage).toHaveLength(7);
    expect(arabic?.lessonCoverage.map((lesson) => lesson.chapter)).not.toContain("ترجمه");
    expect(arabic?.lessonsMeetingTarget).toBe(0);
  });
  it("lists grade-specific books for all three main tracks", () => {
    for (const grade of ["دهم", "یازدهم", "دوازدهم"]) {
      expect(curriculumCatalog.some((book) => book.grade === grade && book.track === "تجربی")).toBe(true);
      expect(curriculumCatalog.some((book) => book.grade === grade && book.track === "ریاضی")).toBe(true);
      expect(curriculumCatalog.some((book) => book.grade === grade && book.track === "انسانی")).toBe(true);
    }
    expect(curriculumCatalog.every((book) => book.chapters.length > 0)).toBe(true);
  });


  it("has the first humanities book batch mapped to its official grade-12 book chapters", () => {
    const humanitiesMath3 = verifiedQuestions.filter((question) =>
      question.track === "انسانی" && question.grade === "دوازدهم" && question.subject === "ریاضی و آمار"
    );
    expect(humanitiesMath3.length).toBeGreaterThanOrEqual(5);
    expect(new Set(humanitiesMath3.map((question) => question.chapter))).toEqual(
      new Set(["آمار و احتمال", "الگوهای خطی", "الگوهای غیرخطی"])
    );
    expect(curriculumCatalog.find((book) =>
      book.track === "انسانی" && book.grade === "دوازدهم" && book.subject === "ریاضی و آمار"
    )?.bookCode).toBe("112212");
  });

  it("keeps biology source references mapped to each biology textbook grade", () => {
    expect(verifiedQuestions.some((question) => question.subject === "زیست‌شناسی" && question.grade === "دهم")).toBe(true);
    expect(verifiedQuestions.some((question) => question.subject === "زیست‌شناسی" && question.grade === "یازدهم")).toBe(true);
    expect(verifiedQuestions.some((question) => question.subject === "زیست‌شناسی" && question.grade === "دوازدهم")).toBe(true);
  });

  it("sets a five-question target for every lesson, not for the whole book", () => {
    expect(curriculumCatalog.every((book) => book.targetQuestionsPerLesson === 5)).toBe(true);
  });

  it("reports verified question coverage separately for every lesson and excludes pending or sample items", () => {
    const rows = [
      ...Array.from({ length: 5 }, (_, index) => ({
        track: "انسانی", grade: "یازدهم", subject: "ریاضی و آمار",
        chapter: "آشنایی با منطق و استدلال ریاضی", sourceStatus: "reviewed",
      })),
      {
        track: "انسانی", grade: "یازدهم", subject: "ریاضی و آمار",
        chapter: "آشنایی با منطق و استدلال ریاضی", sourceStatus: "pending-review",
      },
      ...Array.from({ length: 4 }, () => ({
        track: "انسانی", grade: "یازدهم", subject: "ریاضی و آمار",
        chapter: "تابع", sourceStatus: "sample-authored",
      })),
    ];
    const book = buildGradeSpecificCatalog(rows).find((item) =>
      item.track === "انسانی" && item.grade === "یازدهم" && item.subject === "ریاضی و آمار"
    );
    expect(book).toBeDefined();
    const logic = book?.lessonCoverage.find((lesson) => lesson.chapter === "آشنایی با منطق و استدلال ریاضی");
    const functionLesson = book?.lessonCoverage.find((lesson) => lesson.chapter === "تابع");
    expect(logic).toMatchObject({ questionCount: 6, verifiedQuestionCount: 5, targetQuestionsPerLesson: 5, targetMet: true });
    expect(functionLesson).toMatchObject({ questionCount: 4, verifiedQuestionCount: 0, targetQuestionsPerLesson: 5, targetMet: false });
    expect(book?.lessonsMeetingTarget).toBe(1);
    expect(book?.lessonCount).toBe(3);
  });

  it("keeps every curriculum catalogue entry grade- and track-specific", () => {
    expect(curriculumCatalog.every((book) => ["دهم", "یازدهم", "دوازدهم"].includes(book.grade))).toBe(true);
    expect(curriculumCatalog.every((book) => ["عمومی", "تجربی", "ریاضی", "انسانی"].includes(book.track))).toBe(true);
  });
  it("reaches the five-question target for each grade-specific biology textbook", () => {
    for (const grade of ["دهم", "یازدهم", "دوازدهم"]) {
      const questions = verifiedQuestions.filter((question) =>
        question.track === "تجربی" && question.grade === grade && question.subject === "زیست‌شناسی"
      );
      expect(questions.length).toBeGreaterThanOrEqual(5);
      expect(questions.every((question) => ["official-exam-adapted", "mock-exam-adapted", "reviewed"].includes(question.sourceStatus ?? ""))).toBe(true);
    }
  });

  it("links the new biology batch to the official Sanjesh exam publication", () => {
    const biologyBatch = verifiedQuestions.filter((question) => question.id.startsWith("verified-bio"));
    expect(biologyBatch.length).toBeGreaterThanOrEqual(15);
    expect(biologyBatch.filter((question) => question.sourceUrl?.includes("sanjesh.org")).length).toBeGreaterThanOrEqual(10);
  });

  it("reaches the five-question target for Grade 10 and Grade 11 chemistry textbooks", () => {
    for (const grade of ["دهم", "یازدهم"]) {
      const questions = verifiedQuestions.filter((question) =>
        question.track === "تجربی" && question.grade === grade && question.subject === "شیمی"
      );
      expect(questions.length).toBeGreaterThanOrEqual(5);
      expect(questions.every((question) => ["official-exam-adapted", "mock-exam-adapted", "reviewed"].includes(question.sourceStatus ?? ""))).toBe(true);
    }
  });

  it("links the new chemistry batch to the official Sanjesh exam publication", () => {
    const chemistryBatch = verifiedQuestions.filter((question) => question.id.startsWith("verified-chem"));
    expect(chemistryBatch.length).toBeGreaterThanOrEqual(12);
    expect(chemistryBatch.filter((question) => question.sourceUrl?.includes("sanjesh.org")).length).toBeGreaterThanOrEqual(8);
  });

  it("reaches the five-question target for Grade 12 physics in both experimental and math tracks", () => {
    for (const track of ["تجربی", "ریاضی"]) {
      const questions = verifiedQuestions.filter((question) =>
        question.track === track && question.grade === "دوازدهم" && question.subject === "فیزیک"
      );
      expect(questions.length).toBeGreaterThanOrEqual(5);
      expect(questions.every((question) => ["official-exam-adapted", "mock-exam-adapted", "reviewed"].includes(question.sourceStatus ?? ""))).toBe(true);
    }
  });

  it("links the new Grade 12 physics items to the official Sanjesh publication", () => {
    const physicsBatch = verifiedQuestions.filter((question) => question.id.startsWith("verified-physics3-"));
    expect(physicsBatch.length).toBeGreaterThanOrEqual(10);
    expect(physicsBatch.filter((question) => question.sourceUrl?.includes("sanjesh.org")).length).toBeGreaterThanOrEqual(5);
  });


  it("provides at least five lesson-linked questions for each uploaded Grade 12 book", () => {
    const covers = [
      { subject: "تاریخ", track: "انسانی", chapters: 12 },
      { subject: "جغرافیا", track: "انسانی", chapters: 6 },
      { subject: "جامعه‌شناسی", track: "انسانی", chapters: 10 },
      { subject: "فلسفه", track: "انسانی", chapters: 12 },
    ];
    for (const book of covers) {
      const catalogBook = curriculumCatalog.find((item) =>
        item.grade === "دوازدهم" && item.track === book.track && item.subject === book.subject
      );
      expect(catalogBook).toBeTruthy();
      expect(catalogBook?.chapters).toHaveLength(book.chapters);
      for (const chapter of catalogBook?.chapters ?? []) {
        const matching = verifiedQuestions.filter((question) =>
          question.grade === "دوازدهم" && question.track === book.track &&
          question.subject === book.subject && question.chapter === chapter
        );
        expect(matching.length, `${book.subject} / ${chapter}`).toBeGreaterThanOrEqual(5);
      }
    }

    for (const track of ["تجربی", "ریاضی"]) {
      const chemistry = curriculumCatalog.find((item) =>
        item.grade === "دوازدهم" && item.track === track && item.subject === "شیمی"
      );
      expect(chemistry?.chapters).toHaveLength(4);
      for (const chapter of chemistry?.chapters ?? []) {
        const matching = verifiedQuestions.filter((question) =>
          question.grade === "دوازدهم" && question.subject === "شیمی" &&
          question.chapter === chapter &&
          (question.track === track || question.track === "ریاضی و تجربی")
        );
        expect(matching.length, `شیمی ${track} / ${chapter}`).toBeGreaterThanOrEqual(5);
      }
    }
  });


  it("covers every lesson in the five uploaded Grade 12 books with five adapted questions", () => {
    const uploadedBooks = [
      { subject: "تاریخ", chapters: curriculumCatalog.find((book) => book.grade === "دوازدهم" && book.track === "انسانی" && book.subject === "تاریخ")?.chapters ?? [] },
      { subject: "جغرافیا", chapters: curriculumCatalog.find((book) => book.grade === "دوازدهم" && book.track === "انسانی" && book.subject === "جغرافیا")?.chapters ?? [] },
      { subject: "جامعه‌شناسی", chapters: curriculumCatalog.find((book) => book.grade === "دوازدهم" && book.track === "انسانی" && book.subject === "جامعه‌شناسی")?.chapters ?? [] },
      { subject: "فلسفه", chapters: curriculumCatalog.find((book) => book.grade === "دوازدهم" && book.track === "انسانی" && book.subject === "فلسفه")?.chapters ?? [] },
      { subject: "شیمی", chapters: curriculumCatalog.find((book) => book.grade === "دوازدهم" && book.track === "تجربی" && book.subject === "شیمی")?.chapters ?? [] },
    ];

    for (const book of uploadedBooks) {
      expect(book.chapters.length, book.subject).toBeGreaterThan(0);
      for (const chapter of book.chapters) {
        const matching = verifiedQuestions.filter((question) =>
          question.grade === "دوازدهم" &&
          question.subject === book.subject &&
          question.chapter === chapter &&
          (book.subject !== "شیمی" || ["تجربی", "ریاضی", "ریاضی و تجربی"].includes(question.track))
        );
        expect(matching.length, `${book.subject} / ${chapter}`).toBeGreaterThanOrEqual(5);
        expect(matching.every((question) => ["official-exam-adapted", "mock-exam-adapted", "reviewed"].includes(question.sourceStatus ?? ""))).toBe(true);
      }
    }
  });

  it("reaches five source-adapted questions for each covered Grade 11 geology lesson", () => {
    const geology = curriculumCatalog.find((book) =>
      book.grade === "یازدهم" && book.track === "تجربی" && book.subject === "زمین‌شناسی"
    );
    expect(geology).toBeTruthy();
    for (const chapter of ["آفرینش کیهان و تکوین زمین", "منابع معدنی و ذخایر انرژی"]) {
      expect(geology?.chapters).toContain(chapter);
      const matching = verifiedQuestions.filter((question) =>
        question.grade === "یازدهم" &&
        question.track === "تجربی" &&
        question.subject === "زمین‌شناسی" &&
        question.chapter === chapter
      );
      expect(matching.length, chapter).toBeGreaterThanOrEqual(5);
      expect(matching.every((question) => question.sourceStatus === "mock-exam-adapted")).toBe(true);
    }
  });

  it("reaches five questions in the newly covered Grade 12 math and Grade 11 physics lessons", () => {
    const targets = [
      { grade: "دوازدهم", track: "ریاضی", subject: "حسابان", chapter: "مثلثات" },
      { grade: "دوازدهم", track: "ریاضی", subject: "هندسه", chapter: "ماتریس و کاربردها" },
      { grade: "دوازدهم", track: "ریاضی", subject: "ریاضیات گسسته", chapter: "آشنایی با نظریه اعداد" },
      { grade: "یازدهم", track: "تجربی", subject: "فیزیک", chapter: "الکتریسیتهٔ ساکن" },
    ];
    for (const target of targets) {
      const matching = verifiedQuestions.filter((question) =>
        question.grade === target.grade &&
        question.track === target.track &&
        question.subject === target.subject &&
        question.chapter === target.chapter
      );
      expect(matching.length, `${target.grade} / ${target.subject} / ${target.chapter}`).toBeGreaterThanOrEqual(5);
      expect(matching.every((question) => question.sourceStatus === "mock-exam-adapted")).toBe(true);
    }
  });

  it("does not use whole-book placeholders for the three specialized tracks", () => {
    expect(curriculumCatalog.filter((book) => book.track !== "عمومی").every((book) =>
      book.chapters.length > 0 && !book.chapters.includes("کل کتاب")
    )).toBe(true);
  });


  it("includes independently solved source-based humanities questions for all three grades", () => {
    const batch = verifiedQuestions.filter((question) => question.id.startsWith("upload-human"));
    expect(batch).toHaveLength(22);
    for (const grade of ["دهم", "یازدهم", "دوازدهم"]) {
      expect(batch.some((question) => question.grade === grade), grade).toBe(true);
    }
    expect(batch.every((question) => question.track === "انسانی")).toBe(true);
    expect(batch.every((question) => question.sourceStatus === "mock-exam-adapted")).toBe(true);
    expect(batch.every((question) => question.explanation.length > 15)).toBe(true);
  });


  it("includes source-based science and mathematics questions across grades and tracks", () => {
    const batch = verifiedQuestions.filter((question) => question.id.startsWith("upload-exp") || question.id.startsWith("upload-math"));
    expect(batch).toHaveLength(19);
    for (const grade of ["دهم", "یازدهم", "دوازدهم"]) {
      expect(batch.some((question) => question.grade === grade), grade).toBe(true);
    }
    expect(batch.every((question) => question.sourceStatus === "mock-exam-adapted")).toBe(true);
    expect(batch.every((question) => question.explanation.length > 15)).toBe(true);
  });

  it("imports only visually reviewed 15 Aban mock-exam questions with source-key answer indices", () => {
    const batch = verifiedQuestions.filter((question) => question.id.startsWith("upload-maz-d10-humanities-math-quadratic-") || question.id === "upload-kanoon-d12e-physics-motion-61");
    expect(batch).toHaveLength(11);
    expect(batch.every((question) => question.sourceStatus === "reviewed")).toBe(true);
    expect(batch.every((question) => question.sourceTitle?.includes("(فایل ارسالی کاربر)"))).toBe(true);
    expect(batch.every((question) => Boolean(question.sourceQuestionNumber && question.reviewerNote?.includes("صفحه") && question.verifiedAt instanceof Date))).toBe(true);
    expect(batch.every((question) => question.options.length === 4 && question.correctIndex >= 0 && question.correctIndex <= 3)).toBe(true);

    const humanitiesMath = batch.filter((question) => question.track === "انسانی" && question.subject === "ریاضی و آمار");
    expect(humanitiesMath).toHaveLength(10);
    expect(humanitiesMath.every((question) => question.grade === "دهم" && question.chapter === "معادلهٔ درجه دوم")).toBe(true);
    expect(new Set(humanitiesMath.map((question) => question.sourceQuestionNumber))).toEqual(new Set(["۵", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲", "۱۳", "۱۴", "۱۵"]));

    const expectedKeys: Record<string, number> = {
      "۵": 2, "۷": 0, "۸": 1, "۹": 2, "۱۰": 3, "۱۱": 3, "۱۲": 2, "۱۳": 0, "۱۴": 1, "۱۵": 1,
    };
    for (const question of humanitiesMath) {
      expect(question.correctIndex, question.sourceQuestionNumber).toBe(expectedKeys[question.sourceQuestionNumber ?? ""]);
    }
    const physics = batch.find((question) => question.id === "upload-kanoon-d12e-physics-motion-61");
    expect(physics?.grade).toBe("دوازدهم");
    expect(physics?.track).toBe("تجربی");
    expect(physics?.chapter).toBe("حرکت بر خط راست");
    expect(physics?.correctIndex).toBe(0);
  });


  it("imports five visually reviewed Grade 10 humanities sociology questions with source answer keys", () => {
    const batch = verifiedQuestions.filter((question) => ["۴۱", "۴۲", "۴۳", "۴۴", "۴۵"].includes(question.sourceQuestionNumber ?? "") && question.track === "انسانی" && question.subject === "جامعه‌شناسی");
    expect(batch).toHaveLength(5);
    expect(batch.every((question) => question.grade === "دهم" && question.track === "انسانی" && question.subject === "جامعه‌شناسی")).toBe(true);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.sourceTitle?.includes("(فایل ارسالی کاربر)"))).toBe(true);
    expect(batch.every((question) => question.options.length === 4 && question.correctIndex >= 0 && question.correctIndex <= 3)).toBe(true);
    expect(new Set(batch.map((question) => question.sourceQuestionNumber))).toEqual(new Set(["۴۱", "۴۲", "۴۳", "۴۴", "۴۵"]));

    const expectedKeys: Record<string, number> = { "۴۱": 0, "۴۲": 1, "۴۳": 1, "۴۴": 3, "۴۵": 3 };
    const expectedPages: Record<string, string> = { "۴۱": "۵۸", "۴۲": "۵۹", "۴۳": "۵۹", "۴۴": "۶۰", "۴۵": "۶۰" };
    for (const question of batch) {
      expect(question.correctIndex, question.sourceQuestionNumber).toBe(expectedKeys[question.sourceQuestionNumber ?? ""]);
      expect(question.reviewerNote).toContain(`تصویر صفحهٔ ${expectedPages[question.sourceQuestionNumber ?? ""]}`);
    }
    expect(batch.find((question) => question.sourceQuestionNumber === "۴۲")?.chapter).toBe("کنش‌های ما");
    expect(batch.find((question) => question.sourceQuestionNumber === "۴۳")?.chapter).toBe("کنش‌های ما");
    expect(batch.find((question) => question.sourceQuestionNumber === "۴۵")?.chapter).toBe("جهان اجتماعی");
  });


  it("imports eight visually reviewed Grade 10 humanities history questions with source answer keys", () => {
    const batch = verifiedQuestions.filter((question) => question.id.startsWith("upload-maz-d10-humanities-history-"));
    expect(batch).toHaveLength(8);
    expect(batch.every((question) => question.grade === "دهم" && question.track === "انسانی" && question.subject === "تاریخ")).toBe(true);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.sourceTitle?.includes("(فایل ارسالی کاربر)"))).toBe(true);
    expect(batch.every((question) => question.options.length === 4 && question.correctIndex >= 0 && question.correctIndex <= 3)).toBe(true);
    expect(new Set(batch.map((question) => question.sourceQuestionNumber))).toEqual(new Set(["۶۶", "۶۷", "۶۸", "۶۹", "۷۰", "۷۱", "۷۲", "۷۳"]));

    const expectedKeys: Record<string, number> = {
      "۶۶": 3, "۶۷": 0, "۶۸": 0, "۶۹": 2, "۷۰": 0, "۷۱": 1, "۷۲": 2, "۷۳": 3,
    };
    const expectedPages: Record<string, string> = {
      "۶۶": "۷۱", "۶۷": "۷۱", "۶۸": "۷۲", "۶۹": "۷۲", "۷۰": "۷۳", "۷۱": "۷۳", "۷۲": "۷۴", "۷۳": "۷۴",
    };
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain(`تصویر صفحهٔ ${expectedPages[number]}`);
    }
    expect(batch.find((question) => question.sourceQuestionNumber === "۶۶")?.chapter).toBe("تاریخ و تاریخ‌نگاری");
    expect(batch.find((question) => question.sourceQuestionNumber === "۶۸")?.chapter).toBe("تاریخ، زمان و مکان");
    expect(batch.find((question) => question.sourceQuestionNumber === "۷۰")?.chapter).toBe("باستان‌شناسی؛ در جست‌وجوی میراث فرهنگی");
    expect(batch.find((question) => question.sourceQuestionNumber === "۷۱")?.chapter).toBe("مطالعه و کاوش در گذشته‌های دور");
    expect(batch.find((question) => question.sourceQuestionNumber === "۷۲")?.chapter).toBe("پیدایش تمدن؛ بین‌النهرین و مصر");
  });


  it("imports six visually reviewed Grade 10 geography questions through the shared Geography of Iran book", () => {
    const batch = verifiedQuestions.filter((question) => question.id.startsWith("upload-maz-d10-common-geography-"));
    expect(batch).toHaveLength(6);
    expect(batch.every((question) => question.grade === "دهم" && question.track === "عمومی" && question.subject === "جغرافیای ایران")).toBe(true);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.sourceTitle?.includes("(فایل ارسالی کاربر)"))).toBe(true);
    expect(batch.every((question) => question.options.length === 4 && question.correctIndex >= 0 && question.correctIndex <= 3)).toBe(true);
    expect(new Set(batch.map((question) => question.sourceQuestionNumber))).toEqual(new Set(["۷۶", "۷۷", "۷۹", "۸۲", "۸۳", "۸۵"]));

    const expectedKeys: Record<string, number> = { "۷۶": 3, "۷۷": 2, "۷۹": 2, "۸۲": 0, "۸۳": 2, "۸۵": 3 };
    const expectedPages: Record<string, string> = { "۷۶": "۷۷", "۷۷": "۷۷", "۷۹": "۷۹", "۸۲": "۸۲", "۸۳": "۸۳", "۸۵": "۸۵" };
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain(`تصویر صفحهٔ ${expectedPages[number]}`);
    }
    expect(batch.filter((question) => question.chapter === "جغرافیا، علمی برای زندگی بهتر")).toHaveLength(3);
    expect(batch.filter((question) => question.chapter === "روش مطالعه و پژوهش در جغرافیا")).toHaveLength(3);
  });


  it("imports six visually reviewed Grade 10 logic questions with exact source keys", () => {
    const batch = verifiedQuestions.filter((question) => ["۸۶", "۸۷", "۸۸", "۸۹", "۹۰", "۹۱"].includes(question.sourceQuestionNumber ?? "") && question.subject === "منطق" && question.track === "انسانی");
    expect(batch).toHaveLength(6);
    expect(batch.every((question) => question.grade === "دهم" && question.track === "انسانی" && question.subject === "منطق")).toBe(true);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.sourceTitle?.includes("(فایل ارسالی کاربر)"))).toBe(true);
    expect(batch.every((question) => question.options.length === 4 && question.correctIndex >= 0 && question.correctIndex <= 3)).toBe(true);
    expect(new Set(batch.map((question) => question.sourceQuestionNumber))).toEqual(new Set(["۸۶", "۸۷", "۸۸", "۸۹", "۹۰", "۹۱"]));

    const expectedKeys: Record<string, number> = { "۸۶": 1, "۸۷": 3, "۸۸": 3, "۸۹": 0, "۹۰": 0, "۹۱": 1 };
    const expectedPages: Record<string, string> = { "۸۶": "۸۶", "۸۷": "۸۷", "۸۸": "۸۸", "۸۹": "۸۹", "۹۰": "۹۰", "۹۱": "۹۰" };
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain(`تصویر صفحهٔ ${expectedPages[number]}`);
    }
    expect(batch.filter((question) => question.chapter === "منطق، ترازوی اندیشه")).toHaveLength(3);
    expect(batch.filter((question) => question.chapter === "لفظ و معنا")).toHaveLength(3);
  });


  it("imports three visually reviewed Grade 10 logic questions 92, 93 and 95 with exact source answer keys", () => {
    const batch = verifiedQuestions.filter((question) =>
      question.id === "upload-maz-d10-humanities-logic-language-fallacy-92" ||
      question.id === "upload-maz-d10-humanities-logic-universal-particular-93" ||
      question.id === "upload-maz-d10-humanities-logic-absolute-inclusion-95"
    );
    expect(batch).toHaveLength(3);
    expect(batch.every((question) => question.grade === "دهم" && question.track === "انسانی" && question.subject === "منطق")).toBe(true);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.options.length === 4)).toBe(true);
    const expectedKeys: Record<string, number> = { "۹۲": 3, "۹۳": 3, "۹۵": 3 };
    const expectedPages: Record<string, string> = { "۹۲": "۹۱", "۹۳": "۹۲", "۹۵": "۹۴" };
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain(`تصویر صفحهٔ ${expectedPages[number]}`);
    }
    expect(batch.find((question) => question.sourceQuestionNumber === "۹۲")?.chapter).toBe("لفظ و معنا");
    expect(batch.filter((question) => question.chapter === "مفهوم و مصداق")).toHaveLength(2);
  });


  it("imports ten visually reviewed Grade 10 economics questions 96-105 with source answer keys", () => {
    const batch = verifiedQuestions.filter((question) =>
      ["۹۶", "۹۷", "۹۸", "۹۹", "۱۰۰", "۱۰۱", "۱۰۲", "۱۰۳", "۱۰۴", "۱۰۵"].includes(question.sourceQuestionNumber ?? "") &&
      question.grade === "دهم" && question.track === "انسانی" && question.subject === "اقتصاد"
    );
    expect(batch).toHaveLength(10);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.sourceTitle?.includes("(فایل ارسالی کاربر)"))).toBe(true);
    expect(batch.every((question) => question.options.length === 4 && question.correctIndex >= 0 && question.correctIndex <= 3)).toBe(true);
    const expectedKeys: Record<string, number> = {
      "۹۶": 0, "۹۷": 2, "۹۸": 2, "۹۹": 0, "۱۰۰": 0,
      "۱۰۱": 1, "۱۰۲": 2, "۱۰۳": 1, "۱۰۴": 2, "۱۰۵": 1,
    };
    const expectedPages: Record<string, string> = {
      "۹۶": "۹۶", "۹۷": "۹۷", "۹۸": "۹۷", "۹۹": "۹۸", "۱۰۰": "۹۹",
      "۱۰۱": "۱۰۰", "۱۰۲": "۱۰۱", "۱۰۳": "۱۰۱", "۱۰۴": "۱۰۲", "۱۰۵": "۱۰۳",
    };
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain(`تصویر صفحهٔ ${expectedPages[number]}`);
    }
    expect(batch.filter((question) => question.chapter === "کسب و کار و کارآفرینی")).toHaveLength(2);
    expect(batch.filter((question) => question.chapter === "انتخاب نوع کسب و کار")).toHaveLength(4);
    expect(batch.filter((question) => question.chapter === "اصول انتخاب درست")).toHaveLength(4);
  });


  it("imports nine visually reviewed Grade 10 literature questions with exact source answer keys", () => {
    const expectedKeys: Record<string, number> = {
      "۱۶": 1, "۳۱": 1, "۳۲": 2, "۳۳": 0, "۳۴": 3,
      "۳۵": 2, "۳۸": 2, "۳۹": 3, "۴۰": 0,
    };
    const expectedPages: Record<string, string> = {
      "۱۶": "۴۶", "۳۱": "۵۳", "۳۲": "۵۴", "۳۳": "۵۴", "۳۴": "۵۴",
      "۳۵": "۵۵", "۳۸": "۵۶", "۳۹": "۵۶", "۴۰": "۵۶",
    };
    const batch = verifiedQuestions.filter((question) =>
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "") &&
      question.grade === "دهم" && question.track === "انسانی" && question.subject === "علوم و فنون ادبی"
    );
    expect(batch).toHaveLength(9);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.sourceTitle?.includes("(فایل ارسالی کاربر)"))).toBe(true);
    expect(batch.every((question) => question.options.length === 4 && question.correctIndex >= 0 && question.correctIndex <= 3)).toBe(true);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain(`تصویر صفحهٔ ${expectedPages[number]}`);
    }
    expect(batch.filter((question) => question.chapter === "مبانی تحلیل متن")).toHaveLength(2);
    expect(batch.filter((question) => question.chapter === "سازه‌ها و عوامل تأثیرگذار در شعر فارسی")).toHaveLength(7);
  });


  it("imports five visually reviewed Grade 10 sociology questions 46-50 with source answer keys", () => {
    const expectedKeys: Record<string, number> = { "۴۶": 1, "۴۷": 0, "۴۸": 2, "۴۹": 0, "۵۰": 2 };
    const expectedPages: Record<string, string[]> = {
      "۴۶": ["۶۱"], "۴۷": ["۶۱", "۶۲"], "۴۸": ["۶۲"], "۴۹": ["۶۲", "۶۳"], "۵۰": ["۶۳"],
    };
    const batch = verifiedQuestions.filter((question) =>
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "") &&
      question.grade === "دهم" && question.track === "انسانی" && question.subject === "جامعه‌شناسی"
    );
    expect(batch).toHaveLength(5);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.options.length === 4)).toBe(true);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      for (const page of expectedPages[number]) {
        expect(question.reviewerNote).toContain(page);
      }
    }
    expect(batch.find((question) => question.sourceQuestionNumber === "۴۶")?.chapter).toBe("کنش‌های ما");
    expect(batch.filter((question) => question.chapter === "جهان اجتماعی")).toHaveLength(2);
    expect(batch.find((question) => question.sourceQuestionNumber === "۴۸")?.chapter).toBe("پدیده‌های اجتماعی");
    expect(batch.find((question) => question.sourceQuestionNumber === "۵۰")?.chapter).toBe("جهان‌های اجتماعی");
  });


  it("imports nine visually reviewed Grade 10 common Arabic questions with exact source answer keys", () => {
    const expectedKeys: Record<string, number> = {
      "۵۶": 0, "۵۸": 3, "۵۹": 0, "۶۰": 3, "۶۱": 2, "۶۲": 0, "۶۳": 3, "۶۴": 1, "۶۵": 2,
    };
    const expectedPages: Record<string, string> = {
      "۵۶": "۶۶", "۵۸": "۶۷", "۵۹": "۶۷", "۶۰": "۶۷", "۶۱": "۶۸",
      "۶۲": "۶۸", "۶۳": "۶۸", "۶۴": "۶۹", "۶۵": "۶۹",
    };
    const batch = verifiedQuestions.filter((question) =>
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "") &&
      question.grade === "دهم" && question.track === "عمومی" && question.subject === "عربی"
    );
    expect(batch).toHaveLength(9);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.options.length === 4)).toBe(true);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain(expectedPages[number]);
    }
    expect(batch.every((question) => question.chapter === "کل کتاب")).toBe(true);
  });

  it("imports ten reviewed Grade 11 humanities mathematics questions with exact Kankchi answer keys", () => {
    const expectedKeys: Record<string, number> = {
      "۱": 0, "۲": 2, "۳": 1, "۴": 1, "۵": 3,
      "۶": 2, "۷": 2, "۸": 1, "۹": 2, "۱۰": 1,
    };
    const batch = verifiedQuestions.filter((question) =>
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "") &&
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "ریاضی و آمار" &&
      question.sourceTitle?.includes("قلم‌چی ۱۵ آبان ۱۴۰۵")
    );
    expect(batch).toHaveLength(10);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.options.length === 4)).toBe(true);
    expect(batch.every((question) => question.chapter === "گزاره‌ها و ترکیب گزاره‌ها")).toBe(true);
    const humanitiesMathBook = curriculumCatalog.find((book) =>
      book.track === "انسانی" && book.grade === "یازدهم" && book.subject === "ریاضی و آمار"
    );
    expect(humanitiesMathBook?.chapters).toEqual([
      "گزاره‌ها و ترکیب گزاره‌ها",
      "استدلال ریاضی",
      "توابع ثابت، چند ضابطه‌ای و همانی",
      "توابع پلکانی و قدر مطلقی",
      "اعمال بر روی توابع",
      "شاخص‌های آماری",
      "سری‌های زمانی",
    ]);
    expect(batch.every((question) => humanitiesMathBook?.chapters.includes(question.chapter))).toBe(true);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain("قلم‌چی");
    }
  });

  it("imports fifteen independently solved Grade 11 mathematics-track questions from Maaz", () => {
    const expectedKeys: Record<string, number> = {
      "۱": 0, "۲": 1, "۳": 3, "۴": 3, "۵": 2,
      "۶": 2, "۷": 3, "۸": 1, "۹": 0, "۱۰": 0,
      "۱۱": 0, "۱۲": 1, "۱۳": 1, "۱۴": 0, "۱۵": 1,
    };
    const batch = verifiedQuestions.filter((question) =>
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "") &&
      question.grade === "یازدهم" &&
      question.track === "ریاضی" &&
      question.subject === "حسابان" &&
      question.sourceTitle?.includes("آزمون ماز ۱۵ آبان ۱۴۰۵")
    );
    expect(batch).toHaveLength(15);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.options.length === 4)).toBe(true);
    expect(batch.filter((question) => question.chapter === "جبر و معادله")).toHaveLength(12);
    expect(batch.filter((question) => question.chapter === "تابع")).toHaveLength(3);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain("حل مستقل");
    }
  });

  it("imports the independently solved Grade 11 Maaz geometry question with the derived tangent-chord answer", () => {
    const expectedKeys: Record<string, number> = { "۱۶": 3, "۱۷": 1, "۱۸": 0, "۱۹": 1, "۲۰": 0, "۲۱": 2, "۲۲": 1, "۲۳": 3 };
    const batch = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "ریاضی" &&
      question.subject === "هندسه" &&
      question.sourceTitle?.includes("آزمون ماز ۱۵ آبان ۱۴۰۵") &&
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "")
    );
    expect(batch).toHaveLength(8);
    expect(batch.every((question) => question.chapter === "دایره" && question.options.length === 4)).toBe(true);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain("حل");
    }
  });

  it("imports the independently solved Grade 11 Maaz statistics truth-table question", () => {
    const batch = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "ریاضی" &&
      question.subject === "آمار و احتمال" &&
      question.sourceTitle?.includes("آزمون ماز ۱۵ آبان ۱۴۰۵") &&
      question.sourceQuestionNumber === "۲۴"
    );
    expect(batch).toHaveLength(1);
    expect(batch[0].chapter).toBe("آشنایی با منطق ریاضی");
    expect(batch[0].correctIndex).toBe(2);
  });
  it("imports six more independently solved Grade 11 Maaz logic questions", () => {
    const expectedKeys: Record<string, number> = { "۲۵": 2, "۲۶": 2, "۲۷": 3, "۲۸": 2, "۲۹": 1, "۳۰": 1 };
    const batch = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "ریاضی" &&
      question.subject === "آمار و احتمال" &&
      question.sourceTitle?.includes("آزمون ماز ۱۵ آبان ۱۴۰۵") &&
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "")
    );
    expect(batch).toHaveLength(6);
    expect(batch.every((question) => question.chapter === "آشنایی با منطق ریاضی" && question.options.length === 4)).toBe(true);
    const question26 = batch.find((question) => question.sourceQuestionNumber === "۲۶");
    expect(question26?.prompt).toContain("۳^x<۳۹");
    expect(question26?.options[2]).toContain("۵^x");
    expect(question26?.options[3]).toContain("۲^x");
    expect(question26?.correctIndex).toBe(2);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
    }
  });
  it("imports ten reviewed Grade 11 humanities philosophy questions with exact Kankchi answer keys", () => {
    const expectedKeys: Record<string, number> = {
      "۸۱": 2, "۸۲": 1, "۸۳": 2, "۸۴": 3, "۸۵": 1,
      "۸۶": 1, "۸۷": 0, "۸۸": 2, "۸۹": 3, "۹۰": 2,
    };
    const batch = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "فلسفه" &&
      question.sourceTitle?.includes("قلم‌چی ۱۵ آبان ۱۴۰۵") &&
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "")
    );
    expect(batch).toHaveLength(10);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.options.length === 4)).toBe(true);
    expect(batch.filter((question) => question.chapter === "ریشه و شاخه‌های فلسفه")).toHaveLength(5);
    expect(batch.filter((question) => question.chapter === "چیستی انسان")).toHaveLength(1);
    expect(batch.filter((question) => question.chapter === "فلسفه و زندگی")).toHaveLength(4);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain("پاسخنامه");
    }
  });
  it("imports ten reviewed Grade 11 humanities history questions with exact Kankchi answer keys", () => {
    const expectedKeys: Record<string, number> = {
      "۶۱": 2, "۶۲": 2, "۶۳": 0, "۶۴": 1, "۶۵": 0,
      "۶۶": 0, "۶۷": 0, "۶۸": 1, "۶۹": 0, "۷۰": 2,
    };
    const batch = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "تاریخ" &&
      question.sourceTitle?.includes("قلم‌چی ۱۵ آبان ۱۴۰۵") &&
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "")
    );
    expect(batch).toHaveLength(10);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.options.length === 4)).toBe(true);
    expect(batch.filter((question) => question.chapter === "روش پژوهش در تاریخ؛ بررسی و سنجش اعتبار شواهد و مدارک")).toHaveLength(5);
    expect(batch.filter((question) => question.chapter === "منابع پژوهش در تاریخ اسلام و ایران دوران اسلامی")).toHaveLength(1);
    expect(batch.filter((question) => question.chapter === "اسلام در مکه")).toHaveLength(4);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain("پاسخنامه");
    }
  });
  it("imports five reviewed Grade 11 humanities geography questions with exact Kankchi answer keys", () => {
    const expectedKeys: Record<string, number> = { "۷۱": 0, "۷۲": 3, "۷۳": 0, "۷۴": 1, "۷۵": 2 };
    const batch = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "جغرافیا" &&
      question.sourceTitle?.includes("قلم‌چی ۱۵ آبان ۱۴۰۵") &&
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "")
    );
    expect(batch).toHaveLength(5);
    expect(batch.every((question) => question.chapter === "انسان و ناحیه" && question.options.length === 4)).toBe(true);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain("پاسخنامه");
    }
  });
  it("imports nine reviewed Grade 11 humanities sociology questions with exact Kankchi answer keys", () => {
    const expectedKeys: Record<string, number> = {
      "۳۱": 3, "۳۲": 3, "۳۳": 1, "۳۴": 1, "۳۵": 2, "۳۶": 0,
      "۳۷": 3, "۳۸": 1, "۳۹": 1, "۴۰": 2,
    };
    const batch = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "جامعه‌شناسی" &&
      question.sourceTitle?.includes("قلم‌چی ۱۵ آبان ۱۴۰۵") &&
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "")
    );
    expect(batch).toHaveLength(10);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.options.length === 4)).toBe(true);
    expect(batch.filter((question) => question.chapter === "فرهنگ جهانی")).toHaveLength(4);
    expect(batch.filter((question) => question.chapter === "نمونه‌های فرهنگ جهانی (۱)")).toHaveLength(6);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain("پاسخنامه");
    }
  });
  it("imports nine reviewed Grade 11 humanities psychology questions with exact Kankchi answer keys", () => {
    const expectedKeys: Record<string, number> = {
      "۴۱": 3, "۴۲": 2, "۴۳": 0, "۴۴": 2, "۴۵": 1, "۴۶": 3,
      "۴۷": 3, "۴۸": 1, "۴۹": 2, "۵۰": 2,
    };
    const batch = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "روان‌شناسی" &&
      question.sourceTitle?.includes("قلم‌چی ۱۵ آبان ۱۴۰۵") &&
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "")
    );
    expect(batch).toHaveLength(10);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.options.length === 4)).toBe(true);
    expect(batch.filter((question) => question.chapter === "روان‌شناسی: تعریف و روش مورد مطالعه")).toHaveLength(6);
    expect(batch.filter((question) => question.chapter === "روان‌شناسی رشد")).toHaveLength(4);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain("پاسخنامه");
    }
  });
  it("imports ten reviewed Grade 11 humanities Arabic questions with exact Kankchi answer keys", () => {
    const expectedKeys: Record<string, number> = {
      "۵۱": 2, "۵۲": 1, "۵۳": 3, "۵۴": 3, "۵۵": 0,
      "۵۶": 2, "۵۷": 3, "۵۸": 1, "۵۹": 2, "۶۰": 1,
    };
    const batch = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "عربی" &&
      question.sourceTitle?.includes("قلم‌چی ۱۵ آبان ۱۴۰۵") &&
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "")
    );
    expect(batch).toHaveLength(10);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.options.length === 4)).toBe(true);
    expect(batch.filter((question) => question.chapter === "ترجمه")).toHaveLength(5);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain("پاسخنامه");
    }
  });
  it("imports five more reviewed Grade 11 humanities geography questions with exact Kankchi answer keys", () => {
    const expectedKeys: Record<string, number> = { "۷۶": 0, "۷۷": 3, "۷۸": 2, "۷۹": 2, "۸۰": 3 };
    const batch = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "جغرافیا" &&
      question.sourceTitle?.includes("قلم‌چی ۱۵ آبان ۱۴۰۵") &&
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "")
    );
    expect(batch).toHaveLength(5);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.options.length === 4)).toBe(true);
    expect(batch.filter((question) => question.chapter === "انسان و ناحیه")).toHaveLength(1);
    expect(batch.filter((question) => question.chapter === "نواحی آب و هوایی")).toHaveLength(4);
    expect(batch.some((question) => question.chapter === "نواحی طبیعی" || question.chapter === "نواحی آب‌وهوایی")).toBe(false);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain("پاسخنامه");
    }
  });
  it("imports nine reviewed Grade 11 humanities literature questions with exact Kankchi answer keys", () => {
    const expectedKeys: Record<string, number> = {
      "۲۱": 3, "۲۳": 0, "۲۴": 3, "۲۵": 1, "۲۶": 1,
      "۲۷": 2, "۲۸": 1, "۲۹": 3, "۳۰": 1,
    };
    const batch = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "علوم و فنون ادبی" &&
      question.sourceTitle?.includes("قلم‌چی ۱۵ آبان ۱۴۰۵") &&
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "")
    );
    expect(batch).toHaveLength(9);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.options.length === 4)).toBe(true);
    expect(batch.every((question) => question.chapter === "تشبیه")).toBe(true);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.reviewerNote).toContain("پاسخنامه");
    }
  });
  it("imports six reviewed Grade 11 humanities literature questions from the prosody and meaning section", () => {
    const expectedKeys: Record<string, number> = { "۱۱": 1, "۱۲": 3, "۱۳": 1, "۱۴": 1, "۱۵": 3, "۲۰": 0 };
    const batch = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "علوم و فنون ادبی" &&
      question.sourceTitle?.includes("قلم‌چی ۱۵ آبان ۱۴۰۵") &&
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "")
    );
    expect(batch).toHaveLength(6);
    expect(batch.every((question) => question.sourceStatus === "reviewed" && question.options.length === 4)).toBe(true);
    expect(batch.filter((question) => question.chapter === "پایه‌های آوایی")).toHaveLength(5);
    expect(batch.filter((question) => question.chapter === "کل کتاب")).toHaveLength(1);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
    }
  });
  it("imports three additional reviewed Grade 11 literature questions with Kankchi answer keys", () => {
    const expectedKeys: Record<string, number> = { "۱۶": 2, "۱۷": 1, "۱۹": 1, "۲۲": 1 };
    const batch = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "علوم و فنون ادبی" &&
      question.sourceTitle?.includes("قلم‌چی ۱۵ آبان ۱۴۰۵") &&
      Object.keys(expectedKeys).includes(question.sourceQuestionNumber ?? "")
    );
    expect(batch).toHaveLength(4);
    for (const question of batch) {
      const number = question.sourceQuestionNumber ?? "";
      expect(question.correctIndex, number).toBe(expectedKeys[number]);
      expect(question.sourceStatus).toBe("reviewed");
    }
  });

  it("imports independently authored Grade 11 experimental questions for identified chapter gaps", () => {
    const ids = [
      "authored-experimental11-biology-neural-control-synapse-01",
      "authored-experimental11-biology-neural-control-reflex-02",
      "authored-experimental11-physics-dc-series-parallel-03",
      "authored-experimental11-chemistry-polymer-04",
      "authored-experimental11-math-logarithm-domain-05",
    ];
    const batch = verifiedQuestions.filter((question) => ids.includes(question.id));
    expect(batch).toHaveLength(5);
    expect(batch.every((question) => question.sourceStatus === "reviewed")).toBe(true);
    expect(batch.every((question) => question.sourceTitle?.includes("تألیفی تحصیل‌یار"))).toBe(true);
    expect(batch.every((question) => question.options.length === 4)).toBe(true);
  });

  it("imports Grade 11 humanities literature question 18 with the official Kankchi key", () => {
    const question = verifiedQuestions.find((item) =>
      item.id === "upload-kankchi-human11-literature-prosody-pattern-18"
    );
    expect(question).toBeDefined();
    expect(question?.sourceStatus).toBe("reviewed");
    expect(question?.options).toHaveLength(4);
    expect(question?.correctIndex).toBe(0);
    expect(question?.chapter).toBe("پایه‌های آوایی");
  });

});