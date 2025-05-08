const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const cookieParser = require('cookie-parser');
const bcrypt = require("bcrypt");
const fs = require('fs');
const user = require('./schemas/userschema');
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require('path');
const testnames = require("./schemas/testschema");
const hospmodel = require("./schemas/hospitalschema");
const Appointment = require('./schemas/clientappointmentschema');
const Transaction = require('./schemas/clientTransaction');
const Grid = require('gridfs-stream');
const multer = require('multer');
const searchbyorgans = require("./schemas/searchbyorgans");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const Admin = require("./schemas/adminSchema");
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const HospitalRequest = require("./schemas/Hospitalrequestschema");
const TemporaryUser = require("./schemas/TemporarySchema"); 
const nodemailer = require("nodemailer");
const userRouter = express.Router();
const hospitalRouter = express.Router();
const adminRouter = express.Router();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

let typestest;



// Initialize Redis client
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

console.log('Connecting to Redis URL:', process.env.REDIS_URL);


// Handle Redis errors
redisClient.on('error', (err) => console.error('Redis error:', err));

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
    console.log('✅ Connected to Redis');
  } catch (err) {
    console.error('❌ Failed to connect to Redis:', err.message);
  }
})();

var app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configure session middleware
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'yourSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(cors({
  origin: 'http://localhost:3000'
})); 
app.use(express.json());

async function sendVerificationEmail(usermail, verificationLink) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "msiva0100@gmail.com",
      pass: "smfz ennz kbyu hzkh",
    },
  });

  const mailOptions = {
    from: "msiva0100@gmail.com",
    to: usermail,
    subject: "Verify Your Email",
    html: `<p>Click the link below to verify your email:</p>
    <a href="${verificationLink}">${verificationLink}</a>`,
  };

  await transporter.sendMail(mailOptions);
}

cloudinary.config({
  cloud_name: 'dlveiau84',
  api_key: '437289422847857',
  api_secret: '7-FmxaAb1I5ZZ6c2VaWFjGmD5tE',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'documents',
    resource_type: 'raw',
    format: async (req, file) => 'pdf',
    public_id: (req, file) => `${req.params.id}-${Date.now()}`,
    access_mode: 'public'
  },
});

// Initialize multer with storage options
const upload = multer({ storage });


const startServer = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/project-nexus-react', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000,
    });

    console.log('✅ Connected to MongoDB');

    async function gettest() {
      const doc = await testnames.findOne({ id: 1 });
      console.log(doc);
      typestest = doc.tests;
    }

    gettest();

    const authroute = (req, res, next) => {
      const authheader = req.headers['authorization'];
      const token = authheader && authheader.split(' ')[1];
      if (!token) return res.sendStatus(401);
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        next();
      });
    };

    const rateLimit = async (req, res, next) => {
      const ip = req.ip;
      const key = `ratelimit:login:${ip}`;
      const maxAttempts = 5;
      const windowMs = 15 * 60;

      try {
        const attempts = await redisClient.incr(key);
        if (attempts === 1) {
          await redisClient.expire(key, windowMs);
        }

        if (attempts > maxAttempts) {
          return res.status(429).json({ message: "Too many login attempts. Please try again later." });
        }

        next();
      } catch (error) {
        console.error("Rate limit error:", error);
        next();
      }
    };

    app.get("/namaste", (req, res) => {
      res.json("hello there");
    });

    userRouter.post('/api/register', async (req, res) => {
      try {
        const { usermail, password, username, age } = req.body;
        console.log("recived here");

        const finduser = await user.findOne({ usermail: usermail });
        if (finduser) return res.status(400).send("user already exist with given mail address");

        const verificationToken = jwt.sign({ usermail }, process.env.SECRET_KEY, { expiresIn: "1h" });
        const verificationLink = `https://prowellness-eight.vercel.app/verify-email?token=${verificationToken}`;

        const userData = { usermail, password, username, age };
        await redisClient.setEx(
          `verify:${verificationToken}`,
          3600,
          JSON.stringify(userData)
        );

        await sendVerificationEmail(usermail, verificationLink);
        res.status(200).json({ message: "Verification email sent" });
      } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "error occured" });
      }
    });

    userRouter.get("/verify-email", async (req, res) => {
      const { token } = req.query;
      if (!token) {
        return res.status(400).json({ message: "Invalid or missing token" });
      }
      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { usermail } = decoded;

        const userDataStr = await redisClient.get(`verify:${token}`);
        if (!userDataStr) {
          return res.status(404).json({ message: "User not found or already verified" });
        }

        const userData = JSON.parse(userDataStr);
        const newUser = new user({
          usermail: userData.usermail,
          password: userData.password,
          username: userData.username,
          age: userData.age,
        });
        await newUser.save();

        await redisClient.del(`verify:${token}`);

        res.status(200).json({ message: "Email verified successfully. Registration complete." });
      } catch (error) {
        console.error("Verify email error:", error);
        res.status(400).json({ message: "Invalid or expired token" });
      }
    });

    userRouter.post("/api/forgot-password", async (req, res) => {
      const { usermail } = req.body;

      try {
        const userd = await user.findOne({ usermail });
        if (!userd) {
          return res.status(404).json({ message: "User not found." });
        }

        const token = jwt.sign({ id: userd._id }, process.env.SECRET_KEY, {
          expiresIn: "15m",
        });

        const resetLink = `http://localhost:3002/resetpassword?token=${token}`;

        await sendVerificationEmail(usermail, resetLink);

        res.status(200).json({ message: "Password reset email sent successfully." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred." });
      }
    });

    userRouter.post("/api/reset-password", async (req, res) => {
      const { token, newPassword } = req.body;

      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id;

        const userd = await user.findById(userId);
        if (!userd) {
          return res.status(404).json({ message: "Invalid or expired token." });
        }

        userd.password = newPassword;
        await userd.save();

        res.status(200).json({ message: "Password reset successful." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Invalid or expired token." });
      }
    });

    userRouter.post('/api/login', rateLimit, async (req, res) => {
      const { usermail, password } = req.body;

      const finduser = await user.findOne({ usermail: usermail });
      if (!finduser) res.status(300).send("user doesnt exist with given mail address");
      else {
        const pass = finduser.password;
        const result = await bcrypt.compare(password, pass);
        if (result) {
          const token = jwt.sign({ usermail, role: "user", id: finduser._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
          res.json({ token });
        } else {
          res.status(400).send("invalid credentials");
        }
      }
    });

    userRouter.post('/api/verify-token', (req, res) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      
      if (!token) return res.sendStatus(401);
      
      jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
        if (error) {
          console.log("Invalid token");
          return res.sendStatus(403);
        }
        
        console.log("Token verified");
        return res.json({ usermail: user.usermail, role: user.role });
      });
    });

    const statekeywords = ['andhra pradesh', 'tamil nadu', 'karanataka', 'telangana'];
    const andhrakeywords = ['alluri sitharama raju', 'anakapalli', 'ananthapuramu', 'annamayya', 'bapatla', 'chittoor', 'dr.b.r.ambedkar konaseema', 'east godavari', 'eluru', 'guntur', 'kakinada', 'krishna', 'kurnool', 'nandhyala', 'ntr', 'palnadu', 'parvathipuram manyam', 'prakasam', 'sri pottisriramulu nellore', 'sri sathaya sai', 'srikakulam', 'tirupati', 'vishakapatanam', 'vizianagaram', 'west godavari', 'ysr kadapa'];
    const karanatakakeywords = ['bengaluru rural', 'bengaluru urban', 'chitradurga', 'tumakuru'];
    const tamilkeywords = ['chennai', 'kanchipuram', 'thiruvallur'];
    const telanganakeywords = ['hyderabad', 'bhadradri kothagudem', 'medchal malkajgiri', 'ranga reddy'];

    userRouter.post('/api/Testsuggestions', (req, res) => {
      console.log('ok');
      const Typedtest = req.body.typedtest;
      console.log(Typedtest);

      let result = [];
      const searchTerm = Typedtest.toLowerCase();
      for (const item of typestest) {
        if (item.toLowerCase().includes(searchTerm)) {
          result.push(item);
          if (result.length === 5) break;
        }
      }
      console.log(result);
      res.json({ results: result });
    });

    userRouter.post('/api/Testcheck', (req, res) => {
      const testch = req.body.testName;
      const lowc = testch.toLowerCase();
      for (const item of typestest) {
        if (item.toLowerCase() == lowc) {
          return res.sendStatus(200);
        }
      }
      res.sendStatus(301);
    });

    userRouter.post("/api/Statesuggestions", (req, res) => {
      console.log("in sttate");
      const Typedtest = req.body.typedstate;
      console.log(Typedtest);
      let result = [];
      const searchTerm = Typedtest.toLowerCase();
      for (const item of statekeywords) {
        if (item.toLowerCase().includes(searchTerm)) {
          result.push(item);
          if (result.length === 5) break;
        }
      }
      console.log(result);
      res.json({ results: result });
    });

    userRouter.post("/api/Districtsuggestions", (req, res) => {
      var keyletter = req.body.typeddist;
      var statekey = req.body.state;
      var resultkey = [];
      if (statekey.toLowerCase() === 'andhra pradesh') {
        console.log('insider andhra');
        resultkey = andhrakeywords.filter((state) => {
          if (state.toLowerCase().includes(keyletter.toLowerCase())) {
            return state;
          }
        });
        var jdata = { state: resultkey };
        return res.json(jdata);
      } else if (statekey.toLowerCase() == 'karanataka') {
        resultkey = karanatakakeywords.filter((state) => {
          if (state.toLowerCase().includes(keyletter.toLowerCase())) {
            return state;
          }
        });
        var jdata = { state: resultkey };
        return res.json(jdata);
      } else if (statekey.toLowerCase() == 'tamil nadu') {
        resultkey = tamilkeywords.filter((state) => {
          if (state.toLowerCase().includes(keyletter.toLowerCase())) {
            return state;
          }
        });
        var jdata = { state: resultkey };
        return res.json(jdata);
      } else if (statekey.toLowerCase() == 'telangana') {
        resultkey = telanganakeywords.filter((state) => {
          if (state.toLowerCase().includes(keyletter.toLowerCase())) {
            return state;
          }
        });
        var jdata = { state: resultkey };
        return res.json(jdata);
      }
      return res.sendStatus(301);
    });

    userRouter.post("/api/bothcheck", (req, res) => {
      const { state, district } = req.body;
      console.log("the state and dist are", state, district);
      let both = 0;
      let statein = 0;
      let distin = 0;
      for (const item of statekeywords) {
        console.log(item, state);
        if (item.toLowerCase() == state.trim().toLowerCase()) {
          statein = 1;
          console.log("the state and dist are in  inside", state, district);
        }
      }

      if (statein == 0) return res.json({ both: 0, state: 1, district: 0 });

      if (state == 'andhra pradesh') {
        for (const item of andhrakeywords) {
          if (item.toLowerCase() == district.toLowerCase()) {
            distin = 1;
            console.log("the  dist are in  inside", state, district);
          }
        }
        if (distin == 0) return res.json({ both: 0, state: 0, district: 1 });
      } else if (state == 'karanataka') {
        for (const item of karanatakakeywords) {
          if (item.toLowerCase() == district.toLowerCase()) distin = 1;
        }
        if (distin == 0) return res.json({ both: 0, state: 0, district: 1 });
      } else if (state == 'tamil nadu') {
        for (const item of tamilkeywords) {
          if (item.toLowerCase() == district.toLowerCase()) distin = 1;
        }
        if (distin == 0) return res.json({ both: 0, state: 0, district: 1 });
      } else if (state == 'telanagana') {
        for (const item of telanganakeywords) {
          if (item.toLowerCase() == district.toLowerCase()) distin = 1;
        }
        if (distin == 0) return res.json({ both: 0, state: 0, district: 1 });
      }

      if (statein == 1 && distin == 1) {
        return res.json({ both: 0, state: 0, district: 0 });
      } else {
        return res.json({ both: 1, state: 1, district: 1 });
      }
    });

    userRouter.get("/api/getratesclient", async (req, res) => {
      console.log("request recived");
      const district = req.query.district.toUpperCase();
      const state = req.query.state.toUpperCase();
      const test = req.query.test.toLowerCase();
      console.log("the request is", district, state, "the test is", test);

      const cacheKey = `rates:${state}:${district}:${test}`;

      try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
          console.log("Serving from Redis cache");
          return res.json(JSON.parse(cachedData));
        }

        const hospitals = await hospmodel.find({
          State: state,
          District: district,
          tests: { $elemMatch: { testName: test } },
        }, {
          _id: 1,
          nameOfHospital: 1,
          mitraContactNumber: 1,
          Address: 1,
          tests: { $elemMatch: { testName: test } },
        });

        const resultArray = hospitals.map(hospital => {
          const testInfo = hospital.tests[0];
          return {
            id: hospital._id,
            nameOfHospital: hospital.nameOfHospital,
            mitraContactNumber: hospital.mitraContactNumber,
            address: hospital.Address,
            price: testInfo ? testInfo.price : null,
          };
        });

        await redisClient.setEx(cacheKey, 3600, JSON.stringify(resultArray));
        console.log("Stored in Redis cache");

        return res.json(resultArray);
      } catch (error) {
        console.error("Error in getratesclient:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    });

    userRouter.get("/api/protected", authroute, (req, res) => {
      res.sendStatus(200);
    });

    userRouter.post("/api/clientupcomingappointments", async (req, res) => {
      const { id } = req.body;

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(tomorrow.getDate() + 1);

      try {
        const appointments = await Appointment.find({
          userid: id,
          appointmentDate: { $gte: tomorrow },
          cancelled: { $ne: 1 },
        });

        const hospitalIds = appointments.map(appointment => appointment.hospitalid);
        const hospitals = await hospmodel.find({ _id: { $in: hospitalIds } });

        const hospitalMap = hospitals.reduce((acc, hospital) => {
          acc[hospital._id] = {
            nameOfHospital: hospital.nameOfHospital,
            address: hospital.Address,
          };
          return acc;
        }, {});

        const result = appointments.map(appointment => ({
          appointmentDate: appointment.appointmentDate,
          bookedDate: appointment.bookedDate,
          testname: appointment.testname,
          nameOfHospital: hospitalMap[appointment.hospitalid]?.nameOfHospital || null,
          address: hospitalMap[appointment.hospitalid]?.address || null,
          slot: appointment.timeSlot,
          id: appointment._id,
        }));

        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    userRouter.get("/api/clienttodayappoints/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const appointments = await Appointment.find({
          appointmentDate: { $gte: todayStart, $lte: todayEnd },
          userid: id,
          patientstatus: { $ne: 3 },
          cancelled: { $ne: 1 },
        });

        const hospitalIds = appointments.map(appointment => appointment.hospitalid);
        const hospitals = await hospmodel.find({ _id: { $in: hospitalIds } });

        const hospitalMap = hospitals.reduce((acc, hospital) => {
          acc[hospital._id] = {
            nameOfHospital: hospital.nameOfHospital,
            address: hospital.Address,
            phone: hospital.mitraContactNumber,
          };
          return acc;
        }, {});

        const result = appointments.map(appointment => ({
          testname: appointment.testname,
          nameOfHospital: hospitalMap[appointment.hospitalid]?.nameOfHospital || null,
          phone: hospitalMap[appointment.hospitalid]?.phone || null,
          address: hospitalMap[appointment.hospitalid]?.address || null,
          patientstaus: appointment.patientstatus,
          slot: appointment.timeSlot,
          date: appointment.appointmentDate,
          id: appointment._id,
        }));

        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    userRouter.get("/api/clientcompletedappointments/:id", async (req, res) => {
      const id = req.params.id;

      try {
        const appointments = await Appointment.find({
          userid: id,
          patientstatus: 3,
          cancelled: { $ne: 1 },
        });

        const hospitalIds = appointments.map(appointment => appointment.hospitalid);
        const hospitals = await hospmodel.find({ _id: { $in: hospitalIds } });

        const hospitalMap = hospitals.reduce((acc, hospital) => {
          acc[hospital._id] = {
            nameOfHospital: hospital.nameOfHospital,
            phone: hospital.mitraContactNumber,
          };
          return acc;
        }, {});

        const result = appointments.map(appointment => ({
          testname: appointment.testname,
          nameOfHospital: hospitalMap[appointment.hospitalid]?.nameOfHospital || null,
          phone: hospitalMap[appointment.hospitalid]?.phone || null,
          slot: appointment.timeSlot,
          date: appointment.appointmentDate,
          path: appointment.documentPath,
          id: appointment._id,
        }));

        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    userRouter.post("/api/bookappointment", authroute, async (req, res) => {
      console.log("recived bro");

      const {
        patientName,
        testname,
        testprice,
        gender,
        email,
        phone,
        area,
        city,
        state,
        postalCode,
        appointmentDate,
        timeSlot,
        additionalInfo,
        hospitalid,
        hospitalname,
        amount,
        paymentMethod,
        userid,
      } = req.body;
      const appointmentDateObj = new Date(appointmentDate);
      console.log(patientName);

      try {
        const appointment = new Appointment({
          patientName,
          testprice,
          testname,
          gender,
          email,
          phone,
          area,
          city,
          state,
          postalCode,
          appointmentDate: appointmentDateObj,
          timeSlot,
          additionalInfo,
          hospitalid,
          hospitalname,
          userid,
        });

        const savedAppointment = await appointment.save();

        const transaction = new Transaction({
          amount,
          paymentMethod,
          appointmentId: savedAppointment._id,
        });
        const savedTransaction = await transaction.save();
        savedAppointment.transaction = savedTransaction._id;
        await savedAppointment.save();

        return res.status(201).json({ success: true, appointment: savedAppointment });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to book appointment.', error });
      }
    });

    userRouter.get("/api/getprofile/:id", async (req, res) => {
      const id = req.params.id;
      const finduse = await user.findById(id).select("-password");
      if (!finduse) return res.status(404).json({ message: "User not found" });
      res.json(finduse);
    });

    userRouter.post("/api/changepassword/:id", async (req, res) => {
      const id = req.params.id;
      const { oldpassword, newpassword } = req.body;
      const userdins = await user.findById(id);
      const pass = userdins.password;
      const result = await bcrypt.compare(oldpassword, pass);
      if (result) {
        const salt = await bcrypt.genSalt(10);
        userdins.password = newpassword;
        await userdins.save();
        return res.sendStatus(200);
      } else {
        return res.status(500).json({ message: "invalid password" });
      }
      return res.status(500).json({ message: "invalid password" });
    });

    hospitalRouter.post(
      '/api/hospitalregistration',
      upload.fields([
        { name: 'document1', maxCount: 1 },
        { name: 'document2', maxCount: 1 },
        { name: 'document3', maxCount: 1 },
        { name: 'document4', maxCount: 1 },
      ]),
      async (req, res) => {
        try {
          const { hospitalName, phone, email, address, state, district } = req.body;

          const documentPaths = {};

          for (let i = 1; i <= 4; i++) {
            const fieldName = `document${i}`;
            if (req.files[fieldName]) {
              const cloudinaryUrl = req.files[fieldName][0].path;
              documentPaths[fieldName] = cloudinaryUrl;
            }
          }

          const newRequest = new HospitalRequest({
            hospitalName,
            phone,
            email,
            address,
            state,
            district,
            document1: documentPaths.document1,
            document2: documentPaths.document2,
            document3: documentPaths.document3,
            document4: documentPaths.document4,
          });

          await newRequest.save();

          res.status(201).json({
            message: 'Hospital request created successfully',
            request: newRequest,
          });
        } catch (error) {
          console.error('Error creating hospital request:', error);
          res.status(500).json({
            message: 'Server error',
            error: error.message,
          });
        }
      }
    );

    hospitalRouter.post("/api/hospitallogin", async (req, res) => {
      const { usermail, password } = req.body;

      const finduser = await hospmodel.findOne({ email: usermail });
      if (!finduser) res.status(300).send("user doesnt exist with given mail address");
      else {
        if (finduser.password == password) {
          console.log("hos user found");
          const token = jwt.sign({ usermail, role: "hospitaluser", id: finduser._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
          res.json({ token });
        } else {
          res.status(400).send("invalid credentials");
        }
      }
    });

    const getRevenueData = async (hospitalId) => {
      try {
        const today = new Date();
        const startDate = moment().subtract(6, 'months').startOf('month').toDate();
        const endDate = moment().endOf('month').toDate();

        const revenueData = await Transaction.aggregate([
          {
            $lookup: {
              from: 'appointments',
              localField: 'appointmentId',
              foreignField: '_id',
              as: 'appointmentDetails',
            },
          },
          {
            $unwind: {
              path: '$appointmentDetails',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $match: {
              'appointmentDetails.hospitalid': hospitalId,
              'appointmentDetails.cancelled': { $ne: 1 },
              transactionDate: {
                $gte: startDate,
                $lt: endDate,
              },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m", date: "$transactionDate" },
              },
              totalRevenue: { $sum: '$amount' },
            },
          },
          {
            $sort: { '_id': 1 },
          },
        ]);

        const revenueValues = new Array(6).fill(0);
        const currentMonth = moment().month();

        revenueData.forEach(item => {
          const monthIndex = moment(item._id).month();
          const indexFromEnd = 5 - (currentMonth - monthIndex);
          if (indexFromEnd >= 0 && indexFromEnd < revenueValues.length) {
            revenueValues[indexFromEnd] = item.totalRevenue;
          }
        });

        return revenueValues;
      } catch (error) {
        console.error('Error fetching revenue data:', error);
        throw error;
      }
    };

    hospitalRouter.get("/api/getnamesbyorgans/:id", async (req, res) => {
      const id = req.params.id;
      const names = searchbyorgans[id];
      res.json(names);
    });

    hospitalRouter.get('/api/hospital-dashboard', async (req, res) => {
      const { hospitalId } = req.query;
      const hospital = await hospmodel.findById(hospitalId);
      const appo = await Appointment.find({ hospitalid: hospitalId });
      const totapat = appo.length;
      console.log("dash recived", hospitalId);
      const revenueData = await getRevenueData(hospitalId);
      console.log(revenueData);
      const data = {
        "hospitalName": hospital.nameOfHospital,
        "patientCount": totapat,
        "diagnosticCount": hospital.tests.length,
        "revenueData": revenueData,
        "revenueLabels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        "diagnosticTestData": [40, 20, 15, 10, 5, 10, 15],
        "diagnosticTestLabels": ["Test A", "Test B", "Test C", "Test D", "Test E", "Test F"],
        "bookingData": [200, 300, 250, 400],
        "bookingLabels": ["Month 1", "Month 2", "Month 3", "Month 4"],
      };
      res.json(data);
    });

    hospitalRouter.get('/api/hospitalUpcoming', async (req, res) => {
      const { hospitalId } = req.query;
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      try {
        const appointments = await Appointment.find({
          hospitalid: hospitalId,
          appointmentDate: { $gte: tomorrow },
          cancelled: { $ne: 1 },
        })
          .select('patientName testname appointmentDate timeSlot phone email _id')
          .exec();

        res.json(appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    hospitalRouter.post('/api/hospitalcancel', async (req, res) => {
      const { appointmentId } = req.body;
      console.log("cancell reques recive", appointmentId);

      try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
          appointmentId,
          { cancelled: 1, cancelledby: 2 },
          { new: true }
        );

        if (!updatedAppointment) {
          return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment cancelled successfully', updatedAppointment });
      } catch (error) {
        console.error('Error cancelling appointment:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    hospitalRouter.get('/api/hospitalseeavilable', async (req, res) => {
      const { hospitalId } = req.query;
      try {
        console.log("get request recived fo available tets");
        const hospital = await hospmodel.findById(hospitalId);

        if (!hospital) {
          return res.status(404).json({ message: 'Hospital not found' });
        }

        const availableTests = {};
        hospital.tests.forEach(test => {
          availableTests[test.testName.toUpperCase()] = test.price;
        });

        res.json(availableTests);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    hospitalRouter.get('/api/hospitalavailableTests', async (req, res) => {
      const { hospitalId } = req.query;
      try {
        console.log("get request recived fo available tets");
        const hospital = await hospmodel.findById(hospitalId);

        if (!hospital) {
          return res.status(404).json({ message: 'Hospital not found' });
        }

        const availableTests = {};
        hospital.tests.forEach(test => {
          availableTests[test.testName.toUpperCase()] = test.price;
        });

        res.json(availableTests);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    hospitalRouter.post('/api/hospitalupdatetest', async (req, res) => {
      try {
        const { hospitalid } = req.query;
        const selectedTests = req.body.selectedTests;
        console.log(selectedTests);

        const testArray = Object.keys(selectedTests).map(testName => ({
          testName: testName.toLowerCase(),
          price: selectedTests[testName],
        }));

        const updatedHospital = await hospmodel.findByIdAndUpdate(
          hospitalid,
          { $set: { tests: testArray } },
          { new: true }
        );

        if (!updatedHospital) {
          return res.status(404).json({ message: 'Hospital not found' });
        }

        res.status(200).json({ message: 'Tests updated successfully', data: updatedHospital });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
      }
    });

    hospitalRouter.get("/api/hospitaltodayappointments", async (req, res) => {
      try {
        const startOfDay = new Date().setHours(0, 0, 0, 0);
        const endOfDay = new Date().setHours(23, 59, 59, 999);
        const { hospitalId } = req.query;
        console.log("request recibed ongoing", hospitalId);

        const appointments = await Appointment.find({
          appointmentDate: { $gte: new Date(startOfDay), $lte: new Date(endOfDay) },
          patientstatus: { $ne: 3 },
          cancelled: { $ne: 1 },
          hospitalid: hospitalId,
        }).select('testname patientName phone email patientstatus _id');
        console.log("success");

        res.status(200).json(appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Error fetching appointments' });
      }
    });

    hospitalRouter.post("/api/hospitalupdatepatientstatus/:id", async (req, res) => {
      const { id } = req.params;

      try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
          id,
          { patientstatus: 2 },
          { new: true }
        );

        if (!updatedAppointment) {
          return res.status(404).json({ message: 'Appointment not found' });
        }
        console.log("donoe bro");

        res.status(200).json({ message: 'Patient status updated successfully', updatedAppointment });
      } catch (error) {
        console.error('Error updating patient status:', error);
        res.status(500).json({ message: 'Error updating patient status' });
      }
    });

    hospitalRouter.post("/api/hospitalupload/:id", upload.single('file'), async (req, res) => {
      try {
        const appointmentId = req.params.id;

        if (!req.file || !req.file.path) {
          return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileUrl = req.file.path;

        await Appointment.findByIdAndUpdate(appointmentId, {
          documentPath: fileUrl,
          patientstatus: 3,
        });

        return res.status(200).json({ message: 'File uploaded successfully', filePath: fileUrl });
      } catch (error) {
        console.error('File upload error:', error);
        return res.status(500).json({ message: 'File upload failed', error: error.message });
      }
    });

    hospitalRouter.get("/api/hospitalcompletedappointments", async (req, res) => {
      const { hospitalId } = req.query;
      try {
        const completedAppointments = await Appointment.find({ patientstatus: 3, hospitalid: hospitalId }).select('testname patientName phone email _id documentPath');
        res.status(200).json(completedAppointments);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch completed appointments', error: error.message });
      }
    });

    hospitalRouter.post("/api/hospitaleditupload/:id", upload.single('file'), async (req, res) => {
      try {
        console.log("Request received to reupload file");

        const appointmentId = req.params.id;
        const file = req.file;

        if (!file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
          return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.documentPath) {
          const oldUrl = appointment.documentPath;
          const publicId = oldUrl
            .split('/')
            .slice(-1)[0]
            .split('.')[0];

          try {
            await cloudinary.uploader.destroy(`documents/${publicId}`, { resource_type: 'raw' });
            console.log("Old file deleted from Cloudinary.");
          } catch (err) {
            console.warn("Failed to delete old Cloudinary file:", err.message);
          }
        }

        appointment.documentPath = file.path;
        await appointment.save();

        res.status(200).json({
          message: 'File replaced successfully',
          filePath: file.path,
        });
      } catch (error) {
        console.error('File upload error:', error);
        res.status(500).json({ message: 'File upload failed', error: error.message });
      }
    });

    adminRouter.post('/api/adminlogin', async (req, res) => {
      const { usermail, password } = req.body;

      console.log("recived admin");
      try {
        const admin = await Admin.findOne({ usermail });

        if (!admin) {
          return res.status(404).json({ message: 'Admin not found' });
        }

        const password1 = admin.password;
        if (password1 != password) {
          return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ usermail, role: "admin" }, process.env.SECRET_KEY, { expiresIn: '1d' });
        res.json({ token });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
    });

    adminRouter.get("/api/admingetusers", async (req, res) => {
      try {
        const users = await user.find().select("username usermail age _id");
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    });

    adminRouter.post("/api/admindeleteuser/:id", async (req, res) => {
      try {
        await user.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    });

    adminRouter.get("/api/admingethospitals", async (req, res) => {
      const { page = 1, limit = 40, search = '' } = req.query;

      try {
        let searchFilter = {};
        if (search) {
          const isValidObjectId = mongoose.Types.ObjectId.isValid(search);

          searchFilter = {
            $or: [
              { nameOfHospital: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } },
              ...(isValidObjectId ? [{ _id: search }] : []),
            ],
          };
        }

        const hospitals = await hospmodel.find(searchFilter)
          .limit(limit * 1)
          .skip((page - 1) * limit).select("nameOfHospital email _id");

        const total = await hospmodel.countDocuments(searchFilter);

        res.json({
          hospitals,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
        });
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    });

    adminRouter.post("/api/admindeletehospital/:id", async (req, res) => {
      try {
        await hospmodel.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    });

    adminRouter.get("/api/adminmanageappointments", async (req, res) => {
      try {
        const { email, status } = req.query;
        if (!email) {
          return res.status(400).json({ message: 'Email is required' });
        }

        const getuse = await user.findOne({ usermail: email });
        const useridd = getuse._id;
        var appointments;
        console.log("hello appointments", email, "staus is :", status);
        if (status == 1)
          appointments = await Appointment.find({ userid: useridd, patientstatus: 1 });
        else if (status == 2)
          appointments = await Appointment.find({ userid: useridd, patientstatus: 2 });
        else if (status == 3)
          appointments = await Appointment.find({ userid: useridd, patientstatus: 3 });
        else
          appointments = await Appointment.find({ userid: useridd, cancelled: 1 });

        res.json(appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    adminRouter.get("/api/admincancelappointment", async (req, res) => {
      const { appointmentId } = req.query;
      console.log("cancell reques recive", appointmentId);

      try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
          appointmentId,
          { cancelled: 1, cancelledby: 3 },
          { new: true }
        );

        if (!updatedAppointment) {
          return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment cancelled successfully', updatedAppointment });
      } catch (error) {
        console.error('Error cancelling appointment:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    adminRouter.get("/api/adminhospitalrequests", async (req, res) => {
      try {
        const requests = await HospitalRequest.find();
        res.json(requests);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    adminRouter.post('/api/acceptHospitalRequest', async (req, res) => {
      const {
        state,
        district,
        phone,
        hospitalName,
        address,
        email,
        hosreqid,
      } = req.body;

      try {
        const newHospital = new hospmodel({
          State: state.toUpperCase(),
          District: district.toUpperCase(),
          mitraContactNumber: phone,
          nameOfHospital: hospitalName,
          Address: address,
          email: email,
          password: '12345678',
          tests: [],
        });

        await newHospital.save();

        await HospitalRequest.findByIdAndDelete(hosreqid);

        res.status(201).json({ message: 'Hospital created successfully', hospital: newHospital });
      } catch (error) {
        console.error('Error creating hospital:', error);
        res.status(500).json({ message: 'Failed to create hospital' });
      }
    });

    adminRouter.post("/api/rejectHospitalRequest", async (req, res) => {
      const { id } = req.body;
      try {
        await HospitalRequest.findByIdAndDelete(id);
        res.status(201).json({ message: 'rejected successfully' });
      } catch (error) {
        console.error('Error creating hospital:', error);
        res.status(500).json({ message: 'Failed to reect' });
      }
    });

    app.use('/', userRouter);
    app.use('/', hospitalRouter);
    app.use('/', adminRouter);

    app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

    app.use((req, res, next) => {
      console.log("invalid url");
      res.status(404).json({ message: 'invalid url' });
    });

    app.use((err, req, res, next) => {
      res.status(500).json({
        message: "Internal Server Error",
      });
    });



    app.listen(3001, () => {
      console.log("backend server running at 3001");
    });

  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

startServer();


export default app;