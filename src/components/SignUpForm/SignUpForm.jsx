import React, { useState } from "react";

import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";

import { isEmailValid } from "../../utils/validations";
import { signUpApi } from "../../api/auth";

import "./SignUpForm.scss";

const SignUpForm = (props) => {
  const [formData, setFormData] = useState(initialFormValue());
  const [signUpLoading, setSignUpLoading] = useState(false);

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
    } else if (formData.password !== formData.repeatPassword) {
      toast.warning("Las contraseñas no coinciden");
    } else if (size(formData.password) < 6) {
      toast.warning("La contraseñas debe tener al menos 6 caracteres");
    } else {
      setSignUpLoading(true);
      signUpApi(formData)
        .then((response) => {
          if (response.code) {
            toast.warning(response.message);
          } else {
            toast.success("Registro Exitoso");
            setShowModal(false);
            setFormData(initialFormValue());
          }
        })
        .catch((err) => {
          toast.error("Error en el registro, intentelo mas tarde");
        })
        .finally(() => {
          setSignUpLoading(false);
        });
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-up-form">
      <h2>Crea tu cuenta</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                defaultValue={formData.name}
                name="name"
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellido"
                defaultValue={formData.last_name}
                name="last_name"
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="E-mail"
            defaultValue={formData.mail}
            name="mail"
          />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                defaultValue={formData.password}
                name="password"
              />
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Repetir Contraseña"
                defaultValue={formData.repeatPassword}
                name="repeatPassword"
              />
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit">
          {!signUpLoading ? "Registrate" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
};

const initialFormValue = () => {
  return {
    name: "",
    last_name: "",
    mail: "",
    password: "",
    repeatPassword: "",
  };
};

export default SignUpForm;
