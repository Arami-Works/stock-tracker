# No Command Substitution in Bash

Never use `$()` command substitution in Bash commands. It triggers an unconfigurable permission prompt every time, regardless of the allow list.

Instead:

- Break nested commands into separate sequential Bash calls
- Use the first call's output to inform the second call
- Use dedicated tools (Glob, Grep, Read) instead of shell pipelines where possible

**Bad:**

```bash
gh api repos/.../actions/jobs/$(gh pr checks 23 --repo ... | grep "fail" | head -1 | awk ...)
```

**Good:**

```bash
# Call 1: get the failed check info
gh pr checks 23 --repo cheunjm/stock-tracker

# Call 2: use the job ID from the output
gh api repos/cheunjm/stock-tracker/actions/jobs/<JOB_ID>/logs
```
