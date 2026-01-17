import axiosInstance from './axiosConfig';
import { Workout, WorkoutSummary, CreateWorkoutRequest, UpdateWorkoutRequest } from '../types/workout.types';

export const workoutApi = {
  getAll: async (): Promise<WorkoutSummary[]> => {
    const response = await axiosInstance.get<WorkoutSummary[]>('/workouts');
    return response.data;
  },

  getById: async (id: number): Promise<Workout> => {
    const response = await axiosInstance.get<Workout>(`/workouts/${id}`);
    return response.data;
  },

  create: async (data: CreateWorkoutRequest): Promise<Workout> => {
    const response = await axiosInstance.post<Workout>('/workouts', data);
    return response.data;
  },

  update: async (id: number, data: UpdateWorkoutRequest): Promise<Workout> => {
    const response = await axiosInstance.put<Workout>(`/workouts/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/workouts/${id}`);
  },
};