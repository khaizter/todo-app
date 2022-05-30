import "./TodoList.scss";
import React, { useContext } from "react";
import TodoItem from "../TodoItem/TodoItem";
import TodoFilter from "../TodoFilter/TodoFilter";
import TodoContext from "../../../store/todo-context";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = () => {
  const todoCtx = useContext(TodoContext);

  const onDragEndHandler = (result) => {
    const sourceItem = todoCtx.filteredItems[result.source.index];
    const destinationItem = todoCtx.filteredItems[result.destination.index];
    todoCtx.reorderItems(sourceItem, destinationItem);
  };

  return (
    <section className="todo-list">
      {todoCtx.filteredItems.length ? (
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Droppable droppableId="todo-list">
            {(provided) => (
              <ul
                className={`todo-list__items todo-list__items--${todoCtx.theme}-theme`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todoCtx.filteredItems.map((item, index) => (
                  <TodoItem key={item.id} item={item} index={index} />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="todo-list__empty">The list is empty</div>
      )}
      <TodoFilter />
    </section>
  );
};

export default TodoList;
