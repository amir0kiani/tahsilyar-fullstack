import { trpc } from "@/lib/trpc";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect, useMemo, useRef, useState } from "react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import "./index.css";

type Screen = "home" | "companion" | "progress" | "schedule" | "profile";
type IconName =
  | "home" | "event_note" | "auto_awesome" | "insights" | "person" | "arrow_back" | "arrow_forward"
  | "check_circle" | "lock" | "mail" | "person_outline" | "menu_book" | "timer" | "trending_up"
  | "calendar_month" | "play_arrow" | "pause_circle" | "more_horiz" | "add" | "send" | "bolt"
  | "target" | "notifications" | "settings" | "logout" | "chevron_left" | "chevron_right"
  | "expand_more" | "edit" | "dark_mode" | "help" | "translate" | "close" | "done" | "schedule"
  | "psychology" | "favorite" | "check" | "light_mode";

type ChatMessage = { from: "bot" | "user"; text: string };
type PlanSession = { id?: number; subject: string; topic: string; start: string; end: string; duration: string; reason: string; day?: string; completed?: number };
type GeneratedPlan = { title: string; summary: string; sessions: PlanSession[]; focusTip: string };
type PlanRange = "today" | "tomorrow" | "week";
type CalendarItem = { subject: string; topic: string; start: string; end: string; day?: string; duration?: string; reason?: string };
type UserProfile = { name: string; email: string; answers: Record<string, string> };

const getTimeGreeting = (hour = new Date().getHours()) => hour < 12 ? "صبح بخیر" : hour < 17 ? "ظهر بخیر" : hour < 21 ? "عصر بخیر" : "شب بخیر";

type PlannerStep = { title: string; eyebrow: string; question: string; options: string[] };

const plannerSteps: PlannerStep[] = [
  { title: "نام", eyebrow: "گام اول", question: "نام و نام خانوادگی‌ات چیست؟", options: [] },
  { title: "پایه و رشته", eyebrow: "گام دوم", question: "در چه پایه و رشته‌ای تحصیل می‌کنی؟", options: [] },
  { title: "میزان ساعت مطالعه", eyebrow: "گام سوم", question: "روزانه چند ساعت واقعاً می‌توانی مطالعه کنی؟", options: [] },
  { title: "دروس امروز", eyebrow: "گام چهارم", question: "امروز ترجیح می‌دهی کدام درس‌ها را بخوانی و کدام درس‌ها را نمی‌خواهی بخوانی؟", options: [] },
  { title: "امتحان نزدیک", eyebrow: "گام پنجم", question: "آیا در چند روز آینده امتحانی داری؟ اگر بله، نام درس و تاریخ یا تعداد روز باقی‌مانده را بنویس.", options: [] },
  { title: "هدف آزمون", eyebrow: "گام ششم", question: "هدفت کنکور است، امتحانات نهایی یا هر دو؟", options: [] },
  { title: "هدف قبولی", eyebrow: "گام هفتم", question: "هدف کلی‌ات چیست؟ مثلاً رتبه، دانشگاه یا قبولی در رشته‌ای مثل پزشکی را دقیق بنویس.", options: [] },
];

const navItems: { id: Screen; label: string; icon: IconName }[] = [
  { id: "home", label: "خانه", icon: "home" },
  { id: "companion", label: "همراه", icon: "auto_awesome" },
  { id: "progress", label: "پیشرفت", icon: "insights" },
  { id: "schedule", label: "برنامه درسی", icon: "calendar_month" },
  { id: "profile", label: "حساب من", icon: "person" },
];

const commonSubjects = ["فارسی و نگارش", "عربی", "دین و زندگی", "زبان انگلیسی"];
const subjectsByTrack: Record<string, string[]> = {
  "انسانی": [...commonSubjects, "علوم و فنون ادبی", "جامعه‌شناسی", "روان‌شناسی", "فلسفه و منطق", "تاریخ", "جغرافیا", "اقتصاد", "ریاضی و آمار"],
  "ریاضی": [...commonSubjects, "ریاضی", "هندسه", "حسابان", "آمار و احتمال", "گسسته", "فیزیک", "شیمی"],
  "تجربی": [...commonSubjects, "زیست‌شناسی", "شیمی", "فیزیک", "ریاضی", "زمین‌شناسی"],
};
const subjectOptionsForTrack = (track: string) => subjectsByTrack[Object.keys(subjectsByTrack).find((key) => track.includes(key)) ?? "تجربی"];
const selectedSubjects = (value: string) => value.split("،").map((item) => item.trim()).filter(Boolean);

const getDeviceDateLabel = (date = new Date()) => new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  weekday: "long", year: "numeric", month: "long", day: "numeric",
}).format(date);

const getDeviceTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || "local";
const getInitial = (name: string) => name.trim().slice(0, 1) || "؟";
const profileContext = (profile: UserProfile | null) => {
  if (!profile) return "";
  const answers = Object.entries(profile.answers).map(([key, value]) => `${key}: ${value}`).join("؛ ");
  return [`نام: ${profile.name}`, `ایمیل: ${profile.email}`, answers].filter(Boolean).join("؛ ");
};

const asciiDigits = (value: string) => value
  .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
  .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
const escapeIcs = (value: string) => value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
const localDateTime = (baseDate: Date, time: string) => {
  const [hour = "0", minute = "0"] = asciiDigits(time).split(":");
  const date = new Date(baseDate);
  date.setHours(Number(hour), Number(minute), 0, 0);
  return date;
};
const icsTimestamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
const dateForWeekday = (day: string | undefined, baseDate: Date) => {
  if (!day) return new Date(baseDate);
  const days = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
  const targetIndex = days.indexOf(day);
  if (targetIndex < 0) return new Date(baseDate);
  const todayIndex = (baseDate.getDay() + 1) % 7;
  const offset = (targetIndex - todayIndex + 7) % 7;
  const date = new Date(baseDate);
  date.setDate(date.getDate() + offset);
  return date;
};
const buildCalendarIcs = (items: CalendarItem[], title: string, baseDate = new Date()) => {
  const stamp = icsTimestamp(new Date());
  const events = items.map((item, index) => {
    const sessionDate = dateForWeekday(item.day, baseDate);
    return [
      "BEGIN:VEVENT",
      `UID:tahsilyar-${Date.now()}-${index}@tahsilyar.app`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${icsTimestamp(localDateTime(sessionDate, item.start))}`,
      `DTEND:${icsTimestamp(localDateTime(sessionDate, item.end))}`,
      `SUMMARY:${escapeIcs(`${item.subject} · مطالعه`)}`,
      `DESCRIPTION:${escapeIcs([item.topic, item.duration, item.reason].filter(Boolean).join(" · "))}`,
      "END:VEVENT",
    ].join("\\r\\n");
  });
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//TahsilYar//Study Plan//FA", "CALSCALE:GREGORIAN", `X-WR-CALNAME:${escapeIcs(title)}`, ...events, "END:VCALENDAR", ""].join("\\r\\n");
};
const addSessionsToDeviceCalendar = async (items: CalendarItem[], title: string) => {
  if (!items.length) throw new Error("No sessions to export");
  const file = new File([buildCalendarIcs(items, title)], "tahsilyar-study-plan.ics", { type: "text/calendar;charset=utf-8" });
  if (typeof navigator !== "undefined" && navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({ title, text: "برنامهٔ مطالعهٔ تحصیل‌یار", files: [file] });
    return "برنامه برای افزودن به تقویم گوشی آماده شد.";
  }
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  return "فایل تقویم دانلود شد؛ آن را باز کن تا به تقویم گوشی اضافه شود.";
};

function Icon({ name, size = 20, filled = false }: { name: IconName; size?: number; filled?: boolean }) {
  return <span className={`material-symbols-rounded ${filled ? "filled" : ""}`} style={{ fontSize: size }} aria-hidden="true">{name}</span>;
}

function LogoMark({ compact = false }: { compact?: boolean }) {
  return <div className={`brand-lockup ${compact ? "compact" : ""}`}>
    <div className="logo-mark image-logo" aria-label="لوگوی تحصیل‌یار"><img src="/manus-storage/file_00000000e1cc8246a507f92f5ccd2418_b3918ea0.png" alt="تحصیل‌یار" /></div>
    {!compact && <div className="brand-copy"><strong>تحصیل‌یار</strong><span>یادگیری با آرامش</span></div>}
  </div>;
}

function Signup({ onSignup, onLogin }: { onSignup: (profile: Pick<UserProfile, "name" | "email">) => void; onLogin: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const canSubmit = name.trim().length > 1 && email.includes("@");
  return <main className="auth-page" dir="rtl">
    <div className="auth-decoration auth-decoration-one" /><div className="auth-decoration auth-decoration-two" />
    <div className="auth-panel auth-brand-panel"><div className="auth-brand-top"><LogoMark /></div><div className="auth-illustration"><div className="illustration-glow" /><LogoMark compact /><div className="floating-pill pill-one"><Icon name="auto_awesome" size={15} />یادگیری هوشمند</div><div className="floating-pill pill-two"><Icon name="favorite" size={15} filled />با آرامش پیش برو</div></div><div className="auth-brand-copy"><p className="eyebrow">همراه مسیر موفقیت تو</p><h1>هر روز، یک قدم<br /><em>نزدیک‌تر به رؤیاهایت.</em></h1><p>تحصیل‌یار اطلاعاتت را از خودت می‌گیرد و فقط بر اساس مسیر واقعی تو برنامه می‌سازد.</p></div><div className="auth-quote"><span>“</span><p>موفقیت، جمع قدم‌های کوچک و پیوسته است.</p></div></div>
    <div className="auth-panel auth-form-panel"><div className="mobile-logo"><LogoMark /></div><div className="auth-form-wrap"><div className="form-heading"><p className="eyebrow">شروع یک مسیر تازه</p><h2>حساب کاربری بساز</h2><p>برای ورود و ساخت حساب، از سرویس ورود امن استفاده می‌شود. نام و ایمیل واردشده برای تکمیل پروفایل نگه داشته می‌شوند.</p></div><form className="signup-form" onSubmit={(event) => { event.preventDefault(); if (canSubmit) onSignup({ name: name.trim(), email: email.trim() }); }}>
      <label>نام و نام خانوادگی<span>*</span><div className="input-shell"><Icon name="person_outline" size={21} /><input value={name} onChange={(event) => setName(event.target.value)} placeholder="نام و نام خانوادگی" /></div></label>
      <label>ایمیل<span>*</span><div className="input-shell"><Icon name="mail" size={21} /><input type="email" dir="ltr" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="email@example.com" /></div></label>
      <button className="primary-button signup-button" type="submit" disabled={!canSubmit}>ادامه با حساب کاربری <Icon name="arrow_back" size={19} /></button>
    </form><button className="back-button" type="button" onClick={onLogin}>ورود با حساب کاربری</button><div className="secure-note"><Icon name="lock" size={15} /> اطلاعاتت نزد تحصیل‌یار امن می‌ماند.</div></div></div>
  </main>;
}

function AppShell() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [screen, setScreen] = useState<Screen>("companion");
  const [plannerStep, setPlannerStep] = useState(0);
  const [plannerAnswers, setPlannerAnswers] = useState<Record<number, string>>({});
  const [planRange, setPlanRange] = useState<PlanRange>("today");
  const [newPlanMode, setNewPlanMode] = useState(false);
  const [toast, setToast] = useState("");
  const [completed, setCompleted] = useState<number[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  const auth = useAuth();
  const latestPlanQuery = trpc.study.latestPlan.useQuery(undefined, { enabled: auth.isAuthenticated, retry: false });
  const profileQuery = trpc.profile.me.useQuery(undefined, { enabled: auth.isAuthenticated, retry: false });
  const profileSaveMutation = trpc.profile.save.useMutation();
  const { theme, toggleTheme } = useTheme();
  const chatMutation = trpc.study.chat.useMutation();
  const clearChatMutation = trpc.study.clearChat.useMutation();
  const chatHistoryQuery = trpc.study.chatHistory.useQuery(undefined, { enabled: auth.isAuthenticated, retry: false });
  const planMutation = trpc.study.generatePlan.useMutation();
  const sessionStatusMutation = trpc.study.setSessionCompleted.useMutation();
  const deviceDateLabel = getDeviceDateLabel();
  const deviceTimeZone = getDeviceTimeZone();
  const answeredProfile = useMemo(() => plannerSteps.every((_, index) => Boolean(plannerAnswers[index])), [plannerAnswers]);
  const currentProfileContext = profileContext(user ? { ...user, answers: Object.fromEntries(Object.entries(plannerAnswers).map(([index, answer]) => [plannerSteps[Number(index)]?.title ?? index, answer])) } : null);
  useEffect(() => {
    if (latestPlanQuery.data?.title && !generatedPlan) {
      const storedPlan = latestPlanQuery.data as unknown as GeneratedPlan;
      setGeneratedPlan(storedPlan);
      setCompleted(storedPlan.sessions.filter((session) => session.completed === 1).map((session, index) => session.id ?? index));
    }
  }, [latestPlanQuery.data, generatedPlan]);
  useEffect(() => {
    if (!auth.isAuthenticated || !auth.user || profileQuery.isLoading) return;
    const stored = profileQuery.data;
    if (stored?.answers) {
      const restoredAnswers = Object.fromEntries(plannerSteps.map((step, index) => [index, (stored.answers as Record<string, string>)[step.title] || ""]).filter(([, answer]) => Boolean(answer)));
      setPlannerAnswers((current) => Object.keys(current).length ? current : restoredAnswers);
    }
    const draft = localStorage.getItem("tahsilyar-registration-draft");
    const draftProfile = draft ? JSON.parse(draft) as { name?: string; email?: string } : null;
    const name = stored?.name || draftProfile?.name || auth.user.name || "کاربر";
    const email = stored?.email || draftProfile?.email || auth.user.email || "";
    const answers = (stored?.answers as Record<string, string> | undefined) || {};
    setUser((current) => current ?? { name, email, answers });
    if (!stored && draftProfile?.name && !profileSaveMutation.isPending) {
      profileSaveMutation.mutate({ name: draftProfile.name, email: draftProfile.email, answers: {} });
      localStorage.removeItem("tahsilyar-registration-draft");
    }
  }, [auth.isAuthenticated, auth.user, profileQuery.data, profileQuery.isLoading]);
  useEffect(() => {
    if (!chatHistoryQuery.data) return;
    setMessages(chatHistoryQuery.data.map((message) => ({ from: message.role === "assistant" ? "bot" : "user", text: message.content })));
  }, [chatHistoryQuery.data]);
  useEffect(() => {
    if (!chatHistoryQuery.data) return;
    setMessages(chatHistoryQuery.data.map((message) => ({ from: message.role === "assistant" ? "bot" : "user", text: message.content })));
  }, [chatHistoryQuery.data]);
  const showToast = (text: string) => { setToast(text); window.setTimeout(() => setToast(""), 2400); };
  const navigate = (next: Screen) => { setScreen(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const currentPlanner = plannerSteps[plannerStep];

  if (!user) return <Signup onSignup={(profile) => { localStorage.setItem("tahsilyar-registration-draft", JSON.stringify(profile)); startLogin(); }} onLogin={startLogin} />;

  const handlePlannerNext = async (submittedAnswer?: string) => {
    const effectiveAnswers = submittedAnswer ? { ...plannerAnswers, [plannerStep]: submittedAnswer } : plannerAnswers;
    if (!effectiveAnswers[plannerStep]) { showToast("برای ادامه باید این پاسخ را از خودت ثبت کنی."); return; }
    if (plannerStep < plannerSteps.length - 1) { setPlannerStep((step) => step + 1); return; }
    if (!auth.isAuthenticated) { showToast("برای ذخیرهٔ پروفایل و ساخت برنامه، ابتدا وارد حساب کاربری شو."); startLogin(); return; }
    const answers = Object.fromEntries(Object.entries(effectiveAnswers).map(([index, answer]) => [plannerSteps[Number(index)]?.title ?? index, answer]));
    try {
      await profileSaveMutation.mutateAsync({ name: answers["نام"]?.trim() || user.name, email: user.email || undefined, answers });
    } catch (error) {
      console.error("[Profile] Could not save study answers before planning:", error);
      showToast("ذخیرهٔ اطلاعات تحصیلی انجام نشد؛ برنامه ساخته نشد.");
      return;
    }
    planMutation.mutate({ answers, deviceDate: deviceDateLabel, timezone: deviceTimeZone, planRange }, {
      onSuccess: (plan) => {
        const nextPlan = plan as GeneratedPlan;
        setUser((current) => current ? { ...current, name: answers["نام"] || current.name, answers } : current);
        setGeneratedPlan(nextPlan.sessions?.length ? nextPlan : null);
        setCompleted([]);
        setPlannerStep(0);
        setScreen("home");
        showToast(nextPlan.sessions?.length ? "برنامه فقط بر اساس اطلاعات ثبت‌شدهٔ تو ساخته شد." : "برای ساخت برنامه، اطلاعات دقیق‌تری لازم است.");
      },
      onError: () => showToast("برنامه ساخته نشد؛ اطلاعات را کامل و دوباره تلاش کن."),
    });
  };

  const sendMessage = () => {
    const value = chatInput.trim();
    if (!value || chatMutation.isPending) return;
    if (!answeredProfile || !currentProfileContext) { showToast("ابتدا اطلاعات تحصیلی‌ات را در برنامه‌ریزی کامل کن."); return; }
    setMessages((old) => [...old, { from: "user", text: value }]);
    setChatInput("");
    chatMutation.mutate({ message: value, profile: currentProfileContext, answers: Object.fromEntries(Object.entries(plannerAnswers).map(([index, answer]) => [plannerSteps[Number(index)]?.title ?? index, answer])), deviceDate: deviceDateLabel, timezone: deviceTimeZone, planRange }, {
      onSuccess: (result) => { setMessages((old) => [...old, { from: "bot", text: result.text }]); if (result.plan) { setGeneratedPlan(result.plan as GeneratedPlan); setCompleted([]); showToast("برنامه بر اساس گفت‌وگو به‌روزرسانی شد."); } },
      onError: () => setMessages((old) => [...old, { from: "bot", text: "پاسخ آماده نشد. اطلاعاتت را بررسی کن و دوباره تلاش کن." }]),
    });
  };

  const toggleSession = (session: PlanSession, fallbackIndex: number) => {
    const key = session.id ?? fallbackIndex;
    const nextCompleted = !completed.includes(key);
    setCompleted((old) => nextCompleted ? [...old, key] : old.filter((item) => item !== key));
    if (session.id) sessionStatusMutation.mutate({ sessionId: session.id, completed: nextCompleted }, { onError: () => { setCompleted((old) => nextCompleted ? old.filter((item) => item !== key) : [...old, key]); showToast("وضعیت جلسه ذخیره نشد؛ دوباره تلاش کن."); } });
  };

  const calendarItems: CalendarItem[] = generatedPlan?.sessions?.map(({ subject, topic, start, end, day, duration, reason }) => ({ subject, topic, start, end, day, duration, reason })) ?? [];
  const addCurrentPlanToCalendar = async () => {
    try { showToast("در حال آماده‌سازی فایل تقویم..."); showToast(await addSessionsToDeviceCalendar(calendarItems, generatedPlan?.title || "برنامهٔ ثبت‌شدهٔ تحصیل‌یار")); }
    catch { showToast("برای افزودن به تقویم، ابتدا یک برنامهٔ واقعی بساز."); }
  };
  const userName = user.name || "کاربر";
  const userGrade = user.answers["پایه و رشته"] || "ثبت نشده";
  return <div className="app-frame" dir="rtl"><aside className="sidebar"><div className="sidebar-logo"><LogoMark /></div><div className="sidebar-greeting"><span>فضای شخصی تو</span><strong>{userName}</strong></div><nav className="main-nav"><p className="nav-label">منوی اصلی</p>{navItems.map((item) => <button key={item.id} className={`nav-item ${screen === item.id ? "active" : ""}`} onClick={() => navigate(item.id)}><Icon name={item.icon} size={21} filled={screen === item.id} /><span>{item.label}</span>{item.id === "companion" && <i className="nav-dot" />}</button>)}</nav><div className="sidebar-bottom"><div className="mini-support"><div className="support-icon"><Icon name="favorite" size={18} filled /></div><div><strong>اطلاعاتت را کامل کن</strong><span>تا پاسخ دقیق بگیری</span></div><Icon name="arrow_back" size={16} /></div><button className="profile-mini" onClick={() => navigate("profile")}><span className="avatar">{getInitial(user.name)}</span><span><strong>{userName}</strong><small>{userGrade}</small></span><Icon name="more_horiz" size={20} /></button></div></aside>
    <main className="main-area"><header className="topbar"><div className="topbar-mobile-logo"><LogoMark compact /></div><div className="breadcrumbs"><span>تحصیل‌یار</span><Icon name="chevron_left" size={17} /><strong>{navItems.find((item) => item.id === screen)?.label}</strong></div><div className="topbar-actions"><button className="icon-button" aria-label="تغییر حالت شب" onClick={toggleTheme}><Icon name={theme === "dark" ? "dark_mode" : "light_mode"} size={21} filled /></button><button className="icon-button notification-button" onClick={() => showToast("هنوز یادآوری ثبت نشده است.")}><Icon name="notifications" size={21} filled /></button></div></header><div className="page-content">
      {screen === "home" && <HomeScreen navigate={navigate} userName={userName} plan={generatedPlan} completed={completed} onComplete={toggleSession} showToast={showToast} deviceDate={deviceDateLabel} />}
      {screen === "companion" && <CompanionScreen step={plannerStep} current={currentPlanner} answers={plannerAnswers} answered={answeredProfile} messages={messages} chatInput={chatInput} planRange={planRange} onPlanRangeChange={setPlanRange} onChatInput={setChatInput} onSendMessage={sendMessage} isSending={chatMutation.isPending} onAnswer={(answer) => { if (answer) setPlannerAnswers((old) => ({ ...old, [plannerStep]: answer })); else if (plannerStep > 0) setPlannerStep((step) => step - 1); }} onNext={(answer?: string) => handlePlannerNext(answer)} isGenerating={planMutation.isPending} newPlanMode={newPlanMode} onStartNewPlan={() => setNewPlanMode(true)} onCancelNewPlan={() => setNewPlanMode(false)} onGeneratedNewPlan={(plan, answers) => { setGeneratedPlan(plan); setPlannerAnswers(answers); setNewPlanMode(false); setScreen("schedule"); showToast("برنامهٔ جدید در تب برنامهٔ درسی ذخیره شد."); }} onClearChat={() => { clearChatMutation.mutate(undefined, { onSuccess: () => { setMessages([]); showToast("چت قدیمی حذف شد."); }, onError: () => showToast("حذف چت انجام نشد؛ دوباره تلاش کن.") }); }} isClearingChat={clearChatMutation.isPending} />}
      {screen === "progress" && <ProgressScreen plan={generatedPlan} completed={completed} />}
      {screen === "schedule" && <ScheduleScreen plan={generatedPlan} completed={completed} onToggle={toggleSession} showToast={showToast} deviceDate={deviceDateLabel} onAddCalendar={addCurrentPlanToCalendar} />}
      {screen === "profile" && <ProfileScreen user={user} completed={completed} onUpdateUser={(updated) => setUser(updated)} onLogout={() => { void auth.logout(); setUser(null); setGeneratedPlan(null); setPlannerAnswers({}); setCompleted([]); setMessages([]); }} showToast={showToast} />}
    </div><nav className="bottom-nav">{navItems.map((item) => <button key={item.id} className={screen === item.id ? "active" : ""} onClick={() => navigate(item.id)}><Icon name={item.icon} size={22} filled={screen === item.id} /><span>{item.label}</span></button>)}</nav></main>{toast && <div className="toast"><Icon name="check_circle" size={19} filled />{toast}</div>}</div>;
}

function EmptyState({ icon = "event_note", title, description, action, onAction }: { icon?: IconName; title: string; description: string; action?: string; onAction?: () => void }) {
  return <div className="empty-state card"><span className="empty-state-icon"><Icon name={icon} size={28} /></span><h3>{title}</h3><p>{description}</p>{action && onAction && <button className="primary-button" onClick={onAction}>{action}<Icon name="arrow_back" size={17} /></button>}</div>;
}

function startMinutes(start: string) { const normalized = start.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))); const [hours, minutes] = normalized.split(":").map(Number); return Number.isFinite(hours) ? hours * 60 + (minutes || 0) : 0; }
function canStartSession(session: PlanSession) { const now = new Date(); const todayIndex = (now.getDay() + 1) % 7; const dayIndex = weekOrder.indexOf(session.day ?? ""); if (dayIndex < 0) return true; const offset = (dayIndex - todayIndex + 7) % 7; if (offset > 0) return false; return now.getHours() * 60 + now.getMinutes() >= startMinutes(session.start); }
function lessonName(subject: string) { return subject.includes("|") ? subject.split("|").slice(1).join("|") : subject; }
function lessonCode(subject: string) { return subject.includes("|") ? subject.split("|")[0] : ""; }
const weekOrder = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
function orderedUpcomingSessions(sessions: PlanSession[]) { const todayIndex = (new Date().getDay() + 1) % 7; return [...sessions].sort((a,b) => ((weekOrder.indexOf(a.day ?? "") - todayIndex + 7) % 7) - ((weekOrder.indexOf(b.day ?? "") - todayIndex + 7) % 7)); }

function HomeScreen({ navigate, userName, plan, completed, onComplete, showToast, deviceDate }: { navigate: (screen: Screen) => void; userName: string; plan: GeneratedPlan | null; completed: number[]; onComplete: (session: PlanSession, index: number) => void; showToast: (text: string) => void; deviceDate: string }) {
  const sessions = orderedUpcomingSessions(plan?.sessions ?? []).map((session, index) => ({ ...session, id: session.id ?? index, time: `${session.start} — ${session.end}`, color: index % 3 === 0 ? "mint" : index % 3 === 1 ? "blue" : "lavender", status: index === 0 ? "next" : "pending" })) ?? [];
  const progress = sessions.length ? Math.round((completed.length / sessions.length) * 100) : 0;
  const nextSession = sessions.find((session) => !completed.includes(session.id)) ?? sessions[0];
  return <div className="screen home-screen"><section className="welcome-row"><div><p className="eyebrow">{deviceDate}</p><h1>{getTimeGreeting()} <em>{userName}</em></h1><p className="section-subtitle">این صفحه فقط با داده‌های ثبت‌شدهٔ خودت پر می‌شود.</p></div></section><section className="hero-card"><div className="hero-content"><p className="hero-kicker">وضعیت برنامهٔ تو</p><h2>{plan ? plan.title : "هنوز برنامه‌ای ساخته نشده"}</h2><p>{plan?.summary || "اطلاعات تحصیلی‌ات را کامل کن تا برنامه‌ای واقعی و متناسب با خودت ساخته شود."}</p><button className="light-button" onClick={() => navigate("companion") }>{plan ? "ویرایش اطلاعات" : "شروع جمع‌آوری اطلاعات"} <Icon name="arrow_back" size={18} /></button></div><div className="hero-orbit" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /></div></section>{nextSession && <div className="next-lesson-banner"><span className="soft-icon mint"><Icon name="play_arrow" size={18} /></span><div><p className="eyebrow">درس بعدی برای مطالعه</p><strong>{lessonName(nextSession.subject)}</strong><small>{nextSession.day} · {nextSession.start} · {nextSession.duration}</small></div><span className="lesson-code">{lessonCode(nextSession.subject)}</span></div>}<div className="section-heading"><div><p className="eyebrow">وضعیت امروز</p><h2>برنامهٔ امروز</h2></div><button className="text-button" onClick={() => navigate("schedule")}>مشاهده تقویم <Icon name="arrow_back" size={16} /></button></div><section className="dashboard-grid"><div className="today-card card"><div className="card-head"><span className="soft-icon mint"><Icon name="timer" size={20} /></span><span className="status-tag">دادهٔ ثبت‌شده</span></div>{sessions.length ? <><div className="today-stat"><strong>{completed.length}</strong><span>از {sessions.length} جلسه انجام شده</span></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><div className="card-foot"><span>{progress}% تکمیل بر اساس جلسات ثبت‌شده</span><Icon name="trending_up" size={17} /></div></> : <div className="card-empty-copy"><strong>هنوز جلسه‌ای وجود ندارد</strong><span>بعد از ساخت برنامه، پیشرفت واقعی اینجا نمایش داده می‌شود.</span></div>}</div><div className="exam-card card"><div className="card-head"><span className="soft-icon blue"><Icon name="target" size={20} /></span><span className="muted-label">آزمون پیشرو</span></div><div className="card-empty-copy"><strong>{plan?.sessions?.length ? "تاریخ آزمون ثبت نشده" : "هنوز ثبت نشده"}</strong><span>برای نمایش شمارش معکوس، تاریخ دقیق آزمون را وارد کن.</span></div></div></section><div className="section-heading compact-heading"><div><p className="eyebrow">بر اساس داده‌های تو</p><h2>جلسه‌های بعدی</h2></div><button className="text-button" onClick={() => navigate("schedule")}>تقویم <Icon name="arrow_back" size={16} /></button></div>{sessions.length ? <section className="session-list">{sessions.map((session) => <article className={`session-row ${session.id === 0 ? "highlighted" : ""}`} key={`${session.subject}-${session.id}`}><div className={`subject-dot ${session.color}`}><Icon name="menu_book" size={18} /></div><div className="session-info"><strong>{lessonName(session.subject)} <small className="lesson-code">{lessonCode(session.subject)}</small></strong><span>{session.topic}</span></div><div className="session-time"><strong>{session.time}</strong><span>{session.duration}</span></div><button className={`session-action ${session.status === "next" ? "primary-small" : "ghost-small"}`} onClick={() => !canStartSession(session) ? showToast("این جلسه تا زمان شروع قفل است.") : session.status === "next" ? onComplete(session, session.id) : showToast("این جلسه هنوز نوبتش نرسیده است.")}>{!canStartSession(session) ? <><Icon name="lock" size={16} />قفل</> : session.status === "next" ? <><Icon name={completed.includes(session.id) ? "check_circle" : "play_arrow"} size={17} filled={completed.includes(session.id)} />{completed.includes(session.id) ? "انجام شد" : "شروع جلسه"}</> : "در انتظار"}</button></article>)}</section> : <EmptyState icon="menu_book" title="جلسه‌ای برای نمایش وجود ندارد" description="تا وقتی اطلاعات دقیق و برنامهٔ واقعی ثبت نشود، این بخش خالی می‌ماند." action="تکمیل برنامه‌ریزی" onAction={() => navigate("planning")} />}</div>;
}

function PlanningScreen({ step, current, answers, onAnswer, onNext, onBack, isGenerating }: { step: number; current: PlannerStep; answers: Record<number, string>; onAnswer: (answer: string) => void; onNext: () => void; onBack: () => void; isGenerating: boolean }) {
  const multiSelect = step === 4;
  const isSelected = (option: string) => multiSelect ? selectedSubjects(answers[step] || "").includes(option) : answers[step] === option;
  return <div className="screen planner-screen"><div className="planner-header"><div><p className="eyebrow">ساخت برنامهٔ شخصی</p><h1>برنامه‌ریزی با <em>تو</em> شروع می‌شود.</h1><p className="section-subtitle">تا زمانی که پاسخ دقیق ندهی، هیچ برنامه‌ای از طرف تحصیل‌یار ساخته نمی‌شود.</p></div><div className="planner-badge"><Icon name="auto_awesome" size={18} filled /><span>جمع‌آوری اطلاعات</span></div></div><div className="wizard-progress">{plannerSteps.map((item, index) => <div key={item.title} className={`wizard-dot ${index === step ? "current" : ""} ${index < step ? "done" : ""}`}><span>{index < step ? <Icon name="done" size={14} /> : index + 1}</span><small>{item.title}</small></div>)}</div><div className="planner-card"><div className="planner-card-side"><div className="planner-side-icon"><Icon name="psychology" size={38} /></div><p>پاسخ‌های واقعی تو تنها منبع ساخت برنامه هستند.</p><div className="planner-side-tip"><Icon name="favorite" size={17} filled /><span>{multiSelect ? "دروس انتخابی اولویت می‌گیرند؛ سایر دروس رشته هم در برنامه بررسی می‌شوند." : "اگر اطلاعاتی نداری، گزینه‌ای را حدس نزن."}</span></div></div><div className="planner-question"><span className="step-label">{current.eyebrow} <b>۰{step + 1}</b></span><h2>{current.question}</h2><div className="option-list">{current.options.map((option) => { const selected = isSelected(option); return <button key={option} className={`option-item ${selected ? "selected" : ""}`} onClick={() => onAnswer(option)}><span className="option-radio">{selected && <i />}</span><span>{option}</span><Icon name={selected ? "check_circle" : "chevron_left"} size={20} filled={selected} /></button>; })}</div><div className="wizard-actions"><button className="back-button" onClick={onBack} disabled={step === 0}><Icon name="arrow_forward" size={18} />قبلی</button><button className="primary-button" onClick={onNext} disabled={isGenerating}>{isGenerating ? "در حال بررسی اطلاعات..." : step === plannerSteps.length - 1 ? "ساخت برنامهٔ من" : "ادامه"}<Icon name="arrow_back" size={18} /></button></div></div></div></div>;
}

function NewPlanPanel({ answers, userName, onCancel, onGenerated }: { answers: Record<number, string>; userName: string; onCancel: () => void; onGenerated: (plan: GeneratedPlan, answers: Record<number, string>) => void }) {
  const [hours, setHours] = useState(answers[2] || "");
  const [examGoal, setExamGoal] = useState(answers[5] || "");
  const [range, setRange] = useState<PlanRange>("today");
  const planMutation = trpc.study.generatePlan.useMutation();
  const canGenerate = Boolean(hours.trim() && examGoal.trim());
  const generate = () => {
    if (!canGenerate || planMutation.isPending) return;
    const nextAnswers = { ...answers, 2: hours.trim(), 5: examGoal.trim() };
    const namedAnswers = Object.fromEntries(Object.entries(nextAnswers).map(([index, answer]) => [plannerSteps[Number(index)]?.title ?? index, answer]));
    planMutation.mutate({ answers: namedAnswers, planRange: range }, { onSuccess: (plan) => onGenerated(plan as GeneratedPlan, nextAnswers), onError: () => undefined });
  };
  return <div className="new-plan-panel card"><div className="new-plan-heading"><div><p className="eyebrow">تولید برنامهٔ جدید</p><h2>{userName}، این بار چه برنامه‌ای می‌خواهی؟</h2><p>نام و پایه و رشتهٔ ذخیره‌شده حفظ می‌شوند و فقط تنظیمات برنامه را دوباره مشخص می‌کنی.</p></div><button className="back-button" onClick={onCancel}>انصراف</button></div><div className="new-plan-fields"><label>ساعت مطالعهٔ روزانه<input value={hours} onChange={(event) => setHours(event.target.value)} placeholder="مثلاً ۴ ساعت" /></label><label>هدف آزمون<input value={examGoal} onChange={(event) => setExamGoal(event.target.value)} placeholder="کنکور، نهایی یا هر دو" /></label></div><div className="range-picker compact">{([{ value: "today", label: "امروز" }, { value: "tomorrow", label: "فردا" }, { value: "week", label: "هفت روز آینده" }] as Array<{ value: PlanRange; label: string }>).map((option) => <button key={option.value} className={range === option.value ? "selected" : ""} onClick={() => setRange(option.value)}>{option.label}</button>)}</div><button className="primary-button" disabled={!canGenerate || planMutation.isPending} onClick={generate}>{planMutation.isPending ? "در حال تولید برنامه..." : "تولید برنامهٔ جدید"}<Icon name="arrow_back" size={18} /></button></div>;
}

function CompanionScreen({ step, current, answers, answered, messages, chatInput, planRange, onPlanRangeChange, onChatInput, onSendMessage, isSending, onAnswer, onNext, isGenerating, newPlanMode, onStartNewPlan, onCancelNewPlan, onGeneratedNewPlan, onClearChat, isClearingChat }: { step: number; current: PlannerStep; answers: Record<number, string>; answered: boolean; messages: ChatMessage[]; chatInput: string; planRange: PlanRange; onPlanRangeChange: (range: PlanRange) => void; onChatInput: (value: string) => void; onSendMessage: () => void; isSending: boolean; onAnswer: (value: string) => void; onNext: (answer?: string) => void; isGenerating: boolean; newPlanMode: boolean; onStartNewPlan: () => void; onCancelNewPlan: () => void; onGeneratedNewPlan: (plan: GeneratedPlan, answers: Record<number, string>) => void; onClearChat: () => void; isClearingChat: boolean }) {
  const [draft, setDraft] = useState(answers[step] || "");
  useEffect(() => { setDraft(answers[step] || ""); }, [step, answers]);
  const rangeOptions: Array<{ value: PlanRange; label: string }> = [{ value: "today", label: "برنامهٔ امروز" }, { value: "tomorrow", label: "برنامهٔ فردا" }, { value: "week", label: "برنامهٔ هفتگی" }];
  if (answered && newPlanMode) return <div className="screen companion-screen"><NewPlanPanel answers={answers} userName="دانش‌آموز" onCancel={onCancelNewPlan} onGenerated={onGeneratedNewPlan} /></div>;
  if (answered) return <div className="screen companion-screen"><div className="companion-heading"><div><p className="eyebrow">همراه هوشمند تحصیل‌یار</p><h1>برنامه‌ات را با <em>گفت‌وگو</em> تغییر بده.</h1><p className="section-subtitle">اهداف و اطلاعاتت ذخیره شده‌اند؛ هر زمان بخواهی می‌توانی برنامه را اصلاح کنی.</p></div><div className="online-status"><i />همراه آنلاین</div><div className="companion-toolbar"><button className="secondary-button" onClick={onStartNewPlan}><Icon name="add" size={17} />تولید برنامهٔ جدید</button><button className="danger-button" onClick={onClearChat} disabled={isClearingChat}><Icon name="close" size={17} />حذف چت قدیمی</button></div></div><div className="companion-layout"><div className="chat-card"><div className="chat-top"><div className="bot-avatar"><Icon name="auto_awesome" size={21} filled /></div><div><strong>مشاور تحصیل‌یار</strong><span>گفت‌وگوی ذخیره‌شده</span></div></div><div className="chat-body">{messages.length ? messages.map((message, index) => <div className={`chat-message ${message.from === "user" ? "user-message" : "bot-message"}`} key={`${index}-${message.text.slice(0, 12)}`}><span>{message.text}</span></div>) : <div className="empty-chat-state"><Icon name="psychology" size={27} /><strong>از همراهت بخواه برنامه را تغییر دهد</strong><span>مثلاً بنویس: برای فردا زیست را بیشتر کن و یک جلسهٔ مرور شیمی اضافه کن.</span></div>}</div><div className="chat-composer"><textarea value={chatInput} onChange={(event) => onChatInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); onSendMessage(); } }} placeholder="مثلاً برنامه‌ام را برای فردا سبک‌تر کن..." /><button className="send-button" onClick={onSendMessage} disabled={!chatInput.trim() || isSending}><Icon name="send" size={19} /></button></div></div><div className="dna-card"><div className="dna-card-head"><div><p className="eyebrow">بازهٔ تولید برنامه</p><h2>برای چه زمانی؟</h2></div></div><div className="range-picker">{rangeOptions.map((option) => <button key={option.value} className={planRange === option.value ? "selected" : ""} onClick={() => onPlanRangeChange(option.value)}>{option.label}<Icon name={planRange === option.value ? "check_circle" : "chevron_left"} size={18} filled={planRange === option.value} /></button>)}</div><div className="empty-dna-state"><Icon name="psychology" size={27} /><span>تغییرات گفتگو و هدف‌ها در حساب تو ذخیره می‌شوند و با بازکردن دوبارهٔ برنامه باقی می‌مانند.</span></div></div></div></div>;
  return <div className="screen companion-screen"><div className="companion-heading"><div><p className="eyebrow">همراه هوشمند تحصیل‌یار</p><h1>برای تو، <em>واقعی</em> برنامه می‌سازم.</h1><p className="section-subtitle">من سؤال‌ها را یکی‌یکی می‌پرسم؛ پاسخ صادقانه‌ات به ساخت برنامهٔ دقیق‌تر کمک می‌کند.</p></div><div className="online-status"><i />گفت‌وگوی برنامه‌ریزی</div></div><div className="companion-layout"><div className="chat-card planner-chat-card"><div className="chat-top"><div className="bot-avatar"><Icon name="auto_awesome" size={21} filled /></div><div><strong>مشاور تحصیل‌یار</strong><span>پرسش {step + 1} از {plannerSteps.length}</span></div></div><div className="planner-chat-question"><span className="step-label">{current.eyebrow}</span><h2>{current.question}</h2><textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="پاسخت را آزاد و با جزئیات بنویس..." autoFocus />{step === plannerSteps.length - 1 && <><span className="step-label range-label">بازهٔ برنامه</span><div className="range-picker compact">{rangeOptions.map((option) => <button key={option.value} className={planRange === option.value ? "selected" : ""} onClick={() => onPlanRangeChange(option.value)}>{option.label}</button>)}</div></>}<div className="wizard-actions"><button className="back-button" disabled={step === 0 || isGenerating} onClick={() => onAnswer("")}><Icon name="arrow_forward" size={18} />قبلی</button><button className="primary-button" disabled={!draft.trim() || isGenerating} onClick={() => { onAnswer(draft.trim()); onNext(draft.trim()); }}>{isGenerating ? "در حال ساخت برنامه..." : step === plannerSteps.length - 1 ? "ساخت برنامهٔ من" : "ادامه"}<Icon name="arrow_back" size={18} /></button></div></div></div><div className="dna-card"><div className="dna-card-head"><div><p className="eyebrow">رویکرد مشاور</p><h2>فقط تأیید نمی‌کنم</h2></div></div><div className="empty-dna-state"><Icon name="psychology" size={27} /><span>همهٔ دروس رشته در برنامه بررسی می‌شوند؛ درس‌های منتخب تو فقط اولویت و سهم بیشتری می‌گیرند.</span></div></div></div></div>;
}
function ProgressScreen({ plan, completed }: { plan: GeneratedPlan | null; completed: number[] }) {
  const sessions = plan?.sessions ?? [];
  const progress = sessions.length ? Math.round((completed.length / sessions.length) * 100) : 0;
  return <div className="screen progress-screen"><div className="screen-heading-row"><div><p className="eyebrow">گزارش مسیر تو</p><h1>پیشرفتت را <em>واقعی</em> ببین.</h1><p className="section-subtitle">هیچ عددی بدون ثبت فعالیت تو نمایش داده نمی‌شود.</p></div></div>{sessions.length ? <><section className="progress-overview"><div className="big-progress-card card"><div className="big-progress-copy"><span className="soft-icon mint"><Icon name="trending_up" size={20} /></span><p>پیشرفت ثبت‌شده</p><strong>{progress}<span>%</span></strong><small>{completed.length} از {sessions.length} جلسه انجام شده</small></div><div className="donut-chart" style={{ background: `conic-gradient(var(--turquoise) ${progress * 3.6}deg, #e9f2ef 0deg)` }}><div><strong>{progress}٪</strong><span>بر اساس داده</span></div></div></div><div className="dna-progress-card card"><div className="card-head"><span><p className="eyebrow">الگوی یادگیری</p><h3>Academic DNA</h3></span></div><div className="empty-dna-state"><Icon name="insights" size={27} /><span>برای تحلیل دقیق‌تر، سابقهٔ بیشتری از جلسه‌های واقعی لازم است.</span></div></div></section><div className="section-heading compact-heading"><div><p className="eyebrow">ثبت‌های واقعی</p><h2>جلسه‌های انجام‌شده</h2></div><span className="count-badge">{completed.length} جلسه</span></div><section className="completed-list">{sessions.filter((session, index) => completed.includes(session.id ?? index)).map((session, index) => <div className="completed-row" key={`${session.subject}-${index}`}><span className="completed-check"><Icon name="check" size={16} /></span><div><strong>{lessonName(session.subject)} <small className="lesson-code">{lessonCode(session.subject)}</small></strong><span>{session.topic}</span></div><span className="session-duration">{session.duration}</span><Icon name="chevron_left" size={19} /></div>)}</section></> : <EmptyState icon="insights" title="هنوز داده‌ای برای پیشرفت وجود ندارد" description="پس از ثبت اطلاعات دقیق و ساخت برنامه، فقط فعالیت‌های واقعی تو در این صفحه نمایش داده می‌شود." />}</div>;
}

function ScheduleScreen({ plan, completed, onToggle, showToast, deviceDate, onAddCalendar }: { plan: GeneratedPlan | null; completed: number[]; onToggle: (session: PlanSession, index: number) => void; showToast: (text: string) => void; deviceDate: string; onAddCalendar: () => void }) {
  const today = new Date();
  const todayIndex = (today.getDay() + 1) % 7;
  const weekNames = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
  const weekDays = weekNames.map((day, index) => { const date = new Date(today); date.setDate(today.getDate() + index - todayIndex); return { day, number: new Intl.DateTimeFormat("fa-IR-u-ca-persian", { day: "numeric" }).format(date) }; });
  const [selectedDay, setSelectedDay] = useState(weekNames[todayIndex]);
  const allSessions = plan?.sessions ?? [];
  const sessions = allSessions.filter((session) => !session.day || session.day === selectedDay);
  return <div className="screen schedule-screen"><div className="screen-heading-row"><div><p className="eyebrow">تقویم مطالعه</p><h1>برنامهٔ <em>درسی</em> تو.</h1><p className="section-subtitle">{deviceDate} · زمان محلی گوشی</p></div><div className="schedule-actions"><span className="device-date-label"><Icon name="schedule" size={16} />{getDeviceTimeZone()}</span><button className="primary-button schedule-add" disabled={!allSessions.length} onClick={onAddCalendar}><Icon name="calendar_month" size={18} />افزودن به تقویم</button></div></div><div className="week-strip">{weekDays.map((item, index) => <button onClick={() => setSelectedDay(item.day)} className={`${selectedDay === item.day ? "today" : ""} ${index === todayIndex ? "current-day" : ""}`} key={item.day}><small>{item.day}</small><strong>{item.number}</strong>{index === todayIndex && <i />}</button>)}</div>{plan?.focusTip && <div className="schedule-note"><span className="soft-icon blue"><Icon name="auto_awesome" size={19} filled /></span><p><strong>نکتهٔ ساخته‌شده از داده‌های تو</strong><span>{plan.focusTip}</span></p><Icon name="chevron_left" size={18} /></div>}{sessions.length ? <section className="schedule-timeline">{sessions.map((session, index) => { const globalIndex = allSessions.indexOf(session); return <div className="timeline-item" key={`${session.subject}-${globalIndex}`}><div className="timeline-time"><strong>{session.start}</strong><span>{session.duration}</span></div><div className={`timeline-line ${index === 0 ? "active" : ""}`}><i /></div><div className={`schedule-session card ${index === 0 ? "active-card" : ""}`}><div className={`subject-dot ${index % 3 === 0 ? "mint" : index % 3 === 1 ? "blue" : "lavender"}`}><Icon name="menu_book" size={18} /></div><div className="session-info"><strong>{lessonName(session.subject)} <small className="lesson-code">{lessonCode(session.subject)}</small></strong><span>{session.topic}</span><small><Icon name="schedule" size={14} />{session.duration}</small></div><button className={`session-action ${completed.includes(session.id ?? globalIndex) ? "done-small" : index === 0 ? "primary-small" : "ghost-small"}`} onClick={() => { if (!canStartSession(session)) { showToast("این جلسه تا زمان شروع قفل است."); return; } onToggle(session, globalIndex); if (!completed.includes(session.id ?? globalIndex)) showToast("جلسهٔ واقعی ثبت شد."); }}>{!canStartSession(session) ? <><Icon name="lock" size={16} />قفل</> : completed.includes(session.id ?? globalIndex) ? <><Icon name="check_circle" size={17} filled />انجام شد</> : index === 0 ? <><Icon name="play_arrow" size={17} />شروع جلسه</> : "در انتظار"}</button></div></div>; })}</section> : <EmptyState icon="calendar_month" title="برای این روز جلسه‌ای ثبت نشده" description={allSessions.length ? "روز دیگری را از نوار هفته انتخاب کن تا جلسه‌های همان روز را ببینی." : "تا وقتی برنامه‌ای بر اساس اطلاعات واقعی تو ساخته نشود، جلسه یا رویدادی در اینجا نمایش داده نمی‌شود."} />}</div>;
}

function ProfileScreen({ user, completed, onUpdateUser, onLogout, showToast }: { user: UserProfile; completed: number[]; onUpdateUser: (user: UserProfile) => void; onLogout: () => void; showToast: (text: string) => void }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [editing, setEditing] = useState(false);
  const saveProfile = trpc.profile.save.useMutation({ onSuccess: (saved) => { const updated = { ...user, name: saved?.name || name.trim(), email: saved?.email || email.trim() }; onUpdateUser(updated); setEditing(false); showToast("اطلاعات شخصی با موفقیت ذخیره شد."); }, onError: () => showToast("ذخیرهٔ اطلاعات انجام نشد؛ دوباره تلاش کن.") });
  const settings = [{ icon: "person_outline" as IconName, title: "اطلاعات شخصی", sub: "اطلاعات ثبت‌شدهٔ حساب" }, { icon: "notifications" as IconName, title: "یادآوری‌ها", sub: "هنوز یادآوری‌ای ثبت نشده است" }, { icon: "dark_mode" as IconName, title: "ظاهر برنامه", sub: "روشن · حالت آرام" }, { icon: "help" as IconName, title: "راهنما و پشتیبانی", sub: "پرسش‌های متداول" }];
  const answers = Object.entries(user.answers);
  return <div className="screen profile-screen"><div className="profile-hero"><div className="profile-avatar-large">{getInitial(user.name)}</div><div><p className="eyebrow">پروفایل من</p><h1>{user.name || "نام ثبت نشده"}</h1><p>{user.email || "ایمیل ثبت نشده"}</p></div><button className="edit-profile" onClick={() => setEditing((value) => !value)}><Icon name="edit" size={17} />{editing ? "بستن" : "ویرایش"}</button></div>{editing && <div className="profile-edit-card card"><label>نام و نام خانوادگی<input value={name} onChange={(event) => setName(event.target.value)} /></label><label>ایمیل<input type="email" dir="ltr" value={email} onChange={(event) => setEmail(event.target.value)} /></label><button className="primary-button" disabled={saveProfile.isPending || name.trim().length < 2} onClick={() => saveProfile.mutate({ name: name.trim(), email: email.trim() || undefined, answers: user.answers })}>{saveProfile.isPending ? "در حال ذخیره..." : "ذخیرهٔ تغییرات"}<Icon name="check" size={18} /></button></div>}<div className="profile-grid"><div className="profile-summary card"><div className="card-head"><span><p className="eyebrow">اطلاعات واقعی</p><h3>پروفایل تحصیلی</h3></span><span className="soft-icon mint"><Icon name="person_outline" size={20} /></span></div>{answers.length ? <div className="profile-answer-list">{answers.map(([key, value]) => <div key={key}><span>{key}</span><strong>{value}</strong></div>)}</div> : <div className="card-empty-copy"><strong>اطلاعات تحصیلی ثبت نشده</strong><span>برای تکمیل پروفایل، به برنامه‌ریزی برو.</span></div>}<div className="profile-recorded-count">{completed.length} جلسهٔ واقعی ثبت شده</div></div><div className="profile-settings card"><p className="eyebrow">تنظیمات حساب</p><h3>کنترل اطلاعات خودت</h3>{settings.map((setting) => <button className="setting-row" key={setting.title} onClick={() => showToast(`${setting.title}: ${setting.sub}`)}><span className="setting-icon"><Icon name={setting.icon} size={19} /></span><span><strong>{setting.title}</strong><small>{setting.sub}</small></span><Icon name="chevron_left" size={19} /></button>)}<button className="logout-button" onClick={onLogout}><Icon name="logout" size={18} />خروج از حساب</button></div></div></div>;
}

export default function App() { return <ThemeProvider defaultTheme="light" switchable><AppShell /></ThemeProvider>; }
