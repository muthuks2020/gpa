import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import letter from "../../../../assets/images/letter.png";

class WelcomeLetter extends React.Component {
  render() {
    const { open, handleClose } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogContent>
            {/* <DialogContentText>
              Hi Ben, Welcome to Driscoll’s Harvest Order Collaboration
              Application. You are ready to start!! We have created your account
              with following details Name: Email: Country: Preferred Language:
              We want to make sure you have best application experience
              possible. Our goal is to make sure you are satisfied. We welcome
              your feedback, comments and questions. Please call us at (Phone
              Number) or send a e-mail (email address). We look forward to
              hearing from you. Thanks, Driscoll’s Harvest Order Application
              Team
              </DialogContentText>*/}
            <img style={{ width: "100%" }} src={letter} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default WelcomeLetter;
