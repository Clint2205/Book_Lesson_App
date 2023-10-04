const app = Vue.createApp({
  data() {
    return {
      //array of lesson objects
      lessons: [
        { subject: "Mathematics", location: "Manchester", price: 80, spaces: 5, icon: "fa-calculator" },
        { subject: "English", location: "London", price: 100, spaces: 5, icon: "fa-book" },
        { subject: "Drama", location: "London", price: 90, spaces: 5, icon: "fa-theater-masks" },
        { subject: "Science", location: "Bristol", price: 70, spaces: 5, icon: "fa-flask" },
        { subject: "English", location: "Birmingham", price: 120, spaces: 5, icon: "fa-book" },
        { subject: "Music", location: "Nottingham", price: 110, spaces: 5, icon: "fa-music" },
        { subject: "History", location: "Liverpool", price: 90, spaces: 5, icon: "fa-history" },
        { subject: "Chess", location: "Leeds", price: 90, spaces: 5, icon: "fa-chess" },
        { subject: "English", location: "Coventry", price: 100, spaces: 5, icon: "fa-book" },
        { subject: "History", location: "Liverpool", price: 90, spaces: 5, icon: "fa-history" },
        { subject: "Drama", location: "London", price: 90, spaces: 5, icon: "fa-theater-masks" },
        { subject: "English", location: "London", price: 100, spaces: 5, icon: "fa-book" },
      ],
      bookings: [],
      //store slections temporarily
      selectedSort: "",
      selectedSortOrder: '',
    };
  },
  methods: {
    bookLesson(lesson) {
      // Pushing the booked lesson to the bookings array
      this.bookings.push(`Booked ${lesson.subject} for ${lesson.price}`);
      console.log(this.bookings);
    },
    sortLessons() {
      //  copy of lessons  array
      let sorted = [...this.lessons];

      // Conditionally checking the selected sorting criteria 
      if (this.selectedSort === 'subject' || this.selectedSort === 'location') {
        // Sort alphabetically by subject or location 
        sorted.sort((a, b) => {
          const aValue = a[this.selectedSort].toLowerCase();
          const bValue = b[this.selectedSort].toLowerCase();
          return aValue.localeCompare(bValue);
        });
      } else if (this.selectedSort === 'price' || this.selectedSort === 'spaces') {
        // Sort numerically by price or spaces
        sorted.sort((a, b) => parseFloat(a[this.selectedSort]) - parseFloat(b[this.selectedSort]));
      }

      // Check the selected sorting order (asc or desc) and reverse the array if needed
      if (this.selectedSortOrder === 'desc') {
        sorted.reverse();
      }

      // Populate  lessons array with the sorted results
      this.lessons = [...sorted];
    },
  },
  computed: {
    // Computed property to return the sorted lessons
    sortedLessons() {
      return this.lessons;
    },
  },
  watch: {
    selectedSortOrder() {
      // track changes in selectedSortOrder
      // If a valid sorting order asc or desc is selected, the sortLessons method is called
      if (["asc", "desc"].includes(this.selectedSortOrder)) {
        this.sortLessons();
      }
    },
  },
});

app.mount('#app');
