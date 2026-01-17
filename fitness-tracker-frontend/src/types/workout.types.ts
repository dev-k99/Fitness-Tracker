export interface Exercise {
  id?: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  order: number;
}

export interface Workout {
  id: number;
  name: string;
  date: string;
  durationMinutes: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  exercises: Exercise[];
}

export interface WorkoutSummary {
  id: number;
  name: string;
  date: string;
  durationMinutes: number;
  exerciseCount: number;
  createdAt: string;
}

export interface CreateWorkoutRequest {
  name: string;
  date: string;
  durationMinutes: number;
  notes?: string;
  exercises: Exercise[];
}

export interface UpdateWorkoutRequest {
  name: string;
  date: string;
  durationMinutes: number;
  notes?: string;
  exercises: Exercise[];
}