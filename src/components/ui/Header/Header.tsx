import { type ReactNode } from "react";

export type HeaderProps = {
  label?: string;
  title: string;
  subtitle?: string;
  subtitleSuffix?: string;
  actions?: ReactNode;
  className?: string;
};

export const Header = ({
  label,
  title,
  subtitle,
  subtitleSuffix,
  actions,
  className,
}: HeaderProps) => {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm md:flex-row md:items-center md:justify-between ${
        className ?? ""
      }`}
    >
      <div>
        {label && (
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </p>
        )}
        <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
        {(subtitle || subtitleSuffix) && (
          <p className="text-sm text-slate-500">
            {subtitle}
            {subtitle && subtitleSuffix && " · "}
            {subtitleSuffix}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
};
