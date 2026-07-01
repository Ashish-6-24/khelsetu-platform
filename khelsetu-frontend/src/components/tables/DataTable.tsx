interface DataTableProps<T> {
  columns: {
    key: string;
    header: string;
    render?: (row: T) => React.ReactNode;
  }[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export const DataTable = <T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
}: DataTableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[var(--border-subtle)]">
        <thead className="bg-[var(--bg-surface-sunken)]">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[var(--bg-surface)] divide-y divide-[var(--border-subtle)]">
          {data.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(row)}
              className={
                onRowClick
                  ? 'cursor-pointer hover:bg-[var(--bg-surface-sunken)]'
                  : ''
              }
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]"
                >
                  {col.render ? col.render(row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
