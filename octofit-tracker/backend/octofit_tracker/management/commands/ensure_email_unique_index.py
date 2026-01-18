from django.core.management.base import BaseCommand
from djongo.database import connect

class Command(BaseCommand):
    help = 'Ensure unique index on email field in users collection.'

    def handle(self, *args, **kwargs):
        client = connect().client
        db = client['octofit_db']
        result = db.users.create_index([('email', 1)], unique=True)
        self.stdout.write(self.style.SUCCESS(f'Unique index created on email: {result}'))
