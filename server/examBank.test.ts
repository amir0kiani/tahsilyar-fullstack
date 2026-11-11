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
      expect(["official-exam-adapted", "mock-exam-adapted", "reviewed", "sample-authored"]).toContain(question.sourceStatus);
      expect(question.sourceTitle).toBeTruthy();
      const uploadedSource = question.sourceTitle?.includes("(فایل ارسالی کاربر)") ?? false;
      const authoredReviewed = (question.sourceStatus === "reviewed" && (
        question.sourceTitle?.includes("تألیفی تحصیل‌یار") ||
        question.reviewerNote?.includes("سؤال تألیفی")
      )) || question.sourceStatus === "sample-authored";
      if (uploadedSource) {
        expect(question.sourceQuestionNumber).toBeTruthy();
      } else if (authoredReviewed) {
        expect(question.reviewerNote).toContain("تألیفی");
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
    expect(verifiedQuestions.every((question) => ["official-exam-adapted", "mock-exam-adapted", "reviewed", "sample-authored"].includes(question.sourceStatus ?? ""))).toBe(true);
  });

  it("maps the Grade 11 humanities climate questions to the exact Geography 2 lesson title", () => {
    const climateQuestions = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "جغرافیا" &&
      question.chapter === "نواحی آب و هوایی" &&
      question.sourceStatus === "reviewed"
    );
    expect(climateQuestions).toHaveLength(5);
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

  it("includes the official Grade 11 calculus chapter map", () => {
    const book = (track: string, subject: string) =>
      curriculumCatalog.find((item) => item.grade === "یازدهم" && item.track === track && item.subject === subject);
    expect(book("ریاضی", "حسابان")?.chapters).toEqual([
      "جبر و معادله", "تابع", "توابع نمایی و لگاریتمی", "مثلثات", "حد و پیوستگی",
    ]);
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
        chapter: "گزاره‌ها و ترکیب گزاره‌ها", sourceStatus: "reviewed",
      })),
      {
        track: "انسانی", grade: "یازدهم", subject: "ریاضی و آمار",
        chapter: "گزاره‌ها و ترکیب گزاره‌ها", sourceStatus: "pending-review",
      },
      ...Array.from({ length: 4 }, () => ({
        track: "انسانی", grade: "یازدهم", subject: "ریاضی و آمار",
        chapter: "توابع ثابت، چند ضابطه‌ای و همانی", sourceStatus: "sample-authored",
      })),
    ];
    const book = buildGradeSpecificCatalog(rows).find((item) =>
      item.track === "انسانی" && item.grade === "یازدهم" && item.subject === "ریاضی و آمار"
    );
    expect(book).toBeDefined();
    const logic = book?.lessonCoverage.find((lesson) => lesson.chapter === "گزاره‌ها و ترکیب گزاره‌ها");
    const functionLesson = book?.lessonCoverage.find((lesson) => lesson.chapter === "توابع ثابت، چند ضابطه‌ای و همانی");
    expect(logic).toMatchObject({ questionCount: 6, verifiedQuestionCount: 5, targetQuestionsPerLesson: 5, targetMet: true });
    expect(functionLesson).toMatchObject({ questionCount: 4, verifiedQuestionCount: 0, targetQuestionsPerLesson: 5, targetMet: false });
    expect(book?.lessonsMeetingTarget).toBe(1);
    expect(book?.lessonCount).toBe(7);
  });

  it("keeps every curriculum catalogue entry grade- and track-specific", () => {
    expect(curriculumCatalog.every((book) => ["دهم", "یازدهم", "دوازدهم"].includes(book.grade))).toBe(true);
    expect(curriculumCatalog.every((book) => ["عمومی", "تجربی", "ریاضی", "انسانی"].includes(book.track))).toBe(true);
  });
  it("reaches five reviewed questions in every Grade 11 biology chapter", () => {
    const chapters = [
      "تنظیم عصبی", "حواس", "دستگاه حرکتی", "تنظیم شیمیایی", "ایمنی",
      "تقسیم یاخته", "تولیدمثل", "تولیدمثل نهان‌دانگان", "پاسخ گیاهان به محرک‌ها"
    ];
    for (const chapter of chapters) {
      const questions = verifiedQuestions.filter((question) =>
        question.track === "تجربی" && question.grade === "یازدهم" &&
        question.subject === "زیست‌شناسی" && question.chapter === chapter &&
        ["official-exam-adapted", "mock-exam-adapted", "reviewed"].includes(question.sourceStatus ?? "")
      );
      expect(questions.length, chapter).toBeGreaterThanOrEqual(5);
    }
    const officialBatch = verifiedQuestions.filter((question) =>
      question.id.startsWith("verified-grade11-bio-1405-")
    );
    expect(officialBatch).toHaveLength(38);
    expect(officialBatch.every((question) =>
      question.sourceStatus === "official-exam-adapted" &&
      question.sourceUrl === "https://azmoon.medu.ir/" &&
      question.reviewerNote?.includes("گزینه‌های انحرافی تألیفی‌اند")
    )).toBe(true);
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

  it("covers all seven Grade 11 geology lessons in both mathematics and experimental tracks", () => {
    const chapters = [
      "آفرینش کیهان و تکوین زمین",
      "منابع معدنی و ذخایر انرژی",
      "منابع آب و خاک",
      "پویایی زمین",
      "زمین‌شناسی و سلامت",
      "زمین‌شناسی و سازه‌های مهندسی",
      "زمین‌شناسی ایران",
    ];
    expect(curriculumCatalog.find((book) =>
      book.grade === "یازدهم" && book.track === "ریاضی" && book.subject === "زمین‌شناسی"
    )?.chapters).toEqual(chapters);
    for (const track of ["ریاضی", "تجربی"]) {
      for (const chapter of chapters) {
        const matching = verifiedQuestions.filter((question) =>
          question.grade === "یازدهم" &&
          question.track === track &&
          question.subject === "زمین‌شناسی" &&
          question.chapter === chapter &&
          question.sourceStatus === "official-exam-adapted"
        );
        expect(matching, `${track} / ${chapter}`).toHaveLength(5);
      }
    }
  });

  it("adds five official-exam-adapted Grade 11 geology questions for each remaining lesson", () => {
    const chapters = [
      "منابع آب و خاک",
      "پویایی زمین",
      "زمین‌شناسی و سلامت",
      "زمین‌شناسی و سازه‌های مهندسی",
      "زمین‌شناسی ایران",
    ];
    for (const chapter of chapters) {
      const matching = verifiedQuestions.filter((question) =>
        question.grade === "یازدهم" &&
        question.track === "تجربی" &&
        question.subject === "زمین‌شناسی" &&
        question.chapter === chapter &&
        question.sourceStatus === "official-exam-adapted"
      );
      expect(matching, chapter).toHaveLength(5);
      expect(matching.every((question) =>
        question.sourceYear === "۱۴۰۵" &&
        Boolean(question.sourceQuestionNumber) &&
        question.sourceTitle?.includes("۱۲ مرداد")
      )).toBe(true);
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
      expect(matching.filter((question) => question.sourceStatus === "mock-exam-adapted"), chapter).toHaveLength(5);
      expect(matching.filter((question) => question.sourceStatus === "official-exam-adapted"), chapter).toHaveLength(5);
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
      expect(matching.every((question) => ["mock-exam-adapted", "reviewed"].includes(question.sourceStatus ?? ""))).toBe(true);
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

  it("reaches five reviewed questions in every Grade 11 chemistry chapter", () => {
    const chapters = [
      "قدر هدایای زمینی را بدانیم",
      "در پی غذای سالم",
      "پوشاک، نیازی پایان‌ناپذیر",
    ];
    for (const chapter of chapters) {
      const questions = verifiedQuestions.filter((question) =>
        question.track === "تجربی" &&
        question.grade === "یازدهم" &&
        question.subject === "شیمی" &&
        question.chapter === chapter &&
        ["official-exam-adapted", "mock-exam-adapted", "reviewed"].includes(question.sourceStatus ?? "")
      );
      expect(questions.length, chapter).toBeGreaterThanOrEqual(5);
    }
    const officialBatch = verifiedQuestions.filter((question) =>
      question.id.startsWith("verified-grade11-chem-1405-")
    );
    expect(officialBatch).toHaveLength(10);
    const expectedKeys: Record<string, number> = {
      "۲-الف": 0, "۳-ب": 0, "۳-پ": 0, "۷-الف": 2, "۹": 2,
      "۱۴-ب": 1, "۲-ت": 0, "۳-ت": 0, "۵-الف و ۵-ب": 0, "۶-ب": 1,
    };
    expect(officialBatch.every((question) =>
      question.sourceStatus === "official-exam-adapted" &&
      question.sourceTitle === "آزمون نهایی شیمی (۲) یازدهم تجربی – ۳ مرداد ۱۴۰۵" &&
      question.sourceUrl === "https://azmoon.medu.ir/" &&
      question.reviewerNote?.includes("گزینه‌های انحرافی تألیف شده‌اند") &&
      question.correctIndex === expectedKeys[question.sourceQuestionNumber ?? ""]
    )).toBe(true);
  });


  it("provides five reviewed Grade 11 experimental physics questions in every chapter", () => {
    const chapters = [
      "الکتریسیتهٔ ساکن",
      "جریان الکتریکی و مدارهای جریان مستقیم",
      "مغناطیس و القای الکترومغناطیسی",
    ];
    const batch = verifiedQuestions.filter((question) =>
      question.grade === "یازدهم" &&
      question.track === "تجربی" &&
      question.subject === "فیزیک" &&
      question.id.startsWith("authored-grade11-experimental-physics-")
    );
    expect(batch).toHaveLength(15);
    for (const chapter of chapters) {
      expect(batch.filter((question) => question.chapter === chapter), chapter).toHaveLength(5);
    }
    expect(batch.every((question) =>
      question.sourceStatus === "reviewed" &&
      question.sourceTitle === "تألیفی تحصیل‌یار بر اساس محتوای فیزیک (۲) یازدهم" &&
      question.options.length === 4 &&
      question.reviewerNote?.includes("به آزمون رسمی نسبت داده نشده")
    )).toBe(true);
    const expectedKeys: Record<string, number> = {
      "authored-grade11-experimental-physics-static-coulomb-01": 1,
      "authored-grade11-experimental-physics-static-field-02": 1,
      "authored-grade11-experimental-physics-static-capacitor-03": 2,
      "authored-grade11-experimental-physics-static-conductor-04": 1,
      "authored-grade11-experimental-physics-static-potential-05": 2,
      "authored-grade11-experimental-physics-dc-ohm-01": 1,
      "authored-grade11-experimental-physics-dc-series-02": 2,
      "authored-grade11-experimental-physics-dc-parallel-03": 0,
      "authored-grade11-experimental-physics-dc-internal-04": 0,
      "authored-grade11-experimental-physics-dc-power-05": 2,
      "authored-grade11-experimental-physics-mag-field-01": 2,
      "authored-grade11-experimental-physics-mag-force-02": 1,
      "authored-grade11-experimental-physics-mag-wire-03": 2,
      "authored-grade11-experimental-physics-mag-lenz-04": 1,
      "authored-grade11-experimental-physics-mag-induction-05": 2,
    };
    for (const question of batch) {
      expect(question.correctIndex, question.id).toBe(expectedKeys[question.id]);
    }
  });


  it("provides at least five reviewed questions in every Grade 11 experimental mathematics chapter", () => {
    const chapters = [
      "هندسه تحلیلی و جبر",
      "هندسه",
      "تابع",
      "مثلثات",
      "توابع نمایی و لگاریتمی",
    ];
    const batch = verifiedQuestions.filter((question) =>
      question.id.startsWith("authored-grade11-experimental-math-")
    );
    expect(batch).toHaveLength(24);
    const expectedNewPerChapter: Record<string, number> = {
      "هندسه تحلیلی و جبر": 5,
      "هندسه": 5,
      "تابع": 5,
      "مثلثات": 5,
      "توابع نمایی و لگاریتمی": 4,
    };
    for (const chapter of chapters) {
      const allReviewed = verifiedQuestions.filter((question) =>
        question.grade === "یازدهم" &&
        question.track === "تجربی" &&
        question.subject === "ریاضی" &&
        question.chapter === chapter &&
        ["official-exam-adapted", "mock-exam-adapted", "reviewed"].includes(question.sourceStatus ?? "")
      );
      expect(allReviewed.length, chapter).toBeGreaterThanOrEqual(5);
      expect(batch.filter((question) => question.chapter === chapter), chapter).toHaveLength(expectedNewPerChapter[chapter]);
    }
    expect(batch.every((question) =>
      question.grade === "یازدهم" &&
      question.track === "تجربی" &&
      question.subject === "ریاضی" &&
      question.sourceStatus === "reviewed" &&
      question.sourceTitle === "تألیفی تحصیل‌یار بر اساس محتوای ریاضی (۲) یازدهم تجربی" &&
      question.reviewerNote?.includes("به آزمون رسمی نسبت داده نشده")
    )).toBe(true);
    const expectedKeys: Record<string, number> = {
      "authored-grade11-experimental-math-analytic-distance-01": 2,
      "authored-grade11-experimental-math-analytic-line-02": 0,
      "authored-grade11-experimental-math-analytic-roots-03": 2,
      "authored-grade11-experimental-math-analytic-discriminant-04": 1,
      "authored-grade11-experimental-math-analytic-vertex-05": 0,
      "authored-grade11-experimental-math-geometry-chord-01": 2,
      "authored-grade11-experimental-math-geometry-inscribed-angle-02": 1,
      "authored-grade11-experimental-math-geometry-tangent-03": 2,
      "authored-grade11-experimental-math-geometry-cyclic-04": 2,
      "authored-grade11-experimental-math-geometry-similar-05": 1,
      "authored-grade11-experimental-math-function-domain-01": 1,
      "authored-grade11-experimental-math-function-value-02": 1,
      "authored-grade11-experimental-math-function-composition-03": 1,
      "authored-grade11-experimental-math-function-inverse-04": 1,
      "authored-grade11-experimental-math-function-range-05": 1,
      "authored-grade11-experimental-math-trig-special-angle-01": 1,
      "authored-grade11-experimental-math-trig-equation-02": 1,
      "authored-grade11-experimental-math-trig-identity-03": 1,
      "authored-grade11-experimental-math-trig-ratio-04": 0,
      "authored-grade11-experimental-math-trig-cos-equation-05": 1,
      "authored-grade11-experimental-math-exp-power-01": 2,
      "authored-grade11-experimental-math-exp-log-02": 1,
      "authored-grade11-experimental-math-exp-log-equation-03": 3,
      "authored-grade11-experimental-math-exp-equation-04": 1,
    };
    for (const question of batch) {
      expect(question.correctIndex, question.id).toBe(expectedKeys[question.id]);
    }
  });


  it("covers every Grade 11 mathematics-track Physics 2 chapter with official-exam-adapted questions", () => {
    const chapters = [
      "الکتریسیتهٔ ساکن",
      "جریان الکتریکی و مدارهای جریان مستقیم",
      "مغناطیس",
      "القای الکترومغناطیسی و جریان متناوب",
    ];
    const batch = verifiedQuestions.filter((question) =>
      question.id.startsWith("official-adapted-grade11-math-physics-1405-")
    );
    expect(batch).toHaveLength(19);
    const expectedNewPerChapter: Record<string, number> = {
      "الکتریسیتهٔ ساکن": 4,
      "جریان الکتریکی و مدارهای جریان مستقیم": 5,
      "مغناطیس": 5,
      "القای الکترومغناطیسی و جریان متناوب": 5,
    };
    for (const chapter of chapters) {
      const allReviewed = verifiedQuestions.filter((question) =>
        question.grade === "یازدهم" &&
        question.track === "ریاضی" &&
        question.subject === "فیزیک" &&
        question.chapter === chapter &&
        question.sourceStatus === "official-exam-adapted"
      );
      expect(allReviewed.length, chapter).toBeGreaterThanOrEqual(5);
      expect(batch.filter((question) => question.chapter === chapter), chapter)
        .toHaveLength(expectedNewPerChapter[chapter]);
    }
    expect(batch.every((question) =>
      question.grade === "یازدهم" &&
      question.track === "ریاضی" &&
      question.subject === "فیزیک" &&
      question.sourceStatus === "official-exam-adapted" &&
      question.sourceTitle === "آزمون نهایی فیزیک (۲) یازدهم رشته ریاضی، ۳ مرداد ۱۴۰۵؛ مرکز ارزشیابی و تضمین کیفیت نظام آموزش و پرورش" &&
      question.reviewerNote?.includes("گزینه‌های انحرافی تألیفی‌اند") &&
      question.options.length === 4 &&
      question.correctIndex >= 0 &&
      question.correctIndex < 4
    )).toBe(true);
    const expectedKeys: Record<string, number> = {
      "official-adapted-grade11-math-physics-1405-electrostatic-conductor-01": 0,
      "official-adapted-grade11-math-physics-1405-electrostatic-drop-field-02": 1,
      "official-adapted-grade11-math-physics-1405-electrostatic-surface-charge-03": 2,
      "official-adapted-grade11-math-physics-1405-electrostatic-isolated-capacitor-04": 0,
      "official-adapted-grade11-math-physics-1405-dc-wire-area-01": 1,
      "official-adapted-grade11-math-physics-1405-dc-battery-capacity-02": 2,
      "official-adapted-grade11-math-physics-1405-dc-temperature-resistance-03": 1,
      "official-adapted-grade11-math-physics-1405-dc-ldr-04": 1,
      "official-adapted-grade11-math-physics-1405-dc-battery-internal-resistance-05": 0,
      "official-adapted-grade11-math-physics-1405-magnet-parallel-wires-01": 0,
      "official-adapted-grade11-math-physics-1405-magnet-moving-charge-02": 1,
      "official-adapted-grade11-math-physics-1405-magnet-circular-coil-turns-03": 3,
      "official-adapted-grade11-math-physics-1405-magnet-soft-iron-04": 0,
      "official-adapted-grade11-math-physics-1405-magnet-wire-aligned-field-05": 0,
      "official-adapted-grade11-math-physics-1405-induction-flux-emf-01": 1,
      "official-adapted-grade11-math-physics-1405-induction-field-from-flux-02": 1,
      "official-adapted-grade11-math-physics-1405-induction-moving-loop-03": 2,
      "official-adapted-grade11-math-physics-1405-induction-inductor-energy-04": 2,
      "official-adapted-grade11-math-physics-1405-induction-ac-current-equation-05": 1,
    };
    for (const question of batch) {
      expect(question.correctIndex, question.id).toBe(expectedKeys[question.id]);
    }
  });

  it("provides at least five reviewed questions in identified Grade 11 humanities lessons", () => {
    const batch = verifiedQuestions.filter((question) =>
      question.id.startsWith("grade11-gap-authored-") &&
      (!question.id.startsWith("grade11-gap-authored-psych-") ||
        question.id.startsWith("grade11-gap-authored-psych-development-"))
    );
    expect(batch).toHaveLength(13);
    const expected: Array<[string, string, string, number]> = [
      ["انسانی", "جغرافیا", "نواحی آب و هوایی", 5],
      ["انسانی", "جامعه‌شناسی", "فرهنگ جهانی", 5],
      ["انسانی", "روان‌شناسی", "روان‌شناسی رشد", 5],
      ["انسانی", "فلسفه", "چیستی انسان", 5],
      ["انسانی", "فلسفه", "فلسفه و زندگی", 5],
      ["انسانی", "تاریخ", "منابع پژوهش در تاریخ اسلام و ایران دوران اسلامی", 5],
      ["انسانی", "تاریخ", "روش پژوهش در تاریخ؛ بررسی و سنجش اعتبار شواهد و مدارک", 5],
      ["انسانی", "تاریخ", "اسلام در مکه", 5],
    ];
    for (const [track, subject, chapter, minimum] of expected) {
      const count = verifiedQuestions.filter((question) =>
        question.grade === "یازدهم" &&
        question.track === track &&
        question.subject === subject &&
        question.chapter === chapter &&
        ["reviewed", "official-exam-adapted", "mock-exam-adapted"].includes(question.sourceStatus ?? "") &&
        question.options.length === 4 &&
        question.correctIndex >= 0 &&
        question.correctIndex < 4
      ).length;
      expect(count, `${subject} / ${chapter}`).toBeGreaterThanOrEqual(minimum);
    }
    expect(batch.every((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.sourceStatus === "reviewed" &&
      question.sourceTitle?.includes("کتاب") &&
      question.reviewerNote?.includes("به هیچ آزمون رسمی نسبت داده نشده")
    )).toBe(true);
  });

  it("reaches five authored questions in every remaining Grade 11 humanities Math & Statistics chapter", () => {
    const chapters = ["استدلال ریاضی", "توابع ثابت، چند ضابطه‌ای و همانی", "توابع پلکانی و قدر مطلقی", "اعمال بر روی توابع", "شاخص‌های آماری", "سری‌های زمانی"];
    for (const chapter of chapters) {
      const questions = verifiedQuestions.filter((question) =>
        question.grade === "یازدهم" && question.track === "انسانی" &&
        question.subject === "ریاضی و آمار" && question.chapter === chapter &&
        question.sourceStatus === "reviewed"
      );
      expect(questions, chapter).toHaveLength(5);
    }
    const authored = verifiedQuestions.filter((question) => question.id.startsWith("logic-proof-") ||
      question.id.startsWith("piecewise-") || question.id.startsWith("step-") ||
      question.id.startsWith("operations-") || question.id.startsWith("stats-index-") ||
      question.id.startsWith("time-series-"));
    expect(authored).toHaveLength(30);
    expect(authored.every((question) => question.sourceTitle?.includes("سؤال تألیفی") && question.reviewerNote?.includes("تألیفی"))).toBe(true);
  });


  it("reaches at least five reviewed questions in every Grade 11 Math-track Calculus chapter", () => {
    const chapters = ["جبر و معادله", "تابع", "توابع نمایی و لگاریتمی", "مثلثات", "حد و پیوستگی"];
    for (const chapter of chapters) {
      const count = verifiedQuestions.filter((question) =>
        question.grade === "یازدهم" && question.track === "ریاضی" &&
        question.subject === "حسابان" && question.chapter === chapter &&
        ["reviewed", "official-exam-adapted", "mock-exam-adapted"].includes(question.sourceStatus ?? "")
      ).length;
      expect(count, chapter).toBeGreaterThanOrEqual(5);
    }
    const authored = verifiedQuestions.filter((question) => question.id.startsWith("function-0") ||
      question.id.startsWith("exp-0") || question.id.startsWith("trig-0") || question.id.startsWith("limit-0"));
    expect(authored).toHaveLength(20);
    expect(authored.every((question) => question.sourceTitle?.includes("سؤال تألیفی") && question.reviewerNote?.includes("تألیفی"))).toBe(true);
  });


  it("matches the official Grade 11 Geometry 2 chapter map and reaches five reviewed questions per chapter", () => {
    const chapters = ["دایره", "تبدیل‌های هندسی و کاربردها", "روابط طولی در مثلث"];
    const book = curriculumCatalog.find((entry) =>
      entry.grade === "یازدهم" && entry.track === "ریاضی" && entry.subject === "هندسه"
    );
    expect(book?.chapters).toEqual(chapters);
    expect(book?.chapters).not.toContain("تجسم فضایی");
    for (const chapter of chapters) {
      const count = verifiedQuestions.filter((question) =>
        question.grade === "یازدهم" && question.track === "ریاضی" &&
        question.subject === "هندسه" && question.chapter === chapter &&
        ["reviewed", "official-exam-adapted", "mock-exam-adapted"].includes(question.sourceStatus ?? "")
      ).length;
      expect(count, chapter).toBeGreaterThanOrEqual(5);
    }
    const batch = verifiedQuestions.filter((question) =>
      question.id.startsWith("authored-grade11-math-geometry-")
    );
    expect(batch).toHaveLength(10);
    expect(batch.filter((question) => question.chapter === "تبدیل‌های هندسی و کاربردها")).toHaveLength(5);
    expect(batch.filter((question) => question.chapter === "روابط طولی در مثلث")).toHaveLength(5);
    expect(batch.every((question) =>
      question.sourceStatus === "reviewed" &&
      question.sourceTitle?.includes("چاپ دهم ۱۴۰۵") &&
      question.sourceUrl === "https://dl.daneshchi.ir/file/chap-school/Hendese-Riazi-11_Daneshchi.iR.pdf" &&
      question.reviewerNote?.includes("سؤال تألیفی")
    )).toBe(true);
    const expectedKeys: Record<string, number> = {
      "authored-grade11-math-geometry-reflection-01": 2,
      "authored-grade11-math-geometry-translation-02": 0,
      "authored-grade11-math-geometry-rotation-03": 3,
      "authored-grade11-math-geometry-homothety-04": 1,
      "authored-grade11-math-geometry-symmetry-05": 2,
      "authored-grade11-math-geometry-sine-rule-01": 1,
      "authored-grade11-math-geometry-cosine-rule-02": 1,
      "authored-grade11-math-geometry-bisector-ratio-03": 1,
      "authored-grade11-math-geometry-bisector-length-04": 1,
      "authored-grade11-math-geometry-heron-05": 1
    };
    for (const question of batch) {
      expect(question.correctIndex, question.id).toBe(expectedKeys[question.id]);
    }
  });


  it("matches the official seven-chapter Grade 11 Experimental Math 2 contents and fills chapters 6 and 7", () => {
    const chapters = ["هندسه تحلیلی و جبر", "هندسه", "تابع", "مثلثات", "توابع نمایی و لگاریتمی", "حد و پیوستگی", "آمار و احتمال"];
    const book = curriculumCatalog.find((entry) =>
      entry.grade === "یازدهم" && entry.track === "تجربی" && entry.subject === "ریاضی"
    );
    expect(book?.chapters).toEqual(chapters);
    for (const chapter of chapters) {
      const count = verifiedQuestions.filter((question) =>
        question.grade === "یازدهم" && question.track === "تجربی" &&
        question.subject === "ریاضی" && question.chapter === chapter &&
        ["reviewed", "official-exam-adapted", "mock-exam-adapted"].includes(question.sourceStatus ?? "")
      ).length;
      expect(count, chapter).toBeGreaterThanOrEqual(5);
    }
    const batch = verifiedQuestions.filter((question) =>
      question.id.startsWith("grade11-experimental-math-gap-")
    );
    expect(batch).toHaveLength(10);
    expect(batch.filter((question) => question.chapter === "حد و پیوستگی")).toHaveLength(5);
    expect(batch.filter((question) => question.chapter === "آمار و احتمال")).toHaveLength(5);
    expect(batch.every((question) =>
      question.sourceStatus === "reviewed" &&
      question.sourceTitle?.includes("چاپ دهم ۱۴۰۵") &&
      question.sourceUrl === "https://dl.daneshchi.ir/file/chap-school/Rizai-Tajrobi-11_Daneshchi.pdf" &&
      question.reviewerNote?.includes("سؤال تألیفی")
    )).toBe(true);
    const expectedKeys: Record<string, number> = {
      "grade11-experimental-math-gap-limit-polynomial-01": 2,
      "grade11-experimental-math-gap-limit-factorization-02": 1,
      "grade11-experimental-math-gap-limit-one-sided-03": 1,
      "grade11-experimental-math-gap-continuity-parameter-04": 1,
      "grade11-experimental-math-gap-limit-rational-05": 3,
      "grade11-experimental-math-gap-conditional-probability-01": 2,
      "grade11-experimental-math-gap-independent-events-02": 1,
      "grade11-experimental-math-gap-descriptive-mean-03": 1,
      "grade11-experimental-math-gap-descriptive-range-04": 2,
      "grade11-experimental-math-gap-descriptive-variance-05": 1
    };
    for (const question of batch) {
      expect(question.correctIndex, question.id).toBe(expectedKeys[question.id]);
    }
  });


  it("provides five reviewed questions in each chapter of the shared Grade 11 Chemistry 2 book for the mathematics track", () => {
    const chapters = ["قدر هدایای زمینی را بدانیم", "در پی غذای سالم", "پوشاک، نیازی پایان‌ناپذیر"];
    const book = curriculumCatalog.find((entry) =>
      entry.grade === "یازدهم" && entry.track === "ریاضی" && entry.subject === "شیمی"
    );
    expect(book?.chapters).toEqual(chapters);
    for (const chapter of chapters) {
      const count = verifiedQuestions.filter((question) =>
        question.grade === "یازدهم" && question.track === "ریاضی" &&
        question.subject === "شیمی" && question.chapter === chapter &&
        ["reviewed", "official-exam-adapted", "mock-exam-adapted"].includes(question.sourceStatus ?? "")
      ).length;
      expect(count, chapter).toBeGreaterThanOrEqual(5);
    }
    const batch = verifiedQuestions.filter((question) =>
      question.id.startsWith("authored-grade11-math-chemistry-")
    );
    expect(batch).toHaveLength(15);
    expect(batch.every((question) =>
      question.sourceStatus === "reviewed" &&
      question.sourceTitle?.includes("مشترک رشته‌های ریاضی و تجربی") &&
      question.sourceUrl === "https://dl.daneshchi.ir/file/chap-school/Shimi-RT-11_Daneshchi.iR.pdf" &&
      question.reviewerNote?.includes("سؤال تألیفی")
    )).toBe(true);
    for (const chapter of chapters) {
      expect(batch.filter((question) => question.chapter === chapter), chapter).toHaveLength(5);
    }
    const expectedKeys: Record<string, number> = {
      "authored-grade11-math-chemistry-periodic-radius-01": 1,
      "authored-grade11-math-chemistry-transition-metals-02": 0,
      "authored-grade11-math-chemistry-thermite-stoichiometry-03": 2,
      "authored-grade11-math-chemistry-hydrocarbon-bonds-04": 2,
      "authored-grade11-math-chemistry-fractional-distillation-05": 1,
      "authored-grade11-math-chemistry-enthalpy-sign-01": 1,
      "authored-grade11-math-chemistry-calorimetry-02": 2,
      "authored-grade11-math-chemistry-iodine-sublimation-enthalpy-03": 0,
      "authored-grade11-math-chemistry-reaction-rate-catalyst-04": 1,
      "authored-grade11-math-chemistry-reaction-rate-temperature-05": 1,
      "authored-grade11-math-chemistry-esterification-01": 0,
      "authored-grade11-math-chemistry-polyester-02": 0,
      "authored-grade11-math-chemistry-polyamide-03": 0,
      "authored-grade11-math-chemistry-kevlar-04": 0,
      "authored-grade11-math-chemistry-polymer-degradation-05": 0
    };
    for (const question of batch) {
      expect(question.correctIndex, question.id).toBe(expectedKeys[question.id]);
    }
  });


  it("matches the official eleven-lesson Grade 11 Statistics and Probability map and verifies reviewed authored coverage", () => {
    const officialLessons = [
      "آشنایی با منطق ریاضی",
      "جبر مجموعه‌ها",
      "مبانی احتمال",
      "احتمال غیرهم‌شانس",
      "احتمال شرطی",
      "پیشامدهای مستقل و وابسته",
      "توصیف و نمایش داده‌ها",
      "معیارهای گرایش به مرکز",
      "معیارهای پراکندگی",
      "گردآوری داده‌ها",
      "برآورد"
    ];
    const book = curriculumCatalog.find((entry) =>
      entry.grade === "یازدهم" && entry.track === "ریاضی" && entry.subject === "آمار و احتمال"
    );
    expect(book?.chapters).toEqual(officialLessons);
    expect(book?.chapters).not.toContain("مجموعه و زیرمجموعه");
    expect(book?.chapters).not.toContain("قوانین و اعمال بین مجموعه‌ها");

    const reviewedChapters = [
      "آشنایی با منطق ریاضی",
      "جبر مجموعه‌ها",
      "مبانی احتمال",
      "احتمال غیرهم‌شانس"
    ];
    for (const chapter of reviewedChapters) {
      const count = verifiedQuestions.filter((question) =>
        question.grade === "یازدهم" && question.track === "ریاضی" &&
        question.subject === "آمار و احتمال" && question.chapter === chapter &&
        ["reviewed", "official-exam-adapted", "mock-exam-adapted"].includes(question.sourceStatus ?? "")
      ).length;
      expect(count, chapter).toBeGreaterThanOrEqual(5);
    }

    const setBatch = verifiedQuestions.filter((question) =>
      question.id.startsWith("authored-grade11-math-statistics-") &&
      !question.id.startsWith("authored-grade11-math-statistics-remaining-")
    );
    expect(setBatch).toHaveLength(10);
    expect(setBatch.every((question) => question.chapter === "جبر مجموعه‌ها")).toBe(true);

    const probabilityBatch = verifiedQuestions.filter((question) =>
      question.id.startsWith("authored-grade11-math-probability-")
    );
    expect(probabilityBatch).toHaveLength(10);
    expect(probabilityBatch.filter((question) => question.chapter === "مبانی احتمال")).toHaveLength(5);
    expect(probabilityBatch.filter((question) => question.chapter === "احتمال غیرهم‌شانس")).toHaveLength(5);

    for (const question of [...setBatch, ...probabilityBatch]) {
      expect(question.sourceStatus, question.id).toBe("reviewed");
      expect(question.sourceTitle, question.id).toContain("چاپ دهم ۱۴۰۵");
      expect(question.sourceUrl, question.id).toBe("https://dl.daneshchi.ir/file/chap-school/Amar-11_Daneshchi.iR.pdf");
      expect(question.reviewerNote, question.id).toContain("سؤال تألیفی");
      expect(question.options, question.id).toHaveLength(4);
      expect(question.correctIndex, question.id).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex, question.id).toBeLessThan(4);
    }

    const expectedKeys: Record<string, number> = {
      "authored-grade11-math-statistics-subset-count-01": 2,
      "authored-grade11-math-statistics-proper-subset-count-02": 2,
      "authored-grade11-math-statistics-set-builder-03": 1,
      "authored-grade11-math-statistics-equal-sets-04": 1,
      "authored-grade11-math-statistics-subset-relation-05": 0,
      "authored-grade11-math-statistics-set-difference-01": 1,
      "authored-grade11-math-statistics-de-morgan-union-02": 1,
      "authored-grade11-math-statistics-de-morgan-intersection-03": 1,
      "authored-grade11-math-statistics-cartesian-cardinality-04": 1,
      "authored-grade11-math-statistics-cartesian-order-05": 1,
      "authored-grade11-math-probability-sample-space-two-dice-01": 2,
      "authored-grade11-math-probability-event-even-die-02": 1,
      "authored-grade11-math-probability-complement-probability-03": 1,
      "authored-grade11-math-probability-mutually-exclusive-union-04": 1,
      "authored-grade11-math-probability-general-union-probability-05": 0,
      "authored-grade11-math-probability-weighted-die-even-01": 2,
      "authored-grade11-math-probability-biased-coin-complement-02": 1,
      "authored-grade11-math-probability-weighted-teams-ratio-03": 1,
      "authored-grade11-math-probability-weighted-three-outcomes-04": 1,
      "authored-grade11-math-probability-weighted-dart-zones-05": 0
    };
    for (const question of [...setBatch, ...probabilityBatch]) {
      expect(question.correctIndex, question.id).toBe(expectedKeys[question.id]);
    }
  });

  it("reaches five reviewed authored questions in each of the seven remaining Grade 11 Statistics and Probability lessons", () => {
    const chapters = [
      "احتمال شرطی",
      "پیشامدهای مستقل و وابسته",
      "توصیف و نمایش داده‌ها",
      "معیارهای گرایش به مرکز",
      "معیارهای پراکندگی",
      "گردآوری داده‌ها",
      "برآورد"
    ];
    const batch = verifiedQuestions.filter((question) =>
      question.id.startsWith("authored-grade11-math-statistics-remaining-")
    );
    expect(batch).toHaveLength(34);
    for (const chapter of chapters) {
      const questions = batch.filter((question) => question.chapter === chapter);
      expect(questions, chapter).toHaveLength(5);
      expect(questions.every((question) =>
        question.grade === "یازدهم" &&
        question.track === "ریاضی" &&
        question.subject === "آمار و احتمال" &&
        question.sourceStatus === "reviewed" &&
        question.sourceTitle?.includes("چاپ دهم ۱۴۰۵") &&
        question.sourceUrl === "https://dl.daneshchi.ir/file/chap-school/Amar-11_Daneshchi.iR.pdf" &&
        question.reviewerNote?.includes("سؤال تألیفی") &&
        question.reviewerNote?.includes("بازبینی شده‌اند") &&
        question.options.length === 4 &&
        question.explanation.length > 20
      )).toBe(true);
    }
    const expectedKeys: Record<string, number> = {
      "authored-grade11-math-statistics-remaining-conditional-dice-sum-01": 1,
      "authored-grade11-math-statistics-remaining-conditional-urn-without-replacement-02": 2,
      "authored-grade11-math-statistics-remaining-conditional-number-divisibility-03": 1,
      "authored-grade11-math-statistics-remaining-conditional-total-probability-04": 1,
      "authored-grade11-math-statistics-remaining-conditional-bayes-test-05": 1,
      "authored-grade11-math-statistics-remaining-independent-coin-die-01": 1,
      "authored-grade11-math-statistics-remaining-dependent-draw-without-replacement-02": 0,
      "authored-grade11-math-statistics-remaining-independent-draw-with-replacement-03": 1,
      "authored-grade11-math-statistics-remaining-independence-product-criterion-04": 1,
      "authored-grade11-math-statistics-remaining-independent-union-05": 1,
      "authored-grade11-math-statistics-remaining-descriptive-relative-frequency-01": 2,
      "authored-grade11-math-statistics-remaining-descriptive-frequency-total-02": 2,
      "authored-grade11-math-statistics-remaining-descriptive-variable-type-03": 2,
      "authored-grade11-math-statistics-remaining-descriptive-graph-choice-04": 1,
      "authored-grade11-math-statistics-remaining-descriptive-pie-angle-05": 2,
      "authored-grade11-math-statistics-remaining-central-mean-01": 1,
      "authored-grade11-math-statistics-remaining-central-weighted-mean-02": 2,
      "authored-grade11-math-statistics-remaining-central-median-odd-03": 1,
      "authored-grade11-math-statistics-remaining-central-mode-04": 2,
      "authored-grade11-math-statistics-remaining-central-quartiles-05": 1,
      "authored-grade11-math-statistics-remaining-dispersion-variance-01": 1,
      "authored-grade11-math-statistics-remaining-dispersion-constant-shift-02": 2,
      "authored-grade11-math-statistics-remaining-dispersion-scale-03": 1,
      "authored-grade11-math-statistics-remaining-dispersion-coefficient-variation-04": 2,
      "authored-grade11-math-statistics-remaining-dispersion-iqr-05": 1,
      "authored-grade11-math-statistics-remaining-collection-population-sample-01": 1,
      "authored-grade11-math-statistics-remaining-collection-simple-random-02": 1,
      "authored-grade11-math-statistics-remaining-collection-stratified-03": 1,
      "authored-grade11-math-statistics-remaining-collection-cluster-04": 1,
      "authored-grade11-math-statistics-remaining-collection-data-method-05": 1,
      "authored-grade11-math-statistics-remaining-estimation-parameter-statistic-01": 1,
      "authored-grade11-math-statistics-remaining-estimation-point-estimate-02": 0,
      "authored-grade11-math-statistics-remaining-estimation-sample-mean-03": 1,
      "authored-grade11-math-statistics-remaining-estimation-interval-midpoint-04": 2,
      "authored-grade11-math-statistics-remaining-estimation-sample-size-05": 1
    };
    for (const question of batch) {
      expect(question.correctIndex, question.id).toBe(expectedKeys[question.id]);
      expect(question.correctIndex, question.id).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex, question.id).toBeLessThan(4);
    }
  });



  it("reaches five reviewed questions in all eight Grade 11 humanities Psychology lessons", () => {
    const lessons = [
      "روان‌شناسی: تعریف و روش مورد مطالعه",
      "روان‌شناسی رشد",
      "احساس، توجه، ادراک",
      "حافظه و علل فراموشی",
      "تفکر (۱): حل مسئله",
      "تفکر (۲): تصمیم‌گیری",
      "انگیزه و نگرش",
      "روان‌شناسی سلامت"
    ];
    for (const chapter of lessons) {
      const count = verifiedQuestions.filter((question) =>
        question.grade === "یازدهم" &&
        question.track === "انسانی" &&
        question.subject === "روان‌شناسی" &&
        question.chapter === chapter &&
        ["reviewed", "official-exam-adapted", "mock-exam-adapted"].includes(question.sourceStatus ?? "")
      ).length;
      expect(count, chapter).toBeGreaterThanOrEqual(5);
    }
    const batch = verifiedQuestions.filter((question) =>
      question.id.startsWith("grade11-gap-authored-psych-") &&
      question.id !== "grade11-gap-authored-psych-development-05"
    );
    expect(batch).toHaveLength(29);
    const expectedPerLesson: Record<string, number> = {
      "احساس، توجه، ادراک": 5,
      "حافظه و علل فراموشی": 4,
      "تفکر (۱): حل مسئله": 5,
      "تفکر (۲): تصمیم‌گیری": 5,
      "انگیزه و نگرش": 5,
      "روان‌شناسی سلامت": 5
    };
    for (const [chapter, expected] of Object.entries(expectedPerLesson)) {
      expect(batch.filter((question) => question.chapter === chapter), chapter).toHaveLength(expected);
    }
    expect(batch.every((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "روان‌شناسی" &&
      question.sourceStatus === "reviewed" &&
      question.sourceTitle?.includes("سؤال تألیفی") &&
      question.sourceUrl === undefined &&
      question.reviewerNote?.includes("تألیفی و بازبینی‌شده") &&
      question.options.length === 4 &&
      question.correctIndex >= 0 &&
      question.correctIndex < 4 &&
      question.explanation.length > 20
    )).toBe(true);
  });

  it("completes all ten official Grade 11 humanities Philosophy lessons with five eligible reviewed questions each", () => {
    const lessons = [
      "چیستی فلسفه",
      "ریشه و شاخه‌های فلسفه",
      "آغاز تاریخی فلسفه",
      "فلسفه و زندگی",
      "زندگی بر اساس اندیشه",
      "امکان شناخت",
      "ابزارهای شناخت",
      "نگاهی به تاریخچه معرفت",
      "چیستی انسان",
      "انسان، موجود اخلاق‌گرا"
    ];
    const book = curriculumCatalog.find((item) =>
      item.grade === "یازدهم" && item.track === "انسانی" && item.subject === "فلسفه"
    );
    expect(book?.bookCode).toBe("111226");
    expect(book?.chapters).toEqual(lessons);

    for (const chapter of lessons) {
      const count = verifiedQuestions.filter((question) =>
        question.grade === "یازدهم" &&
        question.track === "انسانی" &&
        question.subject === "فلسفه" &&
        question.chapter === chapter &&
        ["reviewed", "official-exam-adapted", "mock-exam-adapted"].includes(question.sourceStatus ?? "") &&
        question.options.length === 4 &&
        question.correctIndex >= 0 &&
        question.correctIndex < 4 &&
        question.explanation.length > 20
      ).length;
      expect(count, chapter).toBeGreaterThanOrEqual(5);
    }

    const batch = verifiedQuestions.filter((question) =>
      question.id.startsWith("grade11-philosophy-gap-")
    );
    expect(batch).toHaveLength(35);
    const addedPerLesson: Record<string, number> = {
      "چیستی فلسفه": 5,
      "آغاز تاریخی فلسفه": 5,
      "زندگی بر اساس اندیشه": 5,
      "امکان شناخت": 5,
      "ابزارهای شناخت": 4,
      "نگاهی به تاریخچه معرفت": 5,
      "انسان، موجود اخلاق‌گرا": 5
    };
    for (const [chapter, expected] of Object.entries(addedPerLesson)) {
      expect(batch.filter((question) => question.chapter === chapter), chapter).toHaveLength(expected);
    }
    expect(batch.every((question) =>
      question.grade === "یازدهم" &&
      question.track === "انسانی" &&
      question.subject === "فلسفه" &&
      question.sourceStatus === "reviewed" &&
      question.sourceTitle?.includes("کتاب رسمی فلسفه (۱)") &&
      question.sourceUrl === "https://abadgaranedu.ir/wp-content/uploads/2019/01/school-book-humanities-11th-philosophy-abadgaranedu.ir_.pdf" &&
      question.reviewerNote?.includes("سؤال تألیفی") &&
      question.reviewerNote?.includes("ارجاع: صفحه‌های") &&
      question.options.length === 4 &&
      question.correctIndex >= 0 &&
      question.correctIndex < 4 &&
      question.explanation.length > 20
    )).toBe(true);

    const expectedKeys: Record<string, number> = {
      "grade11-philosophy-gap-lesson1-01": 1,
      "grade11-philosophy-gap-lesson1-02": 2,
      "grade11-philosophy-gap-lesson1-03": 0,
      "grade11-philosophy-gap-lesson1-04": 2,
      "grade11-philosophy-gap-lesson1-05": 0,
      "grade11-philosophy-gap-lesson3-01": 1,
      "grade11-philosophy-gap-lesson3-02": 1,
      "grade11-philosophy-gap-lesson3-03": 0,
      "grade11-philosophy-gap-lesson3-04": 1,
      "grade11-philosophy-gap-lesson3-05": 1,
      "grade11-philosophy-gap-lesson5-01": 1,
      "grade11-philosophy-gap-lesson5-02": 0,
      "grade11-philosophy-gap-lesson5-03": 1,
      "grade11-philosophy-gap-lesson5-04": 0,
      "grade11-philosophy-gap-lesson5-05": 1,
      "grade11-philosophy-gap-lesson6-01": 1,
      "grade11-philosophy-gap-lesson6-02": 1,
      "grade11-philosophy-gap-lesson6-03": 0,
      "grade11-philosophy-gap-lesson6-04": 2,
      "grade11-philosophy-gap-lesson6-05": 1,
      "grade11-philosophy-gap-lesson7-02": 0,
      "grade11-philosophy-gap-lesson7-03": 2,
      "grade11-philosophy-gap-lesson7-04": 1,
      "grade11-philosophy-gap-lesson7-05": 2,
      "grade11-philosophy-gap-lesson8-01": 1,
      "grade11-philosophy-gap-lesson8-02": 0,
      "grade11-philosophy-gap-lesson8-03": 1,
      "grade11-philosophy-gap-lesson8-04": 1,
      "grade11-philosophy-gap-lesson8-05": 2,
      "grade11-philosophy-gap-lesson10-01": 1,
      "grade11-philosophy-gap-lesson10-02": 2,
      "grade11-philosophy-gap-lesson10-03": 1,
      "grade11-philosophy-gap-lesson10-04": 1,
      "grade11-philosophy-gap-lesson10-05": 1
    };
    expect(Object.keys(expectedKeys)).toHaveLength(34);
    for (const question of batch) {
      expect(question.correctIndex, question.id).toBe(expectedKeys[question.id]);
    }
  });

});
