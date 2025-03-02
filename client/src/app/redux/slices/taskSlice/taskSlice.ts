import { TaskErrorPayload, TaskState } from "@/app/utility/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  completeTask,
  createTask,
  deleteAllCompletedTasks,
  deleteAllTasks,
  deleteTask,
  getAllTasks,
  updateTaskDescription,
  UpdateTaskOrder,
  updateTaskTitle,
} from "./asyncActions";

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //fetch tasks
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload.data;
      })

      //create task
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.push(action.payload.data);
      })

      //update task title
      .addCase(updateTaskTitle.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedTask = action.payload.data;

        const index = state.tasks.findIndex(
          (task) => task.LocalID === updatedTask.LocalID
        );

        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })

      //update task description
      .addCase(updateTaskDescription.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedTask = action.payload.data;

        const index = state.tasks.findIndex(
          (task) => task.LocalID === updatedTask.LocalID
        );
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })

      //complete task
      .addCase(completeTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedTask = action.payload.data;
        const index = state.tasks.findIndex(
          (task) => task.LocalID === updatedTask.LocalID
        );

        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })

      //delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter(
          (task) => task.LocalID !== action.meta.arg //take from array
        );
      })

      //delete all tasks
      .addCase(deleteAllTasks.fulfilled, (state) => {
        state.isLoading = false;
        state.tasks = [];
      })

      //delete all completed tasks
      .addCase(deleteAllCompletedTasks.fulfilled, (state) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter((task) => !task.Completed);
      })

      //update task order
      .addCase(UpdateTaskOrder.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: PayloadAction<TaskErrorPayload>) => {
          state.isLoading = false;

          state.error = action.payload?.error || null;
        }
      );
  },
});

export const { reorderTasks } = taskSlice.actions;
export default taskSlice.reducer;
