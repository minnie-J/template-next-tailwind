import classNames from "classnames";

// export interface Columns<T> {
//   key: T,
//   display: string
// }[]

const Table = () => {
  const columns = Array.from({ length: 3 }).map((_, idx) => ({
    key: idx,
    display: `col${idx}`,
  }));

  const rows: Array<{ [key: string]: number | string }> = Array.from({
    length: 2,
  }).map((_, idx) => ({
    id: idx,
    col0: `cell${idx}0`,
    col1: `cell${idx}1`,
    col2: `cell${idx}2`,
  }));

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
                <th key={key} className={classNames("h-12", "px-4")}>
                  <div>{display}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={classNames("[&_tr:last-child]:border-0")}>
            {rows.map((row) => (
              <tr
                key={row.id}
                className={classNames(
                  "cursor-pointer",
                  "border-b",
                  "transition-colors",
                  "hover:bg-stone-100/50"
                )}
              >
                {columns.map(({ key, display }) => (
                  <td key={key} className={classNames("p-4")}>
                    <div
                      className={classNames(
                        "text-ellipsis",
                        "overflow-hidden",
                        "whitespace-nowrap",
                        "px-4"
                      )}
                    >
                      {row[display]}
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
