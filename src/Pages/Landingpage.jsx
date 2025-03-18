import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PiChefHatLight } from "react-icons/pi";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { verifyPinAPI } from '../Service/AllAPI';

//658872
function Landingpage() {
    const [modalShow, setModalShow] = useState(true);
    const [pin, setPin] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        sessionStorage.clear()
    },[])
    const handleSubmit = async () => {
        if (!pin) {
            toast.warning('Please enter the "PIN"');
            return;
        }
        try {
            const response = await verifyPinAPI(pin);
            console.log('Response:', response);
            if (response.status === 200) {
                toast.success('PIN Verified');
                sessionStorage.setItem("verifiedPin", pin)
                setTimeout(() => {
                    navigate('/table-track-page');
                    setPin("");
                }, 2000);
            } else {
                toast.error('Incorrect "PIN". Try again!');
            }
        } catch (error) {
            toast.error('Incorrect "PIN". Try again!');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Modal
                show={modalShow}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <h4 className='LogoText'> <PiChefHatLight className='Logo' size={30} /> Ease<span className='Logo'>Food</span></h4>
                    <InputGroup className="mb-3">
                        <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder='Enter Your "PIN" to proceed'
                            onChange={(e) => setPin(e.target.value)}
                            value={pin}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSubmit} variant="secondary">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer
                autoClose={1500}
                hideProgressBar={true}
                position="top-center"
            />
        </div>
    )
}

export default Landingpage