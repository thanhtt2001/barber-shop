import * as React from "react";

const Table = React.forwardRef(({ className = "", ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={["w-full caption-bottom text-sm border-collapse text-left", className].join(" ")}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className = "", ...props }, ref) => (
  <thead ref={ref} className={["[&_tr]:border-b border-gray-100 bg-gray-50/50", className].join(" ")} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className = "", ...props }, ref) => (
  <tbody
    ref={ref}
    className={["[&_tr:last-child]:border-0 divide-y divide-gray-50", className].join(" ")}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(({ className = "", ...props }, ref) => (
  <tfoot
    ref={ref}
    className={[
      "border-t bg-gray-50/50 font-medium [&>tr]:last:border-b-0",
      className,
    ].join(" ")}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef(({ className = "", ...props }, ref) => (
  <tr
    ref={ref}
    className={[
      "border-b border-gray-100 transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50",
      className,
    ].join(" ")}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(({ className = "", ...props }, ref) => (
  <th
    ref={ref}
    className={[
      "h-12 px-4 py-3 text-left align-middle text-xs font-semibold text-gray-500 uppercase tracking-wider [&:has([role=checkbox])]:pr-0",
      className,
    ].join(" ")}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className = "", ...props }, ref) => (
  <td
    ref={ref}
    className={[
      "p-4 align-middle text-sm text-gray-650 [&:has([role=checkbox])]:pr-0",
      className,
    ].join(" ")}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef(({ className = "", ...props }, ref) => (
  <caption
    ref={ref}
    className={["mt-4 text-sm text-gray-400", className].join(" ")}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
