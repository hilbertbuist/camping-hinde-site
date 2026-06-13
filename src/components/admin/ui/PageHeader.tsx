import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <header className="a-page-header">
      <div>
        <h1 className="a-page-header__title">{title}</h1>
        {description ? <p className="a-page-header__desc">{description}</p> : null}
      </div>
      {actions ? <div className="a-page-header__actions">{actions}</div> : null}
    </header>
  );
}

export default PageHeader;
