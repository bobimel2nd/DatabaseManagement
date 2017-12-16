$(document).ready(function() {
	// Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyCWvwqPNZ9iHEKxLhas7RC3Ih9V3SVGoeI",
	    authDomain: "datamanagement-ae252.firebaseapp.com",
	    databaseURL: "https://datamanagement-ae252.firebaseio.com",
	    projectId: "datamanagement-ae252",
	    storageBucket: "",
	    messagingSenderId: "52080378705"
	  };
	firebase.initializeApp(config);
	var database = firebase.database();

	var Employee = { "Name": "", "Role": "", "StartDate": "", "MonthlyRate": ""}
	var Employees = [];
	var end = moment(new Date()); //todays date

	// At the initial load, get a snapshot of the current data.
	database.ref().on("child_added", function(snapshot) {
		temp = snapshot.val();
		if (temp !== null) {
			Employee = ($.parseJSON(temp.EmployeeData));
			Employees.push(Employee);
		}
		ShowNewEmployee(Employees.length-1);
	}, function(errorObject) {
		alert("The read failed: " + errorObject.code);
	});

	$(document).on("click", "#submit", function(event) {
		Employee.Name = $("#employee-name").val();
		Employee.Role = $("#employee-role").val();
		Employee.StartDate = $("#start-date").val();
		Employee.MonthlyRate = $("#monthly-rate").val();
		database.ref().push({
		    EmployeeData: JSON.stringify(Employee),
		});
	});

	function ShowNewEmployee(i) {
		var row = $("<div>");
		row.addClass("row");
		
		var col = $("<div>");
		col.addClass("col-xs-2");
		col.text(Employees[i].Name);
		row.append(col);
		
		col = $("<div>");
		col.addClass("col-xs-2");
		col.text(Employees[i].Role);
		row.append(col);
		
		col = $("<div>");
		col.addClass("col-xs-2");
		col.text(Employees[i].StartDate);
		row.append(col);
		
		var beg = moment(Employees[i].StartDate);
		var duration = moment.duration(end.diff(beg));
		var months = Math.floor(duration.asMonths());
		col = $("<div>");
		col.addClass("col-xs-2");
		col.text(months);
		row.append(col);
		
		col = $("<div>");
		col.addClass("col-xs-2");
		col.text(Employees[i].MonthlyRate);
		row.append(col);
		
		var billed = months * Employees[i].MonthlyRate;
		col = $("<div>");
		col.addClass("col-xs-2");
		col.text(billed);
		row.append(col);

		$("#employee-data").append(row);
	}

})