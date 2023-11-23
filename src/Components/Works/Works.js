import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import './Works.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Works = () => {
    const colors = ['#FFBD3E', '#FF7044', '#3F90FC', '#421FCF']
    const [works, setWorks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/works')
        .then(res => res.json())
        .then(data => setWorks(data));
    }, []);

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => setShowForm(false);
    const [selectedWork, setSelectedWork] = useState({});
    const navigate = useNavigate();
    const handleWorkClick = (key, title) => {
        if(loggedInUser.isLoggedIn) {
            setShowForm(true);
            const newWork = {...selectedWork};
            newWork.key = key;
            newWork.title = title;
            setSelectedWork(newWork); 
        }
        else {
            navigate('/login');
        }
        
    };
    return (
        <Container>
            <Row xs={1} sm={2} md={4} className="g-4">
                {works.map( work => (
                    <Col key={work.key}>
                        <Card onClick={() => {handleWorkClick(work.key, work.title)}} className='h-100 work' style={{backgroundColor: colors[Math.round(Math.random() * 3)], border: 'none'}}>
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
                    <Form>
                        <Form.Control className='inp-field' type="text" placeholder="Your full name" />
                        <Form.Control className='inp-field' type="email" placeholder="Enter your email" />
                        <Form.Control className='inp-field' type="date" />
                        <Form.Control className='inp-field' type="text" placeholder="Add some description" />
                        <Form.Control className='inp-field' type="text" value={selectedWork.title} disabled />
                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg">Register</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Works;