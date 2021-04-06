import React, { Component } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import RegistrasiService from "../../service/RegistrasiService";
import ModalPassword from "./ChangePassword";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      changeProfile: true,
      isOpen: false,
    };
  }

  changePassword = (data) => {
    if (data.oldPass === "" && data.newPass === "" && data.newPass2 === "") {
      Swal.fire("All Field Must be Filled", "", "warning");
    } else if (
      data.errorOldPass === true ||
      data.errorNewPass === true ||
      data.errorNewPass2 === true
    ) {
      Swal.fire("Please check your Form", "", "info");
    } else {
      Swal.fire({
        title: "Are you sure to change password?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Change My Password!",
      }).then((result) => {
        if (result.isConfirmed) {
          RegistrasiService.changePassword(
            this.props.dataUser.userId,
            data.oldPass,
            data.newPass,
            data.newPass2
          )
            .then((res) => {
              Swal.fire(
                "Your Password has Been Change",
                "Please Re-Login",
                "success"
              );
              this.props.doLogout();
            })
            .catch((err) => {
              Swal.fire("Failed!", err.response.data.errorMessage, "error");
            });
        }
      });
    }
  };

  changeProfile = () => {
    this.setState({
      changeProfile: false,
    });
  };

  checkValidation = () => {
    let regName = /^(?![ .]+$)[a-zA-Z .]*$/;

    
  };

  saveData = () => {
    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
    };

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        //----------change password api-------------------
        RegistrasiService.changeProfile(this.props.dataUser.userId, data)
          .then(() => {
            this.getNewDataUser(this.props.dataUser.userId);
            this.cancel();
          })
          .catch((err) => {
            console.log(err.response);
            alert("Failed Update Data");
          });
        //--------------------------------------------
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
        this.cancel();
      }
    });
  };

  getNewDataUser(userId) {
    RegistrasiService.getBuyerByID(userId)
      .then((res) => {
        this.props.changeLogin(res.data);
      })
      .catch((err) => {
        alert("Failed Fetch Data");
      });
  }

  setValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  back = () => {
    this.props.history.push("/gromart/");
  };

  cancel = () => {
    this.setState({
      changeProfile: true,
    });
  };

  openModal = () => {
    this.setState({
      isOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  };

  componentDidMount() {
    this.setState({
      role: this.props.dataUser.role,
      firstName: this.props.dataUser.firstName,
      lastName: this.props.dataUser.lastName,
      email: this.props.dataUser.email,
      phoneNumber: this.props.dataUser.phoneNumber,
    });
  }

  render() {
    console.log("status :", this.state.isOpen);
    const {
      role,
      firstName,
      lastName,
      email,
      phoneNumber,
      changeProfile,
    } = this.state;
    return (
      <Container>
        {this.state.isOpen ? (
          <ModalPassword
            closeModal={this.closeModal}
            isOpen={this.state.isOpen}
            changePassword={this.changePassword}
          />
        ) : null}

        <br />
        <Form>
          <Form.Group>
            <i
              class="fas fa-user-circle"
              style={{ fontSize: "8vh", marginRight: "15px" }}
            ></i>
            <Form.Label style={{ fontSize: "6vh", fontFamily: "cambria" }}>
              {this.props.dataUser.firstName +
                " " +
                this.props.dataUser.lastName}
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Form.Label column="md" md={2}>
                Role
              </Form.Label>
              <Col>
                <Form.Control
                  name="role"
                  size="md"
                  type="text"
                  value={role}
                  disabled
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="md" md={2}>
                First Name
              </Form.Label>
              <Col>
                <Form.Control
                  name="firstName"
                  size="md"
                  type="text"
                  value={firstName}
                  onChange={this.setValue}
                  disabled={changeProfile}
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="md" md={2}>
                Last Name
              </Form.Label>
              <Col>
                <Form.Control
                  name="lastName"
                  size="md"
                  type="text"
                  value={lastName}
                  onChange={this.setValue}
                  disabled={changeProfile}
                />
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Form.Label column="md" md={2}>
                Email Address
              </Form.Label>
              <Col>
                <Form.Control
                  name="email"
                  size="md"
                  type="text"
                  value={email}
                  onChange={this.setValue}
                  disabled={changeProfile}
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Label column="md" md={2}>
                Phone Number
              </Form.Label>
              <Col>
                <Form.Control
                  name="phoneNumber"
                  size="md"
                  type="text"
                  value={phoneNumber}
                  onChange={this.setValue}
                  disabled={changeProfile}
                />
              </Col>
            </Form.Row>
          </Form.Group>
        </Form>
        <br />
        {changeProfile ? (
          <>
            <Button variant="primary" onClick={this.changeProfile}>
              Change Profile
            </Button>
            <Button
              variant="primary"
              onClick={() => this.openModal()}
              style={{ marginLeft: "10px" }}
            >
              Change Password
            </Button>
            <Button
              variant="danger"
              onClick={this.back}
              style={{ marginLeft: "10px" }}
            >
              Back
            </Button>
          </>
        ) : (
          <>
            <Button variant="primary" onClick={this.saveData}>
              Save
            </Button>
            <Button
              variant="danger"
              onClick={this.cancel}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </>
        )}
      </Container>
    );
    s;
  }
}

const mapStateToProps = (state) => {
  return {
    statusLogin: state.Auth.statusLogin,
    dataUser: state.Auth.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeLogin: (payload) => dispatch({ type: "LOGIN_SUCCESS", payload }),
  doLogout: () => dispatch({ type: "LOGOUT" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

//export default Profile;
