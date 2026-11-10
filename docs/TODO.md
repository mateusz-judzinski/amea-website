# AMÉA – plan prac

Sekcje idą w kolejności, w jakiej najlepiej je robić: najpierw zebrać odpowiedzi od salonu i zrobić zdjęcia, potem nowe funkcje, przygotowanie do publikacji, a na sam koniec świeża aktualizacja oferty. Miejsca w kodzie oznaczone są komentarzami `TODO(...)` w `index.html`. Zrobione punkty są na dole pliku.

## 1. Do ustalenia z salonem

Najlepiej za jednym razem, np. przy wizycie na zdjęcia.

- [ ] **Zespół**
  - nazwiska i krótkie bio Katarzyny, Aleksandry i Ani (Ania ma bio na swoim profilu w Booksy; Aleksandry nie ma na liście pracowników Booksy, jest tylko przy makijażu permanentnym);
  - czy pokazać prowadzące zajęcia z Fitssey: Pati (joga, zdrowy kręgosłup) i Karolę (pilates).
- [ ] **Bon upominkowy**: jak kupić (na miejscu / telefonicznie / online), jakie wartości lub rodzaje. Realizacja przez Booksy jest już opisana na stronie.
- [ ] **Oferta do potwierdzenia**
  - stylizacja paznokci: jest w opisie salonu na Booksy, brak w cenniku – pokazywać?
  - kącik z fotelem i misą do stóp: jaka to usługa (pedicure, rytuał stóp?) i czy ją pokazać;
  - gabinet z urządzeniem do zabiegów na ciało: jakie to zabiegi;
  - „Zajęcia sensualne”: są na stronie, ale nie ma ich w grafiku ani cenniku Fitssey – czy są prowadzone?
  - „kameralne zajęcia dla mam i dzieci” z nagłówka cennika Fitssey: stała oferta do pokazania?
  - nowe pozycje w cenniku Fitssey bez opisu (stan 10.11.2026): „Glow & Balance Experience” (179 zł, 1 sesja) i „Śpiewoczucie” (65 zł, 1 sesja) – co to jest, czy pokazać na stronie (np. przy warsztatach); „Joga + warsztaty matcha” z 24.10 nadal jest w cenniku, choć termin minął.
- [ ] **Panel usług**
  - opisy w panelu (skrót z opisów na Booksy) – salon czyta i poprawia;
  - w Booksy Katarzyna (fizjoterapeutka) jest przypisana m.in. do Clear Skin, Skin Lift, Skin Age i Cosmelanu – czy to celowe?
  - fizjoterapia: czy zawsze zaczyna się od wizyty diagnostycznej (tak mówi panel), czy można od razu zapisać się na terapię;
  - Retix C i Green Sea Peel są w Booksy dwa razy (w „Zabiegach na twarz” i w „Przebarwieniach”, Green Sea Peel z innym czasem: 1 h 30 min i 1 h) – która wersja jest właściwa, czy jedną usunąć.
- [ ] **Kod widżetu Fitssey** (jeśli zdecydujemy się na widżet, patrz sekcja 3): Renata w panelu Studio → Integracje → Widżety: skopiować „kod bazowy”, kliknąć „Generuj kod” przy Grafiku (bez filtrów = wszystkie zajęcia), przesłać oba fragmenty; opcjonalnie to samo dla Cennika.
- [ ] **Dane do polityki prywatności**: pełna nazwa działalności, adres siedziby, NIP, e-mail do spraw danych osobowych. Nie wymyślać – tylko od salonu.
- [ ] **Wizytówka w Google** (Renata w panelu Profilu Firmy w Google): godziny pokazują „Czynne całą dobę” – ustawić pon.–sob. 8:00–21:00, niedziela nieczynne; po publikacji strony wpisać jej adres („Dodaj witrynę”, patrz sekcja 4). Opcjonalnie link „Poproś o opinie” (g.page/r/…/review) – dałoby się dodać „Napisz opinię w Google” pod cytatami.

## 2. Zdjęcia – wizyta w salonie

- [ ] **Zrobić zdjęcia osobiście i podmienić.** Zdjęcia od klientki odpadają (za słabe), na stronie zostają tylko do czasu podmiany. Po sesji: wybór, wspólny wygląd przez `tools/photo-look.ps1` (czyta też HEIC z iPhone’a), WebP w rozmiarach jak niżej, zrzuty 1280 i 375 px przed podmianą.

Jak fotografować:
- dzień, jedno światło: albo okno, albo lampy, bez mieszania niebieskiego światła z okna z żółtymi lampami; bez filtrów i trybu „ciepły”;
- obiektyw 1× (szeroki 0,5× krzywi pionowe linie), telefon prosto, na wysokości klatki piersiowej;
- **każde miejsce w pionie i w poziomie**: łuki są pionowe, szerokie kafelki poziome 16:9;
- nic na pierwszym planie: liście, brzeg zasłony, krawędź blatu – zrobić krok w bok;
- przed zdjęciem posprzątać: płaszcze z wieszaka, butelki i drukarka z biurka, torebki z komody, kable;
- 2–3 dobre ujęcia z miejsca wystarczą.

| Miejsce na stronie | Kadr | Co pokazać |
|---|---|---|
| Zespół | pion 3:4 | Aleksandra przy podświetlonym szyldzie AMÉA, jak Katarzyna i Ania, cały napis nad głową. Ewentualnie wszystkie cztery osoby na nowo w jednym stylu |
| O nas | pion 4:5, łuk | Zabieg w trakcie: dłonie specjalistki, klientka na łóżku; albo gabinet z muralem jak teraz, lepiej |
| Przestrzeń – łuk | pion 3:4 | Strefa relaksu przy oknie: kanapa, stolik, rośliny, pusty wieszak |
| Przestrzeń – szerokie ×2 | poziom 16:9 | Gabinet zabiegowy; sala ruchu (maty, pufy, lustro) |
| Zajęcia | pion 3:4 ×2, poziom 16:9 | Prowadząca w pozycji jogi, prowadząca z misą; grupa podczas zajęć – jeśli uda się na zajęciach |
| Kontakt | pion 4:5, łuk | Szyld albo wejście od ulicy, żeby łatwo trafić |
| Hero (opcjonalnie) | pion 4:5 | Pionowy portret Renaty; obecny `renata.webp` jest poziomy i kadrowany w CSS |
| Podgląd linku | poziom 1200×630 | Najładniejsze wnętrze w poziomie (patrz sekcja 4) |
| Nowe miejsca (zależnie od sekcji 1) | pion i poziom | Kącik do stóp z wejścia, bez zasłony; gabinet z urządzeniem w całości; strefa konsultacji przy oknie; sala z łóżkiem do masażu |
| Detale (zapas) | dowolny | Kosmetyki, ampułki, ręcznik, roślina, świece – martwa natura |

## 3. Nowe funkcje na stronie

- [ ] **Widżet grafiku Fitssey** (gdy przyjdzie kod): w `#zajecia` pod listą zajęć (miejsce oznaczone `TODO(zajęcia)` w `index.html`); skrypt ładowany dopiero przy zbliżeniu do sekcji; styl w kolorach strony (Fitssey przyjmuje własny CSS); przyciski „Grafik i zapisy” / „Cennik i karnety” zostają jako zapas; zrzuty 1280 i 375 px przed decyzją.

## 4. Przed publikacją

- [ ] **Polityka prywatności**: osobna strona (np. `polityka-prywatnosci.html`) i link w stopce (`TODO(prawne)`). Zawiera: administratora danych (dane z sekcji 1), cele, zewnętrzne serwisy (Booksy – widżet rezerwacji w okienku, ładowany dopiero po kliknięciu „Wybierz termin”, ma własne cookies; Fitssey, Google Fonts – chyba że będą lokalnie, Google Maps tylko jako link), cookies.
- [ ] **Fonty lokalnie** zamiast Google Fonts (RODO) – upraszcza politykę prywatności.
- [ ] **Analityka?** Jeśli tak, potrzebny baner zgód cookies; bez analityki i widżetów strona może się bez niego obyć.
- [ ] **Domena i hosting** (statyczny: Netlify / Cloudflare Pages / GitHub Pages / zwykły FTP). Adres e-mail kontakt@amea-beauty.pl sugeruje domenę amea-beauty.pl – potwierdzić.
- [ ] **Po domenie**: `<link rel="canonical">`, absolutne `og:url` i `og:image`, `sitemap.xml`, `robots.txt` (`TODO(domena)`); adres strony w wizytówce Google, na Booksy, Instagramie i Facebooku.
- [ ] **Podgląd linku** (Facebook, WhatsApp): poziomy obraz 1200×630 zamiast pionowego `sala-lustro.jpg`, który serwisy przycinają. `sala-lustro.jpg` służy tylko do tego – po zmianie usunąć z repo.
- [ ] **Optymalizacja zdjęć po sesji**: WebP/AVIF, ~1600 px dłuższy bok, `srcset`.
- [ ] **Przegląd końcowy**: prawdziwy iPhone i Android; Lighthouse (wydajność, dostępność, SEO); wszystkie linki (Booksy, Fitssey, telefon, e-mail, mapa, Instagram, Facebook); literówki.

## 5. Ostatni krok: aktualizacja oferty

Tuż przed publikacją, żeby wszystko było świeże.

- [ ] **Spis usług i ceny z Booksy**: procedura w `CLAUDE.md` (JSON Booksy albo profil z rozwiniętymi kategoriami, porównać z `index.html`); ceny regularne „od”, bez promocji. Razem z kartami zaktualizować dane panelu `#svc-data` (ceny, czas, numery wersji, teksty).
- [ ] **Zajęcia i ceny z Fitssey**: rodzaje zajęć, „od 50 zł”, karnety.
- [ ] **Opinie**: ocena i liczba opinii z Booksy i z wizytówki Google, suma w hero i w sekcji Opinie, ewentualnie nowe cytaty – dosłownie.
- [ ] **Godziny i dane kontaktowe**: ostatnie potwierdzenie z salonem.

## Zrobione

- [x] Wizytówka Google (10.11.2026): karta trasy w Kontakcie prowadzi do profilu salonu w Mapach, w hero i Opiniach wspólna ocena „5.0 · 72 opinie na Booksy i w Google”, w Opiniach jedna lista cytatów z obu źródeł i linki do obu, w JSON-LD `sameAs`, `hasMap` i współrzędne
- [x] Przegląd usług z Booksy i Fitssey (10.11.2026): ceny i czasy w panelu zgodne z Booksy; nowe karty SKIN AGE (zmarszczki) i Trychologia; „od” tylko przy kilku cenach (także w wierszach poziomów) i najniższa cena we wstępie każdej zakładki; „Dla niego” jako ostatnia zakładka; wstępy zakładek najwyżej 2 linie; bez ogólnego przycisku w Fizjoterapii (karty otwierają panel); link dla posiadaczy bonu prosto do usługi „Bon upominkowy” w Booksy
- [x] Panel usługi (10.11.2026): „Umów” w ofercie (także 18 wierszy cennika zabiegów pojedynczych), Diagnostyce i Fizjoterapii otwiera wysuwany panel z opisem z Booksy, wyborem opcji i obszaru/czasu, ceną i czasem; „Wybierz termin” otwiera w nowej karcie Booksy od razu na tej usłudze. Przy okazji ceny, które Booksy zmienił (konsultacja 3D, fizjoterapia, borowina, drenaż)
- [x] Zdjęcia od klientki (paczki z 3 i 5.11.2026): na stronę trafiły robocze zdjęcia do O nas, Przestrzeni (trzy różne miejsca) i Zespołu (Ania). Reszta odrzucona; zdjęcia zostaną zrobione osobiście (sekcja 2)
- [x] Zajęcia ruchowe → Fitssey: przyciski w sekcji Zajęcia, karty z „od 50 zł” w zakładce Ruch, stopka oferty z Fitssey, Kontakt, stopka strony, JSON-LD; karta „Zdrowy kręgosłup” (3.11.2026)
- [x] Telefon 791 103 551, e-mail kontakt@amea-beauty.pl, Instagram i Facebook na stronie (3.11.2026)
- [x] Godziny otwarcia pon.–sob. 8:00–21:00, niedziela nieczynne – potwierdzone przez salon (3.11.2026)
- [x] Cała oferta zsynchronizowana z Booksy: Women's Ritual (7), Men's Skin (3), Men's Ritual (3), makijaż permanentny i henna pudrowa (6), pełny cennik zabiegów pojedynczych (3.11.2026)
- [x] Zespół: zdjęcia Renaty, Katarzyny i Ani; Aleksandra dodana do zespołu (3–5.11.2026)
- [x] Hero: portret Renaty (`renata.webp`)
- [x] Favicon (`favicon.ico` 16–48 px, `favicon-32.png`) + `apple-touch-icon` 180 px: czarny emblemat na białym tle
- [x] Narzędzia do zdjęć: `tools/photo-look.ps1` (wspólny wygląd, HEIC, obrót), `tools/color-match.ps1`
