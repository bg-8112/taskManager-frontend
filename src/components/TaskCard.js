import React from "react";
import DropdownButton from "./DropdownButton/DropdownButton";
import "./TaskCard.css";

function TaskCard({task}) {

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const formattedAssignedDate = new Date(task.created_at).toLocaleDateString('en-GB')
  const formattedDueDate = new Date(task.due_date).toLocaleDateString('en-GB');

  
  return (
    <div className={`task-card ${task.status.toLowerCase().replace(" ", "-")}`}>
      <div className="task-card-header">
        <h3>{truncateText(task.title , 30)}</h3>
      </div>
      <p>{truncateText(task.description , 30)}</p>
      <p>
        <strong>Assignee:</strong> {Array.isArray(task.assignee) ? task.assignee.join(", ") : task.assignee}
      </p>
      <p>
        <strong>Assigned Date:</strong> {formattedAssignedDate}
      </p>
      <p>
        <strong>Due Date:</strong> {formattedDueDate}
      </p>

      {/* {console.log(task , task.assignedDate)} */}
    </div>
  );
}

export default TaskCard;
