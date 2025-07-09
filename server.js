// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const path = require("path");
// const bcrypt = require("bcryptjs")

// const app = express();
// const PORT = process.env.PORT || 5001;
// const MONGO_URI_FOOD = process.env.MONGO_URI_FOOD;
// const MONGO_URI_ORG = process.env.MONGO_URI_ORG;

// if (!MONGO_URI_FOOD || !MONGO_URI_ORG) {
//     console.error("Error: MongoDB URIs are not defined in the .env file.");
//     process.exit(1);
// }
// let flag=true;
// const foodConnection = mongoose.createConnection(MONGO_URI_FOOD, { useUnifiedTopology: true });
// foodConnection.on("connected", () => {
//     console.log("Connected to Food database");
// });


// const orgConnection = mongoose.createConnection(MONGO_URI_ORG, { useUnifiedTopology: true });
// orgConnection.on("connected", () => {
//     console.log("Connected to Organisation database");
// });
// const dbUri = 'mongodb://localhost:27017/';

// const foodSchema = new mongoose.Schema({
//     foodType: String,
//     quantity: Number,
//     freshSpan: Number,
//     name: String,
//     contactNumber: Number,
//     email: String,
//     locationType: String,
//     locationDescription: String,
//     date: { type: Date, default: Date.now }
// });

// const organisationSchema = new mongoose.Schema({
//     orgName: { type: String, required: true },
//     orgType: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     mobile: { type: Number, required: true },
//     govtId: { type: String },
//     password: { type: String, required: true },
// });

// const volunteerSchema = new mongoose.Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     mobile: { type: Number, required: true },
//     govtId: { type: String },
//     password: { type: String, required: true }
// });

// const Organisation = orgConnection.model("Organisation", organisationSchema);
// const Food = foodConnection.model("Food", foodSchema);
// const Volunteer = orgConnection.model("Volunteer", volunteerSchema);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => res.render("home"));
// app.get("/fr", (req, res) => res.render("fr"));
// app.get("/login", (req, res) => res.render("login"));
// app.get("/contact", (req, res) => res.render("contact"));
// app.get("/about", (req, res) => res.render("about"));
// app.get("/vsignup", (req, res) => res.render("volunteersignup"));
// app.get("/osignup", (req, res) => res.render("organizationsignup"));

// app.get("/dashboard", async (req, res) => {
//     try {
//         const foodEntries = await Food.find();
//         res.render("dashboard", { foodEntries });
//     } catch (err) {
//         console.error("Error fetching food entries:", err);
//         res.status(500).send("Error fetching data");
//     }
// });

// app.post("/add-food", async (req, res) => {
//     try {
//         const newFood = new Food(req.body);
//         await newFood.save();
//         console.log("New Food Entry Saved:", newFood);
//         res.redirect("fr");
//     } catch (err) {
//         console.error("Error saving food details:", err);
//         res.status(500).send("Error saving food details");
//     }
// });

// app.post("/osignup", async (req, res) => {
//     try {
//         const { orgName, orgType, email, mobile, govtId, password } = req.body;

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newOrganisation = new Organisation({
//             orgName,
//             orgType,
//             email,
//             mobile,
//             govtId,
//             password: hashedPassword // Save hashed password
//         });

//         await newOrganisation.save();
//         console.log("New Organisation Saved:", newOrganisation);
//         res.redirect("/login");

//     } catch (err) {
//         console.error("Error saving organisation data:", err);
//         res.status(500).send("Error saving organisation data");
//     }
// });

// app.post("/volsignup", async (req, res) => {
//     try {
//         const { firstName, lastName, email, mobile, govtId, password } = req.body;

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newVolunteer = new Volunteer({
//             firstName,
//             lastName,
//             email,
//             mobile,
//             govtId,
//             password: hashedPassword // Save hashed password
//         });

//         await newVolunteer.save();
//         console.log("New Volunteer Saved:", newVolunteer);
//         res.redirect("/login");

//     } catch (err) {
//         console.error("Error saving volunteer data:", err);
//         res.status(500).send("Error saving volunteer data");
//     }
// });
// app.delete("/delete-food/:id", async (req, res) => {
//     try {
//         console.log(flag);
//         if(flag){
//             const { id } = req.params;
//             await Food.findByIdAndDelete(id);
//             console.log(`Food entry with ID ${id} accepted.`);
//             res.json({ message: "Food accepted successfully!" });
//             flag = false;
//         }
//     } catch (err) {
//         console.error("Error deleting food:", err);
//         res.status(500).json({ error: "Error deleting food" });
//     }
// });

// app.post("/login", async (req, res) => {
//     try {
//         const { email, password, DBtype } = req.body;

//         // Select the correct database connection
//         let User;
//         if (DBtype === "Organisation") {
//             User = Organisation;
//         } else if (DBtype === "volunteers") {
//             User = Volunteer;
//         } else {
//             return res.status(400).json({ success: false, message: "Invalid user type" });
//         }

//         // Check if user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).send(`<script>alert("User not found!"); window.location.href='/login';</script>`);
//         }

//         // Compare password with hashed password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).send(`<script>alert("Incorrect password!"); window.location.href='/login';</script>`);
//         }

//         console.log(`User logged in: ${email}`);

//         // Redirect to the dashboard on successful login
//         res.redirect("/dashboard");

//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).send(`<script>alert("Internal server error!"); window.location.href='/login';</script>`);
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcryptjs");
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI_FOOD = process.env.MONGO_URI_FOOD;
const MONGO_URI_ORG = process.env.MONGO_URI_ORG;

if (!MONGO_URI_FOOD || !MONGO_URI_ORG) {
    console.error("Error: MongoDB URIs are not defined in the .env file.");
    process.exit(1);
}

let flag = true;
const foodConnection = mongoose.createConnection(MONGO_URI_FOOD, { useUnifiedTopology: true });
foodConnection.on("connected", () => {
    console.log("Connected to Food database");
});

const orgConnection = mongoose.createConnection(MONGO_URI_ORG, { useUnifiedTopology: true });
orgConnection.on("connected", () => {
    console.log("Connected to Organisation database");
});

const foodSchema = new mongoose.Schema({
    foodType: String,
    quantity: Number,
    freshSpan: Number,
    name: String,
    contactNumber: Number,
    email: String,
    locationType: String,
    locationDescription: String,
    date: { type: Date, default: Date.now }
});

const organisationSchema = new mongoose.Schema({
    orgName: { type: String, required: true },
    orgType: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true },
    govtId: { type: String },
    password: { type: String, required: true },
});

const volunteerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true },
    govtId: { type: String },
    password: { type: String, required: true }
});

const Organisation = orgConnection.model("Organisation", organisationSchema);
const Food = foodConnection.model("Food", foodSchema);
const Volunteer = orgConnection.model("Volunteer", volunteerSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: 'your_secret_key',  // Secret key to encrypt the session ID cookie
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,  // Set to true if you're using HTTPS
        maxAge: 600000  // 15 minutes session timeout (in milliseconds)
    }
}));

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
    if (req.session.user) {
        return next();  // Continue with the request if the user is logged in
    } else {
        return res.redirect('/login');  // Redirect to login if session expired or user not logged in
    }
}

app.get("/", (req, res) => res.render("home"));
app.get("/fr", isLoggedIn, (req, res) => res.render("fr"));
app.get("/login", (req, res) => {
    const errorMessage = req.query.errorMessage || '';
    res.render("login", { errorMessage });
});
app.get("/tips", (req, res) => res.render("tips"));
app.get("/chatbot", (req, res) => res.render("chatbot"));
app.get("/doctor", (req, res) => res.render("doctor"));
app.get("/index", (req, res) => res.render("index"));
app.get("/app", (req, res) => res.render("app"));
app.get("/phy", (req, res) => res.render("phy"));
app.get("/men", (req, res) => res.render("men"));
app.get("/login", (req, res) => res.render("login"));
// Dashboard (protected route)
app.get("/dashboard", isLoggedIn, async (req, res) => {
    try {
        const foodEntries = await Food.find();
        res.render("dashboard", { foodEntries });
    } catch (err) {
        console.error("Error fetching food entries:", err);
        res.status(500).send("Error fetching data");
    }
});

// Add new food entry
app.post("/add-food", async (req, res) => {
    try {
        const newFood = new Food(req.body);
        await newFood.save();
        console.log("New Food Entry Saved:", newFood);
        res.redirect("fr");
    } catch (err) {
        console.error("Error saving food details:", err);
        res.status(500).send("Error saving food details");
    }
});

// Organisation signup
app.post("/osignup", async (req, res) => {
    try {
        const { orgName, orgType, email, mobile, govtId, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newOrganisation = new Organisation({
            orgName,
            orgType,
            email,
            mobile,
            govtId,
            password: hashedPassword // Save hashed password
        });

        await newOrganisation.save();
        console.log("New Organisation Saved:", newOrganisation);
        res.redirect("/login");

    } catch (err) {
        console.error("Error saving organisation data:", err);
        res.status(500).send("Error saving organisation data");
    }
});

// Volunteer signup
app.post("/volsignup", async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, govtId, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newVolunteer = new Volunteer({
            firstName,
            lastName,
            email,
            mobile,
            govtId,
            password: hashedPassword // Save hashed password
        });

        await newVolunteer.save();
        console.log("New Volunteer Saved:", newVolunteer);
        res.redirect("/login");

    } catch (err) {
        console.error("Error saving volunteer data:", err);
        res.status(500).send("Error saving volunteer data");
    }
});

// Logout route (destroy session and redirect to login page)
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error during logout");
        }
        res.redirect("/login?errorMessage=Your session has expired. Please log in again.");
    });
});
app.post('/get-diet', async (req, res) => {

    try {
        const { age, weight, height, gender, activity, goal, allergies, diseases, 'food-type': foodType, region } = req.body;

        // Construct the prompt
        const prompt = `
        Create a detailed personalized diet plan based on the following information:
        
        - Age: ${age}
        - Weight: ${weight} kg
        - Height: ${height} cm
        - Gender: ${gender}
        - Activity Level: ${activity}
        - Health Goal: ${goal}
        - Food Allergies: ${allergies || 'None'}
        - Genetic Diseases: ${diseases || 'None'}
        - Food Preference: ${foodType}
        - Cuisine Preference: ${region}
        
        The diet plan should include:
        1. Daily calorie target
        2. Macronutrient breakdown (carbs, proteins, fats)
        3. Recommended foods and meals for breakfast, lunch, dinner, and snacks
        4. Foods to avoid
        5. General dietary advice based on the provided information
        
        Make the recommendations specific to the user's preferences and health conditions.
        Format the response in clear, readable sections with appropriate headings.
        `;

        // Generate content
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt
        });

        res.json({ recommendation: response.text });
    } catch (error) {
        console.error('Error generating diet recommendation:', error);
        res.status(500).json({ error: 'Failed to generate diet recommendation' });
    }
}
);
// Login route
app.post("/login", async (req, res) => {
    try {
        const { email, password, DBtype } = req.body;

        let User;
        if (DBtype === "Organisation") {
            User = Organisation;
        } else if (DBtype === "volunteers") {
            User = Volunteer;
        } else {
            return res.status(400).json({ success: false, message: "Invalid user type" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send(`<script>alert("User not found!"); window.location.href='/login';</script>`);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send(`<script>alert("Incorrect password!"); window.location.href='/login';</script>`);
        }

        req.session.user = user; // Store user details in session
        console.log(`User logged in: ${email}`);

        res.redirect("/dashboard");

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send(`<script>alert("Internal server error!"); window.location.href='/login';</script>`);
    }
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});