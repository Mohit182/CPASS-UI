# Growtele CPaaS Dashboard — UI Plan

Source design: [Figma – Growtele_Dashboard](https://www.figma.com/design/kuDJaxN6CJ7bUH5XsNXeQm/Growtele_Dashboard)
Reference captures of every frame: `design/figma/*.png` (file name = `<order>-<figma-node-id>.png`).
Backend contract: `D:\workspace\SMS\CPAAS_backend\docs` (Phase 1 spec, message API, architecture).

Stack: **React 18 + Vite + TypeScript + Tailwind CSS**, static/mock data only (no API calls).

---

## 1. Design system (extracted from Figma)

### Colours (Tailwind tokens)
| Token | Value | Used for |
|---|---|---|
| `brand.navy` | `#161240` | dark gradient start, headings, primary buttons |
| `brand.plum` | `#3A1A4A` | dark gradient mid |
| `brand.maroon` | `#6B2244` | dark gradient end, table header right edge |
| `brand.orange` | `#F58A1F` | logo dot, active-tab underline, credits number, CTA "Buy More Credits" |
| `brand.cream` | `#FFF3E8` | active option card background |
| `brand.creamBorder` | `#F5A623` | active option card border |
| `surface.page` | `#F8F8FB` | page background |
| `surface.card` | `#FFFFFF` | cards, tables |
| `surface.sidebar` | gradient `#FFFFFF → #FFF1EC` | sidebar / topbar warm tint |
| `text.primary` | `#1E1B3A` | headings, table text |
| `text.secondary` | `#6B6B80` | subtitles, labels |
| `line` | `#ECECF3` | borders, dividers |
| `status.success` | `#22C55E` / bg `#E8F8EE` | Active, Delivered, Live |
| `status.danger` | `#EF4444` / bg `#FDECEC` | Failed, delete icon |
| `status.warning` | `#F97316` / bg `#FFF1E6` | Inactive, Scheduled |
| `status.info` | `#3B82F6` / bg `#E8F0FE` | Pending, Suspend |
| `status.violet` | `#6C5CE7` / bg `#ECEBFF` | Submitted KPI, Completed |
| `status.cyan` | `#06B6D4` / bg `#E0F7FA` | Running |

Gradients:
- `bg-brand-gradient`: `linear-gradient(90deg,#161240 0%,#3A1A4A 55%,#6B2244 100%)` — hero tab strips, table headers, primary buttons, credits card, login left panel.
- `bg-sidebar-gradient`: `linear-gradient(180deg,#FFFFFF 0%,#FFF1EC 100%)`.

### Typography
- Display / headings: **Plus Jakarta Sans** (600/700). Page title 28px, section title 20px, card title 16px.
- Body / tables: **Inter** 13–14px. Small meta 11–12px.
- Big numbers (KPI): 28–32px / 700.

### Shape & elevation
- Card radius 16px, hero tab strip 20px, pill buttons 999px, inputs 8px.
- Card shadow: `0 4px 16px rgba(22,18,64,0.06)`; sidebar/topbar shadow softer.

### Icons
`lucide-react` (outline style matches the design: grid, mail, send, users, coins, bar-chart, file-text, code, book-user, bell, calendar-clock, archive, download).

---

## 2. Layout & navigation

### AppShell
```
┌──────────────────────── Topbar (logo · search "Search Pages, Route.." · theme · bell · avatar+name+role) ──┐
│ ┌ Sidebar ┐ ┌──────────────── Page content (max-w 1400, p-6) ────────────────┐                             │
│ │ nav     │ │  [HeroTabs | page title]                                        │                             │
│ │ ...     │ │  [Stat cards]                                                   │                             │
│ │ Credits │ │  [FilterBar]                                                    │                             │
│ │ card    │ │  [DataTable / charts / form]                                    │                             │
│ └─────────┘ └────────────────────────────────────────────────────────────────┘                             │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```
- Sidebar has **expanded** (labels + Monthly Credits card) and **collapsed** (icons only) states; wide-table pages default to collapsed. Toggle stored in a `LayoutContext`.
- Sidebar nav (order from design): Dashboard, Send Now, Campaigns, User Control, Credits, Reports & Analytics (expandable → Detail Report, Summary Report), Operator Analytics, DLT Management, API Management, Contact Management, Notifications, Schedule Manager, Archive, Download.

### Route map (react-router v6)
| Route | Screen | Figma ref |
|---|---|---|
| `/login` | Sign in (split: dark illustration / white form) | 00-login |
| `/` → `/dashboard` | Dashboard | 01 |
| `/send` | Send Now mode picker (OptionPicker + hero image) | 02 |
| `/send/campaign` · `/send/unicode` · `/send/dynamic` · `/send/multi-dynamic` | Compose forms (HeroTabs) | 03–06 |
| `/campaigns` | Campaign list (counts + table) | 07 |
| `/user-control/companies` · `/user-control/companies/new` | Company list / Company Details form | 08, 09 |
| `/user-control/users` · `/user-control/users/new` | User list / User Details + Settings form | 10, 11 |
| `/credits` | *(no frame — simple placeholder with credits card + ledger table)* | — |
| `/reports/summary` | Summary picker | 12 |
| `/reports/summary/overview` · `/header` · `/template` · `/campaign` | Summary tables (HeroTabs + FilterBar + KPI + table) | 13, 15, 17, 19 |
| `/reports/detail` | Detail picker (Search / MIS / Clicker) | 20 |
| `/reports/detail/search` | Message search table | 21 |
| `/reports/detail/mis` | MIS heat-map (day × hour) + channel tabs Web/API/SMPP tables | 23–26 |
| `/reports/detail/clicker` | Clicker summary (KPI + traffic chart + Today Summary) | 29 |
| `/reports/detail/clicker/details` · `/data` | Clicker details / data tables | 28, 30 |
| `/operator-analytics/company` · `/user` | Operator analytics tables | 31, 32 |
| `/dlt` | DLT picker + illustration | 33 |
| `/dlt/entity-ids` · `/sender-ids` · `/templates` · `/bulk-upload` · `/urls` | DLT tabs | 34, 37, 40, 42, 44 |
| `/api-management` | API keys table | 45 |
| `/contacts/groups` · `/contacts/contacts` | Contact management | 46, 47 |
| `/notifications` | *(no frame — placeholder list)* | — |
| `/schedule` | Schedule manager table | 48 |
| `/archive/view` · `/archive/download` | Archive | 49, 50 |
| `/download/data` · `/download/dynamic` | Download data / Dynamic report builder (dual list) | 51, 52 |

Modals (rendered from list pages): Add Entity ID, Add Sender ID (illustrated split modal — 35, 38), Add Template, Add Short URL, Add Group, Add Contact, Generate API.

---

## 3. Component inventory

### `components/layout`
- `AppShell`, `Topbar`, `Sidebar` (+ `SidebarItem`, `SidebarGroup`), `CreditsCard`, `PageHeader` (back arrow + title + subtitle).

### `components/ui` (primitives)
- `Button` — variants: `primary` (brand gradient pill), `outline` (pill), `cta` (orange), `ghost`, `danger`; sizes sm/md.
- `Input`, `Select`, `DateInput`, `PhoneInput` (+91 prefix), `Textarea`, `Checkbox`, `Toggle`, `Label/FormField`.
- `Card`, `Badge`/`StatusBadge` (maps status → colour), `IconTile` (rounded gradient icon square), `Tooltip`, `Modal` (+ `SplitModal` with illustration panel), `Tabs`, `Pagination`.
- `DataTable<T>` — column defs, dark gradient header, optional row checkbox, action cell (edit/delete/toggle), empty state, footer totals row.
- `FileDropzone` ("Choose file or drag & drop · Max 5 MB csv, .xls, .xlsx" + "Download Sample File").

### `components/patterns`
- `HeroTabs` — dark gradient strip with option cards (icon, title, subtitle, arrow/check; active = cream). Used on Send, Summary, Detail, DLT, User Control, Contacts, Archive, Download, Operator Analytics.
- `OptionPicker` — vertical card list variant of HeroTabs for landing/picker pages + right-hand hero image/illustration.
- `StatCard` — icon tile, label, value, delta %, comparison text, sparkline (Recharts `AreaChart`, tiny).
- `CountCard` — icon tile, label, value (Total / Active / Inactive rows).
- `FilterBar` — responsive field row + `Search` + `Download File` (+ optional extra actions).
- `RecipientStats` — dark card (Invalid / Blacklist / Duplicate / Valid / Total credits).
- `PhonePreview` — iPhone mock with SMS bubble.
- `SendOptionsBar` — checkbox row (Remove Duplicate, Remove Invalid, Multi-part, Flash, Schedule, Scrub DND, Recurrence, Allow Unicode) + Send/Cancel.
- `HeatmapGrid` — 31 × 24 numeric grid with highlighted row/cell.
- `DualListPicker` — Available/Selected columns with ›, ‹, », « controls.

### `components/charts` (Recharts)
- `TrafficAreaChart` (Sent vs Delivered, tooltip card), `DeliveryDonut` (3-D-ish donut → flat donut with centre label), `HourlyBarChart` (grouped bars), `OperatorSplitBars` (horizontal gradient bars), `Sparkline`.

---

## 4. Static data model (`src/data`)

Typed to the backend Phase 1 contract where it exists; UI-only fields added on top.

```ts
// types.ts
type MessageStatus = 'RECEIVED'|'PUBLISHED'|'ROUTING'|'SUBMITTED'|'SENT'|'DELIVERED'|'FAILED'|'EXPIRED';
type AccountType = 'PLATFORM'|'RESELLER'|'ENTERPRISE';
type UserRole = 'OWNER'|'ADMIN'|'OPERATOR';
interface Account { id; type; parentId?; name; status:'ACTIVE'|'SUSPENDED'; billingType:'PREPAID'|'POSTPAID'; availableCredits; validityDays; createdAt }
interface User { id; accountId; email; role; status; firstName; lastName; mobile; validityDays }
interface ApiKey { id; accountId; name; keyPrefix; status:'ACTIVE'|'REVOKED'; accountType; matchTemplate; createdAt }
interface MessageRequest { id; accountId; sender; message; clientReference?; priority; validitySeconds?; status; createdAt; recipients: MessageRecipient[] ; channel:'web'|'api'|'smpp'; campaignId? }
interface MessageRecipient { id; phoneNumber; status; operator?; circle?; deliveredAt?; errorCode? }
interface Campaign { id; title; description; type:'Quick'|'Dynamic'|'Multi Dynamic'|'Unicode'; route:'Promotional'|'Transactional'|'Service Implicit'|'Service Explicit'; status; createdAt; deliveryPct }
interface EntityId, SenderId, DltTemplate, ShortUrl, ContactGroup, Contact, ScheduledJob, DownloadJob, ArchiveRow, ClickerRow, HeatmapCell, OperatorSummary, KpiSet
```
Fixture files: `accounts.ts`, `users.ts`, `apiKeys.ts`, `messages.ts`, `campaigns.ts`, `dlt.ts`, `contacts.ts`, `schedule.ts`, `downloads.ts`, `reports.ts` (summary tables, MIS, clicker), `dashboard.ts` (KPIs, traffic series, hourly, operator split, recent campaigns).
`lib/` helpers: `formatDate`, `formatNumber`, `statusMeta(status) → {label,color}`, `maskMsisdn`.

---

## 5. Project structure

```
src/
  main.tsx, App.tsx, index.css (Tailwind + fonts)
  app/router.tsx            # route tree, lazy pages
  app/providers.tsx         # LayoutContext (sidebar), ThemeContext (light only for now)
  components/{layout,ui,patterns,charts}/
  features/
    auth/LoginPage.tsx
    dashboard/DashboardPage.tsx (+ widgets/)
    send/{SendPickerPage,ComposePage,composeModes.ts}
    campaigns/CampaignsPage.tsx
    user-control/{CompaniesPage,CompanyForm,UsersPage,UserForm}
    reports/summary/{SummaryPicker,OverviewPage,HeaderPage,TemplatePage,CampaignPage}
    reports/detail/{DetailPicker,SearchPage,MisPage,ClickerSummaryPage,ClickerDetailsPage,ClickerDataPage}
    operator-analytics/{CompanySummaryPage,UserSummaryPage}
    dlt/{DltPicker,EntityIdsPage,SenderIdsPage,TemplatesPage,BulkUploadPage,UrlsPage,modals/}
    api-management/ApiManagementPage.tsx
    contacts/{GroupsPage,ContactsPage}
    schedule/SchedulePage.tsx
    archive/{ViewArchivePage,DownloadArchivePage}
    download/{DownloadDataPage,DynamicReportPage}
    credits/CreditsPage.tsx, notifications/NotificationsPage.tsx   # placeholders
  data/  lib/  assets/ (logo svg, login illustration, hero images)
```

Dependencies: `react-router-dom`, `recharts`, `lucide-react`, `clsx`, `tailwind-merge`, `date-fns`. Dev: `tailwindcss`, `postcss`, `autoprefixer`, `@types/*`, `eslint`.

---

## 6. Build order

1. **Scaffold** — Vite React-TS, Tailwind config with tokens above, fonts, `index.css` base, folder skeleton, router with placeholder pages.
2. **Shell** — `AppShell`, `Topbar`, `Sidebar` (expanded/collapsed), `CreditsCard`, `PageHeader`. Login page.
3. **Primitives** — Button, Input/Select/Date, Checkbox/Toggle, Card, StatusBadge, IconTile, Modal, DataTable, FileDropzone.
4. **Patterns** — HeroTabs, OptionPicker, StatCard/CountCard, FilterBar, Sparkline.
5. **Dashboard** — KPI row, traffic chart, donut, hourly bars, DLT workspace, recent campaigns, DLT summary, operator split.
6. **Send Now** — picker + 4 compose modes (shared `ComposePage` driven by a mode config: which fields/checkboxes appear).
7. **List pages** (all share FilterBar + CountCards + DataTable): Campaigns, User Control (companies/users + forms), DLT tabs (+ modals), API Management, Contacts, Schedule, Archive, Download.
8. **Reports** — Summary (4 tables), Detail (Search, MIS heat-map + channel tables, Clicker summary/details/data), Operator Analytics.
9. **Polish** — empty states, responsive (sidebar collapses < 1280px, tables scroll horizontally), keyboard focus styles, placeholders for Credits/Notifications.

Assumptions: fonts Plus Jakarta Sans + Inter (Figma font not inspectable in view-only mode); charts flat (Recharts) instead of the 3-D renders; images/illustrations replaced with lightweight SVG/gradient placeholders unless exported assets are supplied.
