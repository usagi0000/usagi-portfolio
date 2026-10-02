---
description: Record an architecture decision (ADR) in the Obsidian vault
---

Record an architecture decision in my Obsidian vault at `C:\Users\nasyk\Usagi\usagi-vault`. Decision topic (may be empty — ask me): $ARGUMENTS

1. If the vault path is not accessible, stop and tell me to restart with:
   `claude --add-dir "C:\Users\nasyk\Usagi\usagi-vault"`
2. Read the vault's `Meta/Templates/ADR.md`. Find the next number in `Usagi Portfolio/Decisions/` and create `ADR-NNN <title>.md` there. Fill context / decision / consequences from this session — interview me briefly for anything you don't know. Status: `accepted` unless I say otherwise. Frontmatter `date`, `project: usagi-portfolio`.
3. Link it from the "Decisions" section of `Usagi Portfolio/Usagi Portfolio Hub.md`, and from today's session log if one exists. If it supersedes an older ADR, mark that one `superseded` and cross-link both.
4. Commit the vault changes in the vault repo.
