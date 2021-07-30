import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";

import { values, size } from "lodash";
import { toast } from "react-toastify";

import { isEmailValid } from "../../utils/validations";

import "./SignInForm.scss";
import { login, setTokenApi } from "../../api/auth";

export default function SingInForm(props) {
  const { setRefreshCheckLogin } = props;
  const [formData, setFormData] = useState(initialFormValue());
  const [signInLoading, setSignInLoading] = useState(false);

  const { setShowModal } = props;

  const onSubmit = (e) => {
    e.preventDefault();

    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    if (validCount !== size(formData)) {
      toast.warning("Completa todos los campos del formulario");
    } else if (!isEmailValid(formData.mail)) {
      toast.warning("E-mail invalido");
    } else {
      setSignInLoading(true);
      login(formData)
        .then((response) => {
          if (response.code) {
            toast.warning(response.message);
          } else {
            setTokenApi(response.token);
            setRefreshCheckLogin(true);
          }
        })
        .catch((err) => {
          toast.error("Error en el inicio de sesion, intentelo mas tarde");
        })
        .finally(() => {
          setSignInLoading(false);
        });
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-in-form">
      <h2>Inicia Sesión</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="E-mail"
            defaultValue={formData.mail}
            name="mail"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            defaultValue={formData.password}
            name="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {!signInLoading ? "Iniciar Sesión" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

const initialFormValue = () => {
  return {
    mail: "",
    password: "",
  };
};
