export interface FAQItem {
  id: string;
  category: 'general' | 'notion' | 'goodnotes' | 'support';
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-instant-delivery',
    category: 'general',
    question: 'How do I receive my digital downloads after purchasing?',
    answer: 'Immediately upon checkout completion, you will receive an instant download page with direct links, plus an automatic confirmation email containing all access links, duplicate URLs, and video walkthrough guides. You can access your files 24/7 forever.',
  },
  {
    id: 'faq-notion-free',
    category: 'notion',
    question: 'Do I need a paid Notion subscription to use Tazvella templates?',
    answer: 'No! All Tazvella Notion templates are 100% compatible with the completely FREE personal Notion plan. You do not need to pay anything to Notion. Simply click "Duplicate" in the upper right corner to save the dashboard to your own workspace.',
  },
  {
    id: 'faq-pets-multiple',
    category: 'general',
    question: 'Can I track multiple dogs or cats in the Pet Parent Sanctuary?',
    answer: 'Yes! The Modern Pet Parent Sanctuary was built from the ground up for multi-pet families. You can add as many dogs, cats, rabbits, or birds as you have. Each pet gets their own isolated health passport, medication schedule, and photo gallery, while having an overarching household care overview.',
  },
  {
    id: 'faq-ipad-devices',
    category: 'goodnotes',
    question: 'Which devices and apps support the digital iPad planners?',
    answer: 'Our digital planners and journals work on any tablet or device that supports PDF annotation with a stylus or Apple Pencil. Popular apps include GoodNotes 5 & 6, Notability, Noteshelf, CollaNote, and Xodo. We also include pre-cropped sticker sheets and full setup tutorials.',
  },
  {
    id: 'faq-sheets-currencies',
    category: 'general',
    question: 'Does the Clean Wealth Budgeting spreadsheet support my local currency?',
    answer: 'Yes. The spreadsheet features a one-click currency switcher supporting USD ($), EUR (€), GBP (£), CAD (CA$), AUD (AU$), and custom currency inputs. The automated charts adjust instantly.',
  },
  {
    id: 'faq-updates-support',
    category: 'support',
    question: 'What if I need help setting up my template or lose my download link?',
    answer: 'We provide dedicated VIP customer support at hello@tazvella.com. All purchases come with complimentary lifetime updates, video duplication tutorials, and friendly support should you ever get stuck or misplace your download email.',
  },
];
