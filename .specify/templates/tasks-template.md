---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Every feature MUST include at least one constitution-mandated essential test. Layer unit/integration coverage for critical logic and only add new E2E flows when they cover login → primary action → sucesso.

**Workflow**: Tasks should track the sequence Tipos → Backend → Frontend → Teste essencial → Smoke test → Deploy staging → Deploy producao → Monitoramento.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 0: Shared Types & Contracts (Blocking)

**Purpose**: Update the single source of truth (Zod/OpenAPI/tRPC/ts-rest) before building code.

- [ ] T000 Version bump shared schema package and document changes in contracts/
- [ ] T001 [P] Regenerate backend + frontend types/clients and wire imports
- [ ] T002 Add runtime validation for all inbound/outbound payloads (API, queues, forms)

**Checkpoint**: Contracts published and consumed; feature work can reference the new version safely.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T010 Create project structure per implementation plan
- [ ] T011 Initialize [language] project with [framework] dependencies
- [ ] T012 [P] Configure ESLint + Prettier and add CI enforcement
- [ ] T013 [P] Seed/extend the mini design system (button, input, modal, card, typography)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T020 Setup database schema and migrations framework
- [ ] T021 [P] Implement authentication/authorization framework
- [ ] T022 [P] Setup API routing and middleware structure
- [ ] T023 Create base models/entities that all stories depend on
- [ ] T024 Configure error handling and logging infrastructure
- [ ] T025 Setup environment configuration management + secrets handling
- [ ] T026 Add security baseline (HTTPS, secure hashing, input validation, rate limiting)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (Essential first)

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T100 [US1] Essential test for [core promise] in tests/[unit|integration]/test_[name].ts
- [ ] T101 [P] [US1] Integration test for [user journey] in tests/integration/test_[name].ts

### Implementation for User Story 1

- [ ] T110 [P] [US1] Create [Entity1] model in src/models/[entity1].ts
- [ ] T111 [P] [US1] Create [Entity2] model in src/models/[entity2].ts
- [ ] T112 [US1] Implement [Service] in src/services/[service].ts (depends on T110, T111)
- [ ] T113 [US1] Implement [endpoint/feature] in src/[location]/[file].ts
- [ ] T114 [US1] Add validation and error handling (schema enforcement)
- [ ] T115 [US1] Add logging + analytics events for user story 1 operations

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (Maintain coverage)

- [ ] T200 [US2] Essential/Regression test for [secondary promise] in tests/[unit|integration]/test_[name].ts
- [ ] T201 [P] [US2] Integration test for [user journey] in tests/integration/test_[name].ts

### Implementation for User Story 2

- [ ] T210 [P] [US2] Create [Entity] model in src/models/[entity].ts
- [ ] T211 [US2] Implement [Service] in src/services/[service].ts
- [ ] T212 [US2] Implement [endpoint/feature] in src/[location]/[file].ts
- [ ] T213 [US2] Integrate with User Story 1 components (if needed)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (Optional only if story approved)

- [ ] T300 [US3] Essential/Regression test for [tertiary promise] in tests/[unit|integration]/test_[name].ts
- [ ] T301 [P] [US3] Integration test for [user journey] in tests/integration/test_[name].ts

### Implementation for User Story 3

- [ ] T310 [P] [US3] Create [Entity] model in src/models/[entity].ts
- [ ] T311 [US3] Implement [Service] in src/services/[service].ts
- [ ] T312 [US3] Implement [endpoint/feature] in src/[location]/[file].ts

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Additional unit tests (if requested) in tests/unit/
- [ ] TXXX Security hardening
- [ ] TXXX Run quickstart.md validation

---

## Release Checklist & Monitoring (Constitution)

- [ ] R001 Shared types/contracts updated, published, and referenced by backend + frontend
- [ ] R002 Backend deployed with schema validation + security baseline enabled
- [ ] R003 Frontend integrated via design system components and free of console errors
- [ ] R004 Essential automated test recorded in CI (lint → test → build)
- [ ] R005 Manual smoke test executed with link to checklist results
- [ ] R006 Deploy staging → smoke → production with feature flag/rollback documented
- [ ] R007 Post-deploy monitoring active (errors, latency, onboarding + primary analytics)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for [endpoint] in tests/contract/test_[name].py"
Task: "Integration test for [user journey] in tests/integration/test_[name].py"

# Launch all models for User Story 1 together:
Task: "Create [Entity1] model in src/models/[entity1].py"
Task: "Create [Entity2] model in src/models/[entity2].py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
