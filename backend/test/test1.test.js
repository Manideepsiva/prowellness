// userRoutes.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = require('./app'); // adjust to your actual file
const userModel = require('../schemas/userschema');
const TemporaryUser = require('../schemas/TemporarySchema');
const Appointment = require('../schemas/clientappointmentschema'); // Assuming you have this schema
const hospmodel = require('../schemas/hospitalschema'); 


beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});


// Clean DB before each test
beforeEach(async () => {
  await userModel.deleteMany({});
  await TemporaryUser.deleteMany({});
  await Appointment.deleteMany({});
  await hospmodel.deleteMany({});

});

// Close DB after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/register', () => {
  it('should register a user and send verification email', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        usermail: 'test@example.com',
        password: 'testpass',
        username: 'TestUser',
        age: 25,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Verification email sent');
  });

  it('should return 400 if user already exists', async () => {
    await userModel.create({
      usermail: 'test@example.com',
      password: '2b$10$crA/N5hBdqn0yP/pQztpveWj6zslrbg7Y.FCnUPhoCIenWH6k1nySr',
      username: 'TestUser',
      age: 25,
    });

    const response = await request(app)
      .post('/api/register')
      .send({
        usermail: 'test@example.com',
        password: '12345678',
        username: 'TestUser',
        age: 25,
      });

    expect(response.statusCode).toBe(400);
  });
});

describe('POST /api/login', () => {
  it('should fail login with unregistered user', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        usermail: 'nonexistent@example.com',
        password: 'testpass',
      });
    expect(response.statusCode).toBe(300);
  });
});



describe('GET /api/getratesclient', () => {
  it('should return list of hospitals with test rates', async () => {
    await hospmodel.create({
      nameOfHospital: 'Test Hospital',
      State: 'CALIFORNIA',
      District: 'LOS ANGELES',
      tests: [{ testName: 'blood test', price: 100 }],
    });

    const response = await request(app)
      .get('/api/getratesclient')
      .query({
        district: 'los angeles',
        state: 'california',
        test: 'blood test',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].nameOfHospital).toBe('Test Hospital');
    expect(response.body[0].price).toBe(100);
  });

  it('should return empty array if no hospitals are found for test', async () => {
    const response = await request(app)
      .get('/api/getratesclient')
      .query({
        district: 'los angeles',
        state: 'california',
        test: 'CT scan',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(0);
  });
});
describe('POST /api/clientupcomingappointments', () => {
  it('should return upcoming appointments for user', async () => {
    const user = await userModel.create({
      usermail: 'user@example.com',
      password: 'testpass',
      username: 'TestUser',
      age: 30,
    });

    const hospital = await hospmodel.create({
      nameOfHospital: 'Test Hospital',
      State: 'CALIFORNIA',
      District: 'LOS ANGELES',
      tests: [{ testName: 'blood test', price: 100 }],
    });

    const appointment = await Appointment.create({
      userid: user._id,
      hospitalid: hospital._id,
      appointmentDate: new Date(Date.now() + 86400000), // Tomorrow
      testname: 'blood test',
      cancelled: 0,
      timeSlot: '10:00 AM',
    });

    const response = await request(app)
      .post('/api/clientupcomingappointments')
      .send({ id: user._id });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].nameOfHospital).toBe('Test Hospital');
    expect(response.body[0].testname).toBe('blood test');
    expect(response.body[0].slot).toBe('10:00 AM');
  });

  it('should return empty array if no upcoming appointments', async () => {
    const user = await userModel.create({
      usermail: 'user@example.com',
      password: 'testpass',
      username: 'TestUser',
      age: 30,
    });

    const response = await request(app)
      .post('/api/clientupcomingappointments')
      .send({ id: user._id });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(0);
  });
});


const bcrypt = require('bcryptjs');

describe('User Profile and Change Password Routes', () => {
  let userId;

  beforeEach(async () => {
    const hashedPassword = await bcrypt.hash('oldpassword123', 10);
    const user = await userModel.create({
      usermail: 'profileuser@example.com',
      password: hashedPassword,
      username: 'TestUser',
      age: 28,
    });

    userId = user._id;
  });

  describe('GET /api/getprofile/:id', () => {
    it('should return user profile without password field', async () => {
      const res = await request(app).get(`/api/getprofile/${userId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('usermail', 'profileuser@example.com');
      expect(res.body).not.toHaveProperty('password');
    });

    it('should return 404 if user not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/getprofile/${fakeId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });
  });

  describe('POST /api/changepassword/:id', () => {

    it('should fail to change the password if old password is incorrect', async () => {
      const res = await request(app)
        .post(`/api/changepassword/${userId}`)
        .send({
          oldpassword: 'wrongpassword',
          newpassword: 'newsecurepass456'
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'invalid password');
    });
  });
});



describe('Hospital Routes', () => {
  let hospitalId;
  let appointmentId;

  beforeEach(async () => {
    const hospital = await hospmodel.create({
      hospitalName: 'Test Hospital',
      email: 'test@hospital.com',
      tests: [
        { testName: 'blood test', price: 100 },
        { testName: 'x-ray', price: 200 }
      ]
    });

    hospitalId = hospital._id;

    const appointment = await Appointment.create({
      testname: 'blood test',
      patientName: 'John Doe',
      phone: '1234567890',
      email: 'john@example.com',
      patientstatus: 1,
      cancelled: 0,
      hospitalid: hospitalId,
      appointmentDate: new Date()
    });

    appointmentId = appointment._id;
  });

  describe('GET /api/hospitalavailableTests', () => {
    it('should return available tests in correct structure', async () => {
      const res = await request(app).get(`/api/hospitalavailableTests?hospitalId=${hospitalId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('BLOOD TEST', 100);
      expect(res.body).toHaveProperty('X-RAY', 200);
    });

    it('should return 404 if hospital not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/hospitalavailableTests?hospitalId=${fakeId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Hospital not found');
    });
  });

  describe('POST /api/hospitalupdatetest', () => {
    it('should update hospital tests successfully', async () => {
      const selectedTests = {
        'MRI': 800,
        'CT SCAN': 900
      };

      const res = await request(app)
        .post(`/api/hospitalupdatetest?hospitalid=${hospitalId}`)
        .send({ selectedTests });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Tests updated successfully');

      const updatedHospital = await hospmodel.findById(hospitalId);
      expect(updatedHospital.tests).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ testName: 'mri', price: 800 }),
          expect.objectContaining({ testName: 'ct scan', price: 900 }),
        ])
      );
    });
  });

  describe('GET /api/hospitaltodayappointments', () => {
    it('should return today\'s appointments excluding status 3 and cancelled 1', async () => {
      const res = await request(app).get(`/api/hospitaltodayappointments?hospitalId=${hospitalId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].patientName).toBe('John Doe');
    });
  });

  describe('POST /api/hospitalupdatepatientstatus/:id', () => {
    it('should update patient status to 2', async () => {
      const res = await request(app)
        .post(`/api/hospitalupdatepatientstatus/${appointmentId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Patient status updated successfully');

      const updated = await Appointment.findById(appointmentId);
      expect(updated.patientstatus).toBe(2);
    });

    it('should return 404 for invalid appointment ID', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .post(`/api/hospitalupdatepatientstatus/${fakeId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Appointment not found');
    });
  });

  describe('GET /api/hospitalcompletedappointments', () => {
    it('should return appointments with patientstatus 3', async () => {
      await Appointment.findByIdAndUpdate(appointmentId, {
        patientstatus: 3,
        documentPath: '/docs/report1.pdf'
      });

      const res = await request(app).get(`/api/hospitalcompletedappointments?hospitalId=${hospitalId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toHaveProperty('documentPath', '/docs/report1.pdf');
    });
  });
});









