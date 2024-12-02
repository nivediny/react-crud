import { Delete, Edit } from "@mui/icons-material";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const ListTable = ({ data, handleEdit, handleDelete }) => {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(data[0] || {}).map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {/* Dynamically render cells based on object values */}
            {Object.keys(item).map((key, index) => (
              <TableCell key={index}>{item[key]}</TableCell>
            ))}
            {/* Static Actions cell */}
            <TableCell>
              <IconButton onClick={() => handleEdit(item)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDelete(item.id)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </div>
  );
};

export default ListTable;
