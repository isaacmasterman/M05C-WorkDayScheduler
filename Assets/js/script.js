// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // click event listener for each save button
  $(".saveBtn").on("click", function() {

    // Associated time block's hour from ID
    let blockHour = $(this).parent().attr("id").split("-")[1];

    // Event text from the associated textarea
    let eventText = $(this).siblings("textarea").val();

    // Save the event to local storage
    localStorage.setItem(blockHour, eventText);

    // Check if the notification already exists
    if (!$("#notification").length) {
      // Create the notification element
      let notification = $('<div id="notification">Appointment Added to local storage <i class="fas fa-check"></i></div>');
  
      // Prepend it to the container-fluid
      $(".container-fluid").prepend(notification);
    }

    // Show the notification
    $("#notification").slideDown(300).delay(3000).slideUp(300);

  });

  // Current hour
  let currentHour = dayjs().hour();
  console.log(currentHour);


  // Loop through each time block
  $(".time-block").each(function() {
    // Extract the hour from the time block's id
    let blockHour = parseInt($(this).attr("id").split("-")[1]);

    // Compare the block hour to the current hour and add the appropriate class
    if (blockHour < currentHour) {
        $(this).addClass("past");
    } else if (blockHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
    } else {
        $(this).removeClass("past");
        $(this).addClass("future");
    }
  });

  // Loop through each time block
  $(".time-block").each(function() {
    // Extract the hour from the time block's id
    let blockHour = $(this).attr("id").split("-")[1];

    // Get the saved event for this hour from local storage
    let savedEvent = localStorage.getItem(blockHour);

    // If there's a saved event for this hour, set the value of the textarea to the saved event
    if (savedEvent) {
      $(this).find("textarea").val(savedEvent);
    }
  });
  //
  // TODO: Add code to display the current date in the header of the page.
  let currentDate = dayjs().format('MMMM D, YYYY');
  $("#currentDay").text(currentDate);
});
