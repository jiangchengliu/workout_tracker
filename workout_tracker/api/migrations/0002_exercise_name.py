# Generated by Django 4.2.3 on 2023-07-20 05:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='exercise',
            name='name',
            field=models.TextField(blank=True, max_length=100),
        ),
    ]
