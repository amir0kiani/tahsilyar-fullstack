import { describe, expect, it } from "vitest";
import { curriculumCatalog, examQuestions } from "./examBank";

describe("curriculum and assessment question bank",()=>{
 it("has unique question ids and valid four-choice answer keys",()=>{
  expect(new Set(examQuestions.map(q=>q.id)).size).toBe(examQuestions.length);
  for(const q of examQuestions){
   expect(q.options).toHaveLength(4);
   expect(q.correctIndex).toBeGreaterThanOrEqual(0);
   expect(q.correctIndex).toBeLessThan(4);
   expect(q.explanation.length).toBeGreaterThan(5);
   expect(q.prompt.length).toBeGreaterThan(8);
  }
 });
 it("covers multiple tracks and has expanded beyond the initial starter set",()=>{
  expect(new Set(examQuestions.map(q=>q.track)).size).toBeGreaterThan(2);
  expect(curriculumCatalog.length).toBeGreaterThan(5);
  expect(examQuestions.length).toBeGreaterThanOrEqual(25);
 });
 it("has at least one question for every catalog chapter",()=>{
  for(const item of curriculumCatalog){
   for(const chapter of item.chapters){
    expect(examQuestions.some(q=>q.subject===item.subject&&q.chapter===chapter),`missing questions for ${item.subject} / ${chapter}`).toBe(true);
   }
  }
 });
 it("marks the bank as sample-authored rather than official exam material",()=>{
  expect(examQuestions.every(q=>q.sourceStatus==="sample-authored")).toBe(true);
 });
});
