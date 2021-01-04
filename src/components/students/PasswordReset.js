import React, { useState } from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";

function PasswordReset({ setPassword }) {
  const [newPass, setNewPass] = useState("");

  const handleClick = () => {
    var pass = "";
    var str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";

    for (let i = 1; i <= 5; i++) {
      var char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setNewPass(pass);
    setPassword(pass);
  };
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <Button variant="outline-secondary" onClick={() => handleClick()}>
            Reset password
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setPassword("");
              setNewPass("");
            }}
          >
            Undo
          </Button>
        </InputGroup.Prepend>
        <FormControl
          aria-describedby="basic-addon1"
          value={newPass}
          placeholder="Generate random password"
        />
      </InputGroup>
    </div>
  );
}

export default PasswordReset;
