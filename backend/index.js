const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const User = require("./model/User");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// 1. App Initialization (Sabse Pehle)
const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:3000",
    "https://zerodha-clone-git-main-zerodha-clone1.vercel.app",
    "https://zerodha-clone-nine-sigma.vercel.app"
  ],
  credentials: true
}));

app.use(bodyParser.json());

// 3. Session Options & Middleware
const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));

// 4. Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 5. Protected Route Middleware
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: "Unauthorized access! Pehle login karein." });
};

// 6. Routes
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        res.status(200).json({ message: "User registered successfully", user: registeredUser });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post("/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json({ message: "Login successful!", user: req.user });
});

app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: "Logged out successfully!" });
    });
});

// Protected Data Routes (isLoggedIn middleware ke saath)
app.get("/allHoldings", isLoggedIn, async (req, res) => {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
});

app.get("/allPositions", isLoggedIn, async (req, res) => {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
});
app.post("/newOrder", isLoggedIn, async (req, res) => {
    try {
        let newOrder = new OrdersModel({
            name: req.body.name,
            qty: req.body.qty,
            price: req.body.price,
            mode: req.body.mode,
        });
        await newOrder.save();
        res.status(200).json({ message: "Order saved successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/allOrders", isLoggedIn, async (req, res) => {
    let allOrders = await OrdersModel.find({});
    res.json(allOrders);
});
// Database Connection & Server Listen
mongoose.connect(uri)
    .then(() => {
        console.log("DB connected!");
        app.listen(PORT, () => {
            console.log(`App started on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));