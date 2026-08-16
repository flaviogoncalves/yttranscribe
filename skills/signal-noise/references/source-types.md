# Source types

Read only the section for the type identified in Step 1. Each section says what counts as signal, what noise is specific to that format, and how to adjust the output format.

## Index
- [Meeting or call transcript](#meeting-or-call-transcript)
- [Contract and legal material](#contract-and-legal-material)
- [Technical or scientific paper](#technical-or-scientific-paper)
- [Commercial proposal](#commercial-proposal)
- [Article or post (written)](#article-or-post-written)
- [Technical documentation](#technical-documentation)
- [Thread or discussion](#thread-or-discussion)
- [Financial or operational report](#financial-or-operational-report)

---

## Meeting or call transcript

**Signal:** decisions made and by whom; action items with owner and deadline; disagreements left unresolved; numbers cited; commitments made to third parties; positions that changed during the conversation.

**Format-specific noise:** disfluencies, audio checks, opening and closing small talk, someone repeating what another person just said, thinking out loud that was abandoned in the next sentence.

**Watch out:** distinguish a proposal from a decision. "We could do X" is not "we will do X". Many transcripts end with no decision at all. When that happens, say so explicitly instead of inventing a conclusion.

**Format:** add an `## Actions` block with owner and deadline per item. If an item has no owner, record it as having no owner. That is useful information, not a gap to fill.

---

## Contract and legal material

**Signal:** each party's obligations; amounts and how they are adjusted; terms, duration, and renewal; termination conditions and penalties; triggers ("in the event that"); exceptions; venue; warranties; exclusivity, non-compete, and confidentiality clauses; rights of first refusal and options.

**Format-specific noise:** definitions that merely restate common sense, standard market boilerplate, purely descriptive recitals.

**Watch out:** this is the type where Level 1 is usually mandatory. Never paraphrase a conditional, reproduce the exact logical structure ("Party X must Y **only if** Z **and** W"). Preserve clause numbering so the reader can return to the original. Explicitly flag asymmetric or unusual clauses instead of letting them dissolve into the body.

**Format:** `## Tensions and gaps` becomes `## Points of attention`: asymmetries, ambiguities, what is not covered.

---

## Technical or scientific paper

**Signal:** the research question; the method, with the conditions under which it was applied; numerical results with their variance; the size and nature of the sample; admitted limitations; what the authors say they did **not** demonstrate.

**Format-specific noise:** literature review that only situates the field, descriptions of standard methods any reader in the area already knows, acknowledgments, discussion that restates results.

**Watch out:** a result without its experimental condition is not a result. "WER improved 12%" needs the codec, the dataset, and the baseline. Separate what was measured from what was inferred.

---

## Commercial proposal

**Signal:** price and its structure; what is included; **what is explicitly excluded**; the assumptions the price rests on; delivery timelines; payment terms; proposal validity; client responsibilities.

**Format-specific noise:** company boilerplate, generic case studies, capability adjectives, methodology slides.

**Watch out:** negative scope (what is not included) is where the future dispute lives. It is almost always buried and almost always cut by summaries. Here it moves up.

---

## Article or post (written)

**Signal:** the thesis; the arguments supporting it, with the evidence for each; the objections the author acknowledges; the concrete prediction or recommendation, if any.

**Format-specific noise:** opening anecdote, author bio, restatement of the thesis in the closing, redundant examples illustrating the same point.

**Watch out:** distinguish what the author demonstrates from what the author merely asserts. An honest summary of opinion material makes clear that it is opinion. Transcribed talks tend to have an extremely high compression ratio: ten minutes can become two sentences with no loss.

**Separate fact from reading.** This is the one type where the `## What is new` block does the heavy lifting. Opinion material mixes, in the same sentence, a verifiable fact (a launch, a number, a regulation) and the author's interpretation of it. The fact goes in `## What is new`; the interpretation goes in `## Thesis`, marked as the author's claim. When the author has no fact of their own and is commenting on someone else's, say whose fact it is.

**Creator monologue, podcast, and YouTube video.** Handled as the primary path in SKILL.md, not here. That section covers the Verdict block, chapter anchoring, and the skip list. Come back to this section only for written articles and posts.

**Technical term cited without explanation.** Speakers name a protocol, standard, or product assuming the audience knows it. If the term carries the claim, it goes to `## Verified addition`. Ignoring it because the source did not explain it can mean losing the entire summary.

---

## Technical documentation

**Signal:** actual system behavior; parameters with their default values and valid ranges; prerequisites; error conditions and what triggers them; incompatibilities and limits; changes relative to previous versions.

**Format-specific noise:** the same configuration repeated in different contexts, navigation text, trivial examples.

**Watch out:** here literal precision matters more than fluency. Parameter names, flags, and values go through exactly as written, in the original, untranslated.

---

## Thread or discussion

**Signal:** the distinct positions in play and the argument for each; the point where they actually diverge; evidence brought by any side; consensus reached, if any.

**Format-specific noise:** agreement with no content, personal attacks, restatement of a position already recorded, tangents.

**Watch out:** do not average the positions together. The value of a discussion is in the divergence. Preserve it by naming who argues what.

---

## Financial or operational report

**Signal:** the numbers with their period and comparison base; the variance and its stated explanation; model assumptions; non-recurring items; changes in accounting or methodological criteria.

**Format-specific noise:** narrative commentary that only restates the number in the table, glossary, standard disclaimers.

**Watch out:** a percentage change without its absolute base is misleading. Record both. And always separate actuals from projections: in many reports they appear in the same table.
