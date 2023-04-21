//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".section__input_add-item");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
    addButton.className="section__row-wrapper__add-btn";
var incompleteTaskHolder=document.querySelector(".section-to-do__tasks");//ul of #incompleteTasks
var completedTasksHolder=document.querySelector(".section__completed-tasks");//completed-tasks

// var completedInput=document.querySelector(".section-add-item__input-row-wrapper__input");//Add a new task.


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    // listItem.className = "li-item";
    listItem.className = "section__li-item li-item";

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
   
    var deleteButtonImg=document.createElement("img");//delete button image
    deleteButtonImg.className = "btn_delete__img-delete";

    label.innerText=taskString;
    label.className="section__label-task section__label-task_size"; 

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className="section__imput-checkbox"; // todo del imput-checkbox

    editInput.type = "text";
    editInput.className = "section__input-task section__input_text section__input_size";

    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "btn btn_edit"; 

    deleteButton.className = "btn_delete btn";
    deleteButtonImg.src = "./remove.svg";
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask = function () {
    console.log("Add Task...");
    //Create a new list item with the text from the #new_task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    // var editInput=listItem.querySelector(".input-text");
    var editInput=listItem.querySelector(".section__input_text");

    editInput.className = "section__input-task section__input_text section__input_size section__input_node-text";
    var label=listItem.querySelector("label");
    label.className = "section__label-task section__label-task_size section__label-task_edit"; 
    // var editBtn=listItem.querySelector(".edit");
    var editBtn=listItem.querySelector(".btn_edit");

    var containsClass=listItem.classList.contains("section__li-item__edit-node");
    // var containsClass=listItem.classList.contains("edit-mode");

    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
        label.className="section__label-task section__label-task_size";
        editInput.className="section__input-task section__input_text section__input_size";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("section__li-item__edit-node");
    // listItem.classList.toggle("edit-mode");

};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted = function () {
    console.log("Complete Task...");


    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);

    bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".section__imput-checkbox"); //todo ??
    // var checkBox=taskListItem.querySelector(".imput-checkbox"); //todo ??
    var editButton=taskListItem.querySelector(".btn_edit");
    var deleteButton=taskListItem.querySelector(".btn_delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
  
   
   
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}


// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.