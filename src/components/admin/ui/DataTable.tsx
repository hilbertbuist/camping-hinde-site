import type { ReactNode } from "react";

type Column = {
  key: string;
  label: string;
  render?: (row: any) => ReactNode;
  className?: string;
};

type DataTableProps = {
  columns: Column[];
  rows: any[];
  emptyText?: string;
};

export function DataTable({ columns, rows, emptyText = "Geen gegevens." }: DataTableProps) {
  return (
    <div className="a-table-wrap">
      <table className="a-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={col.className}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="a-table__empty" colSpan={columns.length}>
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={row?.id ?? i}>
                {columns.map((col) => (
                  <td key={col.key} className={col.className}>
                    {col.render ? col.render(row) : (row?.[col.key] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
