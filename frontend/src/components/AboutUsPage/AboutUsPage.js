import './AboutUsPage.css'
import {useEffect, useRef, useState} from "react";
import testPhoto from '../../assets/images/test.jpg';
import DominikPhoto from '../../assets/images/Dominik.png';
import emailjs from '@emailjs/browser';

const arrayOfOwners = [
    {
        id: 1,
        name: "Dominik Mrozik",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        photo: DominikPhoto
    },
    {
        id: 2,
        name: "Kamil Sadłocha",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        photo: testPhoto
    },
    {
        id: 3,
        name: "Ignacy Gąsiorowski",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        photo: testPhoto
    },
    {
        id: 4,
        name: "Michał Jeleniewski",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        photo: testPhoto
    },
    {
        id: 5,
        name: "Jakub Szczygieł",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        photo: testPhoto
    }
]

function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function AboutUsPage() {
    const [creators, setCreators] = useState(shuffleArray(arrayOfOwners));

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_548nzhb',
            'template_3romkvl',
            form.current,
            'EwwxewBKhlUdLB4B5')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    useEffect(() => {
        const handleScroll = () => {
            creators.forEach((creator) => {
                const element = document.getElementById(creator.id.toString());
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    element.classList.add('visible');
                } else {
                    element.classList.remove('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [creators]);

    return (
        <div className="about-us-page">
            <div className="title-section">
                <h1>About GoMove</h1>
                <p>GoMove is an innovative project that inspires people to actively spend time outdoors in groups.
                    Our
                    platform makes it easy to organize sports and recreational meetings with friends and individuals
                    who
                    share similar interests. Whether you're into jogging, cycling, or any other outdoor activity,
                    GoMove is the place that helps you find company for shared outdoor adventures. Join us today and
                    embrace an active lifestyle together with friends!
                </p>
            </div>
            <hr/>
            <div className="creators">
                {creators.map((creator) => (
                    <div className="creator" id={creator.id} key={creator.id}>
                        <div className="img">
                            <img src={creator.photo} alt="ourPhoto"/>
                        </div>
                        <div className="content">
                            <div className="link">
                                <h1>{creator.name}</h1>
                                <p>{creator.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <hr/>
            <div className="contact">
                <div className="contact-container">
                    <div className="title">
                        <p>Contact</p>
                        <p>Submit the form below to get in touch with Us!</p>
                    </div>
                    <div className="message">
                        <form ref={form} onSubmit={sendEmail}>
                            <label>Name</label>
                            <input type="text" name="user_name"/>
                            <label>Email</label>
                            <input type="email" name="user_email"/>
                            <label>Message</label>
                            <textarea name="message"/>
                            <input className="contact-btn" type="submit" value="Send"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default AboutUsPage;