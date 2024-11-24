import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const PaymentDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Payment Details</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Card Number"
          type="text"
          fullWidth
          variant="outlined"
        />
        <div style={{ display: "flex", gap: "6px", marginTop: "16px" }}>
          <TextField
            margin="dense"
            label="Expiry Date"
            type="text"
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="CVV"
            type="text"
            variant="outlined"
          />
        </div>
        <TextField
          margin="dense"
          label="Card Holder Name"
          type="text"
          fullWidth
          variant="outlined"
          style={{ marginTop: "16px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDialog;