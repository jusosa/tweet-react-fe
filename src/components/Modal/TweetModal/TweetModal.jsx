import React, { useState } from "react";
import { Modal, Form, Button, ToastHeader } from "react-bootstrap";
import { toast } from "react-toastify";
import { Close } from "../../../utils/icons";
import classNames from "classnames";

import { saveTweetApi } from "../../../api/tweet";

import "./TweetModal.scss";
import { loadavg } from "os";
export default function TweetModal(props) {
  const maxLength = 280;

  const { showTweetModal, setShowTweetModal } = props;

  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (message && message.length > 1) {
      saveTweetApi(message)
        .then(() => {
          window.location.reload();
          toast.success("Tweet enviado");
        })
        .catch(() => {
          toast.error("Error enviando el tweet, intnete mas tarde");
        });
      setShowTweetModal(false);
    }
  };

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <Modal
      className="tweet-modal"
      show={showTweetModal}
      onHide={() => {
        setShowTweetModal(false);
      }}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <Close
            onClick={() => {
              setShowTweetModal(false);
            }}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            as="textarea"
            type="text"
            rows="6"
            placeholder="que estas pensando?"
            name="message"
            maxLength="280"
            onChange={onChange}
          />
          <span
            className={classNames("count", {
              error: message.length > maxLength,
            })}
          >
            {message.length}/{maxLength}
          </span>
          <Button type="submit" disabled={message.length < 1}>
            Twittoar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
