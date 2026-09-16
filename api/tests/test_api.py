from fastapi.testclient import TestClient

from main import Brief, app, recommend

client = TestClient(app)


def test_health_names_demo_inventory():
    assert client.get("/health").json() == {"status": "ok", "inventory": 4, "demoData": True}


def test_family_trip_ranks_pocket_storyteller_first():
    result = client.post("/recommendations", json={"scenario": "family-trip", "budget": 1200, "experience": "beginner", "priority": "easy"})
    assert result.status_code == 200
    body = result.json()
    assert body["matches"][0]["id"] == "travel-light"
    assert body["demoData"] is True


def test_budget_is_a_hard_filter():
    matches = recommend(Brief(scenario="family-trip", budget=1000, experience="beginner", priority="easy"))
    assert matches
    assert all(match["price"] <= 1000 for match in matches)


def test_low_light_priority_favors_indoor_kit():
    matches = recommend(Brief(scenario="kids-indoors", budget=1500, experience="returning", priority="low-light"))
    assert matches[0]["id"] == "memory-maker"


def test_no_match_has_named_recovery():
    body = client.post("/recommendations", json={"scenario": "portraits", "budget": 500, "experience": "beginner", "priority": "easy"}).json()
    assert body["count"] == 0
    assert "$899" in body["recovery"]


def test_rejects_budget_below_bound():
    response = client.post("/recommendations", json={"scenario": "family-trip", "budget": 299, "experience": "beginner", "priority": "easy"})
    assert response.status_code == 422


def test_rejects_unknown_scenario():
    response = client.post("/recommendations", json={"scenario": "wedding", "budget": 1200, "experience": "beginner", "priority": "easy"})
    assert response.status_code == 422


def test_rejects_unknown_priority():
    response = client.post("/recommendations", json={"scenario": "family-trip", "budget": 1200, "experience": "beginner", "priority": "cheapest"})
    assert response.status_code == 422
