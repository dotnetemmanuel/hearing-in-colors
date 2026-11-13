# Hearing in colors: site design

## Intent

Emmanuel has a form of synesthesia: concepts (days, months, numbers, words,
people, places, ideas, songs) each have a precise color that he sees in his
mind's eye. The color belongs to the concept and its meaning together, not to
the spelling: Monday, måndag and lundi share one color. Explaining this out loud
fails ("Vasagatan is mustard yellow" sounds arbitrary), so this site shows it
instead, built from his own recorded colors.

It is a personal, first-person page he can send as a link, for example to a
colleague who asked "what color am I?". It should be beautiful and alive:
animated, playful, faithful to what he sees.

## Core messages (in priority order)

1. These colors are what I experience. They are exact tones, not "green" or
   "blue".
2. No color is better or worse than another. Grey is not worse than green.
   (Origin story: a colleague asked her color, heard "grey", and took it badly.)
3. There is no logic I can explain. Calm is pink, anger is plum, joy is green.
4. Some things glow.

## Goals

- One page, English and Swedish, with a language toggle.
- Show the colors through good, honest data visualization of real examples.
- Animate with purpose: words coloring in, circles breathing, glows pulsing.
- Readable on a phone.

## Non-goals

- A complete catalogue of every concept. Examples are enough.
- A general explainer of synesthesia as a condition. The word appears once, in
  the explanation, to name it.
- Letting visitors enter their own words. There is no way to know their color.

## Anti-goals (failure even if it works)

- Any visual that implies colors have value: no scales, no rankings, no sorting
  from "best" to "worst", no warm-means-good legends. Colors sit side by side
  as equals.
- Naming real people. Family appears only by role ("my wife", "my eldest").
- Using concepts whose color comes from the world (the sea, the forest) or
  from brands. Countries are marked as possibly influenced by flags.
- Changing his colors for legibility. A pale yellow word that is hard to read
  stays pale yellow: that is the experience.

## Approaches considered

1. **One hand-built static page, no build tooling. Chosen.** One HTML page,
   one stylesheet, one script, one data file holding colors and both
   languages. Simple, lasting, nothing to maintain.
2. A static site generator (Astro, Eleventy) producing separate English and
   Swedish pages. Better search and link previews per language; rejected as
   tooling overhead for a single page.
3. Scroll-driven animation library (D3, Scrollama). Most striking; rejected
   because it is fragile on phones and shows half-finished states to skimmers.
   Emmanuel still wants it "cool and creative with animations", so approach 1
   carries rich CSS and light JS animation without a scroll framework.

## Decisions already made

### Hosting
- New public GitHub repo `hearing-in-colors`, served by GitHub Pages.
- Local folder: `~/Source/Personal/hearing-in-colors`.

### Languages
- English is the default, and link previews (title, description, image) are
  in English.
- A toggle switches to Swedish. Swedish is addressable with a `sv-se` URL
  argument (for example `?lang=sv-se`), so a shared Swedish link opens in
  Swedish. The toggle updates the URL to match.

### Look
- **Light mode only.** Emmanuel found a dark surround changes how he perceives
  the tones. The page background is a near-white neutral with no tint.
- Direction is a blend of two mockups he liked: "Mind's eye" (colors as soft
  breathing circles) and "Words light up" (sentences in grey whose words color
  in one by one).
- Circles have **crisp edges**. Only things that truly glow get a halo; a soft
  blur on everything read as glow and was rejected.
- **Words are colored as letters**, never as a highlight behind the word, even
  when that makes a pale word hard to read. Use large, heavy type for colored
  sentences so each letter carries more color.

### Glow
- Three levels exist in the data: faint (1), clear/medium (2), strong (3).
  Today: June faint, "Hang Onto Yourself" faint, "Superfreaky Memories" medium.
- A glow is a same-color halo fading outward, pulsing slowly.
- Respect `prefers-reduced-motion`: show the halo still, no pulsing or
  coloring-in animation, final state visible.

### Title
- English: **"My wife is green, calm is pink and anger is plum: hearing in
  colors, and no, I can't explain it"**
- Swedish: **"Min fru är grön, lugn är rosa och ilska är plommonlila: att höra
  i färger, och nej, jag kan inte förklara det"**
- The concept words (wife, calm, anger / fru, lugn, ilska) are drawn in his
  exact tones and color in on load.
- American spelling ("colors") throughout the English version.

### Opening sentence
Below the title, a sentence starts grey and colors in word by word:
- English: "On Thursday in June, I walked down Vasagatan."
- Swedish: "En torsdag i juni gick jag nerför Vasagatan."
- "On"/"En" and "in"/"i" have no color and stay neutral. Every other word has
  one (see data). June glows faintly. "down" uses the color of the concept
  "down"; his note says it is not the color of "along", hence "nerför", not
  "längs".
- Caption: "This is what reading a sentence is like for me." / "Så här är det
  för mig att läsa en mening."
- Almost every word has a color for him, so new example sentences must have
  every word's color recorded first. Never assume a word is colorless.

### Sections, in order
1. **What this is.** Name it once as synesthesia, in his kind: concepts have
   colors. Word + concept + meaning together; Monday = måndag = lundi. Small
   proof: "I" and "Myself" are the same tone.
2. **My week, my year.** Seven breathing circles, then twelve. Shows that
   sequences do not flow like a rainbow.
3. **"I think you're grey"** (heading, both languages). The colleague story.
   Her actual grey, unnamed as "a colleague" (concept `a-colleague` in the
   collector), gets its own moment: one large breathing circle alone, labeled
   "A colleague", with the story around it. No comparison row. Message: grey
   gets the same stage as any bright color. Approved story text is below.
4. **Not what you'd expect.** Calm pink, anger plum, joy green, fear navy,
   autumn violet, winter pale pink. Love red and death black are the only
   "expected" ones, worth saying.
5. **Same tone, different things.** Unrelated concepts sharing nearly one
   tone (silence, joy, sleep, truth: one deep green). Recheck clusters
   against current data; the Oasis song moved lighter and may drop out.
6. **A few things glow.** June and the glowing songs, each song with a player
   beside it. For songs the color comes from the sound and the feeling, not
   the title, so visitors must be able to listen.
7. **What I leave out.** The sea and forest ("it's just like asking me about
   snow"), and countries flagged as possibly shaped by flags (Sweden yellow,
   France blue).

### Approved text: "I think you're grey"

English:

> **I think you're grey**
>
> A colleague once asked me what color she was. I said grey. She looked hurt.
>
> I didn't mean anything by it. To me grey isn't dull or sad, and it isn't
> less. It says nothing about who she is. It's simply her color, as exact as
> my wife's green or the yellow of a Thursday.
>
> None of my colors are good or bad. They aren't moods or opinions. They're
> just there, the way a voice has a pitch.

Swedish:

> **Du är grå**
>
> En kollega frågade mig en gång vilken färg hon hade. Jag sa grå. Hon såg
> sårad ut.
>
> Jag menade ingenting illa. För mig är grått inte tråkigt eller sorgligt,
> och det är inte mindre värt. Det säger ingenting om vem hon är. Det är helt
> enkelt hennes färg, lika exakt som min frus gröna eller gult en torsdag.
>
> Ingen av mina färger är bra eller dålig. De är inte stämningar eller
> åsikter. De bara finns där, så som en röst har en tonhöjd.

## Data

- Source of truth: the collector artifact
  `https://claude.ai/artifact/Gvwd2jxsJMCCHQfCRNgFPU`, collection `concepts`.
  Read it with the ArtifactData tool, never re-type colors by hand.
- Each document: `label`, `group` (Days, Months, Seasons, Numbers, People,
  Places, Ideas, Sentence, Your own), `color` (hex), `colorOklch`, optional
  `color2`, `glow` (0 to 3), `none` (true means no color, or skipped as
  biased), `note`.
- The site ships a snapshot of the data needed, plus Swedish labels for every
  concept shown. The collector stays open for corrections; refreshing the
  snapshot is a manual step.
- Swedish translations of concept labels and all copy must be reviewed by
  Emmanuel before publishing.

## Calls made without asking (Emmanuel to check)

- **Second colors.** No concept uses `color2` today. If one appears, draw the
  circle split in two halves and color its letters with the main color only.
- **People.** The data holds roles only (myself, my wife, my eldest, my
  youngest); no names exist to filter. Ship them as roles.
- **Section 5 groups.** The builder proposes clusters from measured color
  distance; Emmanuel approves the groups before the section is laid out.

## Left to the builder

- Exact typefaces, spacing, and animation timings, within the decisions above.
- Song player: privacy-friendly embed (for example YouTube's no-cookie mode),
  loaded only when the visitor presses play. Builder's call on provider;
  Emmanuel confirms which recording of each song.
- Copy drafts for each section in both languages, in first person, short.
- Page description and social preview image (English, see Languages).
