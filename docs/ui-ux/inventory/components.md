# 28 — Component Inventory

Three tiers (per §2.7):

1. **Primitives** — generic UI bricks (Shadcn-based).
2. **Composite** — shared, app-aware.
3. **Feature** — domain-specific.

Every component listed has a stable name, a clear role, the file it lives
in, and props of note. Stories live in `src/<path>/<Component>.stories.tsx`.

---

## 28.1 Primitives — `components/ui/*`

| Component | Notes |
|---|---|
| `<Button>` | variants: primary, secondary, tertiary, danger, success, ghost, icon, score, live-action. Sizes: sm/md/lg. Loading prop. |
| `<IconButton>` | square, 32/40/48 |
| `<Input>` | + label, helper, error |
| `<Textarea>` | autoresize |
| `<Select>` | native + Combobox |
| `<Combobox>` | typeahead with multi |
| `<DatePicker>` | range support, presets |
| `<DateTimePicker>` | with timezone |
| `<Checkbox>` / `<Radio>` / `<Toggle>` | accessible |
| `<Stepper>` | numeric +/- |
| `<Slider>` | single + range |
| `<Tag>` / `<Badge>` | variants per design system |
| `<Avatar>` | initials + image fallback |
| `<Tooltip>` | Radix |
| `<Popover>` | Radix |
| `<Modal>` | sizes sm/md/lg/xl/full |
| `<Drawer>` | from left/right/bottom |
| `<Sheet>` | mobile bottom sheet |
| `<Tabs>` | underline + pill |
| `<Accordion>` | single + multiple |
| `<Card>` | default / elevated / interactive / sport-themed |
| `<Skeleton>` | rect / circle / text-line |
| `<Progress>` | linear + circular |
| `<Spinner>` | sm/md/lg |
| `<Toast>` / `<Toaster>` | variants info/success/warn/error |
| `<Alert>` | inline + banner |
| `<Breadcrumbs>` | with separator + truncation |
| `<Pagination>` | offset + cursor |
| `<Divider>` | horizontal + vertical |
| `<KeyboardKey>` | for shortcuts |
| `<Kbd>` | inline keyboard chip |
| `<Tag>` | dismissible chips |

## 28.2 Layout / chrome — `components/layout/*`

| Component | Notes |
|---|---|
| `<Header>` | brand + topnav slot (public) |
| `<TopBar>` | dashboard topbar: org switcher, search, notifications bell, user menu |
| `<Sidebar>` | dashboard left nav, collapsible |
| `<MobileNav>` / `<BottomNav>` | mobile dashboard nav |
| `<Breadcrumbs>` | path-aware |
| `<OrganizationSwitcher>` | active-org picker; create new |
| `<UserMenu>` | profile, billing, logout |
| `<LanguageSwitcher>` | en / ne / hi |
| `<ThemeToggle>` | light / dark / system |
| `<ConnectionBanner>` | offline / syncing / conflict |
| `<MaintenanceBanner>` | scheduled downtime |
| `<DevicePostureProvider>` | exposes posture |
| `<RBACProvider>` | exposes can() |
| `<RealtimeProvider>` | socket wiring |
| `<OrganizationProvider>` | exposes active org |
| `<I18nProvider>` | i18next |

## 28.3 Composite — `components/*`

| Component | Notes |
|---|---|
| `<DataTable>` | sortable, filterable, paginated, virtualised, bulk |
| `<FilterBar>` | chips + selects + date range |
| `<SearchBar>` | global / scoped |
| `<EmptyState>` | illustration + headline + CTA |
| `<ErrorBoundary>` | per-feature recoverable |
| `<ErrorFallback>` | friendly screen |
| `<ForbiddenScreen>` | with Request Access |
| `<NotFoundScreen>` | with safe link back |
| `<OfflineScreen>` | shows cached data + reconnect |
| `<LoadingScreen>` | skeleton page |
| `<ConfirmDialog>` | destructive confirm, typed if dangerous |
| `<UndoToast>` | with 5s timer |
| `<KbdHint>` | keyboard shortcut chip |
| `<RelativeTime>` | live "5m ago" |
| `<MoneyFormat>` | currency aware |
| `<CountUp>` | animated number |
| `<MatchClock>` | mm:ss live |
| `<LivePulse>` | red dot pulse |
| `<StatusBadge>` | match / tournament / subscription |
| `<RoleBadge>` | role chip |
| `<PermissionGuard>` (`<Can>`) | wraps anything |
| `<RequirePermission>` | route guard |
| `<RequireRole>` | route guard |
| `<RequireAuth>` | route guard |
| `<RequireOrgMember>` | route guard |
| `<RequireSuperAdmin>` | route guard |
| `<NotificationPanel>` | dropdown |
| `<NotificationBell>` | topbar |
| `<NotificationToast>` | category-aware |
| `<UploadDropzone>` | crests / logos |
| `<ExportMenu>` | CSV/PDF/PNG |
| `<ShareLinkModal>` | copy / send |
| `<QRCode>` | for sharing |
| `<MapView>` | venues (Leaflet) |

## 28.4 Charts — `components/charts/*`

| Component |
|---|
| `<KPIStat>` / `<KPIStrip>` |
| `<LineChart>` |
| `<BarChart>` / `<StackedBarChart>` |
| `<AreaChart>` |
| `<DonutChart>` |
| `<RadarChart>` |
| `<ScatterChart>` |
| `<HeatmapChart>` |
| `<TrendIndicator>` (▲▼▬) |
| `<InsightCard>` |

## 28.5 Domain (feature) — `features/*/components/*`

### Auth
`<LoginForm>`, `<RegisterForm>`, `<PublicRegisterForm>`,
`<ChangePasswordForm>`, `<ProfileForm>`, `<AcceptInvitationCard>`,
`<SessionExpiredModal>`.

### Organizations
`<OrgCard>`, `<OrgForm>`, `<MembersTable>`, `<InviteModal>`,
`<InvitationCard>`, `<RemoveMemberConfirm>`, `<EmptyOrgState>`.

### Sports
`<SportCard>`, `<SportForm>`, `<SportPicker>`.

### Tournaments
`<TournamentCard>`, `<TournamentForm>`, `<TournamentWizard>`,
`<TournamentStatusDropdown>`, `<TeamRegistrationTable>`,
`<FixtureGeneratorForm>`, `<BracketView>`, `<LeagueScheduleView>`,
`<TournamentLifecycleChip>`.

### Teams
`<TeamCard>`, `<TeamForm>`, `<RosterTable>`, `<TeamAnalyticsSummary>`.

### Players
`<PlayerCard>`, `<PlayerForm>`, `<PlayerTeamAssignmentModal>`,
`<PlayerTeamHistory>`, `<PlayerCareerStats>`.

### Matches
`<MatchCard>`, `<MatchForm>`, `<MatchHeader>`, `<MatchLifecycleDropdown>`,
`<OfficialsModal>`, `<MatchTimeline>`, `<PeriodSelector>`,
`<MatchStatusChip>`, `<MatchWithPeriodWidget>`, `<ScheduleCalendar>`.

### Scoring — generic
`<ScoringHeader>`, `<EventEntryModal>`, `<EventLog>`, `<UndoBar>`,
`<SnapshotBrowser>`, `<ReplayViewer>`, `<ValidationBanner>`,
`<EventTypeIcon>`.

### Scoring — cricket
`<CricketScoreboard>`, `<CricketActionGrid>`, `<BatsmanCard>`,
`<BowlerCard>`, `<PartnershipPill>`, `<ThisOverStrip>`,
`<WicketModal>`, `<DeliveryResultForm>`, `<DRSRequestModal>`,
`<DRSTimeline>`, `<SuperOverConsole>`, `<InningsStatsPanel>`,
`<FollowOnPanel>`, `<CricketOverlayWidget>`.

### Scoring — football
`<FootballScoreboard>`, `<PeriodClock>`, `<InjuryTimeStepper>`,
`<LineupBuilder>`, `<FormationPicker>`, `<SubstitutionModal>`,
`<SubstitutionStatusChip>`, `<GoalEntryModal>`, `<CardEntryModal>`,
`<EventCorrectionModal>`, `<ReplayVerifyPanel>`, `<EligibilityTable>`,
`<EligibilityBadge>`, `<VARStatusBanner>`, `<VARReviewModal>`,
`<VARStatsPanel>`, `<PenaltyShootoutBoard>`, `<NextKickerCard>`,
`<MatchEndConfirmModal>`, `<FootballOverlayWidget>`.

### Scoring — basketball
`<BasketballScoreboard>`, `<GameClock>`, `<ShotClock>`,
`<PossessionArrow>`, `<TeamFoulsChip>`, `<TimeoutChips>`,
`<FoulOutWarning>`, `<FieldGoalModal>`, `<FreeThrowModal>`,
`<ReboundModal>`, `<FoulModal>`, `<TimeoutModal>`,
`<LiveBoxscore>`, `<BasketballOverlayWidget>`.

### Standings
`<StandingsTable>`, `<StandingsRow>`, `<FormPills>`,
`<TieBreakTooltip>`, `<QualificationLegend>`, `<SnapshotList>`,
`<SnapshotDiff>`, `<RecalculateCTA>`, `<H2HPanel>`,
`<StandingsWidget>`.

### Notifications
`<NotificationBell>`, `<NotificationDropdown>`, `<NotificationRow>`,
`<NotificationDetailDrawer>`, `<NotificationFilters>`,
`<NotificationCategoryIcon>`, `<NotificationToast>`,
`<NotificationEmpty>`, `<NotificationSettings>`.

### Overlays
`<TemplateCard>`, `<TemplateEditor>`, `<LayerTree>`,
`<OverlayCanvas>`, `<LayerInspector>`, `<DataBindingPicker>`,
`<OverlayList>`, `<OverlayCard>`, `<OverlayActivateButton>`,
`<OverlayPreviewModal>`, `<OverlayShell>`, `<OverlayScoreboard>`,
`<OverlayLowerThird>`, `<OverlayBug>`, `<OverlayTicker>`,
`<OverlaySponsorStrip>`.

### Visualization
`<TacticalCanvas>`, `<FieldRenderer>`, `<PlayerToken>`,
`<FormationTemplatePicker>`, `<DrawingToolbar>`,
`<DrawingLayerPanel>`, `<AnnotationList>`, `<AnnotationEditor>`,
`<ExportFormationModal>`, `<HeatmapLayer>`.

### Analytics
`<KPIStat>`, `<KPIStrip>`, `<DateRangePicker>`, `<MetricPicker>`,
`<ChartCard>`, `<InsightCard>`, `<LeaderboardRow>`,
`<ComparePicker>`, `<ReportBuilder>`, `<ReportPreviewModal>`,
`<ExportMenu>`.

### Audit
`<AuditFiltersBar>`, `<AuditTable>`, `<AuditRow>`,
`<AuditDiffViewer>`, `<AuditDetailDrawer>`,
`<EntityHistoryTimeline>`, `<UserActivityTimeline>`,
`<ActivityHeatmap>`, `<ChangeLogInline>`, `<AuditExportModal>`,
`<LiveTailToggle>`.

### RBAC
`<RoleTable>`, `<RoleCard>`, `<RoleForm>`, `<PermissionsMatrix>`,
`<PermissionsCatalogue>`, `<UserRolesPanel>`,
`<UserPermissionsPanel>`, `<EffectivePermissionsList>`,
`<RolePicker>`, `<AssignRoleModal>`, `<DeleteRoleConfirm>`,
`<RequestAccessButton>`.

### Billing
`<PricingCard>`, `<PricingTable>`, `<TierToggle>`,
`<PlanComparisonMatrix>`, `<SubscriptionHeader>`,
`<QuotaUsageCard>`, `<UsageTrendChart>`, `<InvoiceTable>`,
`<InvoiceDetail>`, `<PaymentMethodCard>`,
`<AddPaymentMethodModal>`, `<UpgradeWizard>`, `<DowngradeWizard>`,
`<CancelWizard>`, `<QuotaBanner>`, `<RenewalChip>`,
`<BillingStatusChip>`, `<PlanFeatureList>`.

### Sync
`<ConnectionBanner>`, `<SyncStatusPill>`, `<SyncQueueTable>`,
`<ConflictList>`, `<ConflictDiffViewer>`, `<ResolveControls>`,
`<DeviceNamePrompt>`, `<DevicesTable>`, `<DeviceCard>`,
`<ProcessNowButton>`, `<RetryButton>`, `<DiscardButton>`.

### Public portal
`<Hero>`, `<LiveTicker>`, `<FeatureGrid>`, `<PricingTeaser>`,
`<Testimonials>`, `<Footer>`, `<MatchCard>`, `<LiveMatchCard>`,
`<TournamentCard>`, `<TournamentHeader>`, `<MatchHeaderPublic>`,
`<LiveScoreboard>`, `<EventFeed>`, `<LineupView>`,
`<StatsPanelPublic>`, `<FixtureList>`, `<QuotaBanner>`,
`<MatchCreateForm>`, `<QuickStartGuide>`, `<FAQ>`.

### Admin
`<TenantTable>`, `<TenantForm>`, `<PlanForm>`, `<PlatformKPIStrip>`,
`<AbuseFlagList>`.

## 28.6 Special-purpose

| Component | Use |
|---|---|
| `<KbdShortcutOverlay>` | press `?` to see shortcuts |
| `<CommandPalette>` | global ⌘K |
| `<DebugPanel>` | dev-only, env-flagged |
| `<RealtimePresence>` | avatars of co-scorers |
| `<MaintenanceMode>` | when feature flag set |

## 28.7 Story / test coverage policy

- Every primitive: full Storybook coverage + accessibility addon.
- Every composite: Storybook with key states (loading/empty/error).
- Every feature component: at least 1 story + 1 unit test for behaviour.
- Visual regression (Chromatic or similar) on primitives + key
  composites.
