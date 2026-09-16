"use client";

import { useMemo, useState } from "react";
import { Aperture, BadgeCheck, Camera, Check, ChevronRight, CircleAlert, Gauge, LoaderCircle, Scale, Sparkles } from "lucide-react";
import kits from "../data/kits.json";

type Scenario = "family-trip" | "kids-indoors" | "landscape" | "portraits";
type Priority = "easy" | "light" | "low-light" | "flexible";
type Kit = (typeof kits)[number];
type Ranked = Kit & { score: number; fitReasons: string[] };

const scenarioLabels: Record<Scenario, string> = {
  "family-trip": "Family trip", "kids-indoors": "Kids indoors", landscape: "Landscapes", portraits: "Portraits",
};
const priorities: { id: Priority; label: string }[] = [
  { id: "easy", label: "Easy to use" }, { id: "light", label: "Carry less" },
  { id: "low-light", label: "Indoor light" }, { id: "flexible", label: "Room to grow" },
];

function rankKits(scenario: Scenario, budget: number, priority: Priority): Ranked[] {
  return kits.filter((kit) => kit.price <= budget).map((kit) => {
    const scenarioFit = kit.scenarios.includes(scenario) ? 42 : 12;
    const dimension = priority === "easy" ? kit.beginnerFit : priority === "light" ? kit.portability : priority === "low-light" ? kit.lowLight : kit.flexibility;
    const budgetHeadroom = Math.max(0, Math.min(18, ((budget - kit.price) / budget) * 35));
    const score = Math.round(Math.min(98, scenarioFit + dimension * 4 + budgetHeadroom));
    const fitReasons = [scenarioFit === 42 ? `Built for ${scenarioLabels[scenario].toLowerCase()}` : "Adaptable outside its specialty", kit.strengths[0], `$${budget - kit.price} under budget`];
    return { ...kit, score, fitReasons };
  }).sort((a, b) => b.score - a.score);
}

export default function Home() {
  const [scenario, setScenario] = useState<Scenario>("family-trip");
  const [priority, setPriority] = useState<Priority>("easy");
  const [budgetText, setBudgetText] = useState("1200");
  const [experience, setExperience] = useState("beginner");
  const [results, setResults] = useState<Ranked[] | null>(null);
  const [selected, setSelected] = useState<Ranked | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const budget = Number(budgetText);
  const summary = useMemo(() => results?.[0], [results]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setSelected(null);
    if (!Number.isFinite(budget) || budget < 300 || budget > 5000) {
      setError("Set a realistic used-kit budget between $300 and $5,000."); setResults(null); return;
    }
    setError(""); setLoading(true);
    window.setTimeout(() => { setResults(rankKits(scenario, budget, priority)); setLoading(false); }, 450);
  }

  return <>
    <a className="skip" href="#brief">Skip to camera brief</a>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="LensLoop home"><span><Aperture /></span>LensLoop</a>
      <nav aria-label="Page"><a className="active" href="#brief">Kit brief</a><a href="#method">Method</a></nav>
      <p className="demo"><i /> FICTIONAL INVENTORY · SIMULATED MATCHING</p>
    </header>
    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <span className="kicker"><Sparkles size={14} /> OUTCOME FIRST · GEAR SECOND</span>
          <h1>Tell us the <em>moment.</em><br/>We’ll find the camera.</h1>
          <p>Skip the spec-sheet maze. Describe what you want to capture and get a transparent shortlist from verified, fictional used kits.</p>
          <a href="#brief">Build my kit brief <ChevronRight size={16}/></a>
        </div>
        <div className="viewfinder" aria-hidden="true">
          <span className="corner tl"/><span className="corner tr"/><span className="corner bl"/><span className="corner br"/>
          <div className="focus"><Camera/><b>FAMILY TRIP</b><small>1/250 · f/4 · AUTO</small></div>
          <div className="exposure">− · · <strong>0</strong> · · +</div>
        </div>
      </section>
      <section className="trust-strip" aria-label="How it works">
        <div><BadgeCheck/><span><b>01 · Verified condition</b><small>Every demo kit has a visible grade.</small></span></div>
        <div><Gauge/><span><b>02 · Fit, not hype</b><small>Hard budget filter and legible scores.</small></span></div>
        <div><Scale/><span><b>03 · Honest tradeoffs</b><small>Every recommendation names a downside.</small></span></div>
      </section>
      <section className="workspace" id="brief">
        <div className="section-title"><span>CAMERA BRIEF 01</span><h2>What are you trying to capture?</h2><p>Four inputs. No camera vocabulary required.</p></div>
        <div className="grid">
          <form className="brief" onSubmit={submit}>
            <div className="panel-head"><div><small>YOUR OUTCOME</small><h3>Build the brief</h3></div><Camera/></div>
            <div className="form-body">
              <fieldset><legend>Moment</legend><div className="choices scenario">{(Object.keys(scenarioLabels) as Scenario[]).map((id) => <button type="button" className={scenario === id ? "on" : ""} onClick={() => {setScenario(id); setResults(null); setSelected(null);}} key={id}>{scenarioLabels[id]}</button>)}</div></fieldset>
              <div className="two">
                <label><span>Maximum budget</span><div className="money"><i>$</i><input aria-label="Maximum budget" inputMode="numeric" value={budgetText} onChange={(e) => setBudgetText(e.target.value)} /></div></label>
                <label><span>Experience</span><select aria-label="Experience" value={experience} onChange={(e) => setExperience(e.target.value)}><option value="beginner">First real camera</option><option value="returning">Returning hobbyist</option><option value="confident">Confident shooter</option></select></label>
              </div>
              <fieldset><legend>What matters most?</legend><div className="choices priority">{priorities.map((item) => <button type="button" className={priority === item.id ? "on" : ""} onClick={() => {setPriority(item.id); setResults(null); setSelected(null);}} key={item.id}>{item.label}</button>)}</div></fieldset>
              {error && <div className="error" role="alert"><CircleAlert size={16}/>{error}</div>}
            </div>
            <div className="form-foot"><p><CircleAlert size={15}/>Demo scores use fictional inventory and deterministic rules—not AI or professional buying advice.</p><button className="run" disabled={loading}>{loading ? <><LoaderCircle className="spin"/>Matching kits…</> : <>Find my camera kit <ChevronRight/></>}</button></div>
          </form>
          <aside className="results" aria-live="polite">
            <div className="panel-head"><div><small>SHORTLIST</small><h3>Your best-fit kits</h3></div><Aperture/></div>
            <div className="result-body">
              {loading && <div className="empty"><LoaderCircle className="spin"/><h4>Reading the brief</h4><p>Applying budget, moment, and priority constraints.</p></div>}
              {!loading && !results && <div className="empty"><div className="reticle"><Camera/></div><h4>The moment comes first.</h4><p>Complete the brief to reveal a transparent ranked shortlist.</p></div>}
              {!loading && results?.length === 0 && <div className="empty no"><CircleAlert/><h4>No honest match</h4><p>No fictional verified kit fits this budget. Raise it above $899 or change the brief.</p></div>}
              {!loading && summary && <>
                <div className="verdict"><span><small>TOP MATCH</small><strong>{summary.score}<i>/100</i></strong></span><p>{scenarioLabels[scenario]} · {experience === "beginner" ? "first camera" : "experienced"}</p></div>
                <div className="cards">{results!.slice(0, 3).map((kit, index) => <button type="button" key={kit.id} className={`kit ${selected?.id === kit.id ? "selected" : ""}`} onClick={() => setSelected(kit)}>
                  <span className="rank">0{index + 1}</span><span className="kit-main"><strong>{kit.name}</strong><small>{kit.body} + {kit.lens}</small><em><BadgeCheck size={12}/> {kit.condition}</em></span><span className="price"><b>${kit.price.toLocaleString()}</b><small>{kit.score}% fit</small></span>
                </button>)}</div>
                {selected && <div className="selection"><Check/><div><strong>Brief locked: {selected.name}</strong><small>{selected.fitReasons[0]} · {selected.fitReasons[2]}</small><p><b>Tradeoff:</b> {selected.tradeoff}</p></div></div>}
              </>}
            </div>
          </aside>
        </div>
      </section>
      <section className="method" id="method"><span>THE WEDGE</span><h2>A trusted brief before a marketplace.</h2><p>This prototype tests whether an outcome-first shortlist can earn buyer intent. Listings, payments, rentals, insurance, and real inventory are deliberately excluded.</p><div><b>$29</b><small>proposed refundable brief deposit</small><b>4 / 10</b><small>target deposit conversion in discovery</small><b>&lt; 4 min</b><small>target unassisted completion time</small></div></section>
    </main>
    <footer><a className="brand" href="#top"><span><Aperture/></span>LensLoop</a><p>Fictional prototype · No real gear, sellers, inventory, prices, or transactions.</p><a href="https://www.ideabrowser.com/hub/ideas/a-marketplace-for-camera-gear-that-owners-have-not-listed-19cb2235">Public source ↗</a></footer>
  </>;
}
