import { describe, expect, it } from "vitest";
import { curriculumCatalog, examQuestions } from "./examBank";
describe("curriculum and starter assessment bank",()=>{
 it("has unique question ids and four choices",()=>{
  expect(new Set(examQuestions.map(q=>q.id)).size).toBe(examQuestions.length);
  for(const q of examQuestions){expect(q.options).toHaveLength(4);expect(q.correctIndex).toBeGreaterThanOrEqual(0);expect(q.correctIndex).toBeLessThan(4);expect(q.explanation.length).toBeGreaterThan(5);}
 });
 it("covers multiple academic tracks and subjects",()=>{
  expect(new Set(examQuestions.map(q=>q.track)).size).toBeGreaterThan(2);
  expect(curriculumCatalog.length).toBeGreaterThan(5);
 });
});
