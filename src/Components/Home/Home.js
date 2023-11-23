import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Works from '../Works/Works';
import './Home.css';

const Home = () => {
    return (
        <div>
            <br /><br />
            <h1 className='text-center'>I grow by people helping in need</h1>
            <br />
            <Row className='d-flex justify-content-center'>
                <Col xs={9} sm={6} md={4} >
                    <Form>
                        <Form.Control
                                placeholder="Search your destination..."
                                aria-label="destination"
                                aria-describedby="basic-addon1"
                                id='search'
                        />
                    </Form>
                </Col>
            </Row>
            <br /><br />
            <Works></Works>
        </div>
    );
};

export default Home;