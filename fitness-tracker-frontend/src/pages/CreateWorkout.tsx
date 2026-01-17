import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { workoutApi } from '../api/workoutApi';
import WorkoutForm from '../components/Workouts/WorkoutForm';
import ErrorMessage from '../components/Common/ErrorMessage';

const CreateWorkout: React.FC = () => {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    setError('');

    try {
      const workoutData = {
        ...formData,
        date: new Date(formData.date).toISOString(),
      };

      await workoutApi.create(workoutData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create workout');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Create New Workout</h1>
        <p>Add a new workout session to your fitness tracker</p>
      </div>

      {error && <ErrorMessage message={error} onClose={() => setError('')} />}

      <WorkoutForm
        onSubmit={handleSubmit}
        submitButtonText={isSubmitting ? 'Creating...' : 'Create Workout'}
      />
    </div>
  );
};

export default CreateWorkout;