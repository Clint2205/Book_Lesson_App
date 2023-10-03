const app = Vue.createApp({
    data() {
      return {
        lessons: [
            { subject: " Mathematics", location: "Manchester", price: "£80", spaces: "5", icon: "fa-calculator" },
          { subject: " English", location: "London", price: "£100",spaces: "5",icon:""},
          { subject: " Science", location: "Bristol", price: "£70",spaces: "5",icon:""},
          { subject: " English", location: "Birmingham", price: "£120",spaces: "5",icon:""},
          { subject: " Music", location: "Nottingham", price: "£110",spaces: "5",icon:""},
          { subject: " Chess", location: "Leeds", price: "£90",spaces: "5",icon:""},
          { subject: " English", location: "Coventry", price: "£100",spaces: "5",icon:""},
          { subject: "History", location: "Liverpool", price: "£90",spaces: "5",icon:""},
          { subject: " Drama", location: "London", price: "£90",spaces: "5",icon:""},

        ],
        bookings: [],
      };
    },
    methods: {
      bookActivity(lesson) {
        this.bookings.push(`Booked ${lesson.subject} for ${lesson.price}`);
        console.log(bookings)
      },
    },
  });
  
  app.mount('#app');
  