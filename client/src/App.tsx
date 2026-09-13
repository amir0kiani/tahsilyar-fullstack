import { trpc } from "@/lib/trpc";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect, useMemo, useRef, useState } from "react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import "./index.css";

type Screen = "home" | "planning" | "companion" | "progress" | "schedule" | "profile";
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
type CalendarItem = { subject: string; topic: string; start: string; end: string; duration?: string; reason?: string };
type UserProfile = { name: string; email: string; answers: Record<string, string> };

const getTimeGreeting = (hour = new Date().getHours()) => hour < 12 ? "صبح بخیر" : hour < 17 ? "ظهر بخیر" : hour < 21 ? "عصر بخیر" : "شب بخیر";

type PlannerStep = { title: string; eyebrow: string; question: string; options: string[] };

const plannerSteps: PlannerStep[] = [
  { title: "بازهٔ زمانی", eyebrow: "قدم اول", question: "در روزهای مطالعه چقدر زمان برای درس خواندن داری؟", options: ["۲ تا ۴ ساعت", "۴ تا ۶ ساعت", "۶ تا ۸ ساعت", "بیشتر از ۸ ساعت"] },
  { title: "زمان مطالعه", eyebrow: "قدم دوم", question: "چه ساعتی بیشترین تمرکز را داری؟", options: ["صبح‌ها", "بعدازظهرها", "شب‌ها"] },
  { title: "پایه و رشته", eyebrow: "قدم سوم", question: "مسیر تحصیلی‌ات را انتخاب کن", options: ["دهم تجربی", "یازدهم تجربی", "دوازدهم تجربی", "دهم ریاضی", "یازدهم ریاضی", "دوازدهم ریاضی", "دهم انسانی", "یازدهم انسانی", "دوازدهم انسانی"] },
  { title: "امتحان پیشرو", eyebrow: "قدم چهارم", question: "برای کدام هدف برنامه‌ریزی کنیم؟", options: ["کنکور", "امتحان نهایی", "هر دو"] },
  { title: "دروس اولویت‌دار", eyebrow: "قدم پنجم", question: "کدام درس‌ها برایت اولویت بیشتری دارند؟", options: [] },
  { title: "دروس حذفی", eyebrow: "قدم ششم", question: "برای امروز چه درسی را کنار بگذاریم؟", options: ["فعلاً هیچ‌کدام", "درس‌های مرورشده", "یک درس کم‌اهمیت"] },
  { title: "سطح انرژی", eyebrow: "قدم هفتم", question: "امروز حال و انرژی‌ات چطور است؟", options: ["پرانرژی‌ام", "معمولی", "کمی خسته‌ام"] },
];

const navItems: { id: Screen; label: string; icon: IconName }[] = [
  { id: "home", label: "خانه", icon: "home" },
  { id: "planning", label: "برنامه‌ریزی", icon: "event_note" },
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
const buildCalendarIcs = (items: CalendarItem[], title: string, baseDate = new Date()) => {
  const stamp = icsTimestamp(new Date());
  const events = items.map((item, index) => [
    "BEGIN:VEVENT",
    `UID:tahsilyar-${Date.now()}-${index}@tahsilyar.app`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${icsTimestamp(localDateTime(baseDate, item.start))}`,
    `DTEND:${icsTimestamp(localDateTime(baseDate, item.end))}`,
    `SUMMARY:${escapeIcs(`${item.subject} · مطالعه`)}`,
    `DESCRIPTION:${escapeIcs([item.topic, item.duration, item.reason].filter(Boolean).join(" · "))}`,
    "END:VEVENT",
  ].join("\r\n"));
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//TahsilYar//Study Plan//FA", "CALSCALE:GREGORIAN", `X-WR-CALNAME:${escapeIcs(title)}`, ...events, "END:VCALENDAR", ""].join("\r\n");
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
    <div className="logo-mark" aria-label="لوگوی تحصیل یار"><svg viewBox="0 0 64 64" role="img" aria-hidden="true">
      <path className="book-back" d="M9 17c9-4 17-3 23 2v34c-7-5-15-6-23-2V17Z" /><path className="book-front" d="M55 17c-9-4-17-3-23 2v34c7-5 15-6 23-2V17Z" /><path className="book-line" d="M32 19v34M13 24c6-2 12-1 18 3M51 24c-6-2-12-1-18 3" /><circle className="person-head" cx="32" cy="13" r="5" /><path className="person-body" d="M24 20c2-3 5-4 8-4s6 1 8 4l-3 4H27l-3-4Z" />
    </svg></div>
    {!compact && <div className="brand-copy"><strong>تحصیل‌یار</strong><span>یادگیری با آرامش</span></div>}
  </div>;
}

function Signup({ onSignup, onLogin }: { onSignup: (profile: Pick<UserProfile, "name" | "email">) => void; onLogin: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = name.trim().length > 1 && email.includes("@") && password.length >= 6;
  return <main className="auth-page" dir="rtl">
    <div className="auth-decoration auth-decoration-one" /><div className="auth-decoration auth-decoration-two" />
    <div className="auth-panel auth-brand-panel"><div className="auth-brand-top"><LogoMark /></div><div className="auth-illustration"><div className="illustration-glow" /><LogoMark compact /><div className="floating-pill pill-one"><Icon name="auto_awesome" size={15} />یادگیری هوشمند</div><div className="floating-pill pill-two"><Icon name="favorite" size={15} filled />با آرامش پیش برو</div></div><div className="auth-brand-copy"><p className="eyebrow">همراه مسیر موفقیت تو</p><h1>هر روز، یک قدم<br /><em>نزدیک‌تر به رؤیاهایت.</em></h1><p>تحصیل‌یار اطلاعاتت را از خودت می‌گیرد و فقط بر اساس مسیر واقعی تو برنامه می‌سازد.</p></div><div className="auth-quote"><span>“</span><p>موفقیت، جمع قدم‌های کوچک و پیوسته است.</p></div></div>
    <div className="auth-panel auth-form-panel"><div className="mobile-logo"><LogoMark /></div><div className="auth-form-wrap"><div className="form-heading"><p className="eyebrow">شروع یک مسیر تازه</p><h2>حساب کاربری بساز</h2><p>برای شروع، اطلاعات پایه‌ات را وارد کن. هیچ اطلاعات تحصیلی از قبل ثبت نشده است.</p></div><form className="signup-form" onSubmit={(event) => { event.preventDefault(); if (canSubmit) onSignup({ name: name.trim(), email: email.trim() }); }}>
      <label>نام و نام خانوادگی<span>*</span><div className="input-shell"><Icon name="person_outline" size={21} /><input value={name} onChange={(event) => setName(event.target.value)} placeholder="نام و نام خانوادگی" /></div></label>
      <label>ایمیل<span>*</span><div className="input-shell"><Icon name="mail" size={21} /><input type="email" dir="ltr" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="email@example.com" /></div></label>
      <label>رمز عبور<span>*</span><div className="input-shell"><Icon name="lock" size={21} /><input type="password" dir="ltr" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="حداقل ۶ کاراکتر" /></div><small>رمز عبورت باید حداقل ۶ کاراکتر داشته باشد.</small></label>
      <button className="primary-button signup-button" type="submit" disabled={!canSubmit}>ساخت حساب و شروع <Icon name="arrow_back" size={19} /></button>
    </form><button className="back-button" type="button" onClick={onLogin}>ورود با حساب کاربری</button><div className="secure-note"><Icon name="lock" size={15} /> اطلاعاتت نزد تحصیل‌یار امن می‌ماند.</div></div></div>
  </main>;
}

function AppShell() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [screen, setScreen] = useState<Screen>("planning");
  const [plannerStep, setPlannerStep] = useState(0);
  const [plannerAnswers, setPlannerAnswers] = useState<Record<number, string>>({});
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
  const showToast = (text: string) => { setToast(text); window.setTimeout(() => setToast(""), 2400); };
  const navigate = (next: Screen) => { setScreen(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const currentPlanner = useMemo(() => plannerStep === 4
    ? { ...plannerSteps[plannerStep], options: subjectOptionsForTrack(plannerAnswers[2] || "دوازدهم تجربی") }
    : plannerSteps[plannerStep], [plannerStep, plannerAnswers]);

  if (!user) return <Signup onSignup={(profile) => { localStorage.setItem("tahsilyar-registration-draft", JSON.stringify(profile)); startLogin(); }} onLogin={startLogin} />;

  const handlePlannerNext = () => {
    if (!plannerAnswers[plannerStep]) { showToast("برای ادامه باید این پاسخ را از خودت ثبت کنی."); return; }
    if (plannerStep < plannerSteps.length - 1) { setPlannerStep((step) => step + 1); return; }
    if (!auth.isAuthenticated) { showToast("برای ذخیرهٔ پروفایل و ساخت برنامه، ابتدا وارد حساب کاربری شو."); startLogin(); return; }
    const answers = Object.fromEntries(Object.entries(plannerAnswers).map(([index, answer]) => [plannerSteps[Number(index)]?.title ?? index, answer]));
    planMutation.mutate({ answers, deviceDate: deviceDateLabel, timezone: deviceTimeZone }, {
      onSuccess: (plan) => {
        const nextPlan = plan as GeneratedPlan;
        setUser((current) => current ? { ...current, answers } : current);
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
    chatMutation.mutate({ message: value, deviceDate: deviceDateLabel, timezone: deviceTimeZone }, {
      onSuccess: (result) => setMessages((old) => [...old, { from: "bot", text: result.text }]),
      onError: () => setMessages((old) => [...old, { from: "bot", text: "پاسخ آماده نشد. اطلاعاتت را بررسی کن و دوباره تلاش کن." }]),
    });
  };

  const toggleSession = (session: PlanSession, fallbackIndex: number) => {
    const key = session.id ?? fallbackIndex;
    const nextCompleted = !completed.includes(key);
    setCompleted((old) => nextCompleted ? [...old, key] : old.filter((item) => item !== key));
    if (session.id) sessionStatusMutation.mutate({ sessionId: session.id, completed: nextCompleted }, { onError: () => { setCompleted((old) => nextCompleted ? old.filter((item) => item !== key) : [...old, key]); showToast("وضعیت جلسه ذخیره نشد؛ دوباره تلاش کن."); } });
  };

  const calendarItems: CalendarItem[] = generatedPlan?.sessions?.map(({ subject, topic, start, end, duration, reason }) => ({ subject, topic, start, end, duration, reason })) ?? [];
  const addCurrentPlanToCalendar = async () => {
    try { showToast("در حال آماده‌سازی فایل تقویم..."); showToast(await addSessionsToDeviceCalendar(calendarItems, generatedPlan?.title || "برنامهٔ ثبت‌شدهٔ تحصیل‌یار")); }
    catch { showToast("برای افزودن به تقویم، ابتدا یک برنامهٔ واقعی بساز."); }
  };
  const userName = user.name || "کاربر";
  const userGrade = user.answers["پایه و رشته"] || "ثبت نشده";
  return <div className="app-frame" dir="rtl"><aside className="sidebar"><div className="sidebar-logo"><LogoMark /></div><div className="sidebar-greeting"><span>فضای شخصی تو</span><strong>{userName}</strong></div><nav className="main-nav"><p className="nav-label">منوی اصلی</p>{navItems.map((item) => <button key={item.id} className={`nav-item ${screen === item.id ? "active" : ""}`} onClick={() => navigate(item.id)}><Icon name={item.icon} size={21} filled={screen === item.id} /><span>{item.label}</span>{item.id === "companion" && <i className="nav-dot" />}</button>)}</nav><div className="sidebar-bottom"><div className="mini-support"><div className="support-icon"><Icon name="favorite" size={18} filled /></div><div><strong>اطلاعاتت را کامل کن</strong><span>تا پاسخ دقیق بگیری</span></div><Icon name="arrow_back" size={16} /></div><button className="profile-mini" onClick={() => navigate("profile")}><span className="avatar">{getInitial(user.name)}</span><span><strong>{userName}</strong><small>{userGrade}</small></span><Icon name="more_horiz" size={20} /></button></div></aside>
    <main className="main-area"><header className="topbar"><div className="topbar-mobile-logo"><LogoMark compact /></div><div className="breadcrumbs"><span>تحصیل‌یار</span><Icon name="chevron_left" size={17} /><strong>{navItems.find((item) => item.id === screen)?.label}</strong></div><div className="topbar-actions"><button className="icon-button" aria-label="تغییر حالت شب" onClick={toggleTheme}><Icon name={theme === "dark" ? "dark_mode" : "light_mode"} size={21} filled /></button><button className="icon-button notification-button" onClick={() => showToast("هنوز یادآوری ثبت نشده است.")}><Icon name="notifications" size={21} filled /></button><button className="user-chip" onClick={() => navigate("profile")}><span className="avatar">{getInitial(user.name)}</span><span>{userName}</span><Icon name="expand_more" size={18} /></button></div></header><div className="page-content">
      {screen === "home" && <HomeScreen navigate={navigate} userName={userName} plan={generatedPlan} completed={completed} onComplete={toggleSession} showToast={showToast} deviceDate={deviceDateLabel} />}
      {screen === "planning" && <PlanningScreen step={plannerStep} current={currentPlanner} answers={plannerAnswers} onAnswer={(answer) => setPlannerAnswers((old) => {
        if (plannerStep === 2) return { ...old, [plannerStep]: answer, 4: "" };
        if (plannerStep === 4) {
          const selected = selectedSubjects(old[plannerStep] || "");
          const next = selected.includes(answer) ? selected.filter((item) => item !== answer) : [...selected, answer];
          return { ...old, [plannerStep]: next.join("، ") };
        }
        return { ...old, [plannerStep]: answer };
      })} onNext={handlePlannerNext} onBack={() => plannerStep > 0 && setPlannerStep((step) => step - 1)} isGenerating={planMutation.isPending} />}
      {screen === "companion" && <CompanionScreen messages={messages} input={chatInput} setInput={setChatInput} onSend={sendMessage} isSending={chatMutation.isPending} hasProfile={answeredProfile} />}
      {screen === "progress" && <ProgressScreen plan={generatedPlan} completed={completed} />}
      {screen === "schedule" && <ScheduleScreen plan={generatedPlan} completed={completed} onToggle={toggleSession} showToast={showToast} deviceDate={deviceDateLabel} onAddCalendar={addCurrentPlanToCalendar} />}
      {screen === "profile" && <ProfileScreen user={user} completed={completed} onUpdateUser={(updated) => setUser(updated)} onLogout={() => { void auth.logout(); setUser(null); setGeneratedPlan(null); setPlannerAnswers({}); setCompleted([]); setMessages([]); }} showToast={showToast} />}
    </div><nav className="bottom-nav">{navItems.slice(0, 5).map((item) => <button key={item.id} className={screen === item.id ? "active" : ""} onClick={() => navigate(item.id)}><Icon name={item.icon} size={22} filled={screen === item.id} /><span>{item.label}</span></button>)}</nav></main>{toast && <div className="toast"><Icon name="check_circle" size={19} filled />{toast}</div>}</div>;
}

function EmptyState({ icon = "event_note", title, description, action, onAction }: { icon?: IconName; title: string; description: string; action?: string; onAction?: () => void }) {
  return <div className="empty-state card"><span className="empty-state-icon"><Icon name={icon} size={28} /></span><h3>{title}</h3><p>{description}</p>{action && onAction && <button className="primary-button" onClick={onAction}>{action}<Icon name="arrow_back" size={17} /></button>}</div>;
}

function HomeScreen({ navigate, userName, plan, completed, onComplete, showToast, deviceDate }: { navigate: (screen: Screen) => void; userName: string; plan: GeneratedPlan | null; completed: number[]; onComplete: (session: PlanSession, index: number) => void; showToast: (text: string) => void; deviceDate: string }) {
  const sessions = plan?.sessions?.map((session, index) => ({ ...session, id: session.id ?? index, time: `${session.start} — ${session.end}`, color: index % 3 === 0 ? "mint" : index % 3 === 1 ? "blue" : "lavender", status: index === 0 ? "next" : "pending" })) ?? [];
  const progress = sessions.length ? Math.round((completed.length / sessions.length) * 100) : 0;
  return <div className="screen home-screen"><section className="welcome-row"><div><p className="eyebrow">{deviceDate}</p><h1>{getTimeGreeting()} <em>{userName}</em></h1><p className="section-subtitle">این صفحه فقط با داده‌های ثبت‌شدهٔ خودت پر می‌شود.</p></div></section><section className="hero-card"><div className="hero-content"><div className="hero-icon"><Icon name="auto_awesome" size={24} filled /></div><p className="hero-kicker">وضعیت برنامهٔ تو</p><h2>{plan ? plan.title : "هنوز برنامه‌ای ساخته نشده"}</h2><p>{plan?.summary || "اطلاعات تحصیلی‌ات را کامل کن تا برنامه‌ای واقعی و متناسب با خودت ساخته شود."}</p><button className="light-button" onClick={() => navigate("planning")}>{plan ? "ویرایش اطلاعات" : "شروع جمع‌آوری اطلاعات"} <Icon name="arrow_back" size={18} /></button></div><div className="hero-orbit"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-book"><LogoMark compact /></div></div></section><div className="section-heading"><div><p className="eyebrow">وضعیت امروز</p><h2>برنامهٔ امروز</h2></div><button className="text-button" onClick={() => navigate("schedule")}>مشاهده تقویم <Icon name="arrow_back" size={16} /></button></div><section className="dashboard-grid"><div className="today-card card"><div className="card-head"><span className="soft-icon mint"><Icon name="timer" size={20} /></span><span className="status-tag">دادهٔ ثبت‌شده</span></div>{sessions.length ? <><div className="today-stat"><strong>{completed.length}</strong><span>از {sessions.length} جلسه انجام شده</span></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><div className="card-foot"><span>{progress}% تکمیل بر اساس جلسات ثبت‌شده</span><Icon name="trending_up" size={17} /></div></> : <div className="card-empty-copy"><strong>هنوز جلسه‌ای وجود ندارد</strong><span>بعد از ساخت برنامه، پیشرفت واقعی اینجا نمایش داده می‌شود.</span></div>}</div><div className="exam-card card"><div className="card-head"><span className="soft-icon blue"><Icon name="target" size={20} /></span><span className="muted-label">آزمون پیشرو</span></div><div className="card-empty-copy"><strong>{plan?.sessions?.length ? "تاریخ آزمون ثبت نشده" : "هنوز ثبت نشده"}</strong><span>برای نمایش شمارش معکوس، تاریخ دقیق آزمون را وارد کن.</span></div></div></section><div className="section-heading compact-heading"><div><p className="eyebrow">بر اساس داده‌های تو</p><h2>جلسه‌های بعدی</h2></div><button className="text-button" onClick={() => navigate("schedule")}>تقویم <Icon name="arrow_back" size={16} /></button></div>{sessions.length ? <section className="session-list">{sessions.map((session) => <article className={`session-row ${session.id === 0 ? "highlighted" : ""}`} key={`${session.subject}-${session.id}`}><div className={`subject-dot ${session.color}`}><Icon name="menu_book" size={18} /></div><div className="session-info"><strong>{session.subject}</strong><span>{session.topic}</span></div><div className="session-time"><strong>{session.time}</strong><span>{session.duration}</span></div><button className={`session-action ${session.status === "next" ? "primary-small" : "ghost-small"}`} onClick={() => session.status === "next" ? onComplete(session, session.id) : showToast("این جلسه هنوز شروع نشده است.")}>{session.status === "next" ? <><Icon name={completed.includes(session.id) ? "check_circle" : "play_arrow"} size={17} filled={completed.includes(session.id)} />{completed.includes(session.id) ? "انجام شد" : "شروع جلسه"}</> : "در انتظار"}</button></article>)}</section> : <EmptyState icon="menu_book" title="جلسه‌ای برای نمایش وجود ندارد" description="تا وقتی اطلاعات دقیق و برنامهٔ واقعی ثبت نشود، این بخش خالی می‌ماند." action="تکمیل برنامه‌ریزی" onAction={() => navigate("planning")} />}</div>;
}

function PlanningScreen({ step, current, answers, onAnswer, onNext, onBack, isGenerating }: { step: number; current: PlannerStep; answers: Record<number, string>; onAnswer: (answer: string) => void; onNext: () => void; onBack: () => void; isGenerating: boolean }) {
  const multiSelect = step === 4;
  const isSelected = (option: string) => multiSelect ? selectedSubjects(answers[step] || "").includes(option) : answers[step] === option;
  return <div className="screen planner-screen"><div className="planner-header"><div><p className="eyebrow">ساخت برنامهٔ شخصی</p><h1>برنامه‌ریزی با <em>تو</em> شروع می‌شود.</h1><p className="section-subtitle">تا زمانی که پاسخ دقیق ندهی، هیچ برنامه‌ای از طرف تحصیل‌یار ساخته نمی‌شود.</p></div><div className="planner-badge"><Icon name="auto_awesome" size={18} filled /><span>جمع‌آوری اطلاعات</span></div></div><div className="wizard-progress">{plannerSteps.map((item, index) => <div key={item.title} className={`wizard-dot ${index === step ? "current" : ""} ${index < step ? "done" : ""}`}><span>{index < step ? <Icon name="done" size={14} /> : index + 1}</span><small>{item.title}</small></div>)}</div><div className="planner-card"><div className="planner-card-side"><div className="planner-side-icon"><Icon name="psychology" size={38} /></div><p>پاسخ‌های واقعی تو تنها منبع ساخت برنامه هستند.</p><div className="planner-side-tip"><Icon name="favorite" size={17} filled /><span>{multiSelect ? "دروس انتخابی اولویت می‌گیرند؛ سایر دروس رشته هم در برنامه بررسی می‌شوند." : "اگر اطلاعاتی نداری، گزینه‌ای را حدس نزن."}</span></div></div><div className="planner-question"><span className="step-label">{current.eyebrow} <b>۰{step + 1}</b></span><h2>{current.question}</h2><div className="option-list">{current.options.map((option) => { const selected = isSelected(option); return <button key={option} className={`option-item ${selected ? "selected" : ""}`} onClick={() => onAnswer(option)}><span className="option-radio">{selected && <i />}</span><span>{option}</span><Icon name={selected ? "check_circle" : "chevron_left"} size={20} filled={selected} /></button>; })}</div><div className="wizard-actions"><button className="back-button" onClick={onBack} disabled={step === 0}><Icon name="arrow_forward" size={18} />قبلی</button><button className="primary-button" onClick={onNext} disabled={isGenerating}>{isGenerating ? "در حال بررسی اطلاعات..." : step === plannerSteps.length - 1 ? "ساخت برنامهٔ من" : "ادامه"}<Icon name="arrow_back" size={18} /></button></div></div></div></div>;
}

function CompanionScreen({ messages, input, setInput, onSend, isSending, hasProfile }: { messages: ChatMessage[]; input: string; setInput: (value: string) => void; onSend: () => void; isSending: boolean; hasProfile: boolean }) {
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [messages, isSending]);
  return <div className="screen companion-screen"><div className="companion-heading"><div><p className="eyebrow">همراه هوشمند تو</p><h1>پاسخ‌ها بر اساس <em>تو</em>.</h1><p className="section-subtitle">بدون اطلاعات کامل، همراه هوشمند برنامه یا تحلیل حدسی ارائه نمی‌کند.</p></div><div className="online-status"><i />آمادهٔ دریافت اطلاعات</div></div><div className="companion-layout"><div className="chat-card"><div className="chat-top"><div className="bot-avatar"><Icon name="auto_awesome" size={21} filled /></div><div><strong>همراه تحصیل‌یار</strong><span>پاسخ‌گوی آموزشی بر اساس پروفایل تو</span></div><button className="icon-button"><Icon name="more_horiz" size={20} /></button></div><div className="chat-body">{!hasProfile && <div className="empty-chat-state"><Icon name="lock" size={25} /><strong>اطلاعات تحصیلی هنوز کامل نیست</strong><span>ابتدا هفت پاسخ برنامه‌ریزی را از خودت ثبت کن؛ تا آن زمان پیامی از طرف سیستم ساخته نمی‌شود.</span></div>}{hasProfile && !messages.length && <div className="empty-chat-state"><Icon name="auto_awesome" size={25} /><strong>هنوز گفت‌وگویی شروع نشده است</strong><span>سؤال خودت را بنویس تا فقط بر اساس اطلاعات ثبت‌شده پاسخ بگیری.</span></div>}{messages.map((message, index) => <div className={`message-line ${message.from}`} key={`${message.text}-${index}`}><div className="message-bubble">{message.text}</div><span>{message.from === "bot" ? "همین حالا" : "ارسال شد"}</span></div>)}{isSending && <div className="message-line bot"><div className="message-bubble typing-bubble">در حال بررسی اطلاعات ثبت‌شده...</div></div>}<div ref={chatEndRef} /></div><div className="chat-input"><input disabled={!hasProfile || isSending} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && onSend()} placeholder={hasProfile ? "سؤال خودت را بنویس..." : "ابتدا اطلاعات تحصیلی را کامل کن"} /><button onClick={onSend} disabled={!hasProfile || isSending}><Icon name="send" size={19} /></button></div></div><div className="dna-card"><div className="dna-card-head"><div><p className="eyebrow">پروفایل یادگیری</p><h2>Academic DNA</h2></div></div><div className="empty-dna-state"><Icon name="insights" size={27} /><span>{hasProfile ? "تحلیل Academic DNA پس از ثبت داده‌های کافی و سابقهٔ مطالعه نمایش داده می‌شود." : "برای تحلیل، ابتدا اطلاعات و سابقهٔ واقعی مطالعه لازم است."}</span></div></div></div></div>;
}

function ProgressScreen({ plan, completed }: { plan: GeneratedPlan | null; completed: number[] }) {
  const sessions = plan?.sessions ?? [];
  const progress = sessions.length ? Math.round((completed.length / sessions.length) * 100) : 0;
  return <div className="screen progress-screen"><div className="screen-heading-row"><div><p className="eyebrow">گزارش مسیر تو</p><h1>پیشرفتت را <em>واقعی</em> ببین.</h1><p className="section-subtitle">هیچ عددی بدون ثبت فعالیت تو نمایش داده نمی‌شود.</p></div></div>{sessions.length ? <><section className="progress-overview"><div className="big-progress-card card"><div className="big-progress-copy"><span className="soft-icon mint"><Icon name="trending_up" size={20} /></span><p>پیشرفت ثبت‌شده</p><strong>{progress}<span>%</span></strong><small>{completed.length} از {sessions.length} جلسه انجام شده</small></div><div className="donut-chart" style={{ background: `conic-gradient(var(--turquoise) ${progress * 3.6}deg, #e9f2ef 0deg)` }}><div><strong>{progress}٪</strong><span>بر اساس داده</span></div></div></div><div className="dna-progress-card card"><div className="card-head"><span><p className="eyebrow">الگوی یادگیری</p><h3>Academic DNA</h3></span></div><div className="empty-dna-state"><Icon name="insights" size={27} /><span>برای تحلیل دقیق‌تر، سابقهٔ بیشتری از جلسه‌های واقعی لازم است.</span></div></div></section><div className="section-heading compact-heading"><div><p className="eyebrow">ثبت‌های واقعی</p><h2>جلسه‌های انجام‌شده</h2></div><span className="count-badge">{completed.length} جلسه</span></div><section className="completed-list">{sessions.filter((session, index) => completed.includes(session.id ?? index)).map((session, index) => <div className="completed-row" key={`${session.subject}-${index}`}><span className="completed-check"><Icon name="check" size={16} /></span><div><strong>{session.subject}</strong><span>{session.topic}</span></div><span className="session-duration">{session.duration}</span><Icon name="chevron_left" size={19} /></div>)}</section></> : <EmptyState icon="insights" title="هنوز داده‌ای برای پیشرفت وجود ندارد" description="پس از ثبت اطلاعات دقیق و ساخت برنامه، فقط فعالیت‌های واقعی تو در این صفحه نمایش داده می‌شود." />}</div>;
}

function ScheduleScreen({ plan, completed, onToggle, showToast, deviceDate, onAddCalendar }: { plan: GeneratedPlan | null; completed: number[]; onToggle: (session: PlanSession, index: number) => void; showToast: (text: string) => void; deviceDate: string; onAddCalendar: () => void }) {
  const today = new Date();
  const todayIndex = (today.getDay() + 1) % 7;
  const weekNames = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
  const weekDays = weekNames.map((day, index) => { const date = new Date(today); date.setDate(today.getDate() + index - todayIndex); return { day, number: new Intl.DateTimeFormat("fa-IR-u-ca-persian", { day: "numeric" }).format(date) }; });
  const [selectedDay, setSelectedDay] = useState(weekNames[todayIndex]);
  const allSessions = plan?.sessions ?? [];
  const sessions = allSessions.filter((session) => !session.day || session.day === selectedDay);
  return <div className="screen schedule-screen"><div className="screen-heading-row"><div><p className="eyebrow">تقویم مطالعه</p><h1>برنامهٔ <em>درسی</em> تو.</h1><p className="section-subtitle">{deviceDate} · زمان محلی گوشی</p></div><div className="schedule-actions"><span className="device-date-label"><Icon name="schedule" size={16} />{getDeviceTimeZone()}</span><button className="primary-button schedule-add" disabled={!allSessions.length} onClick={onAddCalendar}><Icon name="calendar_month" size={18} />افزودن به تقویم</button></div></div><div className="week-strip">{weekDays.map((item, index) => <button onClick={() => setSelectedDay(item.day)} className={`${selectedDay === item.day ? "today" : ""} ${index === todayIndex ? "current-day" : ""}`} key={item.day}><small>{item.day}</small><strong>{item.number}</strong>{index === todayIndex && <i />}</button>)}</div>{plan?.focusTip && <div className="schedule-note"><span className="soft-icon blue"><Icon name="auto_awesome" size={19} filled /></span><p><strong>نکتهٔ ساخته‌شده از داده‌های تو</strong><span>{plan.focusTip}</span></p><Icon name="chevron_left" size={18} /></div>}{sessions.length ? <section className="schedule-timeline">{sessions.map((session, index) => { const globalIndex = allSessions.indexOf(session); return <div className="timeline-item" key={`${session.subject}-${globalIndex}`}><div className="timeline-time"><strong>{session.start}</strong><span>{session.duration}</span></div><div className={`timeline-line ${index === 0 ? "active" : ""}`}><i /></div><div className={`schedule-session card ${index === 0 ? "active-card" : ""}`}><div className={`subject-dot ${index % 3 === 0 ? "mint" : index % 3 === 1 ? "blue" : "lavender"}`}><Icon name="menu_book" size={18} /></div><div className="session-info"><strong>{session.subject}</strong><span>{session.topic}</span><small><Icon name="schedule" size={14} />{session.duration}</small></div><button className={`session-action ${completed.includes(session.id ?? globalIndex) ? "done-small" : index === 0 ? "primary-small" : "ghost-small"}`} onClick={() => { onToggle(session, globalIndex); if (!completed.includes(session.id ?? globalIndex)) showToast("جلسهٔ واقعی ثبت شد."); }}>{completed.includes(session.id ?? globalIndex) ? <><Icon name="check_circle" size={17} filled />انجام شد</> : index === 0 ? <><Icon name="play_arrow" size={17} />شروع جلسه</> : "در انتظار"}</button></div></div>; })}</section> : <EmptyState icon="calendar_month" title="برای این روز جلسه‌ای ثبت نشده" description={allSessions.length ? "روز دیگری را از نوار هفته انتخاب کن تا جلسه‌های همان روز را ببینی." : "تا وقتی برنامه‌ای بر اساس اطلاعات واقعی تو ساخته نشود، جلسه یا رویدادی در اینجا نمایش داده نمی‌شود."} />}</div>;
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
