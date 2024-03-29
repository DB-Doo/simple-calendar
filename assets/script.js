// display current day
$("#currentDay").text(dayjs().format("dddd, MMMM D"));

// create the timeblocks
function makeTimeBlocks() {
  // get current hour
  let currentHour = dayjs().hour();

  // loop to create a time block for each hour from 9 AM to 5 PM
  for (let hour = 9; hour <= 17; hour++) {
    // create div for the timeblock. add "time-block"" class for later styling
    let timeBlock = $("<div>").addClass("time-block");

    // add classes to hours to distinguish between past, present, future
    if (hour < currentHour) {
      timeBlock.addClass("past");
    } else if (hour === currentHour) {
      timeBlock.addClass("present");
    } else {
      timeBlock.addClass("future");
    }

    // Use Day.js to format the hour in 12-hour format with AM/PM
    let formattedHour = dayjs().hour(hour).format("h A");
    // create span for diplaying hour. add class "hour" for later styling
    let hourLabel = $("<span>").addClass("hour").text(formattedHour);
    // create input field for the events. added class 'event-input'. sets attributes to handle text inputs. assigns unique ids
    let eventInput = $("<input>")
      .addClass("event-input")
      .attr("type", "text")
      .attr("id", `event-${hour}`);
    // create a save button. add 'save-btn' class. set a data attribute to store the hour
    let saveButton = $("<button>")
      .addClass("save-btn")
      .attr("data-hour", hour)
      .text("Save");
    // create clear button to quickly cleaer the input fields
    let clearButton = $("<button>").addClass("clear-btn").text("X");

    //append this data to the timeblock
    timeBlock.append(hourLabel, eventInput, saveButton, clearButton);
    // append complete timeblock to the "planner" div in html
    $("#planner").append(timeBlock);

// clear button functionaliity
    clearButton.on("click", function () {
      // find the sibling input field of the clicked clear button
      let inputField = $(this).siblings(".event-input");
      // clear any value of the input field
      inputField.val("");
      // also remove the item from localstorage
      let hour = inputField.attr("id").split("-")[1];
      localStorage.removeItem(`event-${hour}`);
    });

    // load and display saved data in correct field if it exists
    let savedEvent = localStorage.getItem(`event-${hour}`);
    if (savedEvent) {
      eventInput.val(savedEvent);
    }

    // save event. click listener on save button
    saveButton.on("click", function () {
      // retrieve hour from the data attribute of the button
      let hour = $(this).data("hour");
      // get value from the input field corresponding to this hour
      let eventText = $(`#event-${hour}`).val();
      // use hour as key to save input field data to local storage
      localStorage.setItem(`event-${hour}`, eventText); // save to localStorage
    });
  }
}

// call fuction to create initial timeblocks
makeTimeBlocks();
