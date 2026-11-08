import React from 'react';
import { Zap, Heart, ShieldCheck, Sparkles, PawPrint, Smartphone } from 'lucide-react';

export function BrandPerks() {
  const perks = [
    {
      icon: Zap,
      title: 'Instant Cloud Delivery',
      description: 'Receive your 1-click template duplication links and high-res PDFs immediately upon purchase.',
      color: 'text-caramel-600 bg-caramel-100/70 border-caramel-200',
    },
    {
      icon: Smartphone,
      title: '100% Free Plan Friendly',
      description: 'Zero premium subscriptions required. All Notion templates run flawlessly on standard free personal accounts.',
      color: 'text-rosewood-600 bg-rosewood-100/70 border-rosewood-200',
    },
    {
      icon: PawPrint,
      title: 'Dedicated Pet Care Hubs',
      description: 'Thoughtfully structured for single and multi-pet families: vaccine schedules, vet records, and sitter emergency sheets.',
      color: 'text-sage-600 bg-sage-100/70 border-sage-200',
    },
    {
      icon: ShieldCheck,
      title: 'Lifetime Updates & Support',
      description: 'Free future improvements, video setup walk-throughs, and prompt email assistance at hello@tazvella.com.',
      color: 'text-lavender-600 bg-lavender-100/70 border-lavender-200',
    },
  ];

  return (
    <section className="py-10 border-y border-cream-200/80 bg-cream-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-cream-50/80 border border-cream-200/60 shadow-soft-sm hover:shadow-soft transition-all"
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${perk.color}`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-espresso-950">
                    {perk.title}
                  </h4>
                  <p className="text-xs text-espresso-600 mt-1 leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
