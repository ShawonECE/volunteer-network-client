import React, { useContext, useEffect, useState } from 'react';
import './Events.css';
import { UserContext } from '../../App';
import { Button, Card, Col, Container, Modal, Row, Spinner } from 'react-bootstrap';

const Events = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [events, setEvents] = useState([]);
    const [deleting, setDeleting] = useState(false);
    useEffect(() => {
        fetch(`http://localhost:4000/events?email=${loggedInUser.email}`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
        .then(res => res.json())
        .then(data => setEvents(data));
    }, []);

    const handleCancel = (id) => {
        setDeleting(true);
        fetch(`http://localhost:4000/delete/${id}`, {
          method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            setDeleting(false);
            if (data.deletedCount === 1) {
                const newEvents = events.filter(event => event._id !== id);
                setEvents(newEvents);
            }
        });
    };
    return (
        <Container>
            <br/> <br />
            <Row xs={1} md={2} className="g-4">
                {events.map((event, idx) => (
                    <Col key={idx}>
                    <Card className='event-card'>
                        <Row>
                            <Col xs={4}>
                                <Card.Img src={event.img} />
                            </Col>
                            <Col xs={8} className='h-100'>
                                <Card.Body>
                                    <Card.Title>{event.title}</Card.Title>
                                    <Card.Text>
                                        {event.date}
                                    </Card.Text>
                                    <Button className='cancel-btn' onClick={() => handleCancel(event._id)}>Cancel</Button>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                    </Col>
                ))}
            </Row>
            <Modal show={deleting}>
                <Modal.Body>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    <span className="sr-only">Cancelling...</span>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Events;