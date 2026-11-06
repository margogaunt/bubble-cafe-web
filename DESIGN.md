# DESIGN.md – Bubble Cafe

Pravidla vzhledu a chování webu kavárny Bubble Cafe (Káva & Bubble Tea, Golčův Jeníkov).
Vzniklo podle skillu `web-design` a upravuje se podle zpětné vazby. Kód ([styles.css](styles.css), [script.js](script.js)) se má řídit tímto souborem.

- **Reference:** gong-cha.com (barevná plocha přes celou šířku, velké bannery)
- **Zadání:** písmo DM Sans, „funkční, ale zábavný styl“
- **Paleta:** pastelová (od 6. 11. 2026 nahradila původní sytou žlutou #fce75b a oranžovou)
- **Úroveň interaktivity:** střídmá. Skill doporučuje víc animací, ale zpětná vazba „je tam moc animací“ má přednost.

---

## 1. Atmosféra

Slunečné okénko na rohu náměstí v pastelových barvách zmrzliny: máslová, broskvová, pudrově růžová, šalvějová.

- **Klíčová slova:** pastel · máslová žlutá · broskev · růžová · skutečné fotky v kruzích · velká typografie
- **Jednou větou:** „Malá pauza, velká radost.“
- **Fotky jsou hlavní hrdina.** Ořezávají se do kruhu jako bubliny, žádné ilustrace nápojů.
- **Klid > efekty.** Pohyb je jen tam, kde něco sděluje.
- **Recenze jsou důležité:** mají vlastní stránku, jsou velké a statické.
- **Přehlednost:** každá položka lišty je samostatná stránka.

## 2. Barvy

Všechny barvy jsou CSS proměnné v `:root`. V kódu se nikdy nepíše hex přímo. Kvůli průhlednosti má každá barva i RGB variantu (`--x-rgb`).

| Proměnná | Hex | Role |
|---|---|---|
| `--butter` | #fdf1a7 | úvod, patička, text na tmavých tlačítkách |
| `--butter-deep` | #f7e383 | rezerva pro oddělovače |
| `--peach` | #ffd8b5 | banner akce, štítky, světlo v úvodu |
| `--peach-deep` | #f6b083 | konec přechodu v banneru, perly, aktivní číslo na mobilu |
| `--apricot` | #c9652c | kurzíva ve velkých nadpisech, hvězdičky, focus |
| `--apricot-deep` | #a44d1b | malý zvýrazněný text (kicker, jména u recenzí), hover tmavých tlačítek |
| `--blush` | #fbe1df | pozadí sekce Recenze |
| `--blush-deep` | #f4c3c0 | detail v logu |
| `--sage` | #e2eedd | pozadí sekce Kontakt |
| `--sage-deep` | #c6dcbf | podklad mapy |
| `--cocoa` | #3b2a21 | text, tmavá tlačítka |
| `--cocoa-soft` | #6f5a4d | vedlejší text |
| `--cream` | #fffaf1 | pozadí stránky |
| `--white` | #ffffff | bubliny s recenzemi, rámeček fotky v banneru |
| `--green` | #3f9a52 | jen tečka „Právě máme otevřeno“ |
| `--pearl-light` / `--pearl-dark` | #7a5741 / #2e1f16 | tapiokové perly (dekorace) |

**Kontrast:**
- Text cocoa je čitelný na všech pastelových pozadích.
- `--apricot` se používá jen pro velký text (≥ 24 px).
- Malý barevný text je vždy `--apricot-deep`.
- Tmavá tlačítka mají kakaovou výplň a máslový text, aby byla na pastelu vidět.

## 3. Typografie

- **Písmo:** DM Sans (jediné, podle zadání), variabilní řez 300–900 včetně kurzívy
- **Načtení:** `https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..900;1,9..40,300..900&display=swap`
- **Záloha:** `"DM Sans", system-ui, sans-serif`
- **Podpis stylu:** kontrast **silného 800–900** s **tenkou kurzívou 300** v jednom nadpisu („Malá pauza, *velká radost.*“). Kurzíva je meruňková (`--apricot`).

| Úroveň | Velikost | Řez |
|---|---|---|
| H1 (úvod) | clamp(3.2rem, 7.4vw, 7rem) | 800 + 300 italic |
| H2 | clamp(2.4rem, 5.5vw, 4.4rem) | 800 + 300 italic |
| Hodnocení „5,0“ | clamp(4.5rem, 11vw, 8rem) | 900 |
| Citace v recenzi | clamp(1.3rem, 2.2vw, 1.75rem) | 500 |
| Nabídka (položka) | clamp(2rem, 4.6vw, 3.8rem) | 800 / aktivní 300 italic |
| Text | 1rem–1.15rem, řádkování 1.55 | 400 |
| Kicker | 0.78rem, VERZÁLKY, +0.16em | 700 |

## 4. Komponenty

**Pilulka (tlačítko)** – `.pill`, min. výška 44 px (velká 56 px), `border-radius: 999px`

| Stav | Tmavá `--dark` | Obrys `--ghost` |
|---|---|---|
| default | cocoa, text máslový | rámeček cocoa |
| hover / active | apricot-deep, text bílý | výplň cocoa, text máslový |
| focus-visible | obrys 3 px apricot, odsazení 3 px | totéž |
| disabled | průhlednost .45 | totéž |

- **Logo:** skutečné logo podniku (čárová ikona zmrzliny a kelímku s brčkem, stejné jako na IG a TikToku), soubor `IMG/708794094_…_n.jpg`. Je v kulatém krémovém odznaku 46 px s jemným lemem a přiblížené 1,55×, aby se ořízl prázdný okraj obrázku. Vedle je text „Bubble Cafe“ (800, bez zalomení). Stejný soubor slouží jako ikona záložky (`<link rel="icon">`). Nepřebarvovat, nekreslit vlastní náhradu.
- **Lišta:** logo vlevo, odkazy (Nabídka, Akce, Recenze, Kontakt) **přesně uprostřed** (mřížka `1fr auto 1fr`). Aktuální stránka má kakaovou pilulku s máslovým textem (`aria-current="page"`). **Žádné telefonní číslo v liště.** Číslo je jen na stránce Kontakt. Na mobilu je vpravo kulaté tlačítko menu a odkazy se zobrazí pod sebou na střed.
- **Záhlaví podstránky:** `.page-head` v pastelové barvě stránky (Nabídka máslová, Akce broskvová, Recenze růžová, Kontakt šalvějová), dole zaoblené, kicker + H1 na střed.
- **Recenze:** bílé bubliny z rozhovoru (`border-radius: 32px` a ocásek vlevo dole), jemný stín a růžový lem. V každé jsou hvězdičky, citace a jméno s malým kolečkem. Na počítači jsou tři vedle sebe a prostřední je posunutá dolů, na mobilu jsou pod sebou a ocásky se střídají. V záhlaví stránky je velké „5,0 ★★★★★, 26 recenzí na Mapách Google“, pod bublinami tlačítko „Všechny recenze na Googlu“. Citace jsou jen skutečné, z Map Google.
- **Fotka-bublina:** `border-radius: 50%`, teplý stín. V úvodu jsou dvě bubliny přes sebe: velká 76 % (bubble tea) a malá 44 % (zmrzlina před okénkem) s 8px máslovým výřezem.
- **Nabídka:** seznam s čísly 01–05, ne mřížka karet. Aktivní položka je tenká kurzíva a vedle se v kruhu prolne fotka. Štítek je broskvový. Na mobilu jsou položky vodorovné pilulky.
- **Chování lišty:** průhledná nad úvodem a záhlavím, po scrollu krémová s `blur(12px)`.
- **Galerie:** zaoblené obdélníky 4:5 (28 px), rovně, myší se dají táhnout.

## 5. Rozvržení

- **Kontejner:** `min(1200px, 100% − 32px)`
- **Svislé mezery sekcí:** clamp(4.5rem, 10vw, 8rem)
- **Web je rozdělený na samostatné stránky podle lišty, ne jedna dlouhá stránka:**

| Stránka | Obsah |
|---|---|
| `index.html` | úvod (máslová, 2 kulaté fotky, stav otevřeno/zavřeno), pás fotek „Přímo z okénka“ |
| `nabidka.html` | máslové záhlaví, interaktivní seznam 01–05 |
| `akce.html` | broskvové záhlaví, banner s akcí, odkaz na Instagram |
| `recenze.html` | růžové záhlaví s 5,0, tři bubliny, tlačítko na Google |
| `kontakt.html` | šalvějové záhlaví, adresa, telefon, otevírací doba, mapa, Navigovat |

- Obsah pod záhlavím je vždy na krémové. Patička je na všech stránkách stejná (máslová).
- **Zaoblení:** pilulky 999 px, bubliny s recenzemi 32 px, bannery 24–44 px, záhlaví podstránek 28–56 px dole.

## 6. Hloubka a stíny

| Proměnná | Hodnota | Kde |
|---|---|---|
| `--shadow-soft` | `0 18px 40px rgb(cocoa / .08)` | bubliny s recenzemi, mapa, tlačítko dolů |
| `--shadow-photo` | `0 28px 56px rgb(apricot / .22)` | kulaté fotky, banner |

## 7. Animace a interakce (střídmé)

**Povolené pohyby (nic dalšího nepřidávat bez souhlasu):**

| Co | Kde | Jak |
|---|---|---|
| Objevení úvodu | text a bubliny v úvodu | jednou při načtení, posun o 16 px a zprůhlednění, 1 s |
| Objevení sekcí | hlavičky, recenze, banner, kontakt | při scrollu, posun o 24 px a zprůhlednění, 0,8 s, jen jednou |
| Přepnutí nabídky | fotka v kruhu | prolnutí 0,35 s |
| Hover | tlačítka, odkazy | jen změna barvy nebo podtržení |

**Zakázané (odstraněno na základě zpětné vazby 6. 11. 2026):**
- běžící pásy a marquee (pás s nápisem, běžící recenze)
- písmena nebo slova naskakující po jednom
- efekt magnetu
- perly po kliknutí
- světlo pod kurzorem a plující světla
- parallax
- poskakující perly
- houpající se nálepka
- zvětšování nebo natáčení fotek při najetí
- pulzující tečka

**Skrytý detail:** úplně dole v patičce stojí „Až na dno kelímku! Tady jsou tvoje perly“ se třemi perlami, staticky.

**Omezení pohybu:** při `prefers-reduced-motion` se vypne všechno.

## 8. Co dělat a co ne

**Dělat:**
1. Používat skutečné fotky kavárny ze složky IMG (dodává zadání) a ořezávat je do kruhu nebo zaobleného obdélníku.
2. Míchat silný řez s tenkou kurzívou v každém hlavním nadpisu.
3. Držet pastelovou paletu a pro text a tlačítka používat cocoa.
4. Recenze mají vlastní stránku a jsou velké a statické.
5. Psát česky, tykat a vtipně, ale věcně.
6. Každému interaktivnímu prvku dát hover i focus, dotykovou plochu aspoň 44 × 44 px.

**Nedělat:**
1. Žádné běžící pásy ani marquee.
2. Žádné mřížky stejných karet pro nabídku.
3. Žádné fotky ve tvaru oblouku nebo „okýnka“.
4. Žádné kreslené ilustrace nápojů místo fotek.
5. Žádné fotky s textem přes obrázek.
6. Žádné vymyšlené ceny, příchutě, služby ani recenze.
7. Žádné syté a neonové barvy ani černá. Hex jen v `:root`.
8. Žádné emoji v textu webu.
9. Žádné další animace nad rámec kapitoly 7.
10. Žádné telefonní číslo v liště ani všechny sekce na jedné dlouhé stránce.

## 9. Responzivita

| Zlom | Změna |
|---|---|
| ≤ 960 px | úvod v jednom sloupci (text na střed, bubliny pod tlačítky), recenze pod sebou, nabídka jako vodorovné pilulky, akce a kontakt v jednom sloupci, schované prostřední perly |
| ≤ 760 px | menu přes tlačítko, hlavička recenzí pod sebou |
| ≤ 480 px | tlačítka v úvodu i „Všechny recenze“ na celou šířku, menší nálepka −50 % |

- **Kontrola:** žádný vodorovný scroll na 375 px, vše dotykové ≥ 44 px, otestovat na 375, 1024 a 1280 px.
