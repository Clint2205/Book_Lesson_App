const app = Vue.createApp({
  data() {
    return {
      //array of lesson objects
      lessons: [
        { subject: "Mathematics", location: "Manchester", price: "£80", spaces: "5", icon: "fa-calculator" },
        { subject: "English", location: "London", price: "£100", spaces: "5", icon: "fa-book" },
        { subject: "Drama", location: "London", price: "£90", spaces: "5", icon: "fa-theater-masks" },
        { subject: "Science", location: "Bristol", price: "£70", spaces: "5", icon: "fa-flask" },
        { subject: "English", location: "Birmingham", price: "£120", spaces: "5", icon: "fa-book" },
        { subject: "Music", location: "Nottingham", price: "£110", spaces: "5", icon: "fa-music" },
        { subject: "History", location: "Liverpool", price: "£90", spaces: "5", icon: "fa-history" },
        { subject: "Chess", location: "Leeds", price: "£90", spaces: "5", icon: "fa-chess" },
        { subject: "English", location: "Coventry", price: "£100", spaces: "5", icon: "fa-book" },
        { subject: "History", location: "Liverpool", price: "£90", spaces: "5", icon: "fa-history" },
        { subject: "Drama", location: "London", price: "£90", spaces: "5", icon: "fa-theater-masks" },
        { subject: "English", location: "London", price: "£100", spaces: "5", icon: "fa-book" },
      ],
      bookings: [],
      //store slections temporarily
      selectedSort: "", 
    };
  },
  methods: {
    bookLesson(lesson) {
      //populate the bookins array with lesson properties 
      this.bookings.push(`Booked ${lesson.subject} for ${lesson.price}`);
      console.log(this.bookings)
    },
    handleEvent() {
      console.log("event")

    },
  },
  //automatically update when selecteddort changes
  computed: {
    sortedLessons() {
      
    },
},

});

app.mount('#app');
