<div align="center">

# UUID & ULID Generator

**Generate, format, and inspect UUID v4, UUID v7, and ULID identifiers — entirely in your browser.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-himat.tech-2563eb?style=for-the-badge&logo=googlechrome&logoColor=white)](https://himat.tech/free-tools/uuid-generator)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Web Crypto](https://img.shields.io/badge/Web_Crypto-CSPRNG-10B981?style=for-the-badge&logo=lock&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)

<br />

A modern, production-quality developer utility for generating and inspecting identifiers with **zero server transmission**. Built with privacy-first architecture using native browser APIs.

[**Try the Live Demo →**](https://himat.tech/free-tools/uuid-generator)

</div>

---

## Highlights

| | |
|---|---|
| **UUID v4** | Cryptographically random via `crypto.randomUUID()` |
| **UUID v7** | RFC 9562 time-sortable with embedded timestamps |
| **ULID** | Lexicographically sortable 26-char Base32 identifiers |
| **Bulk Generate** | Up to 1,000 unique IDs per batch |
| **Flexible Export** | Plain, JSON, CSV, SQL IN & SQL VALUES |
| **Inspector** | Decode versions, variants & timestamps |
| **100% Private** | Nothing leaves your browser |

---

## Live Demo

Experience the full application online — no install required:

**[https://himat.tech/free-tools/uuid-generator](https://himat.tech/free-tools/uuid-generator)**

---

## Features

- **UUID v4** — Cryptographically random identifiers via `crypto.randomUUID()` with secure fallback
- **UUID v7** — RFC 9562 time-sortable UUIDs with embedded Unix timestamps
- **ULID** — Lexicographically sortable 26-character Base32 identifiers
- **Bulk Generation** — Generate 1 to 1,000 identifiers per batch
- **Flexible Output** — Plain lines, JSON, CSV, SQL IN, and SQL VALUES formats
- **Character Formatting** — Uppercase/lowercase toggle and optional hyphen removal
- **Built-in Inspector** — Detect type, version, variant, and decode timestamps
- **Copy & Export** — One-click clipboard copy and TXT/JSON downloads
- **Dark Mode** — Full light/dark theme support
- **100% Private** — No data leaves your browser

---

## Supported Identifier Types

| Type | Description | Sortable |
|:-----|:------------|:--------:|
| **UUID v4** | Random 128-bit identifier | No |
| **UUID v7** | Timestamp-embedded UUID (RFC 9562) | Yes |
| **ULID** | 48-bit timestamp + 80-bit randomness | Yes |

---

## Quick Start

```bash
git clone https://github.com/himat-technology/uuid-generator.git
cd uuid-generator
npm install
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Production Build

```bash
npm run build
npm start
```

### Run Tests

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

---

## Tech Stack

| Technology | Purpose |
|:-----------|:--------|
| [Next.js 15](https://nextjs.org/) | App Router, React framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Lucide React](https://lucide.dev/) | Icon system |
| [Vitest](https://vitest.dev/) | Unit testing |
| **Web Crypto API** | `crypto.getRandomValues()` · `crypto.randomUUID()` |

---

## Project Structure

```
uuid-generator/
├── src/
│   ├── app/                  # Next.js App Router
│   ├── components/           # React UI components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Core utilities (uuid, ulid, inspector…)
│   └── types/                # TypeScript definitions
└── tests/                    # Unit tests (39 passing)
```

---

## Identifier Deep Dive

### UUID v4

UUID version 4 uses 122 bits of cryptographically secure random data with version (4) and variant (RFC 4122) bits set according to the standard. Generated via `crypto.randomUUID()` when available, with a `crypto.getRandomValues()` fallback.

### UUID v7

UUID version 7 (RFC 9562) embeds a 48-bit Unix epoch millisecond timestamp in the most significant bits, followed by version/variant bits and random entropy — making UUIDs naturally sortable by creation time.

### ULID

Universally Unique Lexicographically Sortable Identifiers use a 48-bit millisecond timestamp encoded in Crockford Base32 (10 characters) plus 80 bits of randomness (16 characters), producing exactly 26 characters total.

---

## Privacy & Security

All identifier generation and inspection occurs **entirely within your browser**:

- `crypto.getRandomValues()` for CSPRNG-quality randomness
- `crypto.randomUUID()` for UUID v4 when available
- No generated data uploaded, stored, or transmitted
- No analytics or external API calls required
- No backend server needed

---

## Built by Himat Technology

<div align="center">

**Crafting modern web tools and developer utilities.**

<br />

[![Website](https://img.shields.io/badge/Website-himat.tech-2563eb?style=flat-square&logo=googlechrome&logoColor=white)](https://himat.tech)
[![Live Demo](https://img.shields.io/badge/Demo-UUID_Generator-7C3AED?style=flat-square&logo=sparkles&logoColor=white)](https://himat.tech/free-tools/uuid-generator)
[![Facebook](https://img.shields.io/badge/Facebook-Himat_Technology-1877F2?style=flat-square&logo=facebook&logoColor=white)](https://www.facebook.com/people/Himat-technology/61593829197445/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Himat_Technology-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/himat-technology)
[![Instagram](https://img.shields.io/badge/Instagram-@himat__technologies-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/himat_technologies/)
[![GitHub](https://img.shields.io/badge/GitHub-himat--technology-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/himat-technology)

<br />

| Platform | Link |
|:---------|:-----|
| **Live Demo** | [himat.tech/free-tools/uuid-generator](https://himat.tech/free-tools/uuid-generator) |
| **Website** | [himat.tech](https://himat.tech) |
| **Facebook** | [Himat Technology](https://www.facebook.com/people/Himat-technology/61593829197445/) |
| **LinkedIn** | [Himat Technology](https://www.linkedin.com/company/himat-technology) |
| **Instagram** | [@himat_technologies](https://www.instagram.com/himat_technologies/) |
| **GitHub** | [himat-technology](https://github.com/himat-technology) |

</div>

---

## License

See [LICENSE](LICENSE) for details.

---

<div align="center">

**[Himat Technology](https://himat.tech)** · [Live Demo](https://himat.tech/free-tools/uuid-generator) · [GitHub](https://github.com/himat-technology)

*100% browser-local · Web Crypto CSPRNG · No server required*

</div>
