import { useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";

type Question = { id:string; grade:string; track:string; subject:string; chapter:string; topic:string; difficulty:string; prompt:string; options:string[] };
type Result = { scorePercent:number; correctCount:number; questionCount:number; topicAnalysis:Array<{topic:string;total:number;correct:number;accuracy:number}>; responses:Array<{questionId:string;selectedIndex:number;correctIndex:number;isCorrect:boolean;prompt:string;options:string[];explanation:string;topic:string}> };

const subjects = ["زیست‌شناسی","ریاضی","فیزیک","جامعه‌شناسی","زبان انگلیسی"];
export default function ExamCenter() {
 const [subject,setSubject]=useState(subjects[0]);
 const [chapter,setChapter]=useState("سلول");
 const [answers,setAnswers]=useState<Record<string,number>>({});
 const [result,setResult]=useState<Result|null>(null);
 const catalog=trpc.exams.catalog.useQuery();
 const questions=trpc.exams.questions.useQuery({subject,chapter,limit:10});
 const dna=trpc.exams.academicDNA.useQuery();
 const submit=trpc.exams.submit.useMutation({onSuccess:(value)=>{setResult(value as Result);void dna.refetch();}});
 const chapters=useMemo(()=>catalog.data?.find((item)=>item.subject===subject)?.chapters ?? [],[catalog.data,subject]);
 const start=()=>{setAnswers({});setResult(null);};
 return <section className="exam-center" aria-label="آزمون و تحلیل DNA تحصیلی">
  <div className="academic-hub-heading"><div><p className="eyebrow">سنجش و بازخورد</p><h2>آزمون هوشمند</h2><p>پاسخ‌ها پس از ثبت بررسی می‌شوند؛ کلید و توضیح قبل از پایان آزمون نمایش داده نمی‌شود.</p></div></div>
  <div className="exam-controls">
   <label>درس<select value={subject} onChange={e=>{const next=e.target.value;setSubject(next);setChapter(String(catalog.data?.find(item=>item.subject===next)?.chapters[0] ?? ""));start();}}>{subjects.map(s=><option key={s}>{s}</option>)}</select></label>
   <label>مبحث<select value={chapter} onChange={e=>{setChapter(e.target.value);start();}}>{chapters.map((ch:string)=><option key={ch} value={ch}>{ch}</option>)}{!chapters.length&&<option value="سلول">سلول</option>}</select></label>
  </div>
  {questions.isLoading?<p className="learning-empty">در حال بارگذاری سؤال‌ها…</p>:!questions.data?.length?<p className="learning-empty">برای این درس و مبحث هنوز سؤال نمونه ثبت نشده است. بانک فعلی نسخهٔ آغازین است و هنوز جامع نیست.</p>:!result?<div className="exam-question-list">
   {questions.data.map((q:Question,index:number)=><article className="exam-question" key={q.id}><span className="eyebrow">سؤال {index+1} · {q.difficulty}</span><h3>{q.prompt}</h3><div className="exam-options">{q.options.map((option,i)=><button key={option} className={answers[q.id]===i?"selected":""} onClick={()=>setAnswers(old=>({...old,[q.id]:i}))}><span>{["الف","ب","ج","د"][i]}</span>{option}</button>)}</div></article>)}
   <button className="primary-button" disabled={submit.isPending||Object.keys(answers).length!==questions.data.length} onClick={()=>submit.mutate({subject,chapter,answers:questions.data.map((q:Question)=>({questionId:q.id,selectedIndex:answers[q.id]}))})}>{submit.isPending?"در حال بررسی…":"ثبت پاسخ‌ها و مشاهدهٔ تحلیل"}</button>
  </div>:<div className="exam-result"><div className="exam-score"><strong>{result.scorePercent}٪</strong><span>{result.correctCount} پاسخ درست از {result.questionCount}</span></div><h3>تحلیل پاسخ‌ها</h3>{result.responses.map((r,i)=><article className="exam-review" key={r.questionId}><strong>{i+1}. {r.isCorrect?"پاسخ درست":"نیازمند مرور"} · {r.topic}</strong><p>{r.prompt}</p><span>پاسخ صحیح: {r.options[r.correctIndex]}</span><p>{r.explanation}</p></article>)}<button className="secondary-button" onClick={start}>آزمون دوباره</button></div>}
  <div className="exam-dna-summary"><h3>DNA تحصیلی بر اساس آزمون‌ها</h3>{dna.data?.history?.length?<><p>تعداد آزمون‌های ثبت‌شده: {dna.data.history.length}</p>{dna.data.mastery?.slice(0,6).map((item:any)=><div className="exam-mastery-row" key={item.subject+item.chapter+item.topic}><span>{item.subject} · {item.topic}</span><strong>{item.accuracy}٪ · {item.status}</strong></div>)}</>:<p>بعد از ثبت اولین آزمون، تحلیل تسلط بر مباحث اینجا ظاهر می‌شود.</p>}</div>
 </section>;
}
