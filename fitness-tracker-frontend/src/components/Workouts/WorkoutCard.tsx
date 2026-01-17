import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkoutSummary } from '../../types/workout.types';
import { workoutApi } from '../../api/workoutApi';

interface WorkoutCardProps {
  workout: WorkoutSummary;
  onDelete: (id: number) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-workout/${workout.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await workoutApi.delete(workout.id);
        onDelete(workout.id);
      } catch (error) {
        console.error('Error deleting workout:', error);
        alert('Failed to delete workout');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="workout-card">
      <div className="workout-card-header">
        <h3>{workout.name}</h3>
        <span className="workout-date">{formatDate(workout.date)}</span>
      </div>
      <div className="workout-card-body">
        <div className="workout-stat">
          <span className="stat-label">Duration:</span>
          <span className="stat-value">{workout.durationMinutes} min</span>
        </div>
        <div className="workout-stat">
          <span className="stat-label">Exercises:</span>
          <span className="stat-value">{workout.exerciseCount}</span>
        </div>
      </div>
      <div className="workout-card-actions">
        <button className="btn-edit" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;