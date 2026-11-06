# Energy & Ecology Gizmo

An interactive, Gizmo-style learning tool for high school biology (Unit 4: Energy & Ecology). Students zoom from planet Earth down to a quark, learn how energy moves through ecosystems, experiment with energy pyramids, play review games, and finish with a 20-question multiple-choice quiz.

**Live version:** https://iamclau.github.io/energy-pyramids-gizmo/

## What's inside

| Section | What students do |
|---|---|
| **1 · Zoom In** | A continuous "powers of ten" zoom through all 14 levels of organization (ecosphere → biosphere → ecosystem → … → atom → subatomic particles → quarks). Scroll, pinch, drag, use the slider, or take the auto tour. Each level shows its definition, an example, its approximate size, and how it connects to energy. Includes the **Zoom Challenge** game. |
| **2 · Learn** | Seven lesson cards: energy from the Sun, producers and consumers, trophic levels and food chains, the 10% rule (with a live calculator), where the other 90% goes, the three ecological pyramids, and why top predators are rare. Each card ends with a quick check. |
| **3 · Pyramid Lab** | A simulation. Choose an ecosystem (meadow, pond, ocean), the energy captured by producers, the transfer efficiency (5–20%) and the number of trophic levels. Switch between energy, biomass and numbers pyramids on a true or log scale, and run an animated energy flow. Includes a data table and five lab challenges. |
| **4 · Games** | Pyramid Builder, 10% Rule Rush (60-second timed math), Pass It Up or Lose It? (sorting where energy goes), and the Zoom Challenge. Best scores are saved in the browser. |
| **5 · Quiz** | A bank of 117 multiple-choice questions. Each quiz pulls 20 at random (no repeats until the whole bank has been seen), shows every answer with an explanation at the end, and can be retaken as many times as students want. |

Students earn XP throughout. Progress, XP and best scores are stored only in each student's own browser (localStorage). Nothing is sent anywhere.

## Files

- `index.html` — the whole app in one self-contained file. Open it in any browser, or host it anywhere.
- `src/` — the source, split into readable pieces. To rebuild `index.html` after editing: `python3 src/build.py`

## Credits

Made for Mr. McLauchlan's Biology classes. Content follows the Unit 4 Energy & Ecology slides.
