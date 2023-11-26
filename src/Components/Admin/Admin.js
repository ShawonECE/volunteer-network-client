import React, { useEffect, useState } from 'react';
import { Col, Modal, Row, Spinner, Table } from 'react-bootstrap';
import './Admin.css';
import users from '../../Utilities/logos/users-alt 1.png';
import add from '../../Utilities/logos/plus 1.png';

const Admin = () => {
    const [registrations, setRegistrations] = useState([]);
    const [deleting, setDeleting] = useState(false);
    useEffect(() => {
        fetch('http://localhost:4000/registrations', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(res => res.json())
        .then(data => setRegistrations(data));
    }, []);

    const handleDelete = (id) => {
        setDeleting(true);
        fetch(`http://localhost:4000/delete/${id}`, {
          method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            setDeleting(false);
            if (data.deletedCount === 1) {
                const newRegistrations = registrations.filter(registration => registration._id !== id);
                setRegistrations(newRegistrations);
            }
        });
    };
    return (
        <div>
            <br /><br />
            <Row>
                <Col xs={12} md={3} id='options-col'>
                    <div className='options d-flex align-items-center'>
                        <img src={users} alt="" />
                        <h6>Volunteer registration list</h6>
                    </div>
                    <div className='options d-flex align-items-center'>
                        <img src={add} alt="" />
                        <h6>Add events</h6>
                    </div>
                </Col>
                <Col xs={12} md={9} id='table-col'>
                    <Table striped="columns">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Event</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                registrations.map(registration =>
                                    <tr>
                                        <td>{registration.name}</td>
                                        <td>{registration.email}</td>
                                        <td>{registration.date}</td>
                                        <td>{registration.title}</td>
                                        <td><span onClick={() => handleDelete(registration._id)} class="material-symbols-outlined" style={{color: 'red', cursor: 'pointer'}}>delete</span></td>
                                    </tr>    
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Modal show={deleting}>
                <Modal.Body>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    <span className="sr-only">Deleting...</span>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Admin;