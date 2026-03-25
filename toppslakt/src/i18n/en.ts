import type { Translations } from './no';

const en: Translations = {
  // ── Nav ──
  'nav.products': 'Products',
  'nav.markets': 'Markets',
  'nav.case': 'Case Studies',
  'nav.tools': 'Assessment',
  'nav.contact': 'Contact',

  // ── Home ──
  'home.hero': 'Fish handling equipment engineered for welfare, efficiency and durability. Proven across Norwegian aquaculture.',
  'home.exploreProducts': 'Explore Products',
  'home.harvestCalculator': 'Assessment Tool',
  'home.ourProducts': 'Our Products',
  'home.product.kemysplit': 'Fish-friendly weight-based sorting of fish groups',
  'home.product.kemylice': 'Delousing and return water cleaning system',
  'home.product.kemypump': 'Mammut-principle fish and water pumping',
  'home.cta.label': 'Decision Support',
  'home.cta.title': 'Harvest Risk Calculator',
  'home.cta.description': 'Assess whether it\'s the right time for selective top-harvesting with our 12-factor risk scoring tool.',
  'home.cta.button': 'Open Calculator',

  // ── Products ──
  'products.title': 'Products',
  'products.subtitle': 'All designed for fish-friendly handling',
  'products.kemysplit.desc': 'Fish-friendly splitting of fish groups based on weight.',
  'products.kemysplit.f1': 'Gentle weight-based sorting',
  'products.kemysplit.f2': 'Minimal stress on fish',
  'products.kemysplit.f3': 'Robust stainless steel construction (AISI304)',
  'products.kemysplit.f4': 'Customizable size thresholds',
  'products.kemylice.desc': 'Cleans fish and return water from salmon lice and larvae. Also available for removal of cleaner fish and weak swimmers.',
  'products.kemylice.f1': 'Effective lice flushing',
  'products.kemylice.f2': 'Return water purification',
  'products.kemylice.f3': 'Removal of weak swimmers',
  'products.kemylice.f4': 'Low-impact operation',
  'products.kemypump.desc': 'Efficient pumping of both fish and water using the mammut principle.',
  'products.kemypump.f1': 'Gentle fish transport',
  'products.kemypump.f2': 'Air-driven suction principle',
  'products.kemypump.f3': 'Minimal mechanical contact',
  'products.kemypump.f4': 'Stainless steel (AISI304)',

  // ── Markets ──
  'markets.title': 'Markets',
  'markets.subtitle': 'Where our technology makes a difference',
  'markets.alt1': 'Aquaculture operations',
  'markets.alt2': 'Fish farming facility',
  'markets.alt3': 'Vessel-based operations',
  'markets.alt4': 'Equipment in action',

  // ── Case ──
  'case.title': 'Case Studies',
  'case.subtitle': 'Press coverage and proven results — click to enlarge',
  'case.viewFull': 'View full size',

  // ── Contact ──
  'contact.title': 'Contact',
  'contact.subtitle': 'Get in touch with our team',
  'contact.name': 'Name',
  'contact.namePlaceholder': 'Your full name',
  'contact.email': 'Email',
  'contact.emailPlaceholder': 'your@email.com',
  'contact.subject': 'Subject',
  'contact.subjectPlaceholder': 'What is this regarding?',
  'contact.message': 'Message',
  'contact.messagePlaceholder': 'Tell us more about your needs...',
  'contact.send': 'Send Message',
  'contact.thanks': 'Thank you for your message! We will get back to you shortly.',

  // ── Tools / Assessment ──
  'tools.title': 'Selective harvest assessment',
  'tools.subtitle': 'Decision support tool for evaluating whether selective sorting and harvesting with KemySplit is the right measure for your site.',
  'tools.location': 'Location',
  'tools.locationPlaceholder': 'Site name',
  'tools.date': 'Date',

  // ── Score levels ──
  'score.low': 'Low',
  'score.moderate': 'Moderate',
  'score.high': 'High',
  'score.lowRisk': 'Low risk',
  'score.moderateRisk': 'Moderate risk',
  'score.highRisk': 'High risk',
  'score.of': 'of',
  'score.tooltip': 'Show help text',

  // ── Recommendations ──
  'rec.low.text': 'Keep fish – low risk',
  'rec.low.desc': 'The risk profile indicates it is safe to keep the fish in the pen.',
  'rec.medium.text': 'Consider selective top-harvest (20–40%)',
  'rec.medium.desc': 'Moderate risk. Consider removing the largest fish to reduce exposure.',
  'rec.high.text': 'Execute top-harvest – high risk',
  'rec.high.desc': 'High overall risk. Recommend executing top-harvest to secure value.',

  // ── Categories ──
  'cat.biological': 'Biological risk',
  'cat.lice': 'Lice & operations',
  'cat.economic': 'Economic exposure',
  'cat.biological.short': 'Biological',
  'cat.lice.short': 'Lice/ops',
  'cat.economic.short': 'Economic',

  // ── Factors ──
  'factor.cms-pd': 'CMS/PD risk',
  'factor.cms-pd.tip': 'Cardiomyopathy syndrome (CMS) and pancreas disease (PD) can cause sudden increased mortality. Score high if infection is detected in the area or own pens.',
  'factor.weight': 'Avg. weight >5.8–6 kg',
  'factor.weight.tip': 'Fish over 5.8 kg have higher risk of quality loss and mechanical damage. Large fish bind more capital per individual.',
  'factor.density': 'High density',
  'factor.density.tip': 'High biomass per m³ increases stress levels, oxygen consumption, and disease spread. Evaluate current density against license requirements.',
  'factor.hsmb': 'HSMB/heart mortality',
  'factor.hsmb.tip': 'Heart and skeletal muscle inflammation (HSMB) causes increased mortality over time. Score high if heart-related mortality is observed.',
  'factor.lice-increase': 'Increasing lice',
  'factor.lice-increase.tip': 'Rising lice counts increase risk of mandatory treatment or harvesting orders. Evaluate trends in lice counts over recent weeks.',
  'factor.treatments': '≥2 treatments last 6 weeks',
  'factor.treatments.tip': 'Repeated delousing treatments are stressful for the fish and increase mortality and quality loss. Indicates persistent lice problem.',
  'factor.wounds': 'Wound issues',
  'factor.wounds.tip': 'Open wounds provide entry points for infections and downgrading at harvest. Evaluate extent and severity.',
  'factor.oxygen': 'Low O₂ margin',
  'factor.oxygen.tip': 'Low oxygen saturation reduces fish tolerance for stress and treatment. Critical during warm periods with high biomass.',
  'factor.market-price': 'High market price',
  'factor.market-price.tip': 'When the spot price is high, it may pay to realize value now rather than risk price drops or biological loss.',
  'factor.large-fish-share': '>40% fish >6 kg',
  'factor.large-fish-share.tip': 'A large proportion of big salmon means high concentration of value in the pen. Top-harvest can reduce risk without emptying the pen.',
  'factor.capital': 'High capital exposure',
  'factor.capital.tip': 'High capital tied up in biomass increases the economic downside of adverse events like disease outbreaks.',
  'factor.slaughter-capacity': 'Available harvest capacity',
  'factor.slaughter-capacity.tip': 'Available capacity at the processing plant makes it possible to act quickly. Score high if good availability exists now.',

  // ── Actions ──
  'action.save': 'Save',
  'action.pdf': 'PDF',
  'action.reset': 'Reset',
  'action.resetConfirm': 'Reset?',
  'action.yes': 'Yes',
  'action.no': 'No',

  // ── History ──
  'history.title': 'History',
  'history.compare': 'Compare selected',
  'history.load': 'Load',
  'history.delete': 'Delete',

  // ── Comparison ──
  'comparison.title': 'Comparison',
  'comparison.factor': 'Factor',
  'comparison.total': 'Total score',

  // ── PDF ──
  'pdf.subtitle': 'Decision support for top-harvest',
  'pdf.title': 'Top-harvest assessment',
  'pdf.location': 'Location:',
  'pdf.date': 'Date:',
  'pdf.lowRisk': 'LOW RISK',
  'pdf.moderateRisk': 'MODERATE RISK',
  'pdf.highRisk': 'HIGH RISK',
  'pdf.factor': 'FACTOR',
  'pdf.low': 'LOW',
  'pdf.mod': 'MOD.',
  'pdf.high': 'HIGH',
  'pdf.legendLow': '0–8: Keep fish',
  'pdf.legendMed': '9–16: Consider top-harvest',
  'pdf.legendHigh': '17–24: Execute top-harvest',

  // ── Footer ──
  'footer.powered': 'Powered by Saxe.Tech AS',

  // ── Language ──
  'lang.toggle': 'Norsk',
};

export default en;
