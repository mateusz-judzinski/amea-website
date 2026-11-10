# AMÉA – plan prac

Sekcje idą w kolejności, w jakiej najlepiej je robić: najpierw zebrać odpowiedzi od salonu (sekcja 0 – wysłane pytania i materiały, sekcja 1 – jeszcze do wysłania) i zrobić zdjęcia, potem nowe funkcje, przygotowanie do publikacji, a na sam koniec świeża aktualizacja oferty. Miejsca w kodzie oznaczone są komentarzami `TODO(...)` w `index.html`. Zrobione punkty są na dole pliku.

## 0. Wiadomość do klientki z 10.11.2026 – odpowiedzi i materiały

Pytania i prośby wysłane Renacie 10.11.2026 i jej odpowiedzi (tego samego dnia), przerabiane po kolei. Przy każdym punkcie: odpowiedź i co z niej wynika na stronie. Po wdrożeniu punkt idzie do „Zrobione”. Zaznaczone [x] już nie wymagają pracy.

### Pytania

- [ ] **1. Nazwiska dziewczyn** na stronie? **Odpowiedź: tylko imię.**
  - Zrobione 10.11.2026: specjalistki są z samego imienia, „nazwiska” zniknęły z `TODO(zespół)`.
  - Do potwierdzenia: Renata jako właścicielka zostaje z nazwiskiem („Renata Judzińska” w Zespole, w opisie zdjęcia hero i w stopce)?
- [ ] **2. Krótkie bio** każdej? **Odpowiedź: tak, Renata zaraz podeśle** (razem ze zdjęciami, materiały pkt 3).
  - Do zrobienia: bio pod imionami w Zespole. Ania ma też bio na swoim profilu w Booksy. Aleksandry nie ma na liście pracowników Booksy, jest tylko przy makijażu permanentnym.
- [ ] **3. Bon upominkowy**: jak kupić? **Odpowiedź: przez Booksy, telefonicznie i na miejscu w Améa.**
  - Zrobione 10.11.2026: w sekcji Bon „Kupisz go na miejscu w salonie albo telefonicznie: 791 103 551”, przycisk „Zadzwoń po bon” (`tel:`).
  - Do dopytania: zakup „przez Booksy” – w Booksy salonu sprzedaż bonów online jest wyłączona (`has_online_vouchers: false`, `accept_booksy_gift_cards: false`), więc nie ma czego podlinkować. Czy Renata chce ją włączyć w panelu Booksy? Wtedy przycisk „Kup bon online” (`TODO(bon)` w `index.html`).
- [x] **4. Stylizacja paznokci**: **Odpowiedź: nie pokazujemy, Renata usunie ją z Booksy.**
  - Na stronie jej nie ma; komentarz `TODO(oferta): stylizacja paznokci` usunięty 10.11.2026.
- [x] **5. Kącik z fotelem i misą do stóp**: **Odpowiedź: to rytuał dla stóp – AMÉA Women's Ritual „Lekkość”, jest na Booksy, pokazywać.**
  - Na stronie już jest (kafelek „Lekkość” w Masażach). Zostaje zdjęcie kącika przy sesji (sekcja 2).
- [x] **6. Gabinet z urządzeniem do zabiegów na ciało**: **Odpowiedź: na ciało są rytuały, masaże (relaksacyjne i drenaż limfatyczny), fizjoterapia, a z zabiegów urządzeniem – RF mikroigłowa (jest na Booksy).**
  - Na stronie wszystko już jest (RF mikroigłowa Ellisys Plus w cenniku zabiegów pojedynczych i w Skin Lift Premium – także brzuch i blizna po cesarskim cięciu). Zostaje zdjęcie gabinetu przy sesji (sekcja 2).
- [ ] **7. „Zajęcia sensualne”**: **Odpowiedź: współpraca z Karoliną się skończyła, salon szuka kogoś na zastępstwo** (zapisy spadły). Pilates na razie zostaje – Renata rozmawia z prowadzącą, na przyszły tydzień są zapisy.
  - Zrobione 10.11.2026: „Zajęcia sensualne” zdjęte ze strony (karta w zakładce Ruch i wiersz w liście w sekcji Zajęcia, razem z ich `TODO(zajęcia)`); wrócą, gdy będzie nowa prowadząca.
  - Do obserwowania: pilates – czy zostaje po rozmowie Renaty z prowadzącą (karta w Ruchu, lista w Zajęciach, opinia Natalii o pilatesie w sekcji Opinie).
- [x] **8. „Kameralne zajęcia dla mam i dzieci”**: **Odpowiedź: tych zajęć ostatecznie nie ma, Renata usunie je z Fitssey.**
  - Na stronie ich nie ma, nic do zrobienia.

### Materiały

- [ ] **1. Dostęp do Fitssey** (login i hasło): Renata prześle, gdy odzyska hasło na komputerze (na telefonie nie umiała). Potem:
  - w panelu Studio → Integracje → Widżety skopiować „kod bazowy” i kliknąć „Generuj kod” przy Grafiku (bez filtrów = wszystkie zajęcia), opcjonalnie to samo dla Cennika;
  - wdrożyć wg sekcji 3;
  - na koniec zaproponować Renacie zmianę hasła.
- [x] **2. Dane do polityki prywatności** – otrzymane 10.11.2026:
  - jednoosobowa działalność gospodarcza „Améa Renata Judzińska” (przed użyciem sprawdzić dokładną pisownię nazwy w CEIDG po NIP-ie);
  - adres siedziby: ul. Piłsudskiego 65, 41-902 Bytom (ten sam co salonu);
  - NIP 9542682779 (REGON nie podany, jest opcjonalny);
  - e-mail w sprawach danych osobowych: kontakt@amea-beauty.pl;
  - inspektora ochrony danych nie wyznaczono;
  - **każda specjalistka prowadzi własną działalność i odpowiada za dane swoich klientek** (tak jest w regulaminie i w umowach między nimi). W polityce: AMÉA jest administratorem danych ze strony i z kontaktu z salonem, specjalistki są odrębnymi administratorami danych swoich klientek. W polityce na razie ogólne zdanie, bez nazw ich działalności (decyzja 11.11.2026); wymienienie z nazw wymagałoby ich NIP-ów.

  Wykorzystane w `polityka-prywatnosci.html` (11.11.2026); co jeszcze zostało – sekcja 4.
- [ ] **3. Reszta zdjęć dziewczyn z opisami i spis całego zespołu**: Renata prześle. Potem:
  - zdjęcia przez `tools/photo-look.ps1`;
  - łuki w Zespole (Aleksandra ma na razie pusty łuk);
  - bio z pytania 2.

## 1. Do ustalenia z salonem – jeszcze nie wysłane

Tego nie było w wiadomości z 10.11.2026 (sekcja 0) – dosłać przy okazji.

- [ ] **Prowadzące zajęcia z Fitssey**: pokazać w Zespole Pati (joga, zdrowy kręgosłup)? Karoliny już nie ma (pytanie 7 w sekcji 0); przy pilatesie poczekać, kto będzie prowadził.
- [ ] **Bon upominkowy**: jakie wartości lub rodzaje (sposób zakupu – pytanie 3 w sekcji 0).
- [ ] **Nowe pozycje w cenniku Fitssey** bez opisu (stan 10.11.2026): „Glow & Balance Experience” (179 zł, 1 sesja) i „Śpiewoczucie” (65 zł, 1 sesja). Co to jest, czy pokazać na stronie (np. przy warsztatach)? „Joga + warsztaty matcha” z 24.10 nadal jest w cenniku, choć termin minął.
- [ ] **Panel usług**
  - opisy w panelu (skrót z opisów na Booksy) – salon czyta i poprawia;
  - w Booksy Katarzyna (fizjoterapeutka) jest przypisana m.in. do Clear Skin, Skin Lift, Skin Age i Cosmelanu – czy to celowe?
  - fizjoterapia: czy zawsze zaczyna się od wizyty diagnostycznej (tak mówi panel), czy można od razu zapisać się na terapię;
  - Retix C i Green Sea Peel są w Booksy dwa razy (w „Zabiegach na twarz” i w „Przebarwieniach”, Green Sea Peel z innym czasem: 1 h 30 min i 1 h) – która wersja jest właściwa, czy jedną usunąć.
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
| Nowe miejsca | pion i poziom | Kącik do stóp z wejścia, bez zasłony (rytuał „Lekkość”, pytanie 5 w sekcji 0); gabinet z urządzeniem do RF mikroigłowej w całości (pytanie 6); strefa konsultacji przy oknie; sala z łóżkiem do masażu |
| Detale (zapas) | dowolny | Kosmetyki, ampułki, ręcznik, roślina, świece – martwa natura |

## 3. Nowe funkcje na stronie

- [ ] **Widżet grafiku Fitssey** (gdy przyjdzie dostęp do Fitssey, sekcja 0): w `#zajecia` pod listą zajęć (miejsce oznaczone `TODO(zajęcia)` w `index.html`); skrypt ładowany dopiero przy zbliżeniu do sekcji; styl w kolorach strony (Fitssey przyjmuje własny CSS); przyciski „Grafik i zapisy” / „Cennik i karnety” zostają jako zapas; zrzuty 1280 i 375 px przed decyzją.

## 4. Przed publikacją

- [ ] **Polityka prywatności – dokończyć** (strona `polityka-prywatnosci.html` jest od 11.11.2026):
  - sprawdzić w CEIDG (po NIP) dokładną nazwę firmy i adres (`TODO(prawne)` w polityce);
  - po wyborze hostingu i poczty wpisać ich dostawców z nazwy (`TODO(domena)` w polityce, punkt 4);
  - przed publikacją dać ją do przejrzenia osobie znającej RODO; Renata czyta, czy okresy przechowywania i opis współpracy ze specjalistkami się zgadzają;
  - przy każdej zmianie, która dotyka danych (widżet Fitssey, analityka, formularz), zaktualizować politykę i jej datę.
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

- [x] Polityka prywatności (11.11.2026): osobna strona `polityka-prywatnosci.html` w stylu strony (RODO art. 13: administrator, specjalistki jako odrębni administratorzy, cele i podstawy, Booksy i Fitssey, odbiorcy, okresy, prawa, cookies), link w stopce obu stron; fonty Playfair Display i Jost z naszego serwera (`assets/fonts`, licencje OFL obok) zamiast Google Fonts – przy wejściu na stronę nic nie idzie do zewnętrznych serwisów

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
