#!/usr/bin/env python3
"""Generates src/data/photos.ts: 30 real photos + 7 hand-authored documents + 393 seeded generated entries (=> 430 total).
Run: python3 scripts/generate_library.py   (deterministic, seed=42)"""
import json, random, re, datetime as dt, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "src/data/photos.ts"
REF = dt.date(2026, 10, 5)
rng = random.Random(42)

# ---- 1. keep the hand-authored entries (30 real photos + 7 docs) from the existing file ----
src = OUT.read_text()
base = json.loads(src[src.index("export const photos: Photo[] = ") + len("export const photos: Photo[] = "):].rstrip().rstrip(";"))
base = [b for b in base if b.get("source") != "generated"]
for b in base:
    b["source"] = "real" if b["kind"] == "photo" else "handmade-doc"

# ---- 2. vocab ----
IN_NATURE = ["Chopta, Uttarakhand","Manali, Himachal Pradesh","Kasol, Himachal Pradesh","Pangong, Ladakh","Munnar, Kerala","Coorg, Karnataka","Lonavala, Maharashtra","Nainital, Uttarakhand","Rishikesh, Uttarakhand","Spiti Valley, Himachal Pradesh"]
IN_CITY = ["Mumbai, India","Goa, India","Pune, India","Jaipur, India","Delhi, India","Hampi, Karnataka","Udaipur, Rajasthan"]
ABROAD = ["Banff, Canada","Zurich, Switzerland","Bali, Indonesia","Kyoto, Japan","Lisbon, Portugal"]
LAKE_LOCS = ["Pangong, Ladakh","Nainital, Uttarakhand","Udaipur, Rajasthan","Chopta, Uttarakhand","Spiti Valley, Himachal Pradesh","Manali, Himachal Pradesh","Munnar, Kerala","Banff, Canada","Zurich, Switzerland","Kyoto, Japan"]
ALL_LOCS = IN_NATURE + IN_CITY + ABROAD
TODS = ["morning","afternoon","sunset","night"]
SKIES = ["clear","cloudy","foggy"]
EMOJI = {"lake":"🏞️","trek":"🥾","beach":"🏖️","sunset":"🌇","city":"🏙️","temple":"🛕","food":"🍜","flowers":"🌸","pet":"🐕","vehicle":"🚗","home":"🛋️","waterfall":"💧","snow":"❄️","fort":"🏰","people":"🙂","group":"👥","doc":"📄"}

def rdate(start, end):
    d = (end - start).days
    return (start + dt.timedelta(days=rng.randint(0, d))).isoformat()

def hue_pair(): 
    a = rng.randint(0, 359); return a, (a + rng.randint(25, 70)) % 360

SCENES = {  # name: (weight, setting, objects_pool, fixed_objects, locs, animals)
 "lake":     (16,"outdoor",["mountains","boat","reflection","forest","tent","kayak"],["lake","water"],LAKE_LOCS,[]),
 "trek":     (11,"outdoor",["mountains","trail","tent","valley","snow","forest","backpack"],[],IN_NATURE+["Banff, Canada"],[]),
 "beach":    (7,"outdoor",["beach","sea","waves","palm trees","boat","sand"],[],["Goa, India","Gokarna, Karnataka","Bali, Indonesia","Lisbon, Portugal"],[]),
 "sunset":   (6,"outdoor",["sky","sea","mountains","city","clouds"],["sunset"],ALL_LOCS,[]),
 "city":     (8,"outdoor",["building","street","bridge","monument","cars","market"],[],IN_CITY+ABROAD,[]),
 "temple":   (4,"outdoor",["temple","statue","lamps","courtyard"],[],["Hampi, Karnataka","Rishikesh, Uttarakhand","Jaipur, India","Kyoto, Japan"],[]),
 "food":     (8,"indoor",["food","plate","cafe","table","coffee","dessert"],[],IN_CITY+ABROAD,[]),
 "flowers":  (3,"outdoor",["flowers","garden","leaves"],[],IN_NATURE+IN_CITY,[]),
 "pet":      (5,"indoor",["pet portrait"],[],["Mumbai, India","Pune, India"],["dog","cat"]),
 "vehicle":  (3,"outdoor",["car","bike","train","road"],[],ALL_LOCS,[]),
 "home":     (4,"indoor",["sofa","plants","books","lamp","kitchen"],[],["Mumbai, India"],[]),
 "waterfall":(3,"outdoor",["waterfall","rocks","forest"],["water"],IN_NATURE,[]),
 "snow":     (3,"outdoor",["snow","mountains","pine trees"],[],["Manali, Himachal Pradesh","Spiti Valley, Himachal Pradesh","Banff, Canada"],[]),
 "fort":     (3,"outdoor",["fort","walls","gate","courtyard"],[],["Jaipur, India","Udaipur, Rajasthan","Hampi, Karnataka"],[]),
}
BOTH_SCENES = ["beach","lake","trek","temple","food","city","snow","sunset"]

entries = []
def add(**kw):
    a, b = hue_pair()
    e = dict(id=None, kind="photo", src=None, alt="", width=900, height=rng.choice([1200,1350,600]), date="", location="", setting="outdoor",
             hasPeople=False, peopleCount=0, animals=[], objects=[], colors=[], source="generated",
             placeholder=dict(hueA=a, hueB=b, emoji="📷"))
    e.update(kw); entries.append(e); return e

def scene_entry(scene, date, location=None, extra_objects=None, tod=None, sky=None, force_objects=None):
    w, setting, pool, fixed, locs, animals = SCENES[scene]
    objs = list(fixed) + (force_objects if force_objects is not None else rng.sample(pool, k=min(len(pool), rng.randint(1, 2))))
    if extra_objects: objs += extra_objects
    loc = location or rng.choice(locs)
    e = add(date=date, location=loc, setting=setting, objects=objs, animals=[rng.choice(animals)] if animals else [],
            timeOfDay=tod or ("sunset" if scene=="sunset" else rng.choice(TODS)) if setting=="outdoor" else None,
            sky=(sky or rng.choice(SKIES)) if setting=="outdoor" else None,
            colors=rng.sample(["blue","green","orange","grey","white","brown","teal","pink"], 2))
    for k in ("timeOfDay","sky"):
        if e.get(k) is None: e.pop(k, None)
    e["alt"] = f"{scene.capitalize()} scene: " + ", ".join(objs[:3]) + (f" ({e['animals'][0]})" if e["animals"] else "")
    e["placeholder"]["emoji"] = EMOJI[scene]
    return e

# ---- 3. planted "last week" lake trip (Rohan's demo target neighbourhood) ----
last_week = lambda: (REF - dt.timedelta(days=rng.randint(1, 7))).isoformat()
planted = [("Vancouver Island, Canada",5),("Banff, Canada",5),("Whistler, Canada",2)]
for loc, n in planted:
    for _ in range(n):
        scene_entry("lake", last_week(), location=loc, force_objects=rng.sample(["mountains","boat","reflection","kayak","forest"], 1))

# ---- 4. random library ----
TOTAL_GEN = 393
docs_n, people_n, both_n = 25, 85, 45
nonp_n = TOTAL_GEN - len(entries) - docs_n - people_n - both_n
names = list(SCENES); weights = [SCENES[n][0] for n in names]
START, END = dt.date(2024, 1, 1), REF - dt.timedelta(days=1)
def rnd_date(scene=None):
    r = rng.random()
    if scene == "lake": return rdate(START, REF - dt.timedelta(days=10))   # keeps last-week lakes under control
    if r < 0.08: return rdate(REF - dt.timedelta(days=14), END)            # recent cluster
    return rdate(START, END)

for _ in range(nonp_n):
    sc = rng.choices(names, weights)[0]
    scene_entry(sc, rnd_date(sc))

for _ in range(people_n):
    pt = rng.choices(["selfie","portrait","group","candid"], [30,20,25,25])[0]
    n = {"selfie":rng.randint(1,2),"portrait":1,"group":rng.randint(3,8),"candid":rng.randint(1,4)}[pt]
    setting = rng.choice(["indoor","outdoor"])
    e = add(date=rnd_date(), location=rng.choice(ALL_LOCS), setting=setting, hasPeople=True, peopleCount=n, photoType=pt,
            pose=rng.choice(["smiling","serious","posing","action"]), objects=rng.sample(["birthday","cake","party","jacket","sunglasses","cafe","street","car","festival","gym"],1),
            colors=rng.sample(["blue","green","orange","grey","white","brown","pink","black"], 2))
    if setting=="outdoor": e["timeOfDay"]=rng.choice(TODS); e["sky"]=rng.choice(SKIES)
    e["alt"] = f"{pt.capitalize()} photo of {n} {'person' if n==1 else 'people'}"
    e["placeholder"]["emoji"] = EMOJI["group"] if n>2 else EMOJI["people"]

for _ in range(both_n):
    sc = rng.choice(BOTH_SCENES); pt = rng.choice(["selfie","portrait","group","candid"])
    n = {"selfie":rng.randint(1,2),"portrait":1,"group":rng.randint(3,6),"candid":rng.randint(1,3)}[pt]
    e = scene_entry(sc, rnd_date(sc if sc=="lake" else None))
    e.update(hasPeople=True, peopleCount=n, photoType=pt, pose=rng.choice(["smiling","posing","action"]))
    e["alt"] = f"{pt.capitalize()} of {n} {'person' if n==1 else 'people'} at a {sc} scene"
    e["placeholder"]["emoji"] = EMOJI["group"] if n>2 else EMOJI["people"]

DOC_KINDS = [("receipt","Receipt",["number","date"]),("id","ID / card",["name","number"]),("ticket","Ticket",["date","number"]),
             ("note","Handwritten note",["name","address"]),("screenshot","Screenshot",["date","name"]),("slides","Slide / whiteboard",["name"])]
for _ in range(docs_n):
    dtp, label, tc = rng.choice(DOC_KINDS)
    add(kind="document", date=rnd_date(), location=rng.choice(IN_CITY+ABROAD), setting="indoor", objects=["document"], colors=["white"],
        docType=dtp, textContent=tc, language=rng.choice(["English"]*5+["Hindi","German"]), alt=f"{label}", height=1200,
        placeholder=dict(hueA=0, hueB=0, emoji=EMOJI["doc"]))

assert len(entries) == TOTAL_GEN, len(entries)
for i, e in enumerate(sorted(entries, key=lambda x: x["date"], reverse=True), 1):
    e["id"] = f"g{i:03d}"
gen = sorted(entries, key=lambda x: x["id"])
allp = base + gen
# keep key order stable / drop None
for p in allp:
    for k in [k for k, v in p.items() if v is None and k != "src"]: del p[k]

header = src[:src.index("export const photos: Photo[] = ")]
header = re.sub(r"// Generated sample library.*?\n\nexport const REFERENCE_DATE", "// SAMPLE LIBRARY for the Intent Clarifier prototype (430 entries).\n//  - 30 real photos        (source: 'real', src = /photos/photo-XX.jpg)\n//  - 7 hand-authored docs  (source: 'handmade-doc', placeholder card)\n//  - 393 generated entries (source: 'generated', placeholder card using `placeholder` colours + emoji; deterministic seed 42, see scripts/generate_library.py)\n// 400 = 393 generated + 7 hand-authored docs; + 30 real photos = 430 total.\n// NOTE: dates and locations are MOCK values assigned for the demo.\n\nexport const REFERENCE_DATE", header, flags=re.S)
if 'source: "real"' not in header:
    header = header.replace("  kind: \"photo\" | \"document\";", "  kind: \"photo\" | \"document\";\n  source: \"real\" | \"handmade-doc\" | \"generated\";\n  placeholder?: { hueA: number; hueB: number; emoji: string };  // used when src is null")
OUT.write_text(header + "export const photos: Photo[] = " + json.dumps(allp, indent=1, ensure_ascii=False) + ";\n")
print(len(allp))
