import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  isLoggedIn: boolean;
  firstname: string;
  lastname: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  firstname: "",
  lastname: "",
};

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("u_token");
    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/user/verify-token`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Token is invalid");

      const data = await response.json();
      return data.user_data;
    } catch (error: any) {
      localStorage.removeItem("u_token");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      localStorage.removeItem("u_token");
      state.isLoggedIn = false;
    },
    setData: (state, action) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.firstname = action.payload.firstname;
        state.lastname = action.payload.lastname;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.isLoggedIn = false;
      });
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;