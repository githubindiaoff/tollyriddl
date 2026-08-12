import ntrImage from "./assets/ntr.jpg";
import rajamouliImage from "./assets/rajamouli.jpg";
import prabhasImage from "./assets/prabhas.jpg";
import maheshImage from "./assets/maheshbabu.jpg";
import srvImage from "./assets/srv.jpg";
import vdkImage from "./assets/vdk.jpg";
import puriImage from "./assets/puri.jpg";

const movies = [
  {
    title: "Baahubali: The Beginning",
    year: 2015,
    genre: "Action",
    hero: "Prabhas",
    heroImage: prabhasImage,
    director: "S. S. Rajamouli",
    directorImage: rajamouliImage,
    musicDirector: "M. M. Keeravani"
  },

  {
    title: "Pokiri",
    year: 2006,
    genre: "Action",
    hero: "Mahesh Babu",
    heroImage: maheshImage,
    director: "Puri Jagannadh",
    directorImage: puriImage,
    musicDirector: "Mani Sharma"
  },

  {
  title: "RRR",
  year: 2022,
  genre: "Action",
  hero: "N. T. Rama Rao Jr.",
  heroImage: ntrImage,
  director: "S. S. Rajamouli",
  directorImage: rajamouliImage,
  musicDirector: "M. M. Keeravani"
},

  {
    title: "Arjun Reddy",
    year: 2017,
    genre: "Drama",
    hero: "Vijay Deverakonda",
    heroImage: vdkImage,
    director: "Sandeep Reddy Vanga",
    directorImage: srvImage,
    musicDirector: "Radhan"
  }
];

export default movies;