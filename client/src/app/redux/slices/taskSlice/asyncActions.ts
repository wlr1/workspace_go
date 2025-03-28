import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { AxiosError } from "axios";

export const getAllTasks = createAsyncThunk(
  "tasks/getAllTasks",
  async (
    {
      hideCompleted = false,
      showTodayOnly = false,
    }: { hideCompleted?: boolean; showTodayOnly?: boolean } = {},
    thunkAPI
  ) => {
    try {
      const res = await api.get("/tasks", {
        params: { hideCompleted, showTodayOnly },
      });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "cannot fetch all tasks"
      );
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (
    { title, description }: { title: string; description: string },
    thunkAPI
  ) => {
    try {
      const res = await api.post("/tasks-create", { title, description });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Can`t create a task"
      );
    }
  }
);

export const updateTaskTitle = createAsyncThunk(
  "tasks/updateTaskTitle",
  async ({ id, title }: { id: number; title: string }, thunkAPI) => {
    try {
      const res = await api.put(`/task/update-title/${id}`, { title });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Cannot update task title"
      );
    }
  }
);

export const updateTaskDescription = createAsyncThunk(
  "tasks/updateTaskDescription",
  async (
    { id, description }: { id: number; description: string },
    thunkAPI
  ) => {
    try {
      const res = await api.put(`/task/update-description/${id}`, {
        description,
      });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Cannot update a task description"
      );
    }
  }
);

export const completeTask = createAsyncThunk(
  "tasks/completeTask",
  async ({ id, completed }: { id: number; completed: boolean }, thunkAPI) => {
    try {
      const res = await api.put(`/task/complete/${id}`, { completed });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Cannot complete a task"
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: number, thunkAPI) => {
    try {
      const res = await api.delete(`/task/delete/${id}`);
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Cannot delete a task"
      );
    }
  }
);

export const deleteAllTasks = createAsyncThunk(
  "tasks/deleteAllTasks",
  async (_, thunkAPI) => {
    try {
      const res = await api.delete("/task/delete-all");
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Cannot delete all tasks"
      );
    }
  }
);

export const deleteAllCompletedTasks = createAsyncThunk(
  "tasks/deleteAllCompletedTasks",
  async (_, thunkAPI) => {
    try {
      const res = await api.delete("/task/delete-completed");
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Cannot delete all completed tasks"
      );
    }
  }
);

export const UpdateTaskOrder = createAsyncThunk(
  "tasks/UpdateTaskOrder",
  async (orderData: { localId: number; order: number }[], thunkAPI) => {
    try {
      const res = await api.put("/tasks/order", orderData);
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Cannot update task order"
      );
    }
  }
);
