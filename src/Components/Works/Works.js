import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import './Works.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext, WorkContext } from '../../App';
import { useNavigate, useLocation } from 'react-router-dom';

const Works = () => {
    const defaultWorkData = {
        key: 0,
        title: '',
        name: '',
        email: '',
        date: '',
        description: '',
        img: ''
    };
    const colors = ['#FFBD3E', '#FF7044', '#3F90FC', '#421FCF']
    const [works, setWorks] = useContext(WorkContext);
    const [workData, setWorkData] = useState(defaultWorkData);
    const [registering, setRegistering] = useState(false);

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => setShowForm(false);
    const [selectedWork, setSelectedWork] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const handleWorkClick = (key, title, img) => {
        if(loggedInUser.isLoggedIn) {
            setShowForm(true);
            const newWork = {...selectedWork};
            newWork.key = key;
            newWork.title = title;
            newWork.img = img;
            setSelectedWork(newWork); 
        }
        else {
            navigate('/login', {state: {from: location}});
        }
        
    };
    const handleBlur = (event) => {
        const newWorkData = {...workData};
        newWorkData[event.target.name] = event.target.value;
        setWorkData(newWorkData);
    }
    const handleSubmit = (event) => {
        setRegistering(true);
        const newWorkData = {...workData};
        newWorkData.key = selectedWork.key;
        newWorkData.title = selectedWork.title;
        newWorkData.img = selectedWork.img;
        newWorkData.name = loggedInUser.name;
        newWorkData.email = loggedInUser.email;
        fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify(newWorkData),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(res => res.json())
        .then(data => {
            setRegistering(false);
            if (data.acknowledged) {
                setShowForm(false);
            }
            console.log(data)
        });
        event.preventDefault();
    };
    return (
        <Container>
            <Row xs={1} sm={2} md={4} className="g-4">
                {works.map( work => (
                    <Col key={work.key}>
                        <Card onClick={() => {handleWorkClick(work.key, work.title, work.img)}} className='h-100 work' style={{backgroundColor: colors[Math.round(Math.random() * 3)], border: 'none'}}>
                            <Card.Img variant="top" src={work.img} />
                            <Card.Body className='d-flex align-items-center justify-content-center'>
                                <Card.Title style={{color: 'white'}} className='text-center'>{work.title}</Card.Title>
                                <h2 className='hover-text'>Join us</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <br /><br /><br />

            <Modal show={showForm} onHide={handleCloseForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Register as a Volunteer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Control className='inp-field' type="text" value={loggedInUser.name} disabled />
                        <Form.Control className='inp-field' type="email" value={loggedInUser.email} disabled />
                        <Form.Control onBlur={handleBlur} className='inp-field' type="date" name='date' required />
                        <Form.Control onBlur={handleBlur} className='inp-field' type="text" name='description' placeholder="Add some description" required />
                        <Form.Control className='inp-field' type="text" value={selectedWork.title} disabled />
                        <div className="d-grid gap-2">
                            {
                                !registering ?
                                <Button type='submit' variant="primary" size="lg">Register</Button>
                                :
                                <Button variant="primary" size="lg">
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    <span className="sr-only">Registering...</span>
                                </Button>
                            }
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Works;