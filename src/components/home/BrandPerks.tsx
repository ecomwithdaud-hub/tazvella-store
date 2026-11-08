import React from 'react';
import { Zap, ShieldCheck, PawPrint, Smartphone } from 'lucide-react';

export function BrandPerks() {
  const perks = [
    {
      icon: Zap,
      title: 'Instant Cloud Delivery',
      description: 'Receive your 1-click template duplication links immediately upon purchase.',
      color: 'text-caramel-600 bg-caramel-100/70 border-caramel-200',
    },
    {
      icon: Smartphone,
      title: '100% Free Plan Friendly',
      description: 'Zero premium subscriptions required. Runs on free personal accounts.',
      color: 'text-rosewood-600 bg-rosewood-100/70 border-rosewood-200',
    },
    {
      icon: PawPrint,
      title: 'Dedicated Pet Care Hubs',
      description: 'Vaccine schedules, vet records, and sitter emergency sheets.',
      color: 'text-sage-600 bg-sage-100/70 border-sage-200',
    },
    {
      icon: ShieldCheck,
      title: 'Lifetime Free Updates',
      description: 'Free future improvements & friendly video setup tutorials.',
      color: 'text-lavender-600 bg-lavender-100/70 border-lavender-200',
    },
  ];

  return (
    <section className="py-4 sm:py-8 border-y border-cream-200/80 bg-cream-50/50">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        {/* 2x2 on mobile, 4-col on desktop: takes only ~120px of vertical height on mobile instead of 400px! */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="flex items-center sm:items-start gap-2 sm:gap-3 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-cream-50/80 border border-cream-200/60 shadow-soft-sm"
              >
                <div
                  className={`w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 border ${perk.color}`}
                >
                  <Icon size={14} className="sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-[11px] sm:text-sm font-semibold text-espresso-950 truncate sm:whitespace-normal">
                    {perk.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-espresso-500 mt-0.5 leading-tight hidden sm:block">
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
