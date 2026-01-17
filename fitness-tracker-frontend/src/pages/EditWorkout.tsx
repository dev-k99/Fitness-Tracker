import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { workoutApi } from '../api/workoutApi';
import WorkoutForm from '../components/Workouts/WorkoutForm';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';

const EditWorkout: React.FC = () => {
  const [workout, setWorkout] = useState<any>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadWorkout(parseInt(id));
    }
  }, [id]);

  const loadWorkout = async (workoutId: number) => {
    try {
      setIsLoading(true);
      const data = await workoutApi.getById(workoutId);
      
      // Format data for the form
      const formData = {
        name: data.name,
        date: new Date(data.date).toISOString().split('T')[0],
        durationMinutes: data.durationMinutes,
        notes: data.notes || '',
        exercises: data.exercises,
      };

      setWorkout(formData);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load workout');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    if (!id) return;

    setIsSubmitting(true);
    setError('');

    try {
      const workoutData = {
        ...formData,
        date: new Date(formData.date).toISOString(),
      };

      await workoutApi.update(parseInt(id), workoutData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update workout');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading workout..." />;
  }

  if (!workout) {
    return (
      <div className="page-container">
        <ErrorMessage message="Workout not found" />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Edit Workout</h1>
        <p>Update your workout session details</p>
      </div>

      {error && <ErrorMessage message={error} onClose={() => setError('')} />}

      <WorkoutForm
        initialData={workout}
        onSubmit={handleSubmit}
        submitButtonText={isSubmitting ? 'Updating...' : 'Update Workout'}
      />
    </div>
  );
};

export default EditWorkout;