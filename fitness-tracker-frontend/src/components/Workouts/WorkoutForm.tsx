import React, { useState } from 'react';
import { Exercise } from '../../types/workout.types';
import ExerciseForm from './ExerciseForm';

interface WorkoutFormData {
  name: string;
  date: string;
  durationMinutes: number;
  notes: string;
  exercises: Exercise[];
}

interface WorkoutFormProps {
  initialData?: WorkoutFormData;
  onSubmit: (data: WorkoutFormData) => void;
  submitButtonText?: string;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({
  initialData,
  onSubmit,
  submitButtonText = 'Create Workout',
}) => {
  const [formData, setFormData] = useState<WorkoutFormData>(
    initialData || {
      name: '',
      date: new Date().toISOString().split('T')[0],
      durationMinutes: 60,
      notes: '',
      exercises: [],
    }
  );

  const handleChange = (field: keyof WorkoutFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleExerciseChange = (index: number, field: keyof Exercise, value: string | number) => {
    const updatedExercises = [...formData.exercises];
    updatedExercises[index] = { ...updatedExercises[index], [field]: value };
    setFormData((prev) => ({ ...prev, exercises: updatedExercises }));
  };

  const addExercise = () => {
    const newExercise: Exercise = {
      name: '',
      sets: 3,
      reps: 10,
      weight: 0,
      order: formData.exercises.length,
    };
    setFormData((prev) => ({
      ...prev,
      exercises: [...prev.exercises, newExercise],
    }));
  };

  const removeExercise = (index: number) => {
    const updatedExercises = formData.exercises.filter((_, i) => i !== index);
    const reorderedExercises = updatedExercises.map((ex, i) => ({ ...ex, order: i }));
    setFormData((prev) => ({ ...prev, exercises: reorderedExercises }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.exercises.length === 0) {
      alert('Please add at least one exercise');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>Workout Details</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="workout-name">Workout Name *</label>
            <input
              type="text"
              id="workout-name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g., Chest Day"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="workout-date">Date *</label>
            <input
              type="date"
              id="workout-date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="workout-duration">Duration (minutes) *</label>
            <input
              type="number"
              id="workout-duration"
              value={formData.durationMinutes}
              onChange={(e) => handleChange('durationMinutes', parseInt(e.target.value) || 0)}
              min="0"
              max="1440"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="workout-notes">Notes</label>
            <textarea
              id="workout-notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any additional notes about this workout..."
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="section-header">
          <h3>Exercises</h3>
          <button type="button" className="btn-add" onClick={addExercise}>
            + Add Exercise
          </button>
        </div>
        {formData.exercises.length === 0 ? (
          <p className="no-exercises">No exercises added yet. Click "Add Exercise" to get started.</p>
        ) : (
          <div className="exercises-list">
            {formData.exercises.map((exercise, index) => (
              <ExerciseForm
                key={index}
                exercise={exercise}
                index={index}
                onChange={handleExerciseChange}
                onRemove={removeExercise}
              />
            ))}
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm;