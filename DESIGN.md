# DESIGN.md – kombuczka.pl

Wersja 0.1, 08.11.2026. Źródła: logo i etykieta Kombuczki, zdjęcia od Tomka, brief i scenariusz strony w Notion („Nowa strona kombuczka.pl – brief”).
Kierunek z briefu (Tomek, 05.11.2026): jasna, „żywa” strona – kremowe tło, butelkowa zieleń z logo, złoto i bursztyn jako akcent, zdjęcia z bliska; czarne tło z etykiety tylko jako akcent.

Kierunek nie jest oparty na przeglądzie innych stron w bibliotece UXKIN (nie jest podłączona). Opiera się na marce, briefie i zasadach poniżej.

## 1. Charakter

- **Rzemiosło, nie korporacja.** Strona człowieka, który od 6 lat fermentuje w słojach i jeździ z tym na wykłady. Ciepło, konkret, prawdziwe zdjęcia.
- **Trzy motywy z marki, używane oszczędnie:**
  1. **Bąbelki** – kropki z logo (zielone, żółte, bursztynowe). Dekoracja narożników sekcji i skala ocen. Nigdy jako tło całej sekcji.
  2. **Kontur listków** – cienka linia z grafiki „listki”. Przerywnik i ikona punktów list.
  3. **Rama etykiety** – czarne tło, cienkie zielone linie pionowe, bursztynowe poziome z kropką na końcach, para listków w rogach. **Najwyżej jedna taka sekcja na stronę.**
- **Etykieta z szyjki** – biała naklejka z kodem partii (np. „M2 Firmowa”) to element interfejsu: chip z kodem partii, lekko obrócony.

Unikamy: gradientów, efektu szkła, wszystkiego wyśrodkowanego, emoji jako ikon, tekstu w gradiencie, obietnic zdrowotnych w nagłówkach.

## 2. Kolory

Jasny motyw. Trybu ciemnego nie planujemy (strona informacyjna, ciemny zostaje jako akcent etykiety).

| Token | Wartość | Rola |
|---|---|---|
| `--cream` | `#FBF7EE` | tło strony |
| `--sand` | `#F3ECDC` | tło sekcji wyróżnionych, kart na kremie |
| `--paper` | `#FFFFFF` | karty, pola formularza |
| `--line` | `#E4DAC4` | obramowania, linie podziału |
| `--ink` | `#1E2B1F` | tekst główny (13,8:1 na kremie) |
| `--ink-muted` | `#59634F` | tekst pomocniczy (5,9:1 na kremie) |
| `--green-700` | `#146C2E` | **kolor główny**: przyciski, linki, aktywne elementy (6,1:1 na kremie; biały tekst na nim 6,5:1) |
| `--green-900` | `#0F4D22` | hover przycisków i linków |
| `--leaf-dark` | `#1C9838` | zieleń z logo – tylko dekoracja i duże elementy, nie tekst (3,5:1) |
| `--leaf-light` | `#50AE32` | jasny listek z logo – dekoracja |
| `--gold` | `#FDCA5D` | akcent: podkreślenia, bąbelki, wyróżnienie na ciemnym tle |
| `--yolk` | `#FFD008` | najjaśniejszy bąbelek z logo – tylko dekoracja |
| `--amber` | `#D07612` | bursztyn z napisu logo – linie ramy etykiety, ikony, duże cyfry |
| `--amber-text` | `#A35208` | bursztyn do małego tekstu na kremie (5,2:1): etykiety nad nagłówkami |
| `--night` | `#16201A` | tło sekcji „etykieta” (krem na nim 15,6:1) |
| `--success` | `#146C2E` | potwierdzenie wysłania |
| `--error` | `#B42318` | błędy formularza |

Zasada: **jeden kolor akcji** (`--green-700`). Złoto i bursztyn nigdy nie są kolorem przycisku.

## 3. Typografia

- **Nagłówki: Fraunces** (Google Fonts, licencja OFL), grubość 600, oś SOFT 50 – miękki, „rzemieślniczy” szeryf, pasuje do szeryfowych napisów na etykiecie.
- **Tekst i interfejs: Figtree** 400 / 500 / 700 – geometryczny, przyjazny, bliski zaokrąglonemu napisowi w logo.
- Obie mają polskie znaki. Pliki fontów hostujemy u siebie (`fonts/`, WOFF2 zmienne, podzbiory latin i latin-ext, razem ok. 150 KB): bez Google Fonts, bez zgód na cookies.

| Token | Rozmiar | Interlinia | Użycie |
|---|---|---|---|
| `--fs-xs` | 14 px | 1,45 | podpisy, drobny druk |
| `--fs-sm` | 16 px | 1,55 | tekst w kartach, formularz |
| `--fs-base` | 18 px | 1,6 | tekst główny |
| `--fs-lg` | 21 px | 1,5 | lead pod nagłówkiem |
| `--fs-h3` | 24 px | 1,25 | tytuły kart |
| `--fs-h2` | clamp(30 px → 44 px) | 1,12 | nagłówki sekcji |
| `--fs-h1` | clamp(38 px → 58 px) | 1,05 | nagłówek pierwszego ekranu |
| `--fs-stat` | clamp(32 px → 48 px) | 1 | liczby w pasku faktów |

Etykieta nad nagłówkiem („eyebrow”): Figtree 700, 13 px, wersaliki, odstęp liter 0,12em, kolor `--amber-text`. Długość wiersza tekstu: najwyżej 68 znaków.

## 4. Odstępy i siatka

- Skala 4 px: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 (`--s-1` … `--s-10`).
- Odstęp pionowy sekcji: `clamp(64px, 9vw, 120px)`.
- Szerokość treści: 1200 px + marginesy boczne `clamp(20px, 5vw, 48px)`.
- Układ asymetryczny: nagłówek sekcji po lewej (5 kolumn z 12), treść po prawej; nie wszystko na środku.

## 5. Kształt i głębia

- Promienie: `--r-sm` 8 px (pola, chipy), `--r-md` 16 px (karty), `--r-lg` 28 px (zdjęcia), `--r-pill` (przyciski).
- Zdjęcie główne może mieć kształt łuku (górne rogi zaokrąglone do połowy szerokości) – nawiązanie do słoja.
- Jeden cień: `--shadow` = `0 1px 2px rgb(30 43 31 / .06), 0 10px 30px rgb(30 43 31 / .08)` – karty po najechaniu, okno dialogowe. Poza tym płasko, podział linią `--line`.

## 6. Komponenty

- **Przycisk główny:** tło `--green-700`, tekst biały, Figtree 700 17 px, wysokość 52 px, pigułka; hover `--green-900`; focus: obwódka 3 px `--gold` z odstępem 2 px; disabled: 45% krycia.
- **Przycisk drugi:** obramowanie 1,5 px `--green-700`, tekst `--green-700`, tło przezroczyste; hover tło `--sand`.
- **Przycisk cichy / link:** tekst `--green-700`, podkreślenie 1 px z odstępem, hover grubsze podkreślenie.
- **„Zapytaj o termin”:** zawsze otwiera okno wyboru: e-mail albo WhatsApp z gotową wiadomością (szablon ze scenariusza) i przycisk „Kopiuj wiadomość”. Adres i numer zawsze widoczne tekstem. Na telefonie stały przycisk na dole ekranu.
- **Karta formatu:** zdjęcie 4:3 z `--r-lg`, nazwa (Fraunces 24 px), wiersz faktów (czas · grupa), lista „co dostajesz” z ikoną listka, link „Szczegóły”.
- **Kafel „dla kogo”:** wiersz listy z ikoną konturu listka, tytułem i jednym zdaniem; obramowanie dolne `--line`; cały wiersz klikalny.
- **Pasek faktów:** liczby Fraunces `--fs-stat` w `--green-700`, podpis `--ink-muted` 14 px.
- **Kroki:** numer w bąbelku (koło 44 px, `--gold`, cyfra `--ink`), linia łącząca na komputerze.
- **Sekcja „etykieta”:** tło `--night`, rama jak na etykiecie, tekst kremowy, nagłówek w `--gold`.
- **Chip partii:** biała naklejka, Figtree 700, `--ink`, obrót −2°, cień delikatny.
- **Pola formularza:** wysokość 52 px, tło `--paper`, obramowanie 1,5 px `--line`, focus obramowanie `--green-700` + pierścień `--gold`; etykieta nad polem 15 px 700; podpowiedź pod polem `--ink-muted`; błąd `--error` z tekstem, nie tylko kolorem.
- **Ocena bąbelkami:** 5 kół 44 px w kolorach z logo (od bursztynu do zieleni), zaznaczone pełne, reszta kontur; obsługa klawiaturą (radio).
- **Nawigacja:** znak + napis Kombuczka.pl + podpis „Tomek Bączkowski”; linki Figtree 600; przycisk „Zapytaj o termin” po prawej. Na telefonie menu rozwijane.
- **Stopka:** tło `--sand`, dane spółki, kontakt, social, polityka prywatności, link „Oceń partię”. Bez „Powered by”.

## 7. Zdjęcia i grafika

- Zdjęcia prawdziwe, z produkcji i wydarzeń. Bez zdjęć stockowych.
- Formaty: 4:3 (karty), 4:5 (pion przy tekście), 1:1 (składniki). WebP, szerokość 2× wyświetlanej, jakość ok. 78.
- Priorytet treści: ludzie na wykładach i warsztatach > proces (słoje, SCOBY) > butelki > składniki.
- Zdjęcia z wykładów są dziś małe (ok. 520 px): pokazujemy je najwyżej w 260–400 px. Lepsze zdjęcia z wydarzeń to najważniejszy brak.
- Ikony: kontur listka i bąbelki rysowane jako SVG w kolorach marki. Żadnej biblioteki ikon poza strzałkami i ikonami e-mail/WhatsApp/Facebook/Instagram (linia 1,75 px).
- Logo: znak (`img/znak.svg`) + napis z logo (`img/wordmark.svg`). Pełne logo pionowe tylko w stopce i na stronie „O mnie”.

## 8. Ruch

- Przejścia 160–220 ms, `ease-out`. Najechanie na kartę: cień + przesunięcie o 2 px.
- Bez animacji przewijania i paralaksy. `prefers-reduced-motion` wyłącza przejścia.

## 9. Pliki w kodzie

Tokeny żyją jako zmienne CSS w `css/style.css` (`:root`). Strony używają nazw tokenów, nigdy surowych wartości.
