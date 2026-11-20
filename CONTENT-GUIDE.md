# Portfolio Content Guide

How to add, update and delete anything on Koteswara Rao Doppalapudi's portfolio, entirely from the **Portfolio Admin** app: no code, JSON, Git commands or manual deploys.

**Short version:** open the Portfolio Admin, sign in, choose **Koteswara Rao Doppalapudi** if asked, open a section, make your change, press **Save**. The portfolio updates within about 1–2 minutes. The status at the top of the admin shows **Updating portfolio…** and then **Portfolio is up to date**.

> Every action that changes content (Save, Delete, Restore, the Visible switch, ↑/↓) saves straight to the portfolio. Use **Preview** in any form to see the real page with your change before saving. **Version History** can undo any save.

---

## 0. Getting in

1. Open the Portfolio Admin URL and sign in.
2. If your account manages more than one portfolio, choose **Koteswara Rao Doppalapudi** (or switch with the **Portfolio** menu at the top of the sidebar). A Koti-only account goes straight to this portfolio.
3. The menu lists this portfolio's sections: Profile, Hero & SEO, Modules, Processes, Expertise, Experience, Skills, About & Education, Contact.

The account's portfolio access is enforced by the Admin server. With Koti selected, Save, Delete, Restore, uploads and Version History operate on Koti's content and repository only; the site's own build then publishes the change. Pavan's portfolio remains separate.

## 1. Add something

Example: a new module tile.

1. Admin → **Modules** → **+ Add module**.
2. Fill in **Module name**, **Short code** (e.g. `BNK`) and **Description**. Required fields are marked `*`.
3. Optional: **Preview** opens the page at the Modules section with the new tile.
4. Press **Add module**. You'll see *"Module added successfully."* It's live when the status shows **Portfolio is up to date**.

The same steps add a **process** (tab), **work area** (Expertise card), **job** (Experience) or **skill group**.

## 2. Update something

Example: add a step to a process.

1. Admin → **Processes** → **Edit** on the process (e.g. *Procure-to-Pay*).
2. Under **Steps**, use **+ Add step**, then fill **Step title** and **What was configured** (one item per line). ↑/↓ reorder steps; **Remove** deletes one.
3. Optional: **Preview**.
4. Press **Save changes**. You'll see *"Process updated successfully."*

For single sections (**Profile**, **Hero & SEO**, **About & Education**, **Contact**), edit the fields and press that form's **Save**. **Undo changes** puts the form back.

## 3. Delete something

1. Admin → the section → **Delete** on the entry.
2. Confirm: *"Are you sure you want to delete this …?"* → **Delete**. It leaves the portfolio after the next update and moves to the **Deleted** tab.
3. **Undo:** **Deleted** tab → **Restore**. **Delete for good:** **Deleted** tab → **Delete permanently** (then only Version History can bring it back).

## 4. Hide, archive, reorder

| Action | How | Effect |
|---|---|---|
| Hide / show | The **Visible** switch | Hidden entries stay in the admin but aren't on the page |
| Archive | **Archive** (undo: **Archived** tab → **Restore**) | Removed from the page, kept for later |
| Reorder | **↑ / ↓** | The page shows entries in this order. The first process is the tab that opens first. |

## 5. Undo a change (Version History)

Admin → **Version History** → **View** (preview + what would change) → **Restore** → confirm. The portfolio goes back to that version, saved as a new version, so nothing is lost.

---

## Where each admin section shows on the page

| Admin section | Page |
|---|---|
| **Profile** | Name (hero, footer), short name and initials (header logo), role (hero label, footer), header tagline, email/phone/LinkedIn/location (Contact and footer; empty ones are hidden), years of experience and current client (hero facts; the client also appears in the Expertise intro), photo, CV file (every Download CV button). |
| **Hero & SEO** | The paragraph under your name; the browser-tab title and search description. |
| **Modules** | The Workday Financials tiles. A module named like a skill icon (e.g. *General Ledger*) gets that icon and colour. The hero's module count updates by itself. |
| **Processes** | The tabbed "How finance flows through the tenant" section and its numbered steps. |
| **Expertise** | The "Areas of expertise" cards. The first 3 responsibilities show; the rest are behind "Show N more". The card icon comes from the ID (see the hint under **Advanced → ID**). |
| **Experience** | The timeline. Tick **current job** for the green date pill. Fill **Project name** to show the project fact box (client, role, team size). |
| **Skills** | The skill groups and chips. Icons are matched from each skill's name. |
| **About & Education** | The About paragraphs, the "Core concepts" card and the Education card (score is optional). |
| **Contact** | The sentence under "Let's talk Workday Finance". |

## Tips

- **Photo and CV:** use **Upload** next to the field, then **Save**. JPG, PNG, WebP, GIF, PDF or DOCX, up to 3 MB. A PDF CV opens in any browser. Uploaded files, including the CV with phone and email, are public.
- **Years of experience:** also update the number in the first About paragraph.
- **"The portfolio changed elsewhere":** another tab or device saved first. Press **Reload Latest** and redo your change; nothing was overwritten.
- **Still "Updating portfolio…" after 5 minutes:** check the portfolio's latest deployment in Vercel.
- **What still needs a code change:** section headings and labels, menu labels, colours and fonts, icons, and the sample Workday screens in the hero (they are illustrative; don't put real client data there).
