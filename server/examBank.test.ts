import { describe, expect, it } from "vitest";
import { examQuestions } from "./examBank";
import { curriculumCatalog } from "./curriculumCatalog";
import { verifiedQuestions } from "./verifiedQuestionBank";

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
      expect(questions.every((question) => ["official-exam-adapted", "mock-exam-adapted"].includes(question.sourceStatus ?? ""))).toBe(true);
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
      expect(questions.every((question) => ["official-exam-adapted", "mock-exam-adapted"].includes(question.sourceStatus ?? ""))).toBe(true);
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
        expect(matching.every((question) => ["official-exam-adapted", "mock-exam-adapted"].includes(question.sourceStatus ?? ""))).toBe(true);
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


});
