const app = Vue.createApp({
  data() {
    return {
      //array of lesson objects
      lessons: [
        { subject: "Mathematics", location: "Manchester", price: 80, spaces: 5, cart: 0, icon: "fa-calculator" },
        { subject: "English", location: "London", price: 100, spaces: 5, cart: 0, icon: "fa-book" },
        { subject: "Drama", location: "London", price: 90, spaces: 5, cart: 0, icon: "fa-theater-masks" },
        { subject: "Science", location: "Bristol", price: 70, spaces: 5, cart: 0, icon: "fa-flask" },
        { subject: "English", location: "Birmingham", price: 120, spaces: 5, cart: 0, icon: "fa-book" },
        { subject: "Music", location: "Nottingham", price: 110, spaces: 5, cart: 0, icon: "fa-music" },
        { subject: "History", location: "Liverpool", price: 90, spaces: 5, cart: 0, icon: "fa-history" },
        { subject: "Chess", location: "Leeds", price: 90, spaces: 5, cart: 0, icon: "fa-chess" },
        { subject: "English", location: "Coventry", price: 100, spaces: 5, cart: 0, icon: "fa-book" },
        { subject: "History", location: "Liverpool", price: 90, spaces: 5, cart: 0, icon: "fa-history" },
        { subject: "Drama", location: "London", price: 90, spaces: 5, cart: 0, icon: "fa-theater-masks" },
        { subject: "English", location: "London", price: 100, spaces: 5, cart: 0, icon: "fa-book" },
      ],
      //store slections temporarily
      selectedSort: "",
      selectedSortOrder: '',
      cartEmpty: true,
      // Track the current view cart or lesson
      lessonView: true,
      cart: [],
      toggleButtonText: "View Cart", 
    };
  },
  methods: {
    bookLesson(lesson) {
      if (lesson.spaces > 0) {
        // Decrease the spaces count by 1 and  Update the shopping cart or perform other actions as needed
       this.cart.push(lesson);   
        lesson.spaces--; 
        this.cartEmpty = false;
       
        
      }
    },
    sortLessons() {
      //  copy of lessons  array
      let sorted = [...this.lessons];

      // Conditionally checking the selected sorting criteria 
      if (this.selectedSort === 'subject' || this.selectedSort === 'location') {
        // Sorting alphabetically by subject or location 
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
    toggleCart() {
      // Toggle between the lesson view andshopping cart
     this.lessonView = !this.lessonView;
     this.toggleButtonText = this.lessonView ? "View Cart" : "Back to Lessons";
      console.log("eeeee")
  },
  // Increase the available space when cart item is removed from the cart
  removeFromCart(index) {
    const removedLesson = this.cart[index];
    this.cart.splice(index, 1); 
    removedLesson.spaces += 1; 
    // Check if the cart is empty after removing an item
  if (this.cart.length === 0) {
    this.cartEmpty = true;
  }
    
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
