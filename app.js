(() => {
  const { concepts, text } = window.DATA;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lang = new URLSearchParams(location.search).get("lang") === "sv-se" ? "sv" : "en";
  let firstRender = true;

  const esc = s => s.replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  const label = key => concepts[key][lang];

  function span(key, content) {
    const c = concepts[key];
    const glow = c.g ? ` g${c.g}` : "";
    return `<span class="c${glow}" style="--c:${c.c}">${esc(content)}</span>`;
  }

  function rich(str) {
    return esc(str).replace(/\[\[([a-z-]+)(?:\|([^\]]+))?\]\]/g, (_, key, custom) => span(key, custom ?? label(key)));
  }

  function item(key, i, extra = "") {
    const c = concepts[key];
    const glow = c.g ? ` g${c.g}` : "";
    return `<div class="item"><div class="dot${glow}" style="--c:${c.c};--d:${(-i * 0.9).toFixed(1)}s;--b:${(i * 0.07).toFixed(2)}s"></div><span>${esc(label(key))}</span>${extra}</div>`;
  }

  function songExtra(key) {
    const c = concepts[key];
    if (!c.artist) return "";
    const aria = text[lang].listenAria.replace("{song}", c.en).replace("{artist}", c.artist);
    return `<small>${esc(c.artist)}</small><a href="https://www.youtube.com/watch?v=${c.yt}" target="_blank" rel="noopener" aria-label="${esc(aria)}">${esc(text[lang].listen)}</a>`;
  }

  function glowExtra(key) {
    const g = concepts[key].g;
    const level = g === 1 ? text[lang].faint : text[lang].medium;
    return `<small>${esc(level)}</small>${songExtra(key)}`;
  }

  function render() {
    const t = text[lang];
    document.documentElement.lang = lang === "sv" ? "sv" : "en";
    document.title = t.docTitle;
    document.querySelectorAll("[data-t]").forEach(el => { el.innerHTML = rich(t[el.dataset.t]); });
    document.querySelectorAll("[data-t-aria]").forEach(el => el.setAttribute("aria-label", t[el.dataset.tAria]));
    document.querySelectorAll("[data-concept]").forEach(el => { el.textContent = label(el.dataset.concept); });

    document.querySelectorAll("[data-dots]").forEach(el => {
      const list = window.DATA[el.dataset.dots];
      const extra = el.dataset.dots === "glowing" ? glowExtra : el.dataset.dots === "songs" ? songExtra : () => "";
      el.innerHTML = list.map((key, i) => item(key, i, extra(key))).join("");
    });

    document.querySelectorAll("[data-words]").forEach(el => {
      el.innerHTML = window.DATA[el.dataset.words].map(key => span(key, label(key))).join("");
    });

    document.querySelectorAll("[data-merge]").forEach(el => {
      const list = window.DATA[el.dataset.merge];
      el.style.setProperty("--n", list.length);
      el.innerHTML = list.map((key, i) => `<div class="dot" style="--c:${concepts[key].c};--i:${i}"></div>`).join("");
      let labels = el.nextElementSibling;
      if (!labels || !labels.classList.contains("merge-labels")) {
        labels = document.createElement("div");
        labels.className = "merge-labels";
        el.after(labels);
      }
      labels.innerHTML = list.map(key => span(key, label(key))).join("");
    });

    document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", String((b.dataset.lang === "sv-se") === (lang === "sv"))));

    if (firstRender && !reduced) {
      animateIn();
    } else {
      document.querySelectorAll(".c").forEach(s => s.classList.add("lit"));
    }
    firstRender = false;
  }

  function lightInOrder(el, start, step) {
    [...el.querySelectorAll(".c")].forEach((s, i) => setTimeout(() => s.classList.add("lit"), start + i * step));
  }

  function animateIn() {
    const title = document.querySelector(".title");
    const sentence = document.querySelector(".sentence");
    lightInOrder(title, 500, 650);
    lightInOrder(sentence, 500 + title.querySelectorAll(".c").length * 650 + 500, 520);

    const heroEls = new Set([title, sentence]);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        if (e.target.matches("[data-dots]")) e.target.classList.add("bloom");
        else lightInOrder(e.target, 150, 280);
      });
    }, { threshold: 0.35 });
    document.querySelectorAll("[data-t], [data-words], .merge-labels, [data-dots]").forEach(el => {
      if (!heroEls.has(el) && (el.querySelector(".c") || el.matches("[data-dots]"))) io.observe(el);
    });
  }

  function startMerge() {
    if (reduced) return;
    document.querySelectorAll(".merge").forEach(el => {
      let timer = null;
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !timer) {
          el.classList.add("together");
          timer = setInterval(() => el.classList.toggle("together"), 3400);
        } else if (!e.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
          el.classList.remove("together");
        }
      }, { threshold: 0.5 }).observe(el);
    });
  }

  document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => {
    lang = b.dataset.lang === "sv-se" ? "sv" : "en";
    const url = new URL(location.href);
    if (lang === "sv") url.searchParams.set("lang", "sv-se"); else url.searchParams.delete("lang");
    history.replaceState(null, "", url);
    render();
  }));

  render();
  startMerge();
})();
