import "./TodoItem.scss";
import React from "react";
import CheckIcon from "../../icon/CheckIcon";
import CrossIcon from "../../icon/CrossIcon";
import { Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, toggleItem } from "../../../store/todo";

const itemVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const TodoItem = ({ item, index }) => {
  const { status, task } = item;
  const currentTheme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const toggleStatus = () => {
    dispatch(toggleItem(item._id));
  };

  const deleteHandler = () => {
    dispatch(removeItem(item._id));
  };

  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided, snapshot) => (
        <motion.li
          className={`todo-item ${
            snapshot.isDragging ? "todo-item--dragging" : ""
          } todo-item--${currentTheme}-theme`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <button
            className={`todo-item__status ${
              status === "done" ? "todo-item__status--complete" : ""
            } todo-item__status--${currentTheme}-theme`}
            onClick={toggleStatus}
          >
            <CheckIcon />
          </button>
          <span
            className={`todo-item__todo ${
              status === "done" ? "todo-item__todo--complete" : ""
            } todo-item__todo--${currentTheme}-theme`}
          >
            {task}
          </span>
          <button
            className={`todo-item__delete todo-item__delete--${currentTheme}-theme`}
            onClick={deleteHandler}
          >
            <CrossIcon />
          </button>
        </motion.li>
      )}
    </Draggable>
  );
};

export default TodoItem;
