import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { AxiosError } from "axios";

export const validateUser = createAsyncThunk(
  "user/validateUser",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/validate");
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to validate user"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, thunkAPI) => {
    try {
      const res = await api.delete("/delete-user");
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to delete user"
      );
    }
  }
);

export const changeUsername = createAsyncThunk(
  "user/changeUsername",
  async (newUsername: string, thunkAPI) => {
    try {
      const res = await api.put("/update-username", { newUsername });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to change username"
      );
    }
  }
);
