import { Delete, Edit } from "@mui/icons-material";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ListTable = ({ data, handleDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (item) => {
    navigate("/user-edit", { state: { item } }); // Pass the selected item's data to the Edit Page
  };

  return (
    <div>
      {data && data.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(data[0]).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id || Math.random()}>
                {Object.keys(item).map((key) => (
                  <TableCell key={key}>
                    {item[key] !== undefined && item[key] !== null
                      ? typeof item[key] === "object"
                        ? JSON.stringify(item[key])
                        : item[key]
                      : "N/A"}
                  </TableCell>
                ))}
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
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default ListTable;
