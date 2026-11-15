import { useEffect, useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";

type Question = { id:string; grade:string; track:string; subject:string; chapter:string; topic:string; difficulty:string; prompt:string; options:string[]; sourceStatus?:string; sourceTitle?:string|null; sourceUrl?:string|null; sourceYear?:string|null; sourceQuestionNumber?:string|null };
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
 const lessonSelected = grade !== "همه پایه‌ها" && track !== "همه رشته‌ها" && chapter !== "کل کتاب";
 const progress=trpc.exams.lessonProgress.useQuery({grade,track,subject,chapter},{enabled:lessonSelected});
 const questions=trpc.exams.questions.useQuery({subject,chapter,grade:grade==="همه پایه‌ها"?"":grade,track:track==="همه رشته‌ها"?"":track,difficulty:selectedDifficulty,limit:20},{enabled:lessonSelected && progress.data===true});
 const dna=trpc.exams.academicDNA.useQuery();
 const markLessonStudied=trpc.exams.markLessonStudied.useMutation({onSuccess:()=>{void progress.refetch();void questions.refetch();}});
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
 const bookCoverage=useMemo(()=>{
  const books=visibleCatalog.filter(item=>item.subject===subject);
  const uniqueBooks=Array.from(new Map(books.map(book=>[`${book.grade}::${book.track}::${book.subject}`,book])).values());
  if(!uniqueBooks.length) return null;
  const knownLessonCount=uniqueBooks.reduce((sum,book)=>sum+book.chapters.filter((chapter:string)=>chapter!=="کل کتاب").length,0);
  return {
   questionCount:uniqueBooks.reduce((sum,item)=>sum+(item.questionCount??0),0),
   verifiedQuestionCount:uniqueBooks.reduce((sum,item)=>sum+(item.verifiedQuestionCount??0),0),
   lessonCount:knownLessonCount,
   targetQuestionCount:knownLessonCount*5,
  };
 },[visibleCatalog,subject]);
 const selectedLessonCoverage=useMemo(()=>{
  if(!lessonSelected) return null;
  const books=visibleCatalog.filter(item=>item.subject===subject&&item.grade===grade);
  const entries=books.flatMap(item=>item.lessonCoverage??[]).filter((item:{chapter:string})=>item.chapter===chapter);
  if(!entries.length) return null;
  return {
   questionCount:entries.reduce((sum,item)=>sum+item.questionCount,0),
   verifiedQuestionCount:entries.reduce((sum,item)=>sum+item.verifiedQuestionCount,0),
   targetQuestionsPerLesson:Math.max(...entries.map(item=>item.targetQuestionsPerLesson)),
   targetMet:entries.every(item=>item.targetMet),
  };
 },[visibleCatalog,subject,grade,chapter,lessonSelected]);
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
  <div className="academic-hub-heading"><div><p className="eyebrow">سنجش و بازخورد</p><h2>آزمون و بانک سؤال</h2><p>هر درس پس از ثبت تکمیل مطالعه، آزمون مستقل خود را باز می‌کند. پاسخ صحیح و تحلیل پس از ثبت آزمون نمایش داده می‌شود.</p></div></div>
  <div className="exam-controls">
   <label>درس<select value={subject} onChange={e=>updateSubject(e.target.value)}>{subjects.map(s=><option key={s} value={s}>{s}</option>)}</select></label>
   <label>درس / فصل<select value={chapter} onChange={e=>{setChapter(e.target.value);start();}}>{chapters.map((ch:string)=><option key={ch} value={ch}>{ch}</option>)}</select></label>
   <label>پایه<select value={grade} onChange={e=>{setGrade(e.target.value);start();}}>{grades.map(g=><option key={g}>{g}</option>)}</select></label>
   <label>رشته<select value={track} onChange={e=>{setTrack(e.target.value);start();}}>{tracks.map(t=><option key={t}>{t}</option>)}</select></label>
   <label>دشواری<select value={difficulty} onChange={e=>{setDifficulty(e.target.value);start();}}>{difficulties.map(d=><option key={d}>{d}</option>)}</select></label>
  </div>
  {bookCoverage&&<p className="exam-book-coverage">پوشش کتاب‌های انتخاب‌شده: {bookCoverage.questionCount} سؤال ثبت‌شده، {bookCoverage.verifiedQuestionCount} سؤال مستند؛ هدف اولیهٔ {bookCoverage.targetQuestionCount} سؤال برای {bookCoverage.lessonCount} درس/فصل</p>}
  {selectedLessonCoverage&&<p className="exam-book-coverage">پوشش این فصل: {selectedLessonCoverage.verifiedQuestionCount} سؤال مستند از {selectedLessonCoverage.targetQuestionsPerLesson} سؤال هدف ({selectedLessonCoverage.questionCount} سؤال در مجموع).</p>}
  {!lessonSelected?<p className="learning-empty">برای ارزیابی یک درس، پایه و رشته را مشخص کن و سپس یکی از درس‌های همان کتاب را انتخاب کن.</p>:progress.isLoading?<p className="learning-empty">در حال بررسی وضعیت مطالعهٔ این درس…</p>:!progress.data?<div className="lesson-quiz-gate"><p>آزمون این درس هنوز قفل است. ابتدا درس را مطالعه کن و وقتی برای ارزیابی آماده شدی، مطالعه را تأیید کن.</p><button className="primary-button" disabled={markLessonStudied.isPending} onClick={()=>markLessonStudied.mutate({grade,track,subject,chapter})}>{markLessonStudied.isPending?"در حال ثبت…":"مطالعهٔ این درس را تکمیل کردم"}</button></div>:!selectedLessonCoverage||selectedLessonCoverage.verifiedQuestionCount<selectedLessonCoverage.targetQuestionsPerLesson?<div className="lesson-quiz-gate"><p>آزمون این فصل هنوز آماده نیست؛ برای فعال‌شدن آن باید دست‌کم {selectedLessonCoverage?.targetQuestionsPerLesson??5} سؤال مستند و بازبینی‌شده ثبت شود. در حال حاضر {selectedLessonCoverage?.verifiedQuestionCount??0} سؤال مستند در دسترس است.</p></div>:questions.isLoading?<p className="learning-empty">در حال بارگذاری سؤال‌ها…</p>:!questions.data?.length?<p className="learning-empty">برای این درس هنوز سؤال مستند ثبت نشده است. می‌توانی درس دیگری را انتخاب کنی؛ وضعیت منبع هر سؤال جداگانه مشخص شده است.</p>:!result?<div className="exam-question-list">
   <p className="eyebrow">{questions.data.length} سؤال در این آزمون</p>
   {questions.data.map((q:Question,index:number)=><article className="exam-question" key={q.id}><span className="eyebrow">سؤال {index+1} · {q.grade} · {q.difficulty} · {sourceLabel(q.sourceStatus)}</span><h3>{q.prompt}</h3>{q.sourceTitle&&<p className="exam-source-note">{q.sourceTitle}{q.sourceYear?` · ${q.sourceYear}`:""}{q.sourceQuestionNumber?` · سؤال ${q.sourceQuestionNumber}`:""}{q.sourceUrl&&<> · <a href={q.sourceUrl} target="_blank" rel="noreferrer">مشاهدهٔ منبع</a></>}</p>}<div className="exam-options">{q.options.map((option,i)=><button type="button" key={option} className={answers[q.id]===i?"selected":""} aria-pressed={answers[q.id]===i} onClick={()=>setAnswers(old=>({...old,[q.id]:i}))}><span>{["الف","ب","ج","د"][i]}</span>{option}</button>)}</div></article>)}
   <button className="primary-button" disabled={submit.isPending||Object.keys(answers).length!==questions.data.length} onClick={()=>submit.mutate({subject,chapter,grade,track,answers:questions.data.map((q:Question)=>({questionId:q.id,selectedIndex:answers[q.id]}))})}>{submit.isPending?"در حال بررسی…":"ثبت پاسخ‌ها و مشاهدهٔ تحلیل"}</button>
  </div>:<div className="exam-result"><div className="exam-score"><strong>{result.scorePercent}٪</strong><span>{result.correctCount} پاسخ درست از {result.questionCount}</span></div><h3>تحلیل پاسخ‌ها</h3>{result.responses.map((r,i)=><article className="exam-review" key={r.questionId}><strong>{i+1}. {r.isCorrect?"پاسخ درست":"نیازمند مرور"} · {r.topic}</strong><p>{r.prompt}</p><span>پاسخ صحیح: {r.options[r.correctIndex]}</span><p>{r.explanation}</p></article>)}<button className="secondary-button" onClick={start}>آزمون دوباره</button></div>}
  <div className="exam-dna-summary"><h3>DNA تحصیلی بر اساس آزمون‌ها</h3>{dna.data?.history?.length?<><p>تعداد آزمون‌های ثبت‌شده: {dna.data.history.length}</p>{dna.data.mastery?.slice(0,6).map((item:any)=><div className="exam-mastery-row" key={item.subject+item.chapter+item.topic}><span>{item.subject} · {item.topic}</span><strong>{item.accuracy}٪ · {item.status}</strong></div>)}</>:<p>بعد از ثبت اولین آزمون، تحلیل تسلط بر مباحث اینجا ظاهر می‌شود.</p>}</div>
 </section>;
}
