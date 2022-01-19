/** @format */

import { Form } from "react-bootstrap";

const CheckBox = ({ label, onChange }) => {
  const capLabel = label[0].toUpperCase() + label.slice(1);
  return (
    <div>
      <Form.Check type="checkbox" label={capLabel} onChange={onChange} />
    </div>
  );
};

export default CheckBox;
