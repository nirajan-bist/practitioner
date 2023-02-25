import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { addOne, deleteOne, fetchAll, updateOne } from "services/practitioners";

const initialState = {
  loading: false,
  entities: {},
  ids:[]
};

// Thunk functions
export const fetchPractitioners = createAsyncThunk(
  "practitioner/fetchPractitioners",
  fetchAll
);

export const addPractitioner = createAsyncThunk(
  "practitioner/addPractitioner",
  addOne
);

export const deletePractitioner = createAsyncThunk(
  "practitioner/deletePractitioner",
  deleteOne
);

export const updatePractitioner = createAsyncThunk(
  "practitioner/updatePractitioner",
  updateOne
);

const practitionerSlice = createSlice({
  name: "practitioner",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPractitioners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPractitioners.fulfilled, (state, action) => {
        state.loading = false;
        const newEntities = {};
        const newIds = [];
        action.payload.forEach((practitioner) => {
          newEntities[practitioner.id] = practitioner;
          newIds.push(practitioner.id);
        });
        state.entities = newEntities;
        state.ids = newIds;
      })
      .addCase(fetchPractitioners.rejected, (state) => {
        state.loading = false;
      })
      // add practitioner
      .addCase(addPractitioner.fulfilled, (state, action) => {
        const practitioner = action.payload;
        state.entities[practitioner.id] = practitioner;
      })
      // update practitioner
      .addCase(updatePractitioner.fulfilled, (state, action) => {
        const practitioner = action.payload;
        state.entities[practitioner.id] = practitioner;
      })
      // delete practitioner
      .addCase(deletePractitioner.fulfilled, (state, action) => {
        const practitioner = action.payload;
        delete state.entities[practitioner.id];
        state.ids = state.ids.filter(id=>id!==practitioner.id);
      });
  },
});

export const selectPractitionerEntities = (state) =>
  state.practitioner.entities;
export const selectPractitionerIds = (state) =>
  state.practitioner.ids;

export const selectPractitioners = createSelector(
  selectPractitionerIds,
  selectPractitionerEntities,
  (ids, practitioners) => ids.map((id)=>practitioners[id])
);

export const selectPractitionerById = (state, practitionerId) =>
  selectPractitionerEntities(state)[practitionerId];

export default practitionerSlice.reducer;
