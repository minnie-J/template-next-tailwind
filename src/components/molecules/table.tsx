import { ReactNode } from "react";

import classNames from "classnames";

interface Column<T> {
  key: keyof T;
  display: string;
  render?: (obj: T) => ReactNode;
}

export type Columns<T> = Array<Column<T>>;
export type Rows<T> = Array<T>;

const Table = <T extends object>({
  columns,
  rows,
}: {
  columns: Columns<T>;
  rows?: Rows<T>;
}) => {
  return (
    <div className={classNames("border", "rounded-md")}>
      <div className={classNames("h-full", "w-full", "table")}>
        <table
          className={classNames("border-spacing-0", "w-full", "table-auto")}
        >
          <thead className={classNames("[&_tr]:border-b")}>
            <tr
              className={classNames(
                "cursor-default",
                "border-b",
                "transition-colors",
                "hover:bg-muted/50"
              )}
            >
              {columns?.map(({ key, display }) => (
                <th key={key as string} className={classNames("h-12", "px-4")}>
                  <div>{display}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={classNames("[&_tr:last-child]:border-0")}>
            {rows?.map((row, idx) => (
              <tr
                key={idx}
                className={classNames(
                  "cursor-pointer",
                  "border-b",
                  "transition-colors",
                  "hover:bg-stone-100/50"
                )}
              >
                {columns?.map(({ key, render }) => (
                  <td key={key as string} className={classNames("p-4")}>
                    <div
                      className={classNames(
                        "text-ellipsis",
                        "overflow-hidden",
                        "whitespace-nowrap",
                        "px-4"
                      )}
                    >
                      {render ? render(row) : `${row[key]}`}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
