const app = Vue.createApp({
  data() {
    return {
      sitename: "lesson Booking App",
      //array of lesson objects
      //data properties
      lessons: [],
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
      searchText: "",
      searchedItems: [],
      searchActive: false,
    };
  },
  //fetch promise to call data from express middleware
  created: function () {
    fetch("http://localhost:3000/collections/products").then((res) => {
      res.json().then((json) => {
        this.lessons = json; 
      });
    });
  },
  methods: {

    //method to insert lesson into cart
    bookLesson(lesson) {
      if (lesson.spaces > 0) {
        // Decrease the spaces count by 1 and  Updates the shopping cart
        // clearing search box
        this.cart.push(lesson);

        lesson.spaces--;
        this.cartEmpty = false;

        this.cartCount++;
        this.searchText = '';
        this.searchedItems = [];
        this.searchActive = false;




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
        // Sorting numerically by price or spaces
        sorted.sort((a, b) => parseFloat(a[this.selectedSort]) - parseFloat(b[this.selectedSort]));
      }

      // Checking the selected sorting order (asc or desc) and reverse the array if needed
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
    // removing cart item and increasing the available space when cart item is removed from the cart
    removeFromCart(index) {
      const removedLesson = this.cart[index];
      this.cart.splice(index, 1);
      removedLesson.spaces += 1;
      // Check to see if the cart is empty after removing an item
      if (this.cart.length === 0) {
        this.cartEmpty = true;
      }
      this.cartCount--;

    },
    //a check to see if the user info is provided
    checkUserInfo() {
      if (this.userName.trim() !== "" && this.userNumber.trim() !== "") {
        this.isUserInfo = true;
      } else {

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
    //  property that returns the sorted lessons
    sortedLessons() {
      return this.lessons;
    },
    phoneNumberIsValid() {
      return /^[0-9]*$/.test(this.userNumber);
    },
    userNameIsValid() {
      return /^[A-Za-z]+$/.test(this.userName);

    },

    //determine current view state
    isCheckoutView() {
      return this.lessonView && this.toggleButtonText === 'Checkout';
    },
    isBackToLessonsView() {
      return this.lessonView && this.toggleButtonText === 'Back to Lessons';
    },
    searchFunction() {
      const searchText = this.searchText.toLowerCase().trim();
      if (searchText === '') {
        this.searchedItems = [];
        this.searchActive = false;
      } else {
        let searched = this.lessons.filter((item) => {
          return (
            item.subject.toLowerCase().includes(searchText) ||
            item.location.toLowerCase().includes(searchText)
          );
        });

        this.searchedItems = searched;
        this.searchActive = true;
        // this.lessonView = false;
      }
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
