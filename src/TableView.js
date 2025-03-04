import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import "bootstrap/dist/css/bootstrap.min.css";

function TableView({ profiles, onEdit, onDelete, setShowModal }) {
  // Define table columns
  const columns = useMemo(
    () => [
      { header: "Name", accessorKey: "name" },
      { header: "Favorite Color", accessorKey: "favouriteColor" },
      { header: "Favorite Food", accessorKey: "favouriteFood" },
      { header: "Likes", accessorKey: "likes" },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ row }) => (
          <div>
            <button
              className="btn btn-warning btn-sm mx-1"
              onClick={() => {
                onEdit(row.original);
                setShowModal(true);
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete, setShowModal]
  );

  // Create table instance
  const table = useReactTable({
    data: profiles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableView;

