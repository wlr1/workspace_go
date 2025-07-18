import {
  completeTask,
  deleteTask,
  UpdateTaskOrder,
} from "@/app/redux/slices/taskSlice/asyncActions";
import { reorderTasks } from "@/app/redux/slices/taskSlice/taskSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import SortableTaskItem from "./SortableTaskItem/SortableTaskItem";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const CHARACTER_LIMIT = 800;

const TaskContent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const [activeId, setActiveId] = useState<number | null>(null);
  const [dropIndicator, setDropIndicator] = useState<number | null>(null);

  //complete task
  const handleCompleteTask = (taskId: number, isCompleted: boolean) => {
    dispatch(completeTask({ id: taskId, completed: !isCompleted }));
  };

  //delete task
  const handleDeleteTask = (taskId: number) => {
    dispatch(deleteTask(taskId));
  };

  //========================================================
  //Drag and drop logic
  //========================================================

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Only start dragging after moving 8px
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag start event
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  }, []);

  // Handle drag move event
  const handleDragMove = useCallback((event: DragMoveEvent) => {
    const { over } = event;
    setDropIndicator(over ? (over.id as number) : null);
  }, []);

  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      const { active, over } = e;

      if (over && active.id !== over.id) {
        const oldIndex = tasks.findIndex((task) => task.LocalID === active.id);
        const newIndex = tasks.findIndex((task) => task.LocalID === over.id);

        const newTasks = arrayMove(tasks, oldIndex, newIndex);

        const updatedTasks = newTasks.map((task, index) => ({
          ...task,
          Order: index + 1,
        }));

        dispatch(reorderTasks(updatedTasks));

        const orderUpdates = newTasks.map((task, index) => ({
          localId: task.LocalID,
          order: index + 1,
        }));

        dispatch(UpdateTaskOrder(orderUpdates));
      }

      setActiveId(null);
      setDropIndicator(null);
    },
    [dispatch, tasks]
  );

  //========================================================

  // auto adapt textarea height
  const autoResizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    const textLength = textarea.value.length;

    if (textLength <= CHARACTER_LIMIT) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.overflowY = "hidden";
    } else {
      textarea.style.overflowY = "auto";
    }
  };

  // Initialize the textarea height after rendering the components
  useEffect(() => {
    document.querySelectorAll(".auto-resize-textarea").forEach((textarea) => {
      if (textarea instanceof HTMLTextAreaElement) {
        const textLength = textarea.value.length;

        if (textLength <= CHARACTER_LIMIT) {
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
          textarea.style.overflowY = "hidden";
        } else {
          textarea.style.overflowY = "auto";
        }
      }
    });
  }, [tasks]);

  const activeTask = useMemo(() => {
    return activeId ? tasks.find((task) => task.LocalID === activeId) : null;
  }, [activeId, tasks]);

  const sortedTasks = useMemo(() => {
    return tasks.slice().sort((a, b) => a.Order - b.Order);
  }, [tasks]);

  return (
    <div className="flex flex-col absolute gap-2 p-6 w-full ">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks.map((task) => task.LocalID)}
          strategy={verticalListSortingStrategy}
        >
          {sortedTasks.map((task) => (
            <div key={task.LocalID} className="mb-2">
              {dropIndicator === task.LocalID && activeId !== task.LocalID && (
                <div className="h-1 w-full bg-sky-500 dark:bg-sky-200 rounded-full "></div>
              )}
              <SortableTaskItem
                task={task}
                handleCompleteTask={handleCompleteTask}
                handleDeleteTask={handleDeleteTask}
                autoResizeTextarea={autoResizeTextarea}
                CHARACTER_LIMIT={CHARACTER_LIMIT}
                dispatch={dispatch}
              />
            </div>
          ))}
        </SortableContext>

        {/* Drag Overlay - shows while dragging */}
        <DragOverlay adjustScale={true}>
          {activeTask ? (
            <SortableTaskItem
              task={activeTask}
              handleCompleteTask={handleCompleteTask}
              handleDeleteTask={handleDeleteTask}
              autoResizeTextarea={autoResizeTextarea}
              CHARACTER_LIMIT={CHARACTER_LIMIT}
              dispatch={dispatch}
              isDragging={true}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default TaskContent;
