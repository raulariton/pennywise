'use client';
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  backTitle: string;
  backSubtitle: string;
  icon?: React.ReactNode;
  children?: React.ReactNode; // back content
  trendValue?: string; // optional trend indicator
}

export default function MetricCard({
  title,
  value,
  subtitle,
  backTitle,
  backSubtitle,
  icon,
  children,
  trendValue,
}: MetricCardProps) {
  return (
    <div className="group relative h-80 w-full" style={{ perspective: '1000px' }}>
      <div
        className="relative h-full w-full transition-transform duration-700 ease-out group-hover:[transform:rotateY(180deg)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT FACE */}
        <div
          className="absolute inset-0 flex h-full w-full flex-col rounded-[2rem] bg-gradient-to-br from-white/80 to-white/60 shadow-lg backdrop-blur-2xl transition-all duration-500 group-hover:shadow-2xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Soft highlight on hover */}
          <div className="absolute inset-0 rounded-[2rem] border border-white/20 transition-colors duration-500 group-hover:border-indigo-100/60" />

          {/* Centered content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-6 text-center">
            {/* Title */}
            <h3 className="mb-6 text-base font-light tracking-widest text-slate-500 uppercase">
              {title}
            </h3>

            {/* Central Value */}
            <div className="mb-4 font-serif text-6xl font-extralight text-slate-900">{value}</div>

            {/* Subtitle */}
            <p className="mb-3 text-base font-light text-slate-600">{subtitle}</p>

            {/* Trend indicator */}
            {trendValue && (
              <p
                className={`text-sm ${
                  trendValue.startsWith('-') ? 'text-red-500' : 'text-emerald-600'
                }`}
              >
                {trendValue}
              </p>
            )}
          </div>

          {/* Icon anchored at the bottom center */}
          {icon && (
            <div className="relative z-10 flex justify-center pb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-2xl shadow-sm">
                {icon}
              </div>
            </div>
          )}
        </div>

        {/* BACK FACE */}
        <div
          className="absolute inset-0 flex h-full w-full flex-col rounded-[2rem] bg-white p-8 shadow-2xl backdrop-blur-xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex flex-1 flex-col">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900">{backTitle}</h3>
              <p className="text-sm text-slate-500">{backSubtitle}</p>
            </div>

            <div className="flex-1">
              <div className="mb-4 h-32">{children}</div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="mb-1 text-xs font-medium text-slate-500 uppercase">Trend</p>
                  <p className="text-sm font-semibold text-slate-800">{trendValue || '--'}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="mb-1 text-xs font-medium text-slate-500 uppercase">Average</p>
                  <p className="text-sm font-semibold text-slate-800">2500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
