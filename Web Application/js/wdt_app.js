
// Description: Differents snippets for the clock function. 
// Author: SheCodes Athena
// Date: 25.04.23
// URL: https://www.shecodes.io/athena_requests?page=2&tag=Date

//clock function 
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
  


// Description: Scroll button, inspo.
// Author: w3schools
// Date: 26.04.23
// URL: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
let scrollbutton = document.getElementById("goTop");

window.onscroll = function() {
  scrollbutton.style.display = (document.documentElement.scrollTop > 20) ? "block" : "none";
};

scrollbutton.addEventListener("click", function() {
  document.documentElement.scrollTop = 0;
});



//RECEPTION MANAGMENT DASHBOARD STAFF//

// Define the Employee class
class Employee {
  constructor(name, surename) {
    this.name = name;
    this.surename = surename;
  }
}

// Define the StaffMember class that inherits from Employee
class StaffMember extends Employee {
  constructor(name, surename, picture, email, status, outTime, duration, expectedReturnTime) {
    super(name, surename);
    this.picture = picture;
    this.email = email;
    this.status = status;
    this.outTime = outTime;
    this.duration = duration;
    this.expectedReturnTime = expectedReturnTime;
    this.showtoast = true; 
  }

  staffMemberIsLate(){
    if (this.expectedReturnTime != null && this.showtoast) {
      const now = new Date();
      const expectedReturnDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), this.expectedReturnTime.substr(0, 2),this.expectedReturnTime.substr(3, 2));
      return expectedReturnDateTime.getTime() < Date.now();
    }
    else {
      return false;
    }
  }
}

function checkStaffMembersExpectedReturnTime() {
  for (let i = 0; i < staff.length; i++) {
    var staffMember = staff[i];
    if (staffMember != null && staffMember.staffMemberIsLate()){
      staffMember.showtoast = false;  
      const mailToLink = 'mailto:' + staffMember.email;
      const subject = 'Late Arrival Alert';
      const body = 'Hello ' + staffMember.name + ' ' + staffMember.surename + ',\n\nWe have been notified that you are currently late.\n\nExpected Return Time: ' + staffMember.expectedReturnTime  + '\n\nPlease let us know your status and expected time of arrival as soon as possible.\n\nBest regards,\nThe management team';
      $("#toastPicture").attr("src", staffMember.pictureUrl);
      $("#toastName").text('Name: ' + staffMember.name + ' ' + staffMember.surename);
      $("#toastDuration").text('Duration: ' + staffMember.duration);
      $("#liveToast").toast("show");
      $('#takeActionBtn').off('click').on('click', function() {
        window.location.href = mailToLink + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        $('#liveToast').toast('hide'); 
      });
    }
  }
  $('.toast').toast({ autohide: false });
}

setInterval(checkStaffMembersExpectedReturnTime, 1000);




// Adding staff members to array
let staff = [];
let selectedStaffRow = null;

const table = document.getElementById('dashboardStaff');

function staffUserGet(index){
  return $.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
  }).then(function(data) {
    const person = data.results[0];
    const pictureUrl = person.picture.thumbnail;
    const staffMember = new StaffMember(`${person.name.first}`,`${person.name.last}`,`<img src="${pictureUrl}" width= "40">`,`${person.email}`);
    staffMember.pictureUrl = pictureUrl;
    staff.push(staffMember);
    const row = table.insertRow(-1);
    row.insertCell().innerHTML = `<img src="${pictureUrl}" width= "40">`;
    row.insertCell().textContent = `${staffMember.name}`;
    row.insertCell().textContent = `${staffMember.surename}`;
    row.insertCell().textContent = `${person.email}`;
    row.insertCell().textContent =  staffMember.status;
    row.insertCell().textContent =  staffMember.outTime;
    row.insertCell().textContent =  "";
    row.insertCell().textContent =  "";
    row.onclick = function(){
      const isSelected = $(this).hasClass('selectedRow');
      $(this).toggleClass('selectedRow', !isSelected);
      if (!isSelected) {
        $(this).siblings().removeClass('selectedRow');
        selectedStaffRow = $(this).attr('id');
      } else {
        selectedStaffRow = null;
      }
    }
    row.id = index;
    return staffMember;
  });
}

async function loadStaff() {
  for (let i = 0; i < 5; i++) {
    await staffUserGet(i);
  }
 
}

loadStaff();


// Description: Creating a dialog container with javascript
// Author: 1.developer.mozilla. 2 and 3.w3schools
// Date: 27-29.04.23
// 1. URL create element: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// 2. URL create element: https://www.w3schools.com/jsref/met_document_createelement.asp
// 3. URL EventListener: https://www.w3schools.com/jsref/met_document_addeventlistener.asp

function staffOut() {
  const selectedRows = $(".selectedRow");

  if (selectedRows.length === 0) {
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

    document.body.appendChild(dialogContainer);

    confirmButton.addEventListener("click", () => {
      dialogContainer.remove();
    });

    return;
  }

  for (let i = 0; i < selectedRows.length; i++) {
    const selectedStaffRow = selectedRows[i].rowIndex - 1;
    let selectedStaff = staff[selectedStaffRow];

    const dialogContainer = document.createElement("div");
    dialogContainer.classList.add("dialog-container");

    const dialogBox = document.createElement("div");
    dialogBox.classList.add("dialog-box");
    dialogContainer.appendChild(dialogBox);

    const dialogText = document.createElement("p");
    dialogText.innerText = "Enter duration in minutes:";
    dialogBox.appendChild(dialogText);

    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.classList.add("dialog-input");
    dialogBox.appendChild(inputBox);

    const confirmButton = document.createElement("button");
    confirmButton.innerText = "OK";
    confirmButton.classList.add("dialog-button", "ok-button");
    dialogBox.appendChild(confirmButton);

    const cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.classList.add("dialog-button", "cancel-button");
    dialogBox.appendChild(cancelButton);

    document.body.appendChild(dialogContainer);

    inputBox.focus();


    confirmButton.addEventListener("click", () => {
      const input = inputBox.value.trim();

      if (!input.match(/^\d+$/)) {
        dialogText.innerText = "Please enter a valid number for duration.";
        inputBox.classList.add("dialog-input-error");
        inputBox.select();
        inputBox.focus();
        return;
      }

    const durationMinutes = parseInt(input);

    if (durationMinutes >= 60) {
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      selectedStaff.duration = hours + "hr " + minutes + "min";
    } else {
      selectedStaff.duration = durationMinutes + "min";
    }

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const expectedReturnTime = new Date(now.getTime() + durationMinutes * 60000);
    selectedStaff.outTime = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
    selectedStaff.status = 'Out';
    selectedStaff.expectedReturnTime = String(expectedReturnTime.getHours()).padStart(2, '0') + ':' + String(expectedReturnTime.getMinutes()).padStart(2, '0');

    $(selectedRows[i]).find("td:eq(4)").text(selectedStaff.status);
    $(selectedRows[i]).find("td:eq(5)").text(selectedStaff.outTime);
    $(selectedRows[i]).find("td:eq(6)").text(selectedStaff.duration);
    $(selectedRows[i]).find("td:eq(7)").text(selectedStaff.expectedReturnTime);
    $(selectedRows[i]).removeClass("selectedRow");

    dialogContainer.remove();

    });
    cancelButton.addEventListener("click", () => {
      dialogContainer.remove();
    });
  }
}



// Description: Creating a dialog container with javascript
// Author: 1.developer.mozilla. 2 and 3.w3schools
// Date: 27-29.04.23
// 1. URL create element: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// 2. URL create element: https://www.w3schools.com/jsref/met_document_createelement.asp
// 3. URL EventListener: https://www.w3schools.com/jsref/met_document_addeventlistener.asp

function staffIn() {
  const selectedRows = $(".selectedRow");

  if (selectedRows.length  === 0) {
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

    document.body.appendChild(dialogContainer);
    

   confirmButton.addEventListener("click", () => {
      dialogContainer.remove();
    });
  }

  for (let i = 0; i < selectedRows.length; i++) {
    const selectedStaffRow = selectedRows[i].rowIndex - 1; 
    let selectedStaff = staff[selectedStaffRow];
     selectedStaff.duration = '';
     selectedStaff.outTime = '';
     selectedStaff.status = 'in';
     selectedStaff.expectedReturnTime = null;
     selectedStaff.showtoast = true;
  
    $(".selectedRow").find("td:eq(4)").text(selectedStaff.status);
    $(".selectedRow").find("td:eq(5)").text(selectedStaff.outTime);
    $(".selectedRow").find("td:eq(6)").text(selectedStaff.duration);
    $(".selectedRow").find("td:eq(7)").text(selectedStaff.expectedReturnTime);
    $(".selectedRow").removeClass("selectedRow");
  }
  selectedStaff.showtoast = true; 
}




//SCHEDULE DELIVERY//

// Add delivery drivers to array
let deliveryDrivers = [];


function addDelivery(){

  const table3 = document.getElementById('scheduleDelivery2');
  const row = table3.insertRow(-1);
  
  const vehicleType = $("#vehicletype").val();
  const name = $("#name").val();
  const surename = $("#surename").val();
  const telephone1 = $("#telephone1").val();
  const telephone2 = $("#telephone2").val();
  const telephone3 = $("#telephone3").val();
  const address = $("#address").val();
  const returnTime1 = $("#returnTime1").val();
  const returnTime2 = $("#returnTime2").val();
  
  const isDeliveryValid = validateDelivery(vehicleType, name, surename, telephone1, telephone2, telephone3, returnTime1, returnTime2);

  if (!isDeliveryValid) {
    const dialogContainer = document.createElement("div");
    dialogContainer.classList.add("dialog-container");

    const dialogBox = document.createElement("div");
    dialogBox.classList.add("dialog-box");
    dialogContainer.appendChild(dialogBox);

    const dialogText = document.createElement("p");
    dialogText.innerText = "Please enter valid delivery details.";
    dialogBox.appendChild(dialogText);

    const confirmButton = document.createElement("button");
    confirmButton.innerText = "OK";
    confirmButton.classList.add("dialog-button", "ok-button");
    dialogBox.appendChild(confirmButton);

    document.body.appendChild(dialogContainer);

    confirmButton.addEventListener("click", () => {
      if (!isDeliveryValid) {
        const rows = document.querySelectorAll('.isDeliveryValid');
        rows.forEach(row => {
          row.classList.remove('isDeliveryValid');
        });
      }
      dialogContainer.remove();
      selectedStaffRow = null;
    });
    

    return;
  }

 
// Description: Creating a dialog container with javascript
// Author: 1.developer.mozilla. 2 and 3.w3schools
// Date: 27-29.04.23
// 1. URL create element: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// 2. URL create element: https://www.w3schools.com/jsref/met_document_createelement.asp
// 3. URL EventListener: https://www.w3schools.com/jsref/met_document_addeventlistener.asp

  if (vehicleType.toUpperCase() == 'CAR'){
    row.insertCell().innerHTML = `<i class="bi bi-car-front-fill" style="font-size:25px;"></i>`;
  } else if (vehicleType.toUpperCase() == 'MOTORCYCLE'){
    row.insertCell().innerHTML = `<i class="fa fa-motorcycle" style="font-size:25px;"></i>`;
  }
  else {
    const dialogContainer = document.createElement("div");
    dialogContainer.classList.add("dialog-container");

    const dialogBox = document.createElement("div");
    dialogBox.classList.add("dialog-box");
    dialogContainer.appendChild(dialogBox);

    const dialogText = document.createElement("p");
    dialogText.innerText = "Uknown vehicle type.";
    dialogBox.appendChild(dialogText);

    const confirmButton = document.createElement("button");
    confirmButton.innerText = "OK";
    confirmButton.classList.add("dialog-button", "ok-button");
    dialogBox.appendChild(confirmButton);

    document.body.appendChild(dialogContainer);
    
    confirmButton.addEventListener("click", () => {
      $('.vehicleType').removeClass('vehicleType');
      dialogContainer.remove();
      selectedStaffRow = null;
    });
    
    

    return;
  }

  let deliveryDriver = new DeliveryDriver(name, surename, vehicleType, telephone1 + '-' + telephone2 + '-' + telephone3, address, returnTime1 + ':' + returnTime2);
  deliveryDrivers.push(deliveryDriver);


  row.insertCell().textContent = deliveryDriver.name;
  row.insertCell().textContent = deliveryDriver.surename;
  row.insertCell().textContent = deliveryDriver.telephone;
  row.insertCell().textContent = deliveryDriver.deliveryAddress;
  row.insertCell().textContent = deliveryDriver.returnTime;
  row.onclick = function () {
    const isSelected = $(this).hasClass('selectedRow1');
    $(this).toggleClass('selectedRow1', !isSelected);
  };

  //delete input values
 
  $("#vehicletype").val('');
  $("#name").val('');
  $("#surename").val('');
  $("#telephone1").val('');
  $("#telephone2").val('');
  $("#telephone3").val('');
  $("#address").val('');
  $("#returnTime1").val('');
  $("#returnTime2").val('');
}


// Description: Creating a dialog container with javascript
// Author: 1.developer.mozilla. 2 and 3.w3schools
// Date: 27-29.04.23
// 1. URL create element: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// 2. URL create element: https://www.w3schools.com/jsref/met_document_createelement.asp
// 3. URL EventListener: https://www.w3schools.com/jsref/met_document_addeventlistener.asp
function clearFunction() {
  const selectedRows = $(".selectedRow1");
  if (selectedRows.length === 0) {
    const dialogContainer = document.createElement("div");
    dialogContainer.classList.add("dialog-container");

    const dialogBox = document.createElement("div");
    dialogBox.classList.add("dialog-box");
    dialogContainer.appendChild(dialogBox);

    const dialogText = document.createElement("p");
    dialogText.innerText = "Please select at least one row.";
    dialogBox.appendChild(dialogText);

    const confirmButton = document.createElement("button");
    confirmButton.innerText = "OK";
    confirmButton.classList.add("dialog-button", "ok-button");
    dialogBox.appendChild(confirmButton);

    document.body.appendChild(dialogContainer);
    
    confirmButton.addEventListener("click", () => {
      dialogContainer.remove();
      selectedStaffRow = null;
    });

    return;
  }

    const dialogContainer = document.createElement("div");
    dialogContainer.classList.add("dialog-container");

    const dialogBox = document.createElement("div");
    dialogBox.classList.add("dialog-box");
    dialogContainer.appendChild(dialogBox);

    const dialogText = document.createElement("p");
    dialogText.innerText = "Are you sure you want to clear this row?";
    dialogBox.appendChild(dialogText);

    const confirmButton = document.createElement("button");
    confirmButton.innerText = "OK";
    confirmButton.classList.add("dialog-button", "ok-button");
    dialogBox.appendChild(confirmButton);

    const cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.classList.add("dialog-button", "cancel-button");
    dialogBox.appendChild(cancelButton);

    document.body.appendChild(dialogContainer);

    confirmButton.addEventListener("click", () => {
      for (let i = 0; i < selectedRows.length; i++) {
        const row = selectedRows[i];
        if ($(row).closest("#scheduleDelivery2").length) {
          row.remove();
        }
      }
      dialogContainer.remove();
      selectedStaffRow = null;
    });

    cancelButton.addEventListener("click", () => {
      for (let i = 0; i < selectedRows.length; i++) {
        const row = selectedRows[i];
        $(row).removeClass('selectedRow1');
      }
      dialogContainer.remove();
      selectedStaffRow = null;
    });
}



class DeliveryDriver extends Employee {
  constructor(name, surename, vehicle, telephone, deliveryAddress, returnTime) {
    super(name, surename);
    this.vehicle = vehicle;
    this.telephone = telephone;
    this.deliveryAddress = deliveryAddress;
    this.returnTime = returnTime;
    this.wasLate = false; 
  }

  deliveryDriverIsLate() {
    const now = new Date();
    const expectedReturnDateTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      this.returnTime.split(':')[0],
      this.returnTime.split(':')[1]
    );
    this.wasLate = expectedReturnDateTime.getTime() < now.getTime();
    return this.wasLate;
  }
}

function checkDeliveryDriversExpectedReturnTime() {
const now = new Date();
for (let i = 0; i < deliveryDrivers.length; i++) {
  const deliveryDriver = deliveryDrivers[i];
  const expectedReturnDateTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    deliveryDriver.returnTime.split(':')[0],
    deliveryDriver.returnTime.split(':')[1]
  );
  const isLate = expectedReturnDateTime.getTime() < now.getTime();
  if (isLate && !deliveryDriver.wasLate) {
    const toastBody = `
      Name: ${deliveryDriver.name} ${deliveryDriver.surename}
      Telephone: ${deliveryDriver.telephone}
      Address: ${deliveryDriver.deliveryAddress}
      Estimated return time: ${deliveryDriver.returnTime}`;
    $('#ANDREToast .toast-body').text(toastBody);
    $('#ANDREToast').toast('show');
  }
  deliveryDriver.wasLate = isLate;
}
}

setInterval(checkDeliveryDriversExpectedReturnTime, 1000);




function validateDelivery(vehicleType, name, surename, telephone1, telephone2, telephone3, returnTime1, returnTime2) {
  const regexName = /^[a-zA-Z\s]+$/;
  const regexTelephone = /^\d+$/;
  const regexTime1 =  /^([0-1]?[0-9]|2[0-3])$/;
  const regexTime2 =  /^([0-5]?[0-9])$/;

  if (!regexName.test(name) || !regexName.test(surename)) {
    return false;
  }

  if (!regexTelephone.test(telephone1) || !regexTelephone.test(telephone2) || !regexTelephone.test(telephone3)) {
    return false;
  }

  if (!regexTime1.test(returnTime1)) {
    return false;
  }

  if (!regexTime2.test(returnTime2)) {
    return false;
  }
  return true;
}