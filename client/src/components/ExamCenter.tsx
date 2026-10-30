import { useEffect, useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";

type Question = { id:string; grade:string; track:string; subject:string; chapter:string; topic:string; difficulty:string; prompt:string; options:string[]; sourceStatus?:string; sourceTitle?:string; sourceUrl?:string; sourceYear?:string; sourceQuestionNumber?:string };
type Result = { scorePercent:number; correctCount:number; questionCount:number; topicAnalysis:Array<{topic:string;total:number;correct:number;accuracy:number}>; responses:Array<{questionId:string;selectedIndex:number;correctIndex:number;isCorrect:boolean;prompt:string;options:string[];explanation:string;topic:string}> };
const grades=["همه پایه‌ها","دهم","یازدهم","دوازدهم"];
const tracks=["همه رشته‌ها","تجربی","ریاضی","ریاضی و تجربی","انسانی","عمومی"];
const difficulties=["همه سطوح","آسان","متوسط","سخت"];

export default function ExamCenter() {
 const [subject,setSubject]=useState("زیست‌شناسی");
 const [chapter,setChapter]=useState("سلول");
 const [grade,setGrade]=useState("همه پایه‌ها");
 const [track,setTrack]=useState("همه رشته‌ها");
 const [difficulty,setDifficulty]=useState("همه سطوح");
 const [answers,setAnswers]=useState<Record<string,number>>({});
 const [result,setResult]=useState<Result|null>(null);
 const catalog=trpc.exams.catalog.useQuery();
 const selectedDifficulty = difficulty === "همه سطوح" ? undefined : difficulty as "آسان" | "متوسط" | "سخت";
 const questions=trpc.exams.questions.useQuery({subject,chapter,grade:grade==="همه پایه‌ها"?undefined:grade,track:track==="همه رشته‌ها"?undefined:track,difficulty:selectedDifficulty,limit:20});
 const dna=trpc.exams.academicDNA.useQuery();
 const submit=trpc.exams.submit.useMutation({onSuccess:(value)=>{setResult(value as Result);void dna.refetch();}});
 const visibleCatalog=useMemo(()=> (catalog.data ?? []).filter(item=>{
  const gradeMatches=grade==="همه پایه‌ها"||item.grade===grade;
  const trackMatches=track==="همه رشته‌ها"||
   item.track==="عمومی"||item.track===track||
   (track==="تجربی"&&item.track==="ریاضی و تجربی")||
   (track==="ریاضی"&&item.track==="ریاضی و تجربی")||
   (track==="ریاضی و تجربی"&&["ریاضی","تجربی"].includes(item.track));
  return gradeMatches&&trackMatches;
 }),[catalog.data,grade,track]);
 const subjects=useMemo(()=>Array.from(new Set(visibleCatalog.map(item=>item.subject))).sort((a,b)=>a.localeCompare(b,"fa")),[visibleCatalog]);
 const chaptersForSubject=(name:string)=>Array.from(new Set(["کل کتاب",...visibleCatalog.filter(item=>item.subject===name).flatMap(item=>item.chapters)])).sort((a,b)=>a==="کل کتاب"?-1:b==="کل کتاب"?1:a.localeCompare(b,"fa"));
 const chapters=useMemo(()=>chaptersForSubject(subject),[visibleCatalog,subject]);
 const start=()=>{setAnswers({});setResult(null);};
 useEffect(()=>{
  if(subjects.length&&!subjects.includes(subject)){
   const nextSubject=subjects[0];
   setSubject(nextSubject);
   setChapter(chaptersForSubject(nextSubject)[0]??"کل کتاب");
   start();
  } else if(chapters.length&&!chapters.includes(chapter)){
   setChapter("کل کتاب");
   start();
  }
 },[subjects,chapters,subject,chapter]);
 const updateSubject=(next:string)=>{setSubject(next);setChapter(chaptersForSubject(next)[0]??"کل کتاب");start();};
 const sourceLabel=(status?:string)=>{
  if(status==="official-exam") return "سؤال عیناً از آزمون رسمی";
  if(status==="official-exam-adapted") return "بازطراحی‌شده بر پایهٔ آزمون رسمی";
  if(status==="curriculum-verified") return "تطبیق‌یافته با کتاب درسی";
  if(status==="reviewed") return "بازبینی‌شده";
  if(status==="pending-review") return "در انتظار بازبینی";
  return "نمونهٔ تألیفی";
 };
 return <section className="exam-center" aria-label="آزمون و تحلیل DNA تحصیلی">
  <div className="academic-hub-heading"><div><p className="eyebrow">سنجش و بازخورد</p><h2>آزمون و بانک سؤال</h2><p>سؤال‌ها بر اساس درس، مبحث، پایه، رشته و سطح دشواری فیلتر می‌شوند. پاسخ صحیح بعد از ثبت نمایش داده می‌شود.</p></div></div>
  <div className="exam-controls">
   <label>درس<select value={subject} onChange={e=>updateSubject(e.target.value)}>{subjects.map(s=><option key={s} value={s}>{s}</option>)}</select></label>
   <label>مبحث<select value={chapter} onChange={e=>{setChapter(e.target.value);start();}}>{chapters.map((ch:string)=><option key={ch} value={ch}>{ch}</option>)}</select></label>
   <label>پایه<select value={grade} onChange={e=>{setGrade(e.target.value);start();}}>{grades.map(g=><option key={g}>{g}</option>)}</select></label>
   <label>رشته<select value={track} onChange={e=>{setTrack(e.target.value);start();}}>{tracks.map(t=><option key={t}>{t}</option>)}</select></label>
   <label>دشواری<select value={difficulty} onChange={e=>{setDifficulty(e.target.value);start();}}>{difficulties.map(d=><option key={d}>{d}</option>)}</select></label>
  </div>
  {questions.isLoading?<p className="learning-empty">در حال بارگذاری سؤال‌ها…</p>:!questions.data?.length?<p className="learning-empty">برای این ترکیب هنوز سؤال مستند ثبت نشده است. می‌توانی فیلترها یا مبحث را تغییر بدهی؛ وضعیت منبع هر سؤال جداگانه مشخص شده است.</p>:!result?<div className="exam-question-list">
   <p className="eyebrow">{questions.data.length} سؤال در این آزمون</p>
   {questions.data.map((q:Question,index:number)=><article className="exam-question" key={q.id}><span className="eyebrow">سؤال {index+1} · {q.grade} · {q.difficulty} · {sourceLabel(q.sourceStatus)}</span><h3>{q.prompt}</h3>{q.sourceTitle&&<p className="exam-source-note">{q.sourceTitle}{q.sourceYear?` · ${q.sourceYear}`:""}{q.sourceQuestionNumber?` · سؤال ${q.sourceQuestionNumber}`:""}{q.sourceUrl&&<> · <a href={q.sourceUrl} target="_blank" rel="noreferrer">مشاهدهٔ منبع</a></>}</p>}<div className="exam-options">{q.options.map((option,i)=><button type="button" key={option} className={answers[q.id]===i?"selected":""} aria-pressed={answers[q.id]===i} onClick={()=>setAnswers(old=>({...old,[q.id]:i}))}><span>{["الف","ب","ج","د"][i]}</span>{option}</button>)}</div></article>)}
   <button className="primary-button" disabled={submit.isPending||Object.keys(answers).length!==questions.data.length} onClick={()=>submit.mutate({subject,chapter,grade:grade==="همه پایه‌ها"?undefined:grade,track:track==="همه رشته‌ها"?undefined:track,answers:questions.data.map((q:Question)=>({questionId:q.id,selectedIndex:answers[q.id]}))})}>{submit.isPending?"در حال بررسی…":"ثبت پاسخ‌ها و مشاهدهٔ تحلیل"}</button>
  </div>:<div className="exam-result"><div className="exam-score"><strong>{result.scorePercent}٪</strong><span>{result.correctCount} پاسخ درست از {result.questionCount}</span></div><h3>تحلیل پاسخ‌ها</h3>{result.responses.map((r,i)=><article className="exam-review" key={r.questionId}><strong>{i+1}. {r.isCorrect?"پاسخ درست":"نیازمند مرور"} · {r.topic}</strong><p>{r.prompt}</p><span>پاسخ صحیح: {r.options[r.correctIndex]}</span><p>{r.explanation}</p></article>)}<button className="secondary-button" onClick={start}>آزمون دوباره</button></div>}
  <div className="exam-dna-summary"><h3>DNA تحصیلی بر اساس آزمون‌ها</h3>{dna.data?.history?.length?<><p>تعداد آزمون‌های ثبت‌شده: {dna.data.history.length}</p>{dna.data.mastery?.slice(0,6).map((item:any)=><div className="exam-mastery-row" key={item.subject+item.chapter+item.topic}><span>{item.subject} · {item.topic}</span><strong>{item.accuracy}٪ · {item.status}</strong></div>)}</>:<p>بعد از ثبت اولین آزمون، تحلیل تسلط بر مباحث اینجا ظاهر می‌شود.</p>}</div>
 </section>;
}
