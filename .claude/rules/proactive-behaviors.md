# Proactive Behaviors

These behaviors are required — not optional suggestions. Check each one actively.

## Model Switching

Before starting any task, evaluate complexity:
- **Opus**: Architecture decisions, complex debugging, multi-file refactors, EFCV pattern changes, tRPC/GraphQL schema redesigns, Prisma migration planning
- **Sonnet**: Single-file fixes, adding stories, routine PR work, config changes
- **Flag immediately** at task start: "Model note: This task warrants Opus — type `/model claude-opus-4-6` then `/clear`."
- After Opus work completes: "Model note: Back to Sonnet — type `/model claude-sonnet-4-6` then `/clear`."

## Agent Teams

Suggest agent teams when you see 2+ independent subtasks:
- Frontend + backend changes in the same feature
- Multiple subgraph or package changes
- Parallel research (e.g., investigating a Tamagui issue while checking Expo compatibility)
- Say: "This is a good candidate for agent teams — I can run [X] and [Y] in parallel."

## Convention Updates

After completing work that establishes or validates a pattern:
- New EFCV pattern usage → update `~/Documents/aramiworks/conventions/architecture/efcv.md`
- New Tamagui/MD3 component pattern → update `~/Documents/aramiworks/conventions/architecture/frontend.md`
- New backend pattern (tRPC router, subgraph) → update `~/Documents/aramiworks/conventions/architecture/backend.md`
- Say: "New pattern emerged — I'll update conventions." Then create a Linear issue + PR.
