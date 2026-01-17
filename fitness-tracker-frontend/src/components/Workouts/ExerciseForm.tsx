import React from 'react';
import { Exercise } from '../../types/workout.types';

interface ExerciseFormProps {
  exercise: Exercise;
  index: number;
  onChange: (index: number, field: keyof Exercise, value: string | number) => void;
  onRemove: (index: number) => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ exercise, index, onChange, onRemove }) => {
  return (
    <div className="exercise-form">
      <div className="exercise-form-header">
        <h4>Exercise {index + 1}</h4>
        <button type="button" className="btn-remove" onClick={() => onRemove(index)}>
          Remove
        </button>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor={`exercise-name-${index}`}>Exercise Name *</label>
          <input
            type="text"
            id={`exercise-name-${index}`}
            value={exercise.name}
            onChange={(e) => onChange(index, 'name', e.target.value)}
            placeholder="e.g., Bench Press"
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor={`exercise-sets-${index}`}>Sets *</label>
          <input
            type="number"
            id={`exercise-sets-${index}`}
            value={exercise.sets}
            onChange={(e) => onChange(index, 'sets', parseInt(e.target.value) || 0)}
            min="1"
            max="100"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor={`exercise-reps-${index}`}>Reps *</label>
          <input
            type="number"
            id={`exercise-reps-${index}`}
            value={exercise.reps}
            onChange={(e) => onChange(index, 'reps', parseInt(e.target.value) || 0)}
            min="1"
            max="1000"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor={`exercise-weight-${index}`}>Weight (lbs) *</label>
          <input
            type="number"
            id={`exercise-weight-${index}`}
            value={exercise.weight}
            onChange={(e) => onChange(index, 'weight', parseFloat(e.target.value) || 0)}
            min="0"
            max="10000"
            step="0.01"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ExerciseForm;