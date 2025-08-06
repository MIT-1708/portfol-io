//togle icon 
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

//scroll 
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - (window.innerHeight * 0.75);
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                let matchingLink = document.querySelector(`header nav a[href*='${id}']`);
                if (matchingLink) {
                    matchingLink.classList.add('active');
                }
            });

            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });

    // sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon
    if (window.scrollY > 100) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }

    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

//Email Settings

const form = document.querySelector("form");
const fullName= document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");


function sendEmail(){
    // Add form validation
    if (!fullName.value || !email.value || !phone.value || !subject.value || !message.value) {
        Swal.fire({
            title: "Error!",
            text: "Please fill in all fields",
            icon: "error"
        });
        return;
    }

    // Add email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        Swal.fire({
            title: "Error!",
            text: "Please enter a valid email address",
            icon: "error"
        });
        return;
    }

    const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}
    <br> Phone Number: ${phone.value}<br> Message: ${message.value}`;

    Email.send({
        SecureToken: "c63f35e8-b886-4a3c-9c62-27e0a38b1b5f",
        To : 'karakusataberkay@gmail.com',
        From : "karakusataberkay@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
        message => {
            if(message == "OK"){
                Swal.fire({
                    title: "Success!",
                    text: "Your message has been sent successfully!",
                    icon: "success"
                });
                // Clear form after successful submission
                form.reset();
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong. Please try again.",
                    icon: "error"
                });
            }
        }
    ).catch(error => {
        Swal.fire({
            title: "Error!",
            text: "Failed to send message. Please try again.",
            icon: "error"
        });
    });
}

form.addEventListener("submit",(e) => {
    e.preventDefault();
    sendEmail();
});

document.addEventListener('DOMContentLoaded', () => {
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        }
    });

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        });
    });
});