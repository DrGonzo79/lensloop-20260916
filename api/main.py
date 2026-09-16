from pathlib import Path
import json

from fastapi import FastAPI
from pydantic import BaseModel, Field

DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "kits.json"
KITS = json.loads(DATA_PATH.read_text())

app = FastAPI(title="LensLoop recommendation API", version="0.1.0")


class Brief(BaseModel):
    scenario: str = Field(pattern="^(family-trip|kids-indoors|landscape|portraits)$")
    budget: int = Field(ge=300, le=5000)
    experience: str = Field(pattern="^(beginner|returning|confident)$")
    priority: str = Field(pattern="^(easy|light|low-light|flexible)$")


def recommend(brief: Brief) -> list[dict]:
    dimension = {
        "easy": "beginnerFit",
        "light": "portability",
        "low-light": "lowLight",
        "flexible": "flexibility",
    }[brief.priority]
    ranked = []
    for kit in KITS:
        if kit["price"] > brief.budget:
            continue
        scenario_fit = 42 if brief.scenario in kit["scenarios"] else 12
        headroom = max(0, min(18, ((brief.budget - kit["price"]) / brief.budget) * 35))
        score = round(min(98, scenario_fit + kit[dimension] * 4 + headroom))
        ranked.append({
            **kit,
            "score": score,
            "fitReasons": [
                "Direct scenario fit" if scenario_fit == 42 else "Adaptable outside its specialty",
                kit["strengths"][0],
                f"${brief.budget - kit['price']} under budget",
            ],
        })
    return sorted(ranked, key=lambda item: item["score"], reverse=True)


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "inventory": len(KITS), "demoData": True}


@app.post("/recommendations")
def recommendations(brief: Brief) -> dict:
    matches = recommend(brief)
    return {
        "matches": matches,
        "count": len(matches),
        "demoData": True,
        "recovery": None if matches else "Increase budget to at least $899 or change the brief.",
    }
