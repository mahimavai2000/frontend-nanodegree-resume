/*
This is empty on purpose! Your code to build the resume will go here.

Quiz exercises
$("#main").append("UmaMaheswari");
 var awesomeThoughts="I am Uma and I am awesome!";
 console.log(awesomeThoughts);
 var funThoughts=awesomeThoughts.replace("awesome","FUN");
 $("#main").append(funThoughts);

 */
var bio = {
    "name": "UmaMaheswari",
    "role": "Web Developer",
    "contacts": {
        "mobile": "914-806-1003",
        "email": "mahima@gmail.com",
        "github": "mahimavai2000",
        "twitter": "mahima",
        "location": "New York"
    },
    "welcomeMessage": "Welcome to my Resume",
    "skills": ["HTML", "CSS", "Java Script", "SQL server 2008"],
    "biopic": "images/images.jpg",
    "objective": "To gain confidence and fame using my potential in the field of “Web Development”, and express my innovative creative skills for self and company growth.Looking to secure an entry level Web UI Developer position with Udacity that will allow for the use of excellent user experience, technical and communication skills."
};

bio.display = function() {

    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
    var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
    var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
    var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
    var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
    var formattedWelcomemsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
    var formattedBiopic = HTMLbioPic.replace("%data%", bio.biopic);
    var formattedObjective = HTMLObjective.replace("%data%", bio.objective);

    $("#header").prepend(formattedRole);
    $("#header").prepend(formattedName);
    $("#topContacts,#footerContacts").append(formattedMobile, formattedEmail, formattedGithub, formattedTwitter, formattedLocation);
    $("#header").append(formattedBiopic, formattedWelcomemsg);
    if (bio.skills.length > 0) {
        $("#header").append(HTMLskillsStart);
        for (var i = 0; i < bio.skills.length; i++) {
            var formattedSkills = HTMLskills.replace("%data%", bio.skills[i]);
            $("#header").append(formattedSkills);
        }
    }
    $("#header").append(HTMLobjectiveStart, formattedObjective);
};

var education = {
    "schools": [{
        "name": "Holy Angels School",
        "location": "Salem, Tamilnadu, India",
        "degree": "Secondary School Education",
        "majors": ["Computer Science", "Physics", "Chemistry", "Mathematics"],
        "dates": "1998",
        "url": "http://example.com"
    }, {
        "name": "Golden Gates School",
        "location": "Chennai, Tamilnadu, India",
        "degree": "Higher Secondary Education",
        "majors": ["Computer Science", "Physics", "Chemistry", "Mathematics"],
        "dates": "1998-2000",
        "url": "http://example.com"
    }, {
        "name": "Sarada College",
        "location": "Salem, Tamilnadu, India",
        "degree": "Bachelor of Science",
        "majors": ["Computer Science", "Statistics", "Mathematics"],
        "dates": "2000-2003",
        "url": "http://example.com"
    }, {
        "name": "Vysya College",
        "location": "Chennai, Tamilnadu, India",
        "degree": "Masters of Science",
        "majors": ["Computer Science", "Statistics", "Apllied Sciences", "Mathematics"],
        "dates": "2003-2005",
        "url": "http://example.com"
    }],

    "onlineCourses": [{
        "title": "Front End Development",
        "school": "Udacity",
        "dates": "2017",
        "url": "https://www.udacity.com/"
    }, {
        "title": "Java Script",
        "school": "Udacity",
        "dates": "2016",
        "url": "https://www.udacity.com/"
    }, {
        "title": "HTML/CSS",
        "school": "Udacity",
        "dates": "2015",
        "url": "https://www.udacity.com/"
    }]

};
education.display = function() {
    $("#education:last").append(HTMLschoolStart);
    for (var i = 0; i < education.schools.length; i++) {
        var formattedSchoolName = HTMLschoolName.replace("%data%", education.schools[i].name);
        var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", education.schools[i].degree);
        var formattedSchoolNameDegree = formattedSchoolName + formattedSchoolDegree;
        var formattedSchoolDates = HTMLschoolDates.replace("%data%", education.schools[i].dates);
        var formattedSchoolLocation = HTMLschoolLocation.replace("%data%", education.schools[i].location);

        $(".education-entry:last").append(formattedSchoolNameDegree, formattedSchoolDates, formattedSchoolLocation);
        if (education.schools[i].majors.length > 0) {
            for (var j = 0; j < education.schools[i].majors.length; j++) {
                var formattedSchoolMajor = HTMLschoolMajor.replace("%data%", education.schools[i].majors[j]);
                $(".education-entry:last").append(formattedSchoolMajor);
            }
        }
    }
    if (education.onlineCourses.length > 0) {
        $(".education-entry").append(HTMLonlineClasses);
        for (var k = 0; k < education.onlineCourses.length; k++) {
            var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[k].title);
            var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[k].school);
            var formattedOnlineTitleSchool = formattedOnlineTitle + formattedOnlineSchool;
            var formattedOnlineDates = HTMLonlineDates.replace("%data%", education.onlineCourses[k].dates);
            var formattedOnlineURL = HTMLonlineURL.replace("%data%", education.onlineCourses[k].url);

            $(".education-entry").append(formattedOnlineTitleSchool, formattedOnlineDates, formattedOnlineURL);
        }
    }

};

var work = {
    "jobs": [{
        "employer": "Solverminds Solutions & Technologies Pvt Ltd",
        "title": "Software Test Engineer",
        "location": "Chennai, Tamilnadu, India",
        "dates": "From May 08’ to Sep 11’",
        "description": "Solverminds is a software and analytics solution company specializing in providing enterprise application and analytical solutions for maritime transport. Since its inception in September 2003, the company has been in the forefront of delivering innovative solutions to its customers globally. The various accolades the company received over the past years are testimony of its achievements."
    }, {
        "employer": "Oracle India Pvt Ltd",
        "title": "Senior QA Consultant",
        "location": "Hyderabad, Andhra Pradesh, India",
        "dates": "From Sep 12’ to Sep 15’",
        "description": "Through our acquisition activities, Oracle seeks to strengthen its product offerings, accelerate innovation, meet customer demand more rapidly, and expand partner opportunities. An integral part of Oracle's Mergers and Acquisitions philosophy is our consistent commitment to customer service and product support while achieving our financial return objectives and creating value for our shareholders."
    }]
};
work.display = function() {
    $("#workExperience").append(HTMLworkStart);
    for (var i = 0; i < work.jobs.length; i++) {
        var formattedWorkEmployer = HTMLworkEmployer.replace("%data%", work.jobs[i].employer);
        var formattedWorkTitle = HTMLworkTitle.replace("%data%", work.jobs[i].title);
        var formattedEmployerTitle = formattedWorkEmployer + formattedWorkTitle;
        var formattedWorkDates = HTMLworkDates.replace("%data%", work.jobs[i].dates);
        var formattedWorkLocation = HTMLworkLocation.replace("%data%", work.jobs[i].location);
        var formattedWorkDescription = HTMLworkDescription.replace("%data%", work.jobs[i].description);

        $(".work-entry").append(formattedEmployerTitle, formattedWorkDates, formattedWorkLocation, formattedWorkDescription);
    }
};

var projects = {
    "projects": [{
        "title": "TRUST",
        "dates": "May’08 – July 10’",
        "description": "1st Phase – Vessel scheduling, 2nd Phase – Pricing and Contribution, 3rd Phase – Export, 4th Phase – Import, 5th Phase – Cost, 6th Phase – Equipment management systems More than 3000 users worldwide use this Application. By using the HTTP protocol, the application is accessible worldwide.",
        "location": "Solverminds Solutions & Technologies Pvt Ltd, Chennai",
        "images": ["images/shipping.jpg", "images/shipping1.jpg"]
    }, {
        "title": "TRUST E-Commerce",
        "dates": "Aug’10 – Sep 11’",
        "description": "The purpose of the project is to build a competitive e-commerce platform to provide online shipping functions to customers, utilizing the global TRUST system that is in the process of being implemented. TRUST will be the single source where all customer master data will exist. The focus on ecommerce will be to allow the customer to make a booking, send in his shipping instruction, approve the bill of lading and view his invoices and statements. E-commerce will also provide online shipment progress facilities. The system will cater to the needs of the Import cycle. It will assist in the preparation of all the import documentation, invoices and the receipt of payments.",
        "location": "Solverminds Solutions & Technologies Pvt Ltd, Chennai",
        "images": ["images/ecom.jpg", "images/ecom1.jpg"]
    }, {
        "title": "InForm",
        "dates": "Sep’12 – Sep 14’",
        "description": "The project involves Clinical Trial development/customization activities in InForm™ base products such as InForm Architect, Oracle 9i, and InForm Database.Develops and Markets data collection and management solutions that enables bio-Pharmaceutical companies, medical device companies, CROs and AROs to integrate and automate the management of their entire clinical development process. EDC (Electronic Data Capture) called Inform delivers the comprehensive clinical trial solutions needed to track product efficacy and safety-from study initiation through FDA submission. The InForm product offers a complete set of features for streamlining data entry and Lab loading, discrepancy management and resolution, patient and site reporting, data exporting, coding and system administration. InForm is a roles-based clinical database Management system that allows users access to the areas of functionality they are permitted to use.",
        "location": "Oracle India Pvt Ltd, Hyderabad ",
        "images": ["images/health.jpg", "images/health1.jpg"]
    }, {
        "title": "InForm-Integration",
        "dates": "Oct’14 – Sep 15’",
        "description": "The project involves Clinical Trial development/customization activities in InForm™ base products such as InForm Architect, Oracle 9i, and InForm Database.Develops and Markets data collection and management solutions that enables bio-Pharmaceutical companies, medical device companies, CROs and AROs to integrate and automate the management of their entire clinical development process. EDC (Electronic Data Capture) called Inform delivers the comprehensive clinical trial solutions needed to track product efficacy and safety-from study initiation through FDA submission. The InForm product offers a complete set of features for streamlining data entry and Lab loading, discrepancy management and resolution, patient and site reporting, data exporting, coding and system administration. InForm is a roles-based clinical database Management system that allows users access to the areas of functionality they are permitted to use.",
        "location": "Oracle India Pvt Ltd, Hyderabad ",
        "images": ["images/health3.jpg", "images/health4.jpg"]
    }]
};
projects.display = function() {
    $("#projects").append(HTMLprojectStart);
    for (var i = 0; i < projects.projects.length; i++) {
        var formattedProjectTitle = HTMLprojectTitle.replace("%data%", projects.projects[i].title);
        var formattedProjectDates = HTMLprojectDates.replace("%data%", projects.projects[i].dates);
        var formattedProjectLocation = HTMLprojectLocation.replace("%data%", projects.projects[i].location);
        var formattedProjectDescription = HTMLprojectDescription.replace("%data%", projects.projects[i].description);

        $(".project-entry").append(formattedProjectTitle, formattedProjectDates, formattedProjectLocation, formattedProjectDescription);

        if (projects.projects[i].images.length > 0) {
            for (var j = 0; j < projects.projects[i].images.length; j++) {
                var formattedHTMLProjectImage = HTMLprojectImage.replace("%data%", projects.projects[i].images[j]);
                $(".project-entry").append(formattedHTMLProjectImage);

            }
        }
    }
};

bio.display();
education.display();
work.display();
projects.display();

$("#mapDiv").append(googleMap);