import { useState } from "react";
import Form from "react-bootstrap/Form";

function Select({ setTaskType }) {
  return (
    <Form.Select
      onChange={(e) => setTaskType(e.target.value)}
      className="mt-5 ml-2 p-2 rounded-md bg-pink-900 text-pink-100"
      aria-label="Default select example"
    >
      <option value="description">Description Style</option>
      <option value="checklist">TO DO Style</option>
    </Form.Select>
  );
}

export default Select;
