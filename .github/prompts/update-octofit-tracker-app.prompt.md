
mode: 'agent'
model: GPT-4.1

# Octofit Tracker Django App & MongoDB Integration

- All Django project files are in the `octofit-tracker/backend/octofit_tracker` directory.

## Backend Setup & Database Integration

1. Update `settings.py` to:
	- Use Djongo for MongoDB connection to `octofit_db` (no auth required)
	- Add `octofit_tracker`, `rest_framework`, `djongo`, and `corsheaders` to `INSTALLED_APPS`
	- Enable CORS for all origins, methods, and headers; allow all hosts
	- Add CORS middleware
2. Implement models, serializers, views, admin, and tests for:
	- users, teams, activities, leaderboard, workouts collections
3. Add REST API routing:
	- `/` points to `api_root` (lists all endpoints)
	- `/api/` includes all resource endpoints
4. Create a Django management command to populate the database with test data:
	- Superhero users (Marvel & DC teams)
	- Activities, workouts, leaderboard entries
	- Uses Django ORM for data deletion/insertion
5. Create a Django management command to ensure a unique index on the `email` field in the users collection.
6. Run migrations and populate the database using the management commands.
7. Verify with `mongosh`:
	- Collections: users, teams, activities, leaderboards, workouts
	- Sample documents exist in each collection
	- Unique index on `email` in users
8. Confirm Django REST API endpoints are available for all collections.
