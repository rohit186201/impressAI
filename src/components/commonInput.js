import React, { useState } from "react";
import { Input, Button } from "antd";
import './commonInput.css'

const InputHandler = ({ onSubmit, editMode = false }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Both fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email address.");
      return;
    }
    setError("");
    setLoading(true);
    onSubmit({ name, email });
    setLoading(false);
    setName("");
    setEmail("");
  };

  return (
    <div className="header-box">
      <div className="input1">
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        style={{ marginBottom: "10px" }}
      />
      </div>
      <div className="input2">
      <Input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        style={{ marginBottom: "10px" }}
      />
      </div>
      <div className="addbutton">
      <Button type="primary" onClick={handleSubmit} disabled={loading} loading={loading}>
        {!!editMode ? "Edit user" : "Add user"}
      </Button>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      </div>

    </div>
  );
};

export default InputHandler;
