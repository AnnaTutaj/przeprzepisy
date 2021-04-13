import React, { Component } from "react";
import { Modal, Button, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeModal, openModal } from "./modalActions";
import { withRouter } from "react-router-dom";

const actions = { closeModal, openModal };

class UnauthModal extends Component {
  handleCloseModal = () => {
    if (this.props.location.pathname.includes("/przepisy")) {
      this.props.closeModal();
    } else {
      this.props.history.goBack();
      this.props.closeModal();
    }
  };

  render() {
    const { openModal } = this.props;
    return (
      <Modal size='mini' open={true} onClose={this.handleCloseModal}>
        <Modal.Header>Dołącz do Przeprzepisów!</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>Poznaj przeprzepisy i przeludzi. Dołącz do nas!</p>
            <Button fluid primary onClick={() => openModal("LoginModal")}>
              Zaloguj się
            </Button>
            <Divider horizontal>albo</Divider>
            <Button fluid positive onClick={() => openModal("RegisterModal")}>
              Zarejestruj się
            </Button>
            <Divider />
            <div style={{ textAlign: "center" }}>
              <p>Albo kliknij tutaj, żeby kontunuować jako gość</p>
              <Button onClick={this.handleCloseModal}>Anuluj</Button>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default withRouter(connect(null, actions)(UnauthModal));
