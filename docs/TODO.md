# AMÉA – plan prac

Sekcje idą w kolejności, w jakiej najlepiej je robić: najpierw zebrać odpowiedzi od salonu (sekcja 0 – wysłane pytania i materiały, sekcja 1 – jeszcze do wysłania) i zrobić zdjęcia, potem nowe funkcje, przygotowanie do publikacji, a na sam koniec świeża aktualizacja oferty. Miejsca w kodzie oznaczone są komentarzami `TODO(...)` w `index.html`. Zrobione punkty są na dole pliku.

## 0. Wiadomość do klientki z 10.11.2026 – odpowiedzi i materiały

Odpowiedzi Renaty na wiadomość z 10.11.2026 są wdrożone; zostały tylko otwarte sprawy (zamknięte usunięte 15.11.2026).

### Pytania – otwarte

- [ ] **Bon online**: w Booksy sprzedaż bonów online jest wyłączona – czy Renata ją włączy? Wtedy przycisk „Kup bon online” (`TODO(bon)`).
- [ ] **Pilates**: czy zostaje po rozmowie Renaty z prowadzącą (karta w Ruchu, lista w Zajęciach, opinia Natalii). Zajęcia sensualne wrócą, gdy będzie nowa prowadząca.

### Materiały

- [ ] **1. Dostęp do Fitssey**: użytkownik zalogował się 21.11.2026 i przysłał kod widżetu grafiku (wdrożony – patrz „Zrobione”).
  - Zaproponować Renacie zmianę hasła, jeśli użytkownik logował się jej danymi.
  - **Usunąć niebieski pas „Zatrzymaj się na chwilę…”** (decyzja użytkownika 21.11.2026): to tekst salonu w panelu Fitssey, nie nasz kod – zrobić to można tylko w panelu (szukać w ustawieniach FrontOffice albo w opisie/profilu studia; instrukcji Fitssey nie znaleźliśmy – w razie czego support Fitssey). Pas zniknie też ze strony Fitssey AMÉA, więc dać znać Renacie, bo to jej tekst.
  - Przy okazji w panelu: jeśli FrontOffice ma ustawienie koloru przewodniego – karmel `#9A6B42` zamiast niebieskiego (wnętrza ramki nie zmienimy z naszej strony).
- [x] **2. Dane do polityki prywatności** – otrzymane 10.11.2026:
  - jednoosobowa działalność gospodarcza „Améa Renata Judzińska” (sprawdzone w CEIDG 11.11.2026, wpis aktywny);
  - adres: ul. Piłsudskiego 65, 41-902 Bytom; w CEIDG stałe miejsce wykonywania działalności to ul. Marszałka Józefa Piłsudskiego 65/9 (z numerem lokalu) – tak jest w polityce;
  - NIP 9542682779, REGON 243572225 (z CEIDG);
  - e-mail w sprawach danych osobowych: kontakt@amea-beauty.pl;
  - inspektora ochrony danych nie wyznaczono;
  - **każda specjalistka prowadzi własną działalność i odpowiada za dane swoich klientek** (tak jest w regulaminie i w umowach między nimi). W polityce: AMÉA jest administratorem danych ze strony i z kontaktu z salonem, specjalistki są odrębnymi administratorami danych swoich klientek. W polityce na razie ogólne zdanie, bez nazw ich działalności (decyzja 11.11.2026); wymienienie z nazw wymagałoby ich NIP-ów.

  Wykorzystane w `polityka-prywatnosci.html` (11.11.2026); co jeszcze zostało – sekcja 4.
- [x] **3. Reszta zdjęć dziewczyn z opisami i spis całego zespołu**: otrzymane 11.11.2026 (8 zdjęć: Pati w sali jogi i dwa wycięte, Ola w studiu, Katarzyna i Ania przy szyldzie i wycięte).
  - Zrobione 11.11.2026: w Zespole pięć osób – doszła Pati (nauczycielka jogi), Aleksandra ma zdjęcie. Zdjęcia z własnym tłem (wariant A, wybór użytkownika); szczegóły w CLAUDE.md, „Zdjęcia”.
  - Kasia (szósta osoba, 15.11.2026) – sekcja 1.

## 1. Do ustalenia z salonem – jeszcze nie wysłane

Tego nie było w wiadomości z 10.11.2026 (sekcja 0) – dosłać przy okazji.

- [ ] **Kasia – nowa osoba w Zespole (15.11.2026)**: zdjęcie i bio przysłane w rozmowie, na stronie jako szósta osoba w grupie Wellbeing (bio z jej tekstu, przerobione na 1. osobę – patrz sekcja 0).
  - **Zdjęcie do wymiany** (użytkownik: „fatalne zdjęcie, nawet jej twarzy nie widać”): teraz kadr 3:4 z poziomego 720 × 405 px, sesja plenerowa, twarz odchylona do tyłu, w rogu podpis fotografa (wypadł przy kadrowaniu). Poprosić o pionowy portret przodem, z widoczną twarzą, w pełnej rozdzielczości (najlepiej w salonie albo na spokojnym tle) i zapytać, czy fotograf chce podpisu. Do czasu wymiany zostaje obecne (albo pusty łuk z emblematem – `.portrait .emblem`).
  - Zrobione 21.11.2026: Kasia prowadzi „Mobility for Longevity” (grafik Fitssey, piątek 27.11, 19:00–20:00) – karta w zakładce Ruch (skrót opisu z Fitssey), wiersz w liście w Zajęciach, link w jej bio otwiera grafik.
  - **Do potwierdzenia: cena Mobility for Longevity** – czy obejmuje je wejście jednorazowe 50 zł (i karnet x4) z Fitssey; do tego czasu karta bez kwoty (`TODO(zajęcia)` w `index.html`). Rola w karcie Kasi wzięta z jej bio – ewentualnie dopasować do zajęć.
- [ ] **Prowadzące zajęcia z Fitssey**: Pati jest w Zespole od 11.11.2026, Kasia od 15.11.2026 (wyżej). Karoliny (zajęcia sensualne) już nie ma; przy pilatesie poczekać, kto będzie prowadził – ta osoba też do Zespołu (grupa Wellbeing).
- [ ] **Bon upominkowy**: jakie wartości lub rodzaje (kupuje się na miejscu i telefonicznie; bon online – sekcja 0).
- [ ] **Nowe pozycje w cenniku Fitssey** bez opisu (stan 10.11.2026): „Glow & Balance Experience” (179 zł, 1 sesja) i „Śpiewoczucie” (65 zł, 1 sesja). Co to jest, czy pokazać na stronie (np. przy warsztatach)? „Joga + warsztaty matcha” z 24.10 nadal jest w cenniku, choć termin minął.
- [ ] **Panel usług**
  - opisy w panelu (skrót z opisów na Booksy) – salon czyta i poprawia;
  - w Booksy Katarzyna (fizjoterapeutka) jest przypisana m.in. do Clear Skin, Skin Lift, Skin Age i Cosmelanu – czy to celowe?
  - fizjoterapia: czy zawsze zaczyna się od wizyty diagnostycznej (tak mówi panel), czy można od razu zapisać się na terapię;
  - Retix C i Green Sea Peel są w Booksy dwa razy (w „Zabiegach na twarz” i w „Przebarwieniach”, Green Sea Peel z innym czasem: 1 h 30 min i 1 h) – która wersja jest właściwa, czy jedną usunąć.
- [ ] **Wizytówka w Google** (Renata w panelu Profilu Firmy w Google): godziny pokazują „Czynne całą dobę” – ustawić pon.–sob. 8:00–21:00, niedziela nieczynne; po publikacji strony wpisać jej adres („Dodaj witrynę”, patrz sekcja 4). Link „Poproś o opinie” przyszedł 15.11.2026 i jest na stronie („Napisz opinię w Google” pod cytatami); ten sam link salon może wysyłać klientkom po wizycie albo wydrukować jako kod QR przy recepcji.

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
| Zespół | pion 3:4 | Od 11.11.2026 każda osoba ma zdjęcie z własnym tłem (wybór użytkownika). Przy sesji: **Kasia przodem, z widoczną twarzą** (obecne do wymiany, patrz sekcja 1), Renata w lepszej rozdzielczości (obecne ma 480 × 640 px), ewentualnie Aleksandra i Pati w salonie |
| O nas | pion 4:5, łuk | Zabieg w trakcie: dłonie specjalistki, klientka na łóżku; albo gabinet z muralem jak teraz, lepiej |
| Przestrzeń – łuk | pion 3:4 | Strefa relaksu przy oknie: kanapa, stolik, rośliny, pusty wieszak |
| Przestrzeń – szerokie ×2 | poziom 16:9 | Gabinet zabiegowy; sala ruchu (maty, pufy, lustro) |
| Zajęcia | pion 3:4 ×2, poziom 16:9 | Prowadząca w pozycji jogi, prowadząca z misą; grupa podczas zajęć – jeśli uda się na zajęciach |
| Kontakt | pion 4:5, łuk | Szyld albo wejście od ulicy, żeby łatwo trafić |
| Hero (opcjonalnie) | pion 4:5 | Pionowy portret Renaty; obecny `renata.webp` jest poziomy i kadrowany w CSS |
| Podgląd linku | poziom 1200×630 | Najładniejsze wnętrze w poziomie (patrz sekcja 4) |
| Nowe miejsca | pion i poziom | Kącik do stóp z wejścia, bez zasłony (rytuał „Lekkość” – salon potwierdził 10.11.2026); gabinet z urządzeniem do RF mikroigłowej w całości; strefa konsultacji przy oknie; sala z łóżkiem do masażu |
| Detale (zapas) | dowolny | Kosmetyki, ampułki, ręcznik, roślina, świece – martwa natura |

## 3. Nowe funkcje na stronie

- [ ] **Grafik Fitssey – sprawdzić na prawdziwym iPhonie (Safari)**, po publikacji, na telefonie użytkownika (Claude nie ma dostępu do urządzenia; emulacja w przeglądarce nie odtwarza blokady cookies Safari): logowanie i zapis w okienku grafiku. Ramka Fitssey używa własnego cookie, a Safari blokuje cookies w ramkach z innych stron – jeśli zapis nie działa, klientka ma „Otwórz w Fitssey” w pasku okna (na telefonie też widoczne).

## 4. Przed publikacją

- [ ] **Polityka prywatności – dokończyć** (strona `polityka-prywatnosci.html` jest od 11.11.2026):
  - po wyborze hostingu i poczty wpisać ich dostawców z nazwy (`TODO(domena)` w polityce, punkt 4);
  - przed publikacją dać ją do przejrzenia osobie znającej RODO; Renata czyta, czy okresy przechowywania i opis współpracy ze specjalistkami się zgadzają;
  - przy każdej zmianie, która dotyka danych (analityka, formularz, nowy zewnętrzny skrypt), zaktualizować politykę i jej datę (grafik Fitssey dopisany 21.11.2026).
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

- [x] Grafik Fitssey na stronie (21.11.2026): „Grafik i zapisy” w Zajęciach, „Zapisz się” / „Zobacz terminy” na kartach w zakładce Ruch i link w bio Patrycji otwierają okno jak rezerwacja Booksy z grafikiem Fitssey (wybór z dwóch prototypów: okno / blok w sekcji); ładuje się dopiero po kliknięciu, polityka prywatności uzupełniona (cookies Fitssey i Google Tag Manager w okienku)
- [x] Polityka prywatności (11.11.2026): osobna strona `polityka-prywatnosci.html` w stylu strony (RODO art. 13: administrator, specjalistki jako odrębni administratorzy, cele i podstawy, Booksy i Fitssey, odbiorcy, okresy, prawa, cookies), link w stopce obu stron; fonty Playfair Display i Jost z naszego serwera (`assets/fonts`, licencje OFL obok) zamiast Google Fonts – przy wejściu na stronę nic nie idzie do zewnętrznych serwisów

- [x] Wizytówka Google (10.11.2026): karta trasy w Kontakcie prowadzi do profilu salonu w Mapach, w hero i Opiniach wspólna ocena „5.0 · 72 opinie na Booksy i w Google”, w Opiniach jedna lista cytatów z obu źródeł i linki do obu, w JSON-LD `sameAs`, `hasMap` i współrzędne
- [x] Przegląd usług z Booksy i Fitssey (10.11.2026): ceny i czasy w panelu zgodne z Booksy; nowe karty SKIN AGE (zmarszczki) i Trychologia; „od” tylko przy kilku cenach (także w wierszach poziomów) i najniższa cena we wstępie każdej zakładki; „Dla niego” jako ostatnia zakładka; wstępy zakładek najwyżej 2 linie; bez ogólnego przycisku w Fizjoterapii (karty otwierają panel); link dla posiadaczy bonu prosto do usługi „Bon upominkowy” w Booksy
- [x] Zespół – ustalenia salonu (15.11.2026): skrót bio Renaty zaakceptowany; „Kosmetolog, założycielka AMÉA” w karcie i nad bio; wszystkie osoby z samego imienia (nazwisko Renaty tylko w stopce); „Aleksandra” i „Patrycja” w karcie i nagłówku bio, w treści bio „Ola” i „Pati”; „Kasia” zostaje; wszystkie bio w 1. osobie – bio Ani i Kasi przerobione z 3. osoby i przekazane im przez użytkownika (gdyby poprawiły – podmienić)
- [x] Zespół – bio i układ (11–15.11.2026): bio każdej osoby po kliknięciu zdjęcia (na start nic nie jest otwarte, ponowne kliknięcie zwija), bio Renaty jako skrót; sześć osób w dwóch grupach Beauty | Wellbeing (wybór z czterech prototypów), na kartach same imiona
- [x] Panel usługi (10.11.2026): „Umów” w ofercie (także 18 wierszy cennika zabiegów pojedynczych), Diagnostyce i Fizjoterapii otwiera wysuwany panel z opisem z Booksy, wyborem opcji i obszaru/czasu, ceną i czasem; „Wybierz termin” otwiera na środku okno rezerwacji z widżetem Booksy od razu na tej usłudze (najpierw była nowa karta Booksy). Przy okazji ceny, które Booksy zmienił (konsultacja 3D, fizjoterapia, borowina, drenaż)
- [x] Zdjęcia od klientki (paczki z 3 i 5.11.2026): na stronę trafiły robocze zdjęcia do O nas, Przestrzeni (trzy różne miejsca) i Zespołu (Ania). Reszta odrzucona; zdjęcia zostaną zrobione osobiście (sekcja 2)
- [x] Zajęcia ruchowe → Fitssey: przyciski w sekcji Zajęcia, karty z „od 50 zł” w zakładce Ruch, stopka oferty z Fitssey, Kontakt, stopka strony, JSON-LD; karta „Zdrowy kręgosłup” (3.11.2026)
- [x] Telefon 791 103 551, e-mail kontakt@amea-beauty.pl, Instagram i Facebook na stronie (3.11.2026)
- [x] Godziny otwarcia pon.–sob. 8:00–21:00, niedziela nieczynne – potwierdzone przez salon (3.11.2026)
- [x] Cała oferta zsynchronizowana z Booksy: Women's Ritual (7), Men's Skin (3), Men's Ritual (3), makijaż permanentny i henna pudrowa (6), pełny cennik zabiegów pojedynczych (3.11.2026)
- [x] Zespół: zdjęcia Renaty, Katarzyny i Ani; Aleksandra dodana do zespołu (3–5.11.2026); zdjęcie Aleksandry i Pati jako piąta osoba (11.11.2026); Kasia jako szósta i bio Renaty (15.11.2026)
- [x] Hero: portret Renaty (`renata.webp`)
- [x] Favicon (`favicon.ico` 16–48 px, `favicon-32.png`) + `apple-touch-icon` 180 px: czarny emblemat na białym tle
- [x] Narzędzia do zdjęć: `tools/photo-look.ps1` (wspólny wygląd, HEIC, obrót), `tools/color-match.ps1`
