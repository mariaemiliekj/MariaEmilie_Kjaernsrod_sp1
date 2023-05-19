# Reception Management dashboard - WDT

The WeDeliverTECH™ Reception Management web app is designed to assist the company in efficiently managing staff members out-in-office logging and tracking deliveries. The application primarily targets receptionists who need to monitor staff presence and coordinate deliveries for optimal customer service.

Table of Contents:

1. Description
2. Screenshots
3. File Structure
4. Installation
5. Usage
6. Technical features
7. Technologies Used
8. Code-reference
9. Authors


## Description <a name="description"></a>
This repository contains code for a staff management and delivery scheduling system. The system is built using HTML, CSS, and JavaScript. It allows users to manage staff members and schedule deliveries. 

## Screenshots

![App Screenshot](https://i.ibb.co/D96tHrB/Picture.png)
![App Screenshot](https://i.ibb.co/ynPMtM2/dur.png)


## Installation
-	Download the project zip file from the git repository. 
-	Unzip the file to an optional location on disc
-	Create website on webserver with site root pointing to the unzipped file location.


## Technologies Used
-	Bootstrap
-	Jquery
-	Javascript
-	Font awesome


## File Structure
It is important not to move the files without editing the href in the index.html head. This can cause the files to not work properly. 
- The CSS file, wdt_app.css, is located within the "css" folder.
- The JavaScript file, "wdt_app.js," is located within the "js" folder.
- The logo file is located within the "Photo" folder.
- The HTML files are located outside of any specific folders.


## Usage
How to use this web application:

-	In the navigation bar, you can choose which site you want to be on: dashboard, inventory, or orders. The sub-categories include search, add, and remove. (As of now, the pages other than the dashboard are not available).
-	In the Reception Management Dashboard, you can select a person and click the "In" button to indicate that they are inside the office. Similarly, you can click the "Out" button to indicate that they are outside the office. Note that when you click the "Out" button for a person, you need to enter the duration they will be gone. It will then calculate when the staff member should return.
-	If the staff member does not return by the set time, you will receive a notification that the specific staff member is late. You can choose to send them a pre-made email to inform them about their lateness. After that, you can click them "In," exit the toast, or click the email button and the notification will disappear.
-	Please note that clicking the "In" or "Out" button without selecting any staff member will result in an error.
-	In the Schedule Delivery table, you can enter the delivery driver's information to mark them as "Out" on a delivery. The vehicle type should be either "car" or "motorcycle" (capitalization does not matter). Their name and surname should contain letters only, and the telephone number should contain only numbers. The return time must be a valid time. You can add them by clicking the "Add" button.
-	Once one or more persons has been added, you can choose to delete their row if they have returned. You will then receive a notification asking if you are sure. You can clear more than one row at a time.
-	If a delivery driver is not back by the return time, you will receive a notification informing you that they are late. You can close this notification without clearing their row.


## Technical features 
This web application cotains 4 main features: 
**1.	Clock Function:**
-	This section defines a clock function (updateTime) that updates the content of an HTML element with the current date and time.
-	It uses the setInterval function to repeatedly call the updateTime function every second, ensuring that the displayed time is continuously updated.
-	The current date and time are obtained using the Date object, and the elements of the date (day, month, year) and time (hours, minutes, seconds) are extracted and formatted into a string.
-	The formatted time string is then set as the text content of an HTML element with the ID "clock".

**2.	Scroll Button:**
-	This section adds a scroll-to-top button to a web page.
-	The button is initially hidden and becomes visible when the user scrolls down the page.
-	It uses the window.onscroll event to check the scroll position, and based on that, changes the display style of the button element to either "block" or "none".
-	When the button is clicked, it triggers a scroll event that scrolls the page to the top (document.documentElement.scrollTop = 0).

**3.	Reception Management Dashboard Staff:**
-	This section defines classes (Employee and StaffMember) and functions related to managing staff members in a reception management dashboard.
-	The Employee class represents a general employee with a name and surname, while the StaffMember class extends Employee and adds additional properties such as picture, email, status, out time, duration, and expected return time.
-	The StaffMember class also includes a method (staffMemberIsLate) to check if a staff member is late based on their expected return time.
-	The checkStaffMembersExpectedReturnTime function is called repeatedly using setInterval and checks if any staff members are late. If a staff member is late, it displays a toast notification with their information and provides an action button to send an email.
-	The loadStaff function uses the Fetch API to retrieve random user data (name, picture, email) from the Random User API and creates StaffMember instances with the obtained data. The staff members are stored in an array and displayed in a table on the web page.

**4.	Staff Out/In:**
-	These sections provide functionality to mark selected staff members as "Out" or "In" in the reception management dashboard.
-	The staffOut function is called when the "Staff Out" button is clicked. It first checks if any staff members are selected, and if not, displays a dialog box informing the user to select at least one staff member. If staff members is selected, it prompts the user to enter a duration in minuts.
-	The staffIn function is called when the "Staff In" button is clicked. It checks if any staff members are selected and updates their status, out time, duration, and expected return time accordingly.

**5.	Schedule Delivery:**
•	The provided code block offers functionality for scheduling deliveries for drivers and exhibiting the schedule in an easily readable table format.
•	The addDelivery function triggers when the "Add Delivery" button is clicked. It captures the entered delivery details (vehicle type, name, surname, telephone numbers, address, estimated return time) from input fields, validates these details, and adds a new row to the delivery table accordingly.
•	The clearFunction removes selected rows from the table, upon user confirmation. If no row is selected, a dialog box will inform the user to make a selection.
•	For late deliveries, a toast notification will appear notifying the user. This is achieved by the checkDeliveryDriversExpectedReturnTime function, which checks if the driver's estimated return time has passed.



## Code-reference

- Description: Differents snippets for the clock function. 
- Author: SheCodes Athena
- Date: 25.04.23
- URL: https://www.shecodes.io/athena_requests?page=2&tag=Date
```javascript
const updateTime = () => {
    const now = new Date();
    const dayOfMonth = now.getDate();
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthOfYear = monthsOfYear[now.getMonth()];
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const formattedTime = `${dayOfMonth} ${monthOfYear} ${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('clock').textContent = formattedTime;
  };
  
  setInterval(updateTime, 1000);
```



- Description: Scroll button, inspiration
- Author: w3schools
- Date: 26.04.23
- URL: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
```javascript
let scrollbutton = document.getElementById("goTop");

window.onscroll = function() {
  scrollbutton.style.display = (document.documentElement.scrollTop > 20) ? "block" : "none";
};

scrollbutton.addEventListener("click", function() {
  document.documentElement.scrollTop = 0;
});
```

- Description:
- Author: 
-  Date: 27.04.23
- URL create element: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
- URL create element: https://www.w3schools.com/jsref/met_document_createelement.asp
- URL EventListener: https://www.w3schools.com/jsref/met_document_addeventlistener.asp
```javascript
 const dialogContainer = document.createElement("div");
    dialogContainer.classList.add("dialog-container");

    const dialogBox = document.createElement("div");
    dialogBox.classList.add("dialog-box");
    dialogContainer.appendChild(dialogBox);

    const dialogText = document.createElement("p");
    dialogText.innerText = "Please select at least one staff member.";
    dialogBox.appendChild(dialogText);

    const confirmButton = document.createElement("button");
    confirmButton.innerText = "OK";
    confirmButton.classList.add("dialog-button", "ok-button");
    dialogBox.appendChild(confirmButton);

    // Append the dialog box to the body
    document.body.appendChild(dialogContainer);

    confirmButton.addEventListener("click", () => {
      dialogContainer.remove();
    });
```

- Description: add rounded corners, a border around the table, a border to the right of all but the last column, and a border to the bottom of all but the last row.
- Author: unused-css
- Date: 28.04.23
- URL: https://unused-css.com/blog/css-rounded-table-corners/
```css
/* 

*/

table.rounded-corners {
  border-spacing: 0;
  border-collapse: separate;
  border-radius: 10px;
  border: thin solid #212529;
}

/* Apply a border to the right of all but the last column */
table.rounded-corners th:not(:last-child),
table.rounded-corners td:not(:last-child) {
  border-right: thin solid #212529;
}

/* Apply a border to the bottom of all but the last row */
table.rounded-corners>thead>tr>th,
table.rounded-corners>thead>tr:not(:last-child)>td,
table.rounded-corners>tbody>tr:not(:last-child)>th,
table.rounded-corners>tbody>tr:not(:last-child)>td,
table.rounded-corners>tfoot>tr:not(:last-child)>th,
table.rounded-corners>tfoot>tr:not(:last-child)>td,
table.rounded-corners>tr:not(:last-child)>td,
table.rounded-corners>tr:not(:last-child)>th,
table.rounded-corners>thead:not(:last-child),
table.rounded-corners>tbody:not(:last-child),
table.rounded-corners>tfoot:not(:last-child) {
  border-bottom: thin solid #212529;
}
```

## Authors

- [@mariaemiliekj](https://github.com/mariaemiliekj)

![Logo](https://i.ibb.co/ph1ZZL5/Logo-WDT-b.png)
