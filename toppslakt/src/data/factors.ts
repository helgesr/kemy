import type { Category } from '../types/assessment';

export const categories: Category[] = [
  {
    id: 'biological',
    name: 'Biologisk risiko',
    factors: [
      {
        id: 'cms-pd',
        name: 'CMS-/PD-risiko',
        categoryId: 'biological',
        tooltip:
          'Kardiomyopatisyndrom (CMS) og pankreassykdom (PD) kan gi plutselig økt dødelighet. Score høyt ved påvist smitte i området eller egne merder.',
      },
      {
        id: 'weight',
        name: 'Snittvekt >5,8–6 kg',
        categoryId: 'biological',
        tooltip:
          'Fisk over 5,8 kg har høyere risiko for kvalitetstap og mekanisk skade. Stor fisk binder mer kapital per individ.',
      },
      {
        id: 'density',
        name: 'Høy tetthet',
        categoryId: 'biological',
        tooltip:
          'Høy biomasse per m³ øker stressnivå, oksygenforbruk og sykdomsspredning. Vurder aktuell tetthet opp mot konsesjonskrav.',
      },
      {
        id: 'hsmb',
        name: 'HSMB/hjertedødelighet',
        categoryId: 'biological',
        tooltip:
          'Hjerte- og skjelettmuskelbetennelse (HSMB) gir økt dødelighet over tid. Score høyt ved observert hjerterelatert dødelighet.',
      },
    ],
  },
  {
    id: 'lice-operations',
    name: 'Luse- og drift',
    factors: [
      {
        id: 'lice-increase',
        name: 'Økende lus',
        categoryId: 'lice-operations',
        tooltip:
          'Stigende lusetall øker risiko for pålegg om behandling eller utslakting. Vurder trender i lusetelling siste uker.',
      },
      {
        id: 'treatments',
        name: '≥2 behandlinger siste 6 uker',
        categoryId: 'lice-operations',
        tooltip:
          'Gjentatte avlusinger er belastende for fisken og øker dødelighet og kvalitetstap. Indikerer vedvarende luseproblem.',
      },
      {
        id: 'wounds',
        name: 'Sårproblematikk',
        categoryId: 'lice-operations',
        tooltip:
          'Åpne sår gir inngangsport for infeksjoner og nedklassifisering ved slakt. Vurder omfang og alvorlighetsgrad.',
      },
      {
        id: 'oxygen',
        name: 'Lav O₂-margin',
        categoryId: 'lice-operations',
        tooltip:
          'Lav oksygenmetning reduserer fiskens toleranse for stress og behandling. Kritisk i varme perioder med høy biomasse.',
      },
    ],
  },
  {
    id: 'economic',
    name: 'Økonomisk eksponering',
    factors: [
      {
        id: 'market-price',
        name: 'Høy markedspris',
        categoryId: 'economic',
        tooltip:
          'Når spotprisen er høy, kan det lønne seg å realisere verdien nå fremfor å risikere prisfall eller biologisk tap.',
      },
      {
        id: 'large-fish-share',
        name: '>40 % fisk >6 kg',
        categoryId: 'economic',
        tooltip:
          'Stor andel storlaks betyr høy konsentrasjon av verdi i merden. Toppslakt kan redusere risiko uten å tømme merden.',
      },
      {
        id: 'capital',
        name: 'Høy kapitalbinding',
        categoryId: 'economic',
        tooltip:
          'Mye bundet kapital i biomasse øker den økonomiske nedsiden ved uønskede hendelser som sykdomsutbrudd.',
      },
      {
        id: 'slaughter-capacity',
        name: 'Tilgjengelig slaktekapasitet',
        categoryId: 'economic',
        tooltip:
          'Ledig kapasitet hos slakteri gjør det mulig å handle raskt. Score høyt dersom det er god tilgjengelighet nå.',
      },
    ],
  },
];

export const allFactors = categories.flatMap((c) => c.factors);
