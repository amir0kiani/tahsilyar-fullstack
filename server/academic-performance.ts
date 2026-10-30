export type AssessmentRecord = {
  subject: string;
  correctAnswers: number;
  totalQuestions: number;
  assessedAt: Date | string;
};

export type SubjectPerformance = {
  subject: string;
  assessmentCount: number;
  averagePercent: number;
  latestPercent: number;
  trendPoints: number[];
  trendDelta: number | null;
};

const toTimestamp = (value: Date | string) => {
  const timestamp = value instanceof Date ? value.getTime() : new Date(value).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
};

const percent = (assessment: AssessmentRecord) =>
  assessment.totalQuestions > 0
    ? Math.round((assessment.correctAnswers / assessment.totalQuestions) * 100)
    : null;

export function summarizeSubjectPerformance(records: AssessmentRecord[]): SubjectPerformance[] {
  const grouped = new Map<string, AssessmentRecord[]>();
  for (const record of records) {
    if (!record.subject.trim() || record.totalQuestions <= 0 || record.correctAnswers < 0 || record.correctAnswers > record.totalQuestions) continue;
    const key = record.subject.trim();
    grouped.set(key, [...(grouped.get(key) ?? []), record]);
  }

  return Array.from(grouped.entries()).map(([subject, items]) => {
    const sorted = [...items].sort((a, b) => toTimestamp(a.assessedAt) - toTimestamp(b.assessedAt));
    const scores = sorted.map(percent).filter((score): score is number => score !== null);
    const recent = scores.slice(-3);
    return {
      subject,
      assessmentCount: scores.length,
      averagePercent: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
      latestPercent: scores[scores.length - 1],
      trendPoints: recent,
      trendDelta: recent.length >= 3 ? recent[recent.length - 1] - recent[0] : null,
    };
  }).sort((a, b) => a.subject.localeCompare(b.subject, "fa"));
}

export function buildPerformanceContext(records: AssessmentRecord[]): string {
  const summaries = summarizeSubjectPerformance(records);
  if (!summaries.length) {
    return "هیچ ارزیابی یا نمره‌ای ثبت نشده است؛ سطح تسلط هیچ درسی را حدس نزن و در صورت نیاز ارزیابی تشخیصی پیشنهاد کن.";
  }

  const lines = summaries.map((item) => {
    const trend = item.trendDelta === null
      ? item.assessmentCount < 3
        ? "روند هنوز قابل قضاوت نیست (کمتر از ۳ ارزیابی)"
        : "روند نامشخص"
      : item.trendDelta >= 5
        ? `روند صعودی ${item.trendDelta} واحد درصد در ۳ ارزیابی اخیر`
        : item.trendDelta <= -5
          ? `روند نزولی ${Math.abs(item.trendDelta)} واحد درصد در ۳ ارزیابی اخیر`
          : "روند تقریباً باثبات در ۳ ارزیابی اخیر";
    const guidance = item.assessmentCount < 2
      ? "فقط یک نشانهٔ اولیه؛ بر اساس آن برنامه را شدیداً تغییر نده"
      : item.averagePercent < 60
        ? "اولویت با رفع پیش‌نیازها، آموزش مفهومی و تمرین مرحله‌ای"
        : item.averagePercent < 80
          ? "اولویت با تحلیل خطاها، تمرین هدفمند و تست ترکیبی"
          : "حفظ سطح با مرور فاصله‌دار و تمرین زمان‌دار متنوع";
    return `- ${item.subject}: میانگین ${item.averagePercent}٪ از ${item.assessmentCount} ارزیابی؛ آخرین نتیجه ${item.latestPercent}٪؛ ${trend}؛ راهبرد پیشنهادی: ${guidance}.`;
  });

  return [
    "فقط نتایج واقعی ثبت‌شدهٔ دانش‌آموز:",
    ...lines,
    "روند را فقط وقتی گزارش کن که حداقل ۳ ارزیابی برای همان درس وجود دارد. نمره یا تعداد آزمون جدید نساز؛ برنامه را با ساعات و محدودیت‌های ثبت‌شده سازگار نگه دار.",
  ].join("\n");
}
