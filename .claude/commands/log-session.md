---
description: Log this coding session to the Obsidian vault
---

Write a session log of what was done in this session to my Obsidian vault at `C:\Users\nasyk\Usagi\usagi-vault` (project folder: `Usagi Portfolio`). Topic hint (may be empty): $ARGUMENTS

1. If the vault path is not accessible, stop and tell me to restart with:
   `claude --add-dir "C:\Users\nasyk\Usagi\usagi-vault"`
2. Read the vault's `Meta/Templates/Session Log.md` and create `Usagi Portfolio/Log/YYYY-MM-DD <short topic>.md` (today's date) from it: what changed, decisions made, blockers, next steps. Frontmatter: `date`, `project: usagi-portfolio`, `repo: usagi-portfolio`.
3. Link the new note at the TOP of the "Session logs" section in `Usagi Portfolio/Usagi Portfolio Hub.md`. If the hub's "Current state" is now wrong, correct it.
4. If work changed state this session, update the `Usagi Portfolio/Usagi Portfolio Dev.md` board: move/add cards surgically, cards in Done become `- [x]`, preserve the `%% kanban:settings %%` block.
5. If a significant decision was made this session, offer to record it with `/adr`.
6. Commit the vault changes in the vault repo.
