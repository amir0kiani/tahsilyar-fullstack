# Grade 11 Physics coverage audit policy

## Independent coverage thresholds

- Each official textbook chapter must contain at least five eligible, reviewed questions.
- Each official mapped sub-lesson must be represented by at least one eligible, reviewed question.
- The five-question chapter threshold is not repeated for every sub-lesson.
- Only `reviewed`, `official-exam-adapted`, `mock-exam-adapted`, and `curriculum-verified` count as reviewed coverage.
- `sample-authored` and `pending-review` never count toward either threshold.

## Official maps

The Mathematics edition (book code 111209) contains 4 chapters and 29 mapped sub-lessons.
The Experimental Sciences edition (book code 111244) contains 3 chapters and 28 mapped sub-lessons.
These are separate editions and must not share one chapter map.

Current 1405–1406 contents indexes:
- Mathematics: https://www.daneshchi.ir/physic-11-riazi/
- Experimental Sciences: https://www.daneshchi.ir/physic-tajrobi-11/
- Official Roshd Mathematics record: https://www.roshd.ir/olum/Content/کتاب-فیزیک-2-پایه-یازدهم-رشته-ریاضی-و-فیزیک
- Official Roshd Experimental Sciences record: https://www.roshd.ir/olum/Content/کتاب-فیزیک-2-پایه-یازدهم-رشته-علوم-تجربی

The 1405–1406 contents indexes identify the Mathematics edition as four chapters and the Experimental Sciences edition as three chapters. Their section maps are tracked independently.

## Source review completed before the gap-fill batch

Four items adapted from the Kānun Grade 11 Mathematics mock exam dated 21 Aban 1400 were checked against the linked booklet and its explanatory answer pages:
- Q91: an original authored item on charge quantization, inspired by the topic only; it is explicitly not represented as an extracted/adapted exam question.
- Q92: adapted Coulomb-force item; explanatory answer page 16.
- Q96: adapted acceleration item; explanatory answer page 17.
- Q97: adapted field-line-density and potential item; explanatory answer page 17.

Source PDF: https://abadgaranedu.ir/wp-content/uploads/2021/11/kanoon-Sal11-Riazi-21Aban1400-konkur.in_.pdf

The ten questions attributed to Konkur 1402 in the earlier source PR were not imported because the referenced PDFs could not be independently opened in that review. They remain outside the verified count until the booklet and answer key are checked.

Six earlier practice items that had been labeled as Maz-adapted without an exact matching Maz question were corrected to original authored content, with the official Roshd curriculum page as the supporting content reference. They use `reviewed` and explicitly state that they were not extracted from the Maz exam.

## Gap-fill batch — 20 November 2026

Before this batch, the verified bank contained 24 Mathematics-track and 20 Experimental-Sciences-track Physics 2 questions. Chapter thresholds were already met, but 24 of the 57 official sub-lessons had no mapped reviewed question: 12 in each edition.

This change adds 12 original questions for each track. Every new item is labelled `reviewed`, carries the correct track-specific book code and Roshd source URL, and explicitly states that it is authored rather than extracted from an exam. The answer calculations and keys were checked independently. As a supplementary curriculum cross-check, the chapter-by-chapter 1xAi lesson summaries (explicitly labelled AI-generated and carrying textbook page references) were consulted; they were not treated as exam sources or as verbatim question sources. The full official PDF was not directly extracted in this run, so no new item is attributed to a published exam.

After the batch, the chapter counts are:
- Mathematics (36 total): electrostatics 15; direct-current circuits 9; magnetism 7; electromagnetic induction and alternating current 5.
- Experimental Sciences (32 total): electrostatics 14; direct-current circuits 7; magnetism and electromagnetic induction 11.

The 29 Mathematics sub-lessons and 28 Experimental Sciences sub-lessons are now each represented by at least one reviewed question. The regression test requires zero remaining physics sub-lesson gaps, zero unmapped reviewed physics questions, and at least five reviewed questions in every official chapter. It does not require five questions for every sub-lesson.

Supplementary lesson-level cross-checks (AI-generated summaries explicitly marked as such; not used as exam-source attribution):
- Mathematics: https://mergedrop.1xai.ir/darsnameh/fizik-riazi-yazdahom/fasl-1 ; https://mergedrop.1xai.ir/darsnameh/fizik-riazi-yazdahom/fasl-2 ; https://mergedrop.1xai.ir/darsnameh/fizik-riazi-yazdahom/fasl-3
- Experimental Sciences: https://1xai.ir/darsnameh/fizik-yazdahom/fasl-1 ; https://1xai.ir/darsnameh/fizik-yazdahom/fasl-2 ; https://1xai.ir/darsnameh/fizik-yazdahom/fasl-3
