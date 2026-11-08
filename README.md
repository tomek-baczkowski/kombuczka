# kombuczka.pl

Statyczna strona Kombuczki (Tomek Bączkowski): wykłady, warsztaty i degustacje kombuchy oraz poradnik domowej kombuchy.

## Jak to działa

- `src/pages/` – treść każdej podstrony (HTML). Na górze pliku komentarz z ustawieniami: adres, tytuł, opis dla Google.
- `src/partials/` – powtarzane bloki (karty formatów, „Gdzie prowadziłem”, pasek kontaktu, stopka poradnika).
- `src/layout.html` – nagłówek, menu, stopka i okno „Zapytaj o termin” wspólne dla wszystkich stron.
- `src/static/` – CSS, JavaScript, zdjęcia (WebP), fonty, `llms.txt`.
- `build.py` – składa stronę do folderu `_site/` (Python 3, bez dodatkowych bibliotek). Tworzy też `sitemap.xml`, `robots.txt` i przekierowania starych adresów.
- `DESIGN.md` – kolory, fonty, odstępy i komponenty. Nowe elementy projektujemy według niego.

Podgląd lokalnie: `python3 build.py && python3 -m http.server -d _site 8000`, potem http://localhost:8000.

## Publikacja

Każdy push do gałęzi `main` uruchamia GitHub Actions (`.github/workflows/pages.yml`): budowanie i publikacja na GitHub Pages.
Jednorazowo w ustawieniach repozytorium: Settings → Pages → Source: **GitHub Actions**.

### Przepięcie domeny kombuczka.pl (gdy strona jest sprawdzona)

1. Dodać plik `src/static/CNAME` z jedną linią: `kombuczka.pl`.
2. W DNS u rejestratora (cyber_Folks): rekordy A dla `kombuczka.pl` na 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 oraz CNAME `www` → `tomek-baczkowski.github.io`.
3. W Settings → Pages wpisać domenę i włączyć „Enforce HTTPS”.
4. Po sprawdzeniu nowej strony wyłączyć hosting WordPressa w cyber_Folks (domena zostaje).

## Formularz „Oceń partię”

Wysyła przez Web3Forms (darmowy plan, 250 zgłoszeń miesięcznie) na adres ustawiony w panelu Web3Forms. Klucz formularza jest publiczny i może być w kodzie. Ochrona przed spamem: ukryte pole `botcheck`, blokada zbyt szybkiego wysłania i filtr Web3Forms; jeśli pojawi się spam, w panelu można włączyć captchę.

## Analityka

Liczenie kliknięć e-mail i WhatsApp jest przygotowane i wyłączone (`ANALYTICS = false` w `src/static/js/main.js`). Przed włączeniem trzeba zaktualizować politykę prywatności.
