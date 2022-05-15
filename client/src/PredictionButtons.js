import * as React from 'react';

import { Button } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material';
import { Divider } from '@mui/material';
import { Grid } from '@mui/material';
import { InputAdornment } from '@mui/material';

  function BetOverModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
  
    return (
      <div>
        <Button onClick={handleOpen} variant="contained" fullWidth key="one" color="success" >Bet Over</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container>
              <Grid item xs={12}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Bet Over
                </Typography>
                <Divider/>
              </Grid>
              <Grid item sx={{mt:3}} xs={6}>
                <TextField
                    id="outlined-number"
                    label="Wager Amount"
                    type="number"
                    fullWidth
                    InputProps={{
                      endAdornment: <InputAdornment position="end">eth</InputAdornment>,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />  
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    );
  }

  function BetUnderModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
  
    return (
      <div>
        <Button onClick={handleOpen} variant="contained" fullWidth key="two" color="error" >Bet Under</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <Grid container>
              <Grid item xs={12}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Bet Under
                </Typography>
                <Divider/>
              </Grid>
              <Grid item sx={{mt:3}} xs={6}>
                <TextField
                    id="outlined-number"
                    label="Wager Amount"
                    type="number"
                    fullWidth
                    InputProps={{
                      endAdornment: <InputAdornment position="end">eth</InputAdornment>,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    );
  }
 
  export default function PredictionButtons(props) {    
    return (
      <React.Fragment>
        <Box
          sx={{ '& button': { mt:2 ,mb: 2 } }}
        >
          <div>
            <BetOverModal />
          </div>
          <div>
            <BetUnderModal />
          </div>
          <div>
            <Button variant="contained" fullWidth key="three">View Prediction</Button>
          </div>
        </Box>
      </React.Fragment>
    );
  }