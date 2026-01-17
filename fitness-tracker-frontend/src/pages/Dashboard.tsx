import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkoutSummary } from '../types/workout.types';
import { workoutApi } from '../api/workoutApi';
import { useAuth } from '../auth/AuthContext';
import WorkoutCard from '../components/Workouts/WorkoutCard';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';

const Dashboard: React.FC = () => {
  const [workouts, setWorkouts] = useState<WorkoutSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      setIsLoading(true);
      const data = await workoutApi.getAll();
      setWorkouts(data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load workouts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWorkoutDelete = (id: number) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading your workouts..." />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.firstName}! 💪</h1>
          <p className="dashboard-subtitle">Track your progress and crush your fitness goals</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/create-workout')}>
          + New Workout
        </button>
      </div>

      {error && <ErrorMessage message={error} onClose={() => setError('')} />}

      {workouts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏋️</div>
          <h2>No workouts yet</h2>
          <p>Start your fitness journey by creating your first workout!</p>
          <button className="btn-primary" onClick={() => navigate('/create-workout')}>
            Create Your First Workout
          </button>
        </div>
      ) : (
        <>
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Workouts</h3>
              <p className="stat-number">{workouts.length}</p>
            </div>
            <div className="stat-card">
              <h3>This Month</h3>
              <p className="stat-number">
                {
                  workouts.filter((w) => {
                    const workoutDate = new Date(w.date);
                    const now = new Date();
                    return (
                      workoutDate.getMonth() === now.getMonth() &&
                      workoutDate.getFullYear() === now.getFullYear()
                    );
                  }).length
                }
              </p>
            </div>
            <div className="stat-card">
              <h3>Total Exercises</h3>
              <p className="stat-number">
                {workouts.reduce((sum, w) => sum + w.exerciseCount, 0)}
              </p>
            </div>
          </div>

          <div className="workouts-section">
            <h2>Your Workouts</h2>
            <div className="workouts-grid">
              {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} onDelete={handleWorkoutDelete} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;