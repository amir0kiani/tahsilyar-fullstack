import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { startLogin } from "@/const";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Activity, ArrowRight, BookOpenCheck, ClipboardCheck, FileQuestion,
  GraduationCap, LayoutDashboard, LockKeyhole, LogOut, Moon, RefreshCw,
  Search, ShieldCheck, Sun, Users,
} from "lucide-react";

const numberFormat = new Intl.NumberFormat("fa-IR");
const dateFormat = new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" });

function formatDate(value: string | Date | null | undefined) {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : dateFormat.format(date);
}

function AdminGate({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
  return (
    <main dir="rtl" className="min-h-screen bg-[var(--cream)] text-[var(--ink)] flex items-center justify-center p-5">
      <section className="w-full max-w-md rounded-3xl border border-[var(--line)] bg-[var(--white)] p-8 text-center shadow-[var(--shadow)]">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[var(--mint)] text-[var(--deep)]"><ShieldCheck size={27}/></div>
        <h1 className="mb-2 text-xl font-black">{title}</h1>
        <p className="mb-6 text-sm leading-7 text-[var(--ink-soft)]">{description}</p>
        {children}
      </section>
    </main>
  );
}

export default function AdminPanel() {
  const auth = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [search]);

  const isAdmin = auth.user?.role === "admin";
  const overview = trpc.admin.overview.useQuery(undefined, {
    enabled: isAdmin,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const users = trpc.admin.users.useQuery({ search: debouncedSearch }, {
    enabled: isAdmin,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (auth.loading) return <AdminGate title="در حال بررسی دسترسی" description="وضعیت ورود و مجوز حساب کاربری بررسی می‌شود…"/>;
  if (!auth.user) return <AdminGate title="ورود مدیر" description="برای ورود به پنل مدیریت، ابتدا با حساب کاربری مدیر وارد شو.">
    <button onClick={() => startLogin()} className="w-full rounded-xl bg-[var(--deep)] px-5 py-3 text-sm font-bold text-white">ورود امن</button>
    <a href="/" className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--ink-soft)]"><ArrowRight size={16}/> بازگشت به تحصیل‌یار</a>
  </AdminGate>;
  if (!isAdmin) return <AdminGate title="دسترسی غیرمجاز" description="این حساب کاربری مجوز ورود به پنل مدیریت را ندارد. اگر مدیر پروژه هستی، با حساب مالک پروژه وارد شو.">
    <a href="/" className="inline-flex items-center gap-2 rounded-xl bg-[var(--mint)] px-5 py-3 text-sm font-bold text-[var(--deep)]"><ArrowRight size={16}/> بازگشت به فضای دانش‌آموزی</a>
  </AdminGate>;

  const stats = overview.data;
  const statCards = [
    { label: "کل کاربران", value: stats?.totalUsers, icon: Users, note: "حساب‌های ثبت‌شده" },
    { label: "پروفایل‌های تحصیلی", value: stats?.studentProfiles, icon: GraduationCap, note: "اطلاعات ثبت‌شده دانش‌آموزان" },
    { label: "برنامه‌های مطالعاتی", value: stats?.studyPlans, icon: BookOpenCheck, note: "برنامه‌های ذخیره‌شده" },
    { label: "آزمون‌های انجام‌شده", value: stats?.examAttempts, icon: ClipboardCheck, note: "سوابق آزمون" },
    { label: "سؤال‌های فعال", value: stats?.activeQuestions, icon: FileQuestion, note: "بانک سؤال فعال" },
    { label: "مباحث آموزشی فعال", value: stats?.activeCurriculumItems, icon: Activity, note: "فهرست مباحث" },
  ];

  return (
    <main dir="rtl" className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1500px]">
        <aside className="hidden w-64 shrink-0 border-l border-[var(--line)] bg-[var(--white)] p-5 lg:flex lg:flex-col">
          <a href="/" className="mb-10 flex items-center gap-3">
            <img src={theme === "dark" ? "/owl-logo-night.png" : "/owl-logo-day.png"} alt="تحصیل‌یار" className="h-12 w-12 rounded-xl object-contain"/>
            <span><strong className="block text-lg font-black">تحصیل‌یار</strong><small className="text-xs text-[var(--ink-soft)]">مرکز مدیریت</small></span>
          </a>
          <p className="mb-3 px-3 text-[11px] font-bold text-[var(--ink-soft)]">مدیریت سامانه</p>
          <div className="flex items-center gap-3 rounded-xl bg-[var(--mint)] px-3 py-3 text-sm font-bold text-[var(--deep)]"><LayoutDashboard size={18}/> پیشخوان</div>
          <div className="mt-auto rounded-2xl border border-[var(--line)] p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold"><LockKeyhole size={15}/> دسترسی مدیر</div>
            <p className="text-xs leading-6 text-[var(--ink-soft)]">این بخش فقط با مجوز سمت سرور قابل استفاده است.</p>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--line)] bg-[var(--cream)]/90 px-5 py-4 backdrop-blur md:px-8">
            <div>
              <p className="mb-1 text-[11px] font-bold text-[var(--deep)]">TAHSILYAR · ADMIN</p>
              <h1 className="text-xl font-black md:text-2xl">پیشخوان مدیریت</h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleTheme?.()} className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--line)] bg-[var(--white)]" aria-label="تغییر پوسته">{theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}</button>
              <button onClick={() => { void overview.refetch(); void users.refetch(); }} className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--line)] bg-[var(--white)]" aria-label="به‌روزرسانی"><RefreshCw size={17}/></button>
              <button onClick={() => void auth.logout()} className="hidden items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-xs font-bold sm:flex"><LogOut size={15}/> خروج</button>
            </div>
          </header>

          <div className="space-y-7 p-5 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div><h2 className="text-lg font-extrabold">نمای کلی سامانه</h2><p className="mt-1 text-sm text-[var(--ink-soft)]">آمار از پایگاه داده تحصیل‌یار خوانده می‌شود.</p></div>
              <span className="rounded-full border border-[var(--line)] bg-[var(--white)] px-3 py-1.5 text-xs text-[var(--ink-soft)]">نمایش زنده · داده‌های ذخیره‌شده</span>
            </div>

            {overview.isError ? <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">دریافت آمار انجام نشد. اتصال پایگاه داده یا مجوز مدیر را بررسی کن.</div> : null}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {statCards.map((item) => {
                const Icon = item.icon;
                return <article key={item.label} className="rounded-2xl border border-[var(--line)] bg-[var(--white)] p-5 shadow-[var(--shadow-small)]">
                  <div className="mb-5 flex items-center justify-between"><span className="text-sm font-semibold text-[var(--ink-soft)]">{item.label}</span><span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--mint)] text-[var(--deep)]"><Icon size={19}/></span></div>
                  <strong className="block text-3xl font-black tabular-nums">{overview.isLoading ? "…" : numberFormat.format(item.value ?? 0)}</strong>
                  <p className="mt-2 text-xs text-[var(--ink-soft)]">{item.note}</p>
                </article>;
              })}
            </div>

            <section className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--white)] shadow-[var(--shadow-small)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] p-5">
                <div><h2 className="font-extrabold">کاربران</h2><p className="mt-1 text-xs text-[var(--ink-soft)]">آخرین حساب‌های ثبت‌شده · حداکثر ۱۰۰ مورد</p></div>
                <label className="flex min-w-[220px] items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--cream)] px-3 py-2.5">
                  <Search size={17} className="text-[var(--ink-soft)]"/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="جست‌وجو با نام یا ایمیل" className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--ink-soft)]" />
                </label>
              </div>
              {users.isError ? <p className="p-5 text-sm text-red-700">دریافت فهرست کاربران انجام نشد.</p> : null}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-right text-sm">
                  <thead className="bg-[var(--cream)] text-xs text-[var(--ink-soft)]"><tr><th className="px-5 py-3 font-semibold">کاربر</th><th className="px-5 py-3 font-semibold">نقش</th><th className="px-5 py-3 font-semibold">پروفایل تحصیلی</th><th className="px-5 py-3 font-semibold">تاریخ عضویت</th><th className="px-5 py-3 font-semibold">آخرین ورود</th></tr></thead>
                  <tbody>
                    {users.isLoading ? <tr><td colSpan={5} className="px-5 py-8 text-center text-[var(--ink-soft)]">در حال دریافت کاربران…</td></tr> :
                      users.data?.length ? users.data.map((user) => <tr key={user.id} className="border-t border-[var(--line)]">
                        <td className="px-5 py-4"><strong className="block">{user.name || user.profileName || "بدون نام"}</strong><span className="text-xs text-[var(--ink-soft)]" dir="ltr">{user.email || "بدون ایمیل"}</span></td>
                        <td className="px-5 py-4"><span className={\`rounded-full px-2.5 py-1 text-xs font-bold \${user.role === "admin" ? "bg-amber-100 text-amber-800" : "bg-[var(--mint)] text-[var(--deep)]"}\`}>{user.role === "admin" ? "مدیر" : "کاربر"}</span></td>
                        <td className="px-5 py-4">{user.hasStudentProfile ? "تکمیل‌شده" : "ثبت‌نشده"}</td>
                        <td className="px-5 py-4 text-xs text-[var(--ink-soft)]">{formatDate(user.createdAt)}</td>
                        <td className="px-5 py-4 text-xs text-[var(--ink-soft)]">{formatDate(user.lastSignedIn)}</td>
                      </tr>) : <tr><td colSpan={5} className="px-5 py-8 text-center text-[var(--ink-soft)]">کاربری با این مشخصات پیدا نشد.</td></tr>}
                  </tbody>
                </table>
              </div>
            </section>
            <p className="text-center text-[11px] leading-6 text-[var(--ink-soft)]">نسخه نخست پنل مدیریت تحصیل‌یار · عملیات تغییردهنده داده‌ها فعلاً غیرفعال است.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
