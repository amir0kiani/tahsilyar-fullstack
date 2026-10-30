import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { curriculumCatalog, examQuestions } from "./examBank";
import { getAcademicMastery, getExamHistory, saveExamAttempt } from "./db";
export const assessmentRouter = router({
 catalog: protectedProcedure.query(() => curriculumCatalog),
 questions: protectedProcedure.input(z.object({ grade: z.string().optional(), track: z.string().optional(), subject: z.string().optional(), chapter: z.string().optional(), limit: z.number().int().min(1).max(20).default(10) })).query(({ input }) => examQuestions.filter(q => (!input.subject || q.subject === input.subject) && (!input.chapter || q.chapter === input.chapter) && (!input.grade || input.grade === "عمومی" || q.grade === input.grade || q.grade === "عمومی") && (!input.track || input.track === "عمومی" || q.track === input.track || q.track === "عمومی")).slice(0,input.limit).map(({correctIndex,explanation,...q})=>q)),
 submit: protectedProcedure.input(z.object({ grade:z.string(),track:z.string(),subject:z.string(),chapter:z.string(),answers:z.array(z.object({questionId:z.string(),selectedIndex:z.number().int().min(0).max(3)})).min(1).max(20) })).mutation(async ({ctx,input})=>{
 const ids=new Set(input.answers.map(a=>a.questionId)); if(ids.size!==input.answers.length) throw new Error("Duplicate question answers");
 const qs=examQuestions.filter(q=>ids.has(q.id)&&q.subject===input.subject&&q.chapter===input.chapter);
 if(qs.length!==input.answers.length) throw new Error("Invalid question selection");
 const map=new Map(input.answers.map(a=>[a.questionId,a.selectedIndex]));
 const responses=qs.map(q=>({questionId:q.id,selectedIndex:map.get(q.id)!,correctIndex:q.correctIndex,isCorrect:map.get(q.id)===q.correctIndex,subject:q.subject,chapter:q.chapter,topic:q.topic,difficulty:q.difficulty}));
 const correctCount=responses.filter(r=>r.isCorrect).length;
 const grouped=new Map<string,{topic:string;total:number;correct:number;accuracy:number}>();
 for(const r of responses){const v=grouped.get(r.topic)||{topic:r.topic,total:0,correct:0,accuracy:0};v.total++;if(r.isCorrect)v.correct++;v.accuracy=Math.round(v.correct/v.total*100);grouped.set(r.topic,v);}
 const topicAnalysis=[...grouped.values()],scorePercent=Math.round(correctCount/qs.length*100);
 const saved=await saveExamAttempt({userId:ctx.user.id,grade:input.grade,track:input.track,subject:input.subject,chapter:input.chapter,questionCount:qs.length,correctCount,scorePercent,responses,topicAnalysis});
 return {attemptId:saved?.id,questionCount:qs.length,correctCount,scorePercent,responses:responses.map(r=>({...r,prompt:qs.find(q=>q.id===r.questionId)!.prompt,options:qs.find(q=>q.id===r.questionId)!.options,explanation:qs.find(q=>q.id===r.questionId)!.explanation})),topicAnalysis};
 }),
 history: protectedProcedure.query(({ctx})=>getExamHistory(ctx.user.id,50)),
 academicDNA: protectedProcedure.query(async ({ctx})=>{const [mastery,history]=await Promise.all([getAcademicMastery(ctx.user.id),getExamHistory(ctx.user.id,50)]);const totalQuestions=history.reduce((s,a)=>s+a.questionCount,0),totalCorrect=history.reduce((s,a)=>s+a.correctCount,0);return {mastery,history,totalAttempts:history.length,totalQuestions,overallAccuracy:totalQuestions?Math.round(totalCorrect/totalQuestions*100):null,strengths:mastery.filter(x=>x.status==="نسبتاً مسلط"),priorities:mastery.filter(x=>x.status==="اولویت تمرین"||x.status==="نیازمند مرور").slice(0,8)};})
});
