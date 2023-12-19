import classNames from "classnames";

const Table = () => {
  const columns = Array.from({ length: 3 }).map((_, idx) => ({
    name: `col ${idx}`,
  }));

  return (
    <div className={classNames("h-full", "w-full", "table")}>
      <table
        className={classNames(
          "border-separate",
          "border-spacing-0",
          "w-full",
          "table-auto"
          // !equalColumnWidth || fixedLeftIndexCount > 0
          //   ? "table-auto"
          //   : "table-fixed",
        )}
      >
        <thead>
          <tr className={classNames("h-9")}>
            {columns.map(({ name }) => (
              <th
                key={name}
                className={classNames(
                  "group",
                  "h-9",
                  "p-0",
                  "border-b",
                  "border-[#dadada]",
                  "bg-[#ededed]"
                )}
              >
                <div>{name}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div>cell 00</div>
            </td>
            <td>
              <div>cell 01</div>
            </td>
            <td>
              <div>cell 02</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>cell 10</div>
            </td>
            <td>
              <div>cell 11</div>
            </td>
            <td>
              <div>cell 12</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
