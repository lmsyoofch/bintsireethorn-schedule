# Bint Schedule

A mobile-friendly unofficial fan schedule for Bint Sireethorn Leearamwat, in English, Thai and simplified Chinese. For technical issues or schedule changes, contact [@hcfoo on X](https://x.com/hcfoo). Schedule source: [@bintoupdate](https://www.instagram.com/bintoupdate/). Official hashtag: #bintsireethorn.

## Deploy to your Vercel account

1. Upload the contents of this project to your new GitHub repository. Keep `dist` as a folder.
2. Import that repository into Vercel. Select **Other** as the framework.
3. Leave the build command empty. Set the output directory to **dist** if Vercel does not pick it up from `vercel.json`.
4. Deploy. No API key, database or environment variable is required.

The private demo uses a separate hosting configuration. The final ZIP for Vercel excludes that configuration and Git metadata.

## Edit events directly in GitHub

Open **dist/data/events.json**, click Edit, change the relevant entry and commit. A connected Vercel project redeploys after each commit. Keep the file valid JSON, including commas between records and double quotes around keys. Duplicate an existing entry to add an event and give it a unique `id`.

| Field | How to use it |
| --- | --- |
| `id` | Unique identifier, for example `bint-2026-10-01-brand` |
| `date` | First date in the event’s local time, `YYYY-MM-DD` |
| `end_date` | Last date for a multi-day block, otherwise `null` |
| `start_time`, `end_time` | Local 24-hour time, `HH:MM`; use `null` when not announced |
| `timezone` | IANA zone, such as `Asia/Bangkok`, `Asia/Kuala_Lumpur`, `Asia/Shanghai`, `Europe/Madrid` or `America/Sao_Paulo`. Use `null` only if unknown |
| `country` | Two-letter country code such as `TH`, `MY`, `CN`, `ES` or `BR`; `null` if unannounced |
| `title`, `venue`, `notes` | Objects with `en`, `th` and `zh` translations |
| `category` | An ID from the categories file |
| `status` | `confirmed`, `tentative`, `details_tbc`, `cancelled`, `postponed` or `completed` |
| `access` | `public`, `closed`, `invite`, `online`, `meet`, `after`, `perimeter` or `tbc` |
| `source` | Original public announcement URL or the source account URL |
| `source_poster` | Optional local poster path, for example `assets/posters/new-poster.jpeg` |

To move an event to another country, update its date, times, country, venue and IANA time zone together. The local-time switch and Google Calendar links then convert its confirmed time automatically, including daylight saving where applicable. A local date and time within a daylight-saving clock-change gap or repeated hour should be checked before publication.

## Manage categories

Edit **dist/data/categories.json**. Each entry has an `id`, a translated `label` with `en`, `th` and `zh` values and a six-digit hex `colour`. Categories populate the filter and dashboard automatically. Rename a label without changing its ID to preserve existing events. When deleting or changing an ID, update all events that use it.

## Behaviour and counting

- The schedule opens on the current month if it has entries, otherwise the latest month with published entries. Reset displays all records. The same filters apply to Schedule and Dashboard.
- Events are grouped by month and listed from earliest to latest, regardless of status. Previous/next month arrows browse the published months. Completed entries stay in place with muted charcoal cards and readable text. Upcoming entries use brighter rose surfaces, gold borders and date circles with an explicit status label. An explicit end time determines completion. If the end time is unknown, the entry becomes completed after its last published date in its own time zone. When the time zone is unknown, UTC is used only for this date-boundary check.
- Cancelled and postponed entries remain visible with clear labels and have no calendar button.
- Google Calendar opens an editable draft; it does not silently add an event. An unannounced time becomes an all-day reminder with an explanatory note. When only a start time is known, the draft uses one hour and explicitly labels that duration as a placeholder.
- One entry counts once, including a multi-day filming block. Totals include cancelled and postponed entries. Upcoming excludes both. Countries count announced country codes only. The dashboard describes the supplied records, not all of Bint’s work.
- The initial 32 records come from the supplied May to September 2026 posters. A 33rd entry adds the 22 September ELLE Fashion Week 2026 press conference, from the supplied @ohstarhunter announcement. The detailed 18 September poster expands the monthly PR entry into separately announced appearances. The evening MAHIRA livestream appears only once. The event-specific Praew poster supplies the Eden Zone venue. Unknown confidential destinations remain unannounced.
- The language preference stays on the visitor’s device. There is no public admin page or visitor account.

## Files

- `dist/index.html`: page structure and profile
- `dist/styles.css`: pink, black and gold theme and responsive layouts
- `dist/app.js`: translated interface, filters, dashboard and event details
- `dist/core.js`: date conversion and Google Calendar generation
- `dist/data/`: editable events and categories
- `dist/assets/`: supplied portrait and original source posters

The supplied photographs and posters retain their original ownership. Source credit does not transfer copyright.

## Local development

Run `npm install` followed by `npm run dev` to preview changes. Vite is a development dependency only. The production site remains static and Vercel serves `dist` without a build command. Filters and time-zone options are in the collapsible panel above the monthly schedule.
