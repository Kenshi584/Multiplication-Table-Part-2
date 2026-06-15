/*
File: script.js
GUI Assignment: We are assigned to created a multiplcation table using HTML, CSS, JavaScript, and JQuery. This file contains the procedure of the website and how the table is created and taking in user inputs. As well as having JQuery plugins to add new features.
Derek Garcia, UMass Lowell Computer Science, Derek_GarciaRodriguez@student.uml.edu
Copyright (c) 2026 by Derek. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
updated by DG on June 15, 2026 at 6:01 PM*/
$(document).ready(function () {
$("#tabs").tabs();
let tabCount = 1;
/*JQuery: Error Rule setup*/
$.validator.addMethod("less_than_or_equal", function (value, element, param) {
    return Number(value) <= Number($(param).val());
}, "Minimum value cannot be greater than maximum value.");
$.validator.addMethod("greater_than_or_equal", function (value, element, param) {
    return Number(value) >= Number($(param).val());
}, "Maximum value cannot be less than minimum value.");
$("#Table").validate({
    rules: {
        min_col: {
            required: true,
            range: [-50, 50],
            less_than_or_equal: "#max_col"
        },
        max_col: {
            required: true,
            range: [-50, 50],
            greater_than_or_equal: "#min_col"
        },
        min_row: {
            required: true,
            range: [-50, 50],
            less_than_or_equal: "#max_row"
        },
        max_row: {
            required: true,
            range: [-50, 50],
            greater_than_or_equal: "#min_row"
        }
    },

    messages: {
        min_col: {
            required: "Please enter a minimum column value",
            range: "Value must be between -50 and 50"
        },
        max_col: {
            required: "Please enter a maximum column value",
            range: "Value must be between -50 and 50"
        },
        min_row: {
            required: "Please enter a minimum row value",
            range: "Value must be between -50 and 50"
        },
        max_row: {
            required: "Please enter a maximum row value",
            range: "Value must be between -50 and 50"
        }
    }
});
/*JQuery Sliders*/
$("#min_col_slide").slider({
    min: -50,
    max: 50,
    value: 0,

    slide: function (event, ui) {
        $("#min_col").val(ui.value);
        if ($("#Table").valid()) {
            $("#table_con").html(buildTable_HTML());
        }
    }
});
$("#min_col").on("input change", function () {
    let value = Number($(this).val());
    $("#min_col_slide").slider("value", value)
    $("#min_col").valid();
    if ($("#Table").valid()) {
            $("#table_con").html(buildTable_HTML());
        }
    
});

$("#max_col_slide").slider({
    min: -50,
    max: 50,
    value: 0,

    slide: function (event, ui) {
        $("#max_col").val(ui.value);
        if ($("#Table").valid()) {
            $("#table_con").html(buildTable_HTML());
        }
    }
})
$("#max_col").on("input", function () {
    let value = Number($(this).val());
    $("#max_col_slide").slider("value", value)
     $("#min_col").valid();
     if ($("#Table").valid()) {
            $("#table_con").html(buildTable_HTML());
        }
});


$("#min_row_slide").slider({
    min: -50,
    max: 50,
    value: 0,

    slide: function (event, ui) {
        $("#min_row").val(ui.value);
        if ($("#Table").valid()) {
            $("#table_con").html(buildTable_HTML());
        }
    }
})
$("#min_row").on("input", function () {
    let value = Number($(this).val());
    $("#min_row_slide").slider("value", value)
     $("#min_col").valid();
     if ($("#Table").valid()) {
            $("#table_con").html(buildTable_HTML());
        }
});

$("#max_row_slide").slider({
    min: -50,
    max: 50,
    value: 0,

    slide: function (event, ui) {
        $("#max_row").val(ui.value);
        if ($("#Table").valid()) {
            $("#table_con").html(buildTable_HTML());
        }

    }
})
$("#max_row").on("input", function () {
    let value = Number($(this).val());
    $("#max_row_slide").slider("value", value)
     $("#min_col").valid();
     if ($("#Table").valid()) {
            $("#table_con").html(buildTable_HTML());
        }
});
/*JQuery Create Multiplication Table*/
function generateTable() {
    const min_col_r = document.getElementById("min_col").value;
    const max_col_r = document.getElementById("max_col").value;
    const min_row_r = document.getElementById("min_row").value;
    const max_row_r = document.getElementById("max_row").value;
    
    const min_col = Number(min_col_r);
    const max_col = Number(max_col_r);
    const min_row = Number(min_row_r);
    const max_row = Number(max_row_r);

    const tableContainer = document.getElementById("table_con");

    /*Muplication table*/
    let tableHTML = "<table>";

    tableHTML += "<tr>";
    tableHTML += "<th></th>";
    /*Loops to create columns*/
    for(c_min = min_col; c_min <= max_col; c_min++){
        tableHTML += "<th>" + c_min + "</th>";
    }
    tableHTML += "</tr>";

    /*Loops to create rows*/
    for(r_min = min_row; r_min <= max_row; r_min++){
        tableHTML += "<tr>";
        tableHTML += "<th>" + r_min + "</th>";

        /*inner rows*/
        for(c_min = min_col; c_min <= max_col; c_min++){
        tableHTML += "<td>" + r_min * c_min + "</td>";
    }

        tableHTML += "</tr>"
    }
    tableHTML += "</table>";
    /*tableContainer.innerHTML = tableHTML;*/
    let tabId = "tab-" + tabCount;
    tabCount++;
    let label = min_col + "," + max_col + "," + min_row + "," + max_row;

    $("#tabs ul").append(
        '<li><input type="checkbox" class="delete-check"> ' + '<a href="#' + tabId + '">' + label + '</a>' + '<span class ="ui-icon ui-icon-close"></span></li>'
    );

    $("#tabs").append(
        '<div id="' + tabId + '">' + '<div class ="tab-table-container">' + tableHTML + '</div>' + '</div>'
    );

    $("#tabs").tabs("refresh");
}


/*Preview Table*/
function buildTable_HTML() {
    const min_col_r = document.getElementById("min_col").value;
    const max_col_r = document.getElementById("max_col").value;
    const min_row_r = document.getElementById("min_row").value;
    const max_row_r = document.getElementById("max_row").value;
    
    const min_col = Number(min_col_r);
    const max_col = Number(max_col_r);
    const min_row = Number(min_row_r);
    const max_row = Number(max_row_r);

    const tableContainer = document.getElementById("table_con");

    /*Muplication table*/
    let tableHTML = "<table>";

    tableHTML += "<tr>";
    tableHTML += "<th></th>";
    /*Loops to create columns*/
    for(c_min = min_col; c_min <= max_col; c_min++){
        tableHTML += "<th>" + c_min + "</th>";
    }
    tableHTML += "</tr>";

    /*Loops to create rows*/
    for(r_min = min_row; r_min <= max_row; r_min++){
        tableHTML += "<tr>";
        tableHTML += "<th>" + r_min + "</th>";

        /*inner rows*/
        for(c_min = min_col; c_min <= max_col; c_min++){
        tableHTML += "<td>" + r_min * c_min + "</td>";
    }

        tableHTML += "</tr>"
    }

    tableHTML += "</table>";
    return tableHTML;
}



const form = document.getElementById("Table");
form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!$("#Table").valid()) {
        return;
    }

    generateTable();
});

/*Create Tabs*/
$("#tabs").on("click", ".ui-icon-close", function (event){
    event.preventDefault;
    event.stopPropagation();
    console.log("X clicked")
    let panelId = $(this).prev("a").attr("href");
    console.log(panelId);
    $(this).closest("li").remove();
    $(panelId).remove();
    $("#tabs").tabs("refresh");
});


/*Delete Multiple Tabs*/
$("#delete-selected").on("click", function() {
    $(".delete-check:checked").each(function () {
        let panelId = $(this).siblings("a").attr("href");

        $(this).closest("li").remove();
        $(panelId).remove();
    });
    $("#tabs").tabs("refresh");
});

});