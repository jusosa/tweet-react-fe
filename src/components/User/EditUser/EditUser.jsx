/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { Camera } from "../../../utils/icons";
import {
  uploadAvatarApi,
  uploadBannerApi,
  updateUserInfo,
} from "../../../api/user";

import { API_HOST } from "../../../utils/constants";

import "./EditUser.scss";

export default function EditUser(props) {
  const { user, setShow } = props;
  const [formData, setFormData] = useState(initialValues(user));
  const [loading, setLoading] = useState(false);
  const [bannerUrl, setBannerUrl] = useState(
    user?.banners ? `${API_HOST}/banner?id=${user.id}` : null
  );
  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatars ? `${API_HOST}/avatar?id=${user.id}` : null
  );
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const onDropBanner = useCallback((acceptedFile) => {
    setBannerUrl(URL.createObjectURL(acceptedFile[0]));
    setBannerFile(acceptedFile[0]);
  });

  const onDropAvatar = useCallback((acceptedFile) => {
    setAvatarUrl(URL.createObjectURL(acceptedFile[0]));
    setAvatarFile(acceptedFile[0]);
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (bannerFile) {
      await uploadBannerApi(bannerFile).catch((err) => {
        toast.error("Error subiendo el banner");
      });
    }
    if (avatarFile) {
      await uploadAvatarApi(avatarFile).catch((err) => {
        toast.error("Error subiendo el avatar");
      });
    }

    await updateUserInfo(formData)
      .then(() => {
        setShow(false);
      })
      .catch((err) => {
        toast.error("Error actualizando la informacion");
      });

    setLoading(false);
    window.location.reload();
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropBanner,
  });

  const {
    getRootProps: getRootAvatarProps,
    getInputProps: getInputAvatarProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropAvatar,
  });

  return (
    <div className="edit-user-form">
      <div
        className="banner"
        style={{ backgroundImage: `url('${bannerUrl}')` }}
        {...getRootBannerProps()}
      >
        <input {...getInputBannerProps()} />
        <Camera />
      </div>
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
        {...getRootAvatarProps()}
      >
        <input {...getInputAvatarProps()} />
        <Camera />
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                defaultValue={formData.name}
                onChange={onChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="last_name"
                defaultValue={formData.last_name}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            as="textarea"
            row="3"
            placeholder="Biografia"
            name="biography"
            defaultValue={formData.biography}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Web Site"
            name="web"
            defaultValue={formData.web}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <DatePicker
            placeholder="Birth Date"
            locale={es}
            selected={new Date(formData.birthdate)}
            onChange={(value) => setFormData({ ...formData, birthdate: value })}
            showYearDropdown
            yearDropdownItemNumber={30}
            scrollableYearDropdown
          />
        </Form.Group>
        <Button type="submit" className="btn-submit" variant="primary">
          {loading && <Spinner animation="border" size="sm" />} Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues(user) {
  return {
    name: user.name || "",
    last_name: user.last_name || "",
    biography: user.biography || "",
    location: user.location || "",
    web: user.web || "",
    birthdate: user.birthdate || "",
  };
}
