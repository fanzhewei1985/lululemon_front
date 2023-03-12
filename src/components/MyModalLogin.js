import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const MyModalLogin = (props) => {

    return (
        <div>
                <Modal  {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    {/*<Modal.Header closeButton>*/}
                        <Modal.Body id="contained-modal-title-vcenter">
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert style={{textAlign:'center'}} severity="error">Please Login to Checkout,Thanks!</Alert>

                            </Stack>
                        </Modal.Body>
                    {/*</Modal.Header>*/}

                </Modal>
        </div>);
};

export default MyModalLogin;