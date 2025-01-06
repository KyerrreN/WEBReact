const mongoose = require("mongoose");
const Freelancer = require("./freelancer");
const Bid = require("./bid");
const FreelancerBid = require("./freelancerBid");

// Connect to MongoDB
mongoose
    .connect("mongodb://localhost:27017/FreelancerMockProject", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Sample data
const freelancers = [
    {
        name: "Alice",
        surname: "Johnson",
        spec: "Web Developer",
        header: "Passionate web developer with a knack for coding.",
        rating: 4.3,
        piclink: "5.jpg",
    },
    {
        name: "Bob",
        surname: "Smith",
        spec: "Backend Software Engineer",
        header: "Expert in building scalable applications.",
        rating: 5.0,
        piclink: "4.jpg",
    },
    {
        name: "Charlie",
        surname: "Brown",
        spec: "UI Designer",
        header: "Creative designer focused on user experience.",
        rating: 4.8,
        piclink: "3.jpg",
    },
    {
        name: "Diana",
        surname: "Prince",
        spec: "Web Developer",
        header: "Full-stack developer with a passion for coding.",
        rating: 5.0,
        piclink: "1.jpg",
    },
    {
        name: "Ethan",
        surname: "Hunt",
        spec: "Backend Software Engineer",
        header: "Skilled in cloud computing and microservices.",
        rating: 4.9,
        piclink: "1.jpg",
    },
    {
        name: "Fiona",
        surname: "Glenanne",
        spec: "UI Designer",
        header: "UI/UX designer with a passion for aesthetics.",
        rating: 5.0,
        piclink: "2.jpg",
    },
    {
        name: "George",
        surname: "Mason",
        spec: "Web Developer",
        header: "Dedicated developer with a knack for problem-solving.",
        rating: 4.7,
        piclink: "2.jpg",
    },
    {
        name: "Hannah",
        surname: "Montana",
        spec: "Backend Software Engineer",
        header: "Experienced in cloud computing and microservices.",
        rating: 5.0,
        piclink: "4.jpg",
    },
    {
        name: "Ian",
        surname: "Fleming",
        spec: "UI Designer",
        header: "UI designer focused on creating intuitive interfaces.",
        rating: 4.8,
        piclink: "5.jpg",
    },
    {
        name: "Jack",
        surname: "Ryan",
        spec: "Web Developer",
        header: "Web developer with a strong foundation in JavaScript.",
        rating: 4.5,
        piclink: "5.jpg",
    },
    {
        name: "Kathy",
        surname: "Bates",
        spec: "Backend Software Engineer",
        header: "Specialist in API design and development.",
        rating: 5.0,
        piclink: "3.jpg",
    },
    {
        name: "Liam",
        surname: "Neeson",
        spec: "Web Developer",
        header: "Passionate about building responsive websites.",
        rating: 4.6,
        piclink: "3.jpg",
    },
    {
        name: "Mia",
        surname: "Wallace",
        spec: "UI Designer",
        header: "Experienced in creating user-friendly designs.",
        rating: 4.9,
        piclink: "2.jpg",
    },
    {
        name: "Noah",
        surname: "Bennett",
        spec: "Backend Software Engineer",
        header: "Focused on building secure and scalable systems.",
        rating: 4.7,
        piclink: "1.jpg",
    },
    {
        name: "Olivia",
        surname: "Pope",
        spec: "Web Developer",
        header: "Loves to create dynamic web applications.",
        rating: 5.0,
        piclink: "1.jpg",
    },
    {
        name: "Peter",
        surname: "Parker",
        spec: "Web Developer",
        header: "Skilled in front-end technologies and frameworks.",
        rating: 4.8,
        piclink: "5.jpg",
    },
    {
        name: "Quinn",
        surname: "Fabray",
        spec: "UI Designer",
        header: "Designing intuitive user interfaces with a focus on UX.",
        rating: 4.9,
        piclink: "4.jpg",
    },
    {
        name: "Ryan",
        surname: "Gosling",
        spec: "Backend Software Engineer",
        header: "Expert in building robust server-side applications.",
        rating: 5.0,
        piclink: "4.jpg",
    },
    {
        name: "Sophie",
        surname: "Turner",
        spec: "Web Developer",
        header: "Full-stack developer with a passion for innovation.",
        rating: 4.6,
        piclink: "5.jpg",
    },
    {
        name: "Tom",
        surname: "Holland",
        spec: "UI Designer",
        header: "Creative designer with a flair for modern aesthetics.",
        rating: 4.7,
        piclink: "1.jpg",
    },
];

const bids = [
    {
        name: "Website Redesign Project",
        desc: "Revamping the current website to enhance user experience and modernize the design. The project includes responsive layouts and new features.",
        spec: "Web Developer",
        payment: 2500.0,
    },
    {
        name: "E-commerce Platform Development",
        desc: "Develop a fully functional e-commerce platform with payment integration, user accounts, and product management. Focus on scalability.",
        spec: "Backend Software Engineer",
        payment: 7500.5,
    },
    {
        name: "Mobile App UI Design",
        desc: "Create an engaging user interface for a mobile application targeting young adults. The design should be intuitive and visually appealing.",
        spec: "UI Designer",
        payment: 1500.75,
    },
    {
        name: "API Development for Inventory System",
        desc: "Build a RESTful API that enables the inventory management system to interact with external applications. Ensure security and efficiency.",
        spec: "Backend Software Engineer",
        payment: 3200.99,
    },
    {
        name: "Blog Creation and Setup",
        desc: "Set up a blog site with a custom theme, SEO optimization, and necessary plugins. The project aims to create a platform for sharing articles.",
        spec: "Web Developer",
        payment: 1200.0,
    },
    {
        name: "Social Media Marketing Campaign",
        desc: "Develop and implement a comprehensive social media marketing strategy to increase brand awareness and engagement across multiple platforms.",
        spec: "Web Developer",
        payment: 4500.25,
    },
    {
        name: "Custom CRM Development",
        desc: "Create a custom customer relationship management system tailored to the client's business needs, including analytics and reporting features.",
        spec: "Backend Software Engineer",
        payment: 9800.0,
    },
    {
        name: "Logo Design for Startup",
        desc: "Design a unique and memorable logo for a new startup. The logo should reflect the brand's values and appeal to the target audience.",
        spec: "UI Designer",
        payment: 800.5,
    },
    {
        name: "Landing Page Optimization",
        desc: "Optimize an existing landing page to improve conversion rates through better design, layout adjustments, and A/B testing.",
        spec: "Web Developer",
        payment: 1100.99,
    },
    {
        name: "Data Analysis and Visualization",
        desc: "Analyze sales data and create visual reports that provide insights into performance trends and customer behavior for better decision-making.",
        spec: "Backend Software Engineer",
        payment: 3000.0,
    },
    {
        name: "Content Management System Setup",
        desc: "Set up a content management system that allows for easy updates and management of website content, including user access control.",
        spec: "Web Developer",
        payment: 2000.0,
    },
    {
        name: "SEO Audit and Strategy Development",
        desc: "Conduct a comprehensive SEO audit of the existing website and develop a strategy to improve search engine rankings and visibility.",
        spec: "Backend Software Engineer",
        payment: 1500.5,
    },
    {
        name: "Email Marketing Campaign Design",
        desc: "Design and implement an email marketing campaign targeting potential customers, including templates and automation setup.",
        spec: "UI Designer",
        payment: 1200.75,
    },
    {
        name: "Web App Performance Optimization",
        desc: "Analyze and optimize the performance of a web application, focusing on speed improvements and reducing load times.",
        spec: "Web Developer",
        payment: 3500.0,
    },
    {
        name: "WordPress Theme Customization",
        desc: "Customize a WordPress theme to align with brand guidelines and enhance the user experience while ensuring mobile responsiveness.",
        spec: "Web Developer",
        payment: 1800.25,
    },
    {
        name: "Mobile Game Development",
        desc: "Create an engaging mobile game that includes interactive gameplay, appealing graphics, and social sharing features for user engagement.",
        spec: "Web Developer",
        payment: 7500.0,
    },
    {
        name: "Cloud Storage Solution Implementation",
        desc: "Implement a secure cloud storage solution for a client, ensuring data integrity, accessibility, and compliance with industry regulations.",
        spec: "Backend Software Engineer",
        payment: 5200.5,
    },
    {
        name: "Interactive Website Prototype",
        desc: "Design an interactive prototype for a website to showcase user flows and functionalities before development begins.",
        spec: "UI Designer",
        payment: 2200.0,
    },
    {
        name: "Virtual Reality Experience Creation",
        desc: "Develop a virtual reality experience for educational purposes, focusing on interactivity and immersive learning.",
        spec: "Web Developer",
        payment: 9000.0,
    },
    {
        name: "Customer Feedback Analysis Tool",
        desc: "Build a tool that collects and analyzes customer feedback to improve service offerings and customer satisfaction.",
        spec: "Backend Software Engineer",
        payment: 4000.0,
    },
];

const freelancerBids = Array.from({ length: 10 }, (_, index) => ({
    freelancerId: null,
    bidId: null,
    deadline: new Date(
        new Date().setDate(new Date().getDate() + (index + 1) * 5)
    ),
    assigned: new Date(new Date().setDate(new Date().getDate() + (index + 1))),
}));

const seedDatabase = async () => {
    try {
        await Freelancer.deleteMany({});
        await Bid.deleteMany({});
        await FreelancerBid.deleteMany({});

        const savedFreelancers = await Freelancer.insertMany(freelancers);
        const savedBids = await Bid.insertMany(bids);

        for (let i = 0; i < freelancerBids.length; i++) {
            freelancerBids[i].freelancerId =
                savedFreelancers[i % savedFreelancers.length]._id;
            freelancerBids[i].bidId = savedBids[i % savedBids.length]._id;
        }

        await FreelancerBid.insertMany(freelancerBids);

        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};
seedDatabase();
