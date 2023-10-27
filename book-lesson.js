const app = Vue.createApp({
  data() {
    return {
      sitename: "lesson Booking App",
      //array of lesson objects
      //data properties
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
      toggleButtonText: "Checkout",
      userName: "",
      userNumber: "",
      isUserInfo: false,
      sortingOrderMessage: '',
      cartCount: 0,
      checkoutMessage: "",
     // usersCheckedOutMessage: "",
    };
  },
  methods: {
    bookLesson(lesson) {
      if (lesson.spaces > 0) {
        // Decrease the spaces count by 1 and  Update the shopping cart or perform other actions as needed
        this.cart.push(lesson);

        lesson.spaces--;
        this.cartEmpty = false;

        this.cartCount++;



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
      if (this.selectedSortOrder === 'Descending') {
        sorted.reverse();
      }

      // Populate  lessons array with the sorted results
      this.lessons = [...sorted];
    },
    toggleCart() {
      // Toggle between the lesson view andshopping cart
      this.lessonView = !this.lessonView;
      this.toggleButtonText = this.lessonView ? "Checkout" : "Back to Lessons";
      console.log("e")
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
      this.cartCount--;

    },
    //a check to see if the user info is provided
    checkUserInfo() {
      if (this.userName.trim() !== "" && this.userNumber.trim() !== "") {
        this.isUserInfo = true;
      } else  {

        this.isUserInfo = false;
      }
    },
    // reseting user info fields after checout
    // clearing input fields and cart 
    // displaying a confirmation message 
    checkout() {
      
      if (this.cart.length === 0 || !this.phoneNumberIsValid || !this.userNameIsValid) {

        return;
      }
      if (this.isUserInfo) {

        this.cart = "";
        this.cart = [];
        this.lessons.spaces;
       
        this.checkoutMessage = `Checkout successful! User: ${this.userName}, Phone: ${this.userNumber}`;
        setTimeout(() => {
          this.checkoutMessage = "";
        }, 5000);

        this.cartCount = 0;
        this.userName = "";
        this.userNumber = "";
        this.isUserInfo = false;
      

      }


    },
  

  },
  computed: {
    //  property that  returns the sorted lessons
    sortedLessons() {
      return this.lessons;
    },
    phoneNumberIsValid() {
      return /^[0-9]*$/.test(this.userNumber);
    },
    userNameIsValid(){
     return /^[A-Za-z]+$/.test(this.userName);

    },

//determine current view state
    isCheckoutView() {
      return this.lessonView && this.toggleButtonText === 'Checkout';
    },
    isBackToLessonsView() {
      return this.lessonView && this.toggleButtonText === 'Back to Lessons';
    },




  },
  watch: {
    selectedSortOrder() {
      // track changes in selectedSortOrder
      // If a valid sorting order asc or desc is selected, the sortLessons method is called
      if (["Ascending", "Descending"].includes(this.selectedSortOrder)) {
        this.sortLessons();
      }
    },
  },
});

app.mount('#app');
