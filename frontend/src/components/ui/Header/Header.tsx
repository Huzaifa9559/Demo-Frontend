import { type ReactNode } from "react";

type HeaderWrapperProps = {
  children: ReactNode;
  className?: string;
};

const Header = ({ children, className }: HeaderWrapperProps) => {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm md:flex-row md:items-center md:justify-between ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

// Header.Content - Wrapper for label, title, and subtitle
type HeaderContentProps = {
  children: ReactNode;
  className?: string;
};

const HeaderContent = ({ children, className }: HeaderContentProps) => {
  return <div className={className}>{children}</div>;
};

// Header.Label - For the label text
type HeaderLabelProps = {
  children: ReactNode;
  className?: string;
};

const HeaderLabel = ({ children, className }: HeaderLabelProps) => {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-wide text-slate-500 ${
        className ?? ""
      }`}
    >
      {children}
    </p>
  );
};

// Header.Title - For the main title
type HeaderTitleProps = {
  children: ReactNode;
  className?: string;
};

const HeaderTitle = ({ children, className }: HeaderTitleProps) => {
  return (
    <h1
      className={`text-3xl font-semibold text-slate-900 ${className ?? ""}`}
    >
      {children}
    </h1>
  );
};

// Header.Subtitle - For subtitle text with optional suffix
type HeaderSubtitleProps = {
  children: ReactNode;
  suffix?: string;
  className?: string;
};

const HeaderSubtitle = ({
  children,
  suffix,
  className,
}: HeaderSubtitleProps) => {
  if (!children && !suffix) return null;

  return (
    <p className={`text-sm text-slate-500 ${className ?? ""}`}>
      {children}
      {children && suffix && " · "}
      {suffix}
    </p>
  );
};

// Header.Actions - For action buttons/items
type HeaderActionsProps = {
  children: ReactNode;
  className?: string;
};

const HeaderActions = ({ children, className }: HeaderActionsProps) => {
  return (
    <div className={`flex flex-wrap gap-3 ${className ?? ""}`}>
      {children}
    </div>
  );
};

// Attach sub-components for compound component pattern
Header.Content = HeaderContent;
Header.Label = HeaderLabel;
Header.Title = HeaderTitle;
Header.Subtitle = HeaderSubtitle;
Header.Actions = HeaderActions;

// Legacy type for backward compatibility (used by hooks/context)
export type HeaderProps = {
  label?: string;
  title: string;
  subtitle?: string;
  subtitleSuffix?: string;
  actions?: ReactNode;
  actionsAllowed?: boolean;
  className?: string;
};

export { Header };
