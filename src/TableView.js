import React from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * TableView Component
 * Displays profile data in a table format with sorting and actions like edit and delete.
 *
 * Props:
 * @param {Array} profiles - List of profiles to display in the table.
 * @param {Function} onEdit - Function to handle profile editing.
 * @param {Function} onDelete - Function to handle profile deletion.
 * @param {Function} setShowModal - Function to control the edit modal visibility.
 * @param {Boolean} darkMode - Determines if dark mode is enabled.
 */
function TableView({ profiles, onEdit, onDelete, setShowModal, darkMode }) {

  // Define the table columns
  const columns = [
    { header: "Name", accessorKey: "name" }, // Displays the name of the person
    { header: "Favorite Color", accessorKey: "favouriteColor" }, // Displays the favorite color
    { header: "Favorite Food", accessorKey: "favouriteFood" }, // Displays the favorite food
    { header: "Likes", accessorKey: "likes" }, // Displays the number of likes

    {
      header: "Actions", // Column for actions (Edit/Delete)
      accessorKey: "actions",
      cell: ({ row }) => (
        <div>
          {/* Edit Button - Opens the edit modal */}
          <button
            className="btn btn-warning btn-sm mx-1"
            onClick={() => {
              onEdit(row.original);
              setShowModal(true);
            }}
          >
            Edit
          </button>

          {/* Delete Button - Removes the profile */}
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(row.original.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Create the table instance using tanstack/react-table
  const table = useReactTable({
    data: profiles, // Data source (profiles array)
    columns, // Column definitions
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-responsive">
      <table className={`table table-striped table-bordered ${darkMode ? "table-dark" : "table-light"}`}>
        <thead>
          {/* Render table headers dynamically */}
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
          {/* Render table rows dynamically */}
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
